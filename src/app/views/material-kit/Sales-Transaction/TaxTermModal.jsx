import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Radio, RadioGroup, FormControlLabel, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { fetchCGST, fetchIGST, fetchSGST } from "app/utils/authServices";

const TaxTermModal = ({ open, onClose, onSave }) => {
    const [taxType, setTaxType] = useState("SGST");
    const [taxOptions, setTaxOptions] = useState([]);
    const [selectedTax, setSelectedTax] = useState("");
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (open) {
            loadTaxData();
        }
    }, [taxType]);

    useEffect(() => {
        if (open) {
            setRows([]);
            setSelectedTax("");
        }
    }, [open]);

    const loadTaxData = async () => {
        try {
            let apiResponse;

            if (taxType === "SGST") apiResponse = await fetchSGST();
            if (taxType === "CGST") apiResponse = await fetchCGST();
            if (taxType === "IGST") apiResponse = await fetchIGST();

            let list = [];

            // Handle different API response structures safely
            if (Array.isArray(apiResponse)) {
                list = apiResponse;
            } else if (Array.isArray(apiResponse?.Data)) {
                list = apiResponse.Data;
            } else if (Array.isArray(apiResponse?.data)) {
                list = apiResponse.data;
            }

            const normalized = list.map((x) => ({
                TAX_CODE: String(
                    x.TAX_CODE || x.TaxCode || x.Code || ""
                ),
                DESC: x.DESC || x.Description || "",
                PERCENT: Number(
                    x.PERCENT || x.Percent || x.Rate || 0
                ),
            }));

            setTaxOptions(normalized);
            setSelectedTax("");
        } catch (error) {
            console.error("Failed loading tax list:", error);
            setTaxOptions([]);
        }
    };

    // ================================
    // Add Tax Row
    // ================================
    const handleAdd = () => {
        if (!selectedTax) return;

        const selected = taxOptions.find(
            (x) => String(x.TAX_CODE) === String(selectedTax)
        );

        if (!selected) return;

        // Prevent duplicate (same taxType + code)
        const alreadyExists = rows.some(
            (row) =>
                String(row.code) === String(selected.TAX_CODE) &&
                row.type === taxType
        );

        if (alreadyExists) return;

        const newRow = {
            code: selected.TAX_CODE,
            desc: selected.DESC,
            percent: selected.PERCENT,
            type: taxType,
            amount: selected.PERCENT.toFixed(2),
        };

        setRows((prev) => [...prev, newRow]);
        setSelectedTax("");
    };

    // ================================
    // Remove Row
    // ================================
    const handleRemove = (index) => {
        setRows((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={false}
            PaperProps={{
                sx: {
                    width: 800,
                    maxWidth: 800,
                },
            }}
        >
            <DialogTitle>
                Tax Term
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>

                {/* ================= Table ================= */}
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tax Type</TableCell>
                            <TableCell>Tax Code</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>%</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.code}</TableCell>
                                    <TableCell>{row.desc}</TableCell>
                                    <TableCell>{row.percent}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleRemove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No tax added
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* ================= Tax Type ================= */}
                <Box mt={3}>
                    <Typography fontWeight={600}>
                        Select Tax Type
                    </Typography>
                    <RadioGroup
                        row
                        value={taxType}
                        onChange={(e) => setTaxType(e.target.value)}
                    >
                        <FormControlLabel value="SGST" control={<Radio />} label="SGST" />
                        <FormControlLabel value="CGST" control={<Radio />} label="CGST" />
                        <FormControlLabel value="IGST" control={<Radio />} label="IGST" />
                    </RadioGroup>
                </Box>

                {/* ================= Dropdown ================= */}
                <Grid container spacing={2} mt={1}>
                    <Grid item xs={9}>
                        <TextField
                            select
                            fullWidth
                            label="Tax Term"
                            value={selectedTax}
                            onChange={(e) =>
                                setSelectedTax(String(e.target.value))
                            }
                        >
                            <MenuItem value="">-- Select --</MenuItem>
                            {taxOptions.map((row) => (
                                <MenuItem
                                    key={row.TAX_CODE}
                                    value={row.TAX_CODE}
                                >
                                    {row.TAX_CODE} - {row.DESC} ({row.PERCENT}%)
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ height: "40px" }}
                            onClick={handleAdd}
                        >
                            ADD
                        </Button>
                    </Grid>
                </Grid>

                {/* ================= Footer ================= */}
                <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                    <Button
                        variant="contained"
                        onClick={() => onSave(rows)}
                    >
                        Save
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default TaxTermModal;

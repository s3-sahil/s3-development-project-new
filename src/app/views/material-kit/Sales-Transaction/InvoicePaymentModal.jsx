import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const InvoicePaymentModal = ({ open, onClose, onSave }) => {
    const [form, setForm] = useState({
        percentage: "",
        description: "",
        paymentMode: "",
        period: "",
    });

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (open) {
            setRows([]);
            setForm({
                percentage: "",
                description: "",
                paymentMode: "",
                period: "",
            });
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        if (!form.percentage || !form.description) return;

        setRows((prev) => [...prev, form]);

        setForm({
            percentage: "",
            description: "",
            paymentMode: "",
            period: "",
        });
    };

    const handleDelete = (index) => {
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
                    width: 900,
                    maxWidth: 900,
                },
            }}
        >
            <DialogTitle>
                Payment Terms
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
                            <TableCell>%</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Payment Mode</TableCell>
                            <TableCell>Period</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.percentage}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.paymentMode}</TableCell>
                                    <TableCell>{row.period}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No payment terms added
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* ================= Form ================= */}
                <Box mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                label="Percentage"
                                name="percentage"
                                value={form.percentage}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="">-- Select --</MenuItem>
                                <MenuItem value="Advance">Advance</MenuItem>
                                <MenuItem value="Against Delivery">
                                    Against Delivery
                                </MenuItem>
                                <MenuItem value="Credit">Credit</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Payment Mode"
                                name="paymentMode"
                                value={form.paymentMode}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="">-- Select --</MenuItem>
                                <MenuItem value="Cash">Cash</MenuItem>
                                <MenuItem value="Cheque">Cheque</MenuItem>
                                <MenuItem value="NEFT">NEFT</MenuItem>
                                <MenuItem value="RTGS">RTGS</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                label="Period (Days)"
                                name="period"
                                value={form.period}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Box mt={2} textAlign="right">
                        <Button
                            variant="contained"
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>

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

export default InvoicePaymentModal;

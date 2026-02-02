import CloseIcon from "@mui/icons-material/Close";
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
    TextField
} from "@mui/material";
import { fetchPayCondAPI } from "app/utils/authServices";
import { useEffect, useState } from "react";

const PaymentTermsModal = ({ open, onClose, onSave }) => {
    const [rows, setRows] = useState([]);
    const [payCondList, setPayCondList] = useState([]);

    const [form, setForm] = useState({
        mode: "",
        payCondition: "", // store PC_CODE
        percentage: "",
        period: "",
    });

    // ===============================
    // Load Payment Conditions
    // ===============================
    useEffect(() => {
        if (open) {
            loadPayConditions();
        }
    }, [open]);
    useEffect(() => {
        if (!form.mode) return;

        if (form.mode === "After") {
            setForm(prev => ({ ...prev, period: 30 }));
        } else if (form.mode === "Immediate") {
            setForm(prev => ({ ...prev, period: 0 }));
        } else {
            setForm(prev => ({ ...prev, period: "" }));
        }
    }, [form.mode]);

    const loadPayConditions = async () => {
        try {
            const data = await fetchPayCondAPI();
            setPayCondList(data || []);
        } catch (error) {
            console.error("Pay condition fetch failed", error);
        }
    };

    const handleAdd = () => {
        const { mode, payCondition, percentage, period } = form;

        if (!mode || !payCondition || !percentage) {
            alert("Please fill all required fields");
            return;
        }

        const selectedPayCond = payCondList.find(
            (p) => String(p.PC_CODE) === String(payCondition)
        );

        if (!selectedPayCond) {
            alert("Invalid payment condition selected");
            return;
        }

        const alreadyExists = rows.some(
            (r) => r.pay_cond === selectedPayCond.PC_CODE
        );

        if (alreadyExists) {
            alert("Payment condition already added");
            return;
        }

        setRows((prev) => [
            ...prev,
            {
                description: selectedPayCond.PCDESC,
                percentage,
                mode,
                period, // ✅ add this
                pay_cond: selectedPayCond.PC_CODE,
            },
        ]);

        setForm({
            mode: "",
            payCondition: "",
            percentage: "",
            period: "",
        });
    };


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
                sx: { width: 800, maxWidth: 800 },
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

                {/* ================= TABLE ================= */}
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Percentage</TableCell>
                            <TableCell>Mode</TableCell>
                            <TableCell>Period</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.percentage}</TableCell>
                                    <TableCell>{row.mode}</TableCell>
                                    <TableCell>{row.period}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleRemove(index)}
                                        >
                                            Remove
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

                {/* ================= FORM ================= */}
                <Box mt={3}>
                    <Grid container spacing={2}>

                        {/* Mode */}
                        <Grid item xs={12} md={2}>
                            <TextField
                                select
                                fullWidth
                                label="Mode"
                                value={form.mode}
                                onChange={(e) =>
                                    setForm({ ...form, mode: e.target.value })
                                }
                            >
                                <MenuItem value="Immediate">Immediate</MenuItem>
                                <MenuItem value="After">After</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Payment Condition */}
                        <Grid item xs={12} md={3}>
                            <TextField
                                select
                                fullWidth
                                label="Payment Condition"
                                value={form.payCondition}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        payCondition: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value="">-- Select --</MenuItem>

                                {payCondList.map((item) => (
                                    <MenuItem
                                        key={item.PC_CODE}
                                        value={item.PC_CODE}
                                    >
                                        {item.PCDESC}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Percentage */}
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                label="Percentage"
                                type="number"
                                value={form.percentage}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        percentage: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        {form.mode === "After" && (
                            <>
                                <Grid item xs={12} md={2}>
                                    <TextField
                                        fullWidth
                                        label="Period"
                                        type="number"
                                        value={form.period}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                period: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Unit"
                                        value={form.unit || "Days"}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                unit: e.target.value,
                                            })
                                        }
                                    >
                                        <MenuItem value="Days">Days</MenuItem>
                                        <MenuItem value="Months">Months</MenuItem>
                                    </TextField>
                                </Grid>
                            </>
                        )}


                        {/* Add Button */}
                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ height: 56 }}
                                onClick={handleAdd}
                            >
                                Add
                            </Button>
                        </Grid>

                    </Grid>
                </Box>

                {/* ================= FOOTER ================= */}
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

export default PaymentTermsModal;

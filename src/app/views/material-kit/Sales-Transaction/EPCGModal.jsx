import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const EPCGModal = ({ open, onClose, onSave }) => {
    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({
        epcgLicenseNo: "",
        epcgAmount: "",
        balance: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        if (!form.epcgLicenseNo || !form.epcgAmount || !form.balance) return;

        setRows([
            ...rows,
            { id: Date.now(), ...form }
        ]);

        setForm({
            epcgLicenseNo: "",
            epcgAmount: "",
            balance: ""
        });
    };

    const handleDelete = (id) => {
        setRows(rows.filter((r) => r.id !== id));
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
                EPCG Details
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>

                {/* Input Section */}
                <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr 1fr auto"
                    gap={2}
                    mb={3}
                >
                    <TextField
                        label="EPCG Licence No"
                        name="epcgLicenseNo"
                        value={form.epcgLicenseNo}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        label="EPCG Amount In Currency"
                        name="epcgAmount"
                        type="number"
                        value={form.epcgAmount}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        label="Balance"
                        name="balance"
                        type="number"
                        value={form.balance}
                        onChange={handleChange}
                        size="small"
                    />

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                        sx={{ height: "40px" }}
                    >
                        ADD
                    </Button>
                </Box>

                {/* Table Section */}
                <Paper variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell>Sr.</TableCell>
                                <TableCell>Licence No</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.epcgLicenseNo}</TableCell>
                                        <TableCell>{row.epcgAmount}</TableCell>
                                        <TableCell>{row.balance}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(row.id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No EPCG entries added
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>

            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button variant="outlined" onClick={onClose}>
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={() => onSave(rows)}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EPCGModal;
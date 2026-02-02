import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    Button,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const AdvanceAuthorizationModal = ({ open, onClose, onSave }) => {
    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({
        licenseNo: "",
        amount: "",
    });

    const handleAdd = () => {
        if (!form.licenseNo || !form.amount) return;

        setRows([
            ...rows,
            { id: Date.now(), ...form },
        ]);

        setForm({ licenseNo: "", amount: "" });
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
                Advance Authorization
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
                    gridTemplateColumns="1fr 1fr auto"
                    gap={2}
                    mb={3}
                >
                    <TextField
                        label="ADVANCE License No"
                        size="small"
                        value={form.licenseNo}
                        onChange={(e) =>
                            setForm({ ...form, licenseNo: e.target.value })
                        }
                    />

                    <TextField
                        label="ADVANCE Amount in INR"
                        size="small"
                        type="number"
                        value={form.amount}
                        onChange={(e) =>
                            setForm({ ...form, amount: e.target.value })
                        }
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
                                <TableCell>License No</TableCell>
                                <TableCell>Amount (₹)</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.licenseNo}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
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
                                    <TableCell colSpan={4} align="center">
                                        No Advance Authorization added
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>

            </DialogContent>

            <DialogActions>
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

export default AdvanceAuthorizationModal;

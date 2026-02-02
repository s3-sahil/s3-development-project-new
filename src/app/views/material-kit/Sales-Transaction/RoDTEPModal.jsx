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

const RoDTEPModal = ({ open, onClose, onSave }) => {
    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({
        hscCode: "",
        rate: "",
    });

    const handleAdd = () => {
        if (!form.hscCode || !form.rate) return;

        setRows([
            ...rows,
            { id: Date.now(), ...form },
        ]);

        setForm({ hscCode: "", rate: "" });
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
                Schedule Details
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>

                {/* ===== Input Section ===== */}
                <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr auto"
                    gap={2}
                    mb={3}
                >
                    <TextField
                        label="HSC Code"
                        size="small"
                        value={form.hscCode}
                        onChange={(e) =>
                            setForm({ ...form, hscCode: e.target.value })
                        }
                    />

                    <TextField
                        label="Rate %"
                        size="small"
                        type="number"
                        value={form.rate}
                        onChange={(e) =>
                            setForm({ ...form, rate: e.target.value })
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

                {/* ===== Table Section ===== */}
                <Paper variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#e7e7e7" }}>
                                <TableCell>Sr.</TableCell>
                                <TableCell>HSC Code</TableCell>
                                <TableCell>Rate (%)</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.hscCode}</TableCell>
                                        <TableCell>{row.rate}</TableCell>
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
                                    <TableCell
                                        colSpan={4}
                                        align="center"
                                    >
                                        No RoDTEP added
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

export default RoDTEPModal;
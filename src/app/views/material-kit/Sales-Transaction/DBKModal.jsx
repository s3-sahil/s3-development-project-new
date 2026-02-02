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

const DBKModal = ({ open, onClose, onSave }) => {
    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({
        hscCode: "",
        srNo: "",
        ratePercent: "",
        ratePerKg: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        if (
            !form.hscCode ||
            !form.srNo ||
            !form.ratePercent ||
            !form.ratePerKg
        ) return;

        setRows([
            ...rows,
            { id: Date.now(), ...form }
        ]);

        setForm({
            hscCode: "",
            srNo: "",
            ratePercent: "",
            ratePerKg: ""
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
                DBK Details
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
                    gridTemplateColumns="1fr 1fr 1fr 1fr auto"
                    gap={2}
                    mb={3}
                >
                    <TextField
                        label="HSC Code"
                        name="hscCode"
                        value={form.hscCode}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        label="DBK Sr No"
                        name="srNo"
                        value={form.srNo}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        label="Rate %"
                        name="ratePercent"
                        type="number"
                        value={form.ratePercent}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        label="Rate / KG"
                        name="ratePerKg"
                        type="number"
                        value={form.ratePerKg}
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
                                <TableCell>HSC Code</TableCell>
                                <TableCell>DBK Sr No</TableCell>
                                <TableCell>Rate %</TableCell>
                                <TableCell>Rate / KG</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.hscCode}</TableCell>
                                        <TableCell>{row.srNo}</TableCell>
                                        <TableCell>{row.ratePercent}</TableCell>
                                        <TableCell>{row.ratePerKg}</TableCell>
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
                                    <TableCell colSpan={6} align="center">
                                        No DBK entries added
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

export default DBKModal;
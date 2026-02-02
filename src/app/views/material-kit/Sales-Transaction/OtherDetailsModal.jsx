import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    MenuItem,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Paper,
    TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const initialForm = {
    modeTransport: "",
    deliveryTerm: "",
    transport: "",
    amount: "",
    buyer: "",
    insurance: "",
    packingType: "",
    packingAmount: "",
    packingPercent: "",
    traderDisc: "",
};

const OtherDetailsModal = ({ open, onClose, onSave }) => {
    const [form, setForm] = useState(initialForm);
    const [rows, setRows] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        setRows([...rows, { ...form, id: Date.now() }]);
        setForm(initialForm); // reset form
    };

    const handleDelete = (id) => {
        setRows(rows.filter((r) => r.id !== id));
    };

    const cell = (width) => ({
        width,
        minWidth: width,
        maxWidth: width,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: 13,
        fontWeight: 500,
    });

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
            <DialogTitle>Other Details</DialogTitle>

            <DialogContent dividers>
                {/* FORM */}
                {/* FORM */}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Mode of Transport"
                            name="modeTransport"
                            value={form.modeTransport}
                            onChange={handleChange}
                        >
                            {["ByRoad", "ByAir", "BySea", "ByHand", "ByCourier"].map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Delivery Term"
                            name="deliveryTerm"
                            value={form.deliveryTerm}
                            onChange={handleChange}
                        >
                            {["FOB", "CIF", "EXW", "FCA", "FAS", "CFR", "DD", "DOU", "DOP", "CPT", "DAI", "DAB", "FOR"].map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Transport"
                            name="transport"
                            value={form.transport}
                            onChange={handleChange}
                        >
                            {["N.A", "OUR A/C", "YOUR A/C"].map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Amount"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Insurance"
                            name="insurance"
                            value={form.insurance}
                            onChange={handleChange}
                        >
                            {["N.A", "OUR A/C", "YOUR A/C"].map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Buyer"
                            name="buyer"
                            value={form.buyer}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Packing Type"
                            name="packingType"
                            value={form.packingType}
                            onChange={handleChange}
                        >
                            {["Not Applicable", "As Actual", "Your Account", "In"].map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Packing Amount"
                            name="packingAmount"
                            value={form.packingAmount}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Packing %"
                            name="packingPercent"
                            value={form.packingPercent}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Trader Disc %"
                            name="traderDisc"
                            value={form.traderDisc}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleAdd}>
                            Add
                        </Button>
                    </Grid>
                </Grid>


                {/* TABLE */}
                <TableContainer
                    component={Paper}
                    sx={{
                        mt: 3,
                        maxWidth: "100%",
                        overflowX: "auto",
                    }}
                >
                    <Table
                        sx={{
                            tableLayout: "fixed",
                            minWidth: 1300,
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {[
                                    "#",
                                    "Mode Transport",
                                    "Delivery Term",
                                    "Transport",
                                    "Amount",
                                    "Buyer",
                                    "Insurance",
                                    "Packing Type",
                                    "Packing Amt",
                                    "Packing %",
                                    "Trader Disc %",
                                    "Action",
                                ].map((head) => (
                                    <TableCell
                                        key={head}
                                        sx={{
                                            whiteSpace: "nowrap",
                                            fontWeight: 600,
                                            backgroundColor: "#f5f5f5",
                                        }}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {rows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={12} align="center">
                                        No data
                                    </TableCell>
                                </TableRow>
                            )}

                            {rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={cell(60)}>{row.modeTransport}</TableCell>
                                    <TableCell sx={cell(60)}>{row.deliveryTerm}</TableCell>
                                    <TableCell sx={cell(60)}>{row.transport}</TableCell>
                                    <TableCell sx={cell(60)}>{row.amount}</TableCell>
                                    <TableCell sx={cell(60)}>{row.buyer}</TableCell>
                                    <TableCell sx={cell(60)}>{row.insurance}</TableCell>
                                    <TableCell sx={cell(60)}>{row.packingType}</TableCell>
                                    <TableCell sx={cell(60)}>{row.packingAmount}</TableCell>
                                    <TableCell sx={cell(60)}>{row.packingPercent}</TableCell>
                                    <TableCell sx={cell(60)}>{row.traderDisc}</TableCell>
                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleDelete(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSave(rows)}
                >
                    Save
                </Button>
                <Button variant="outlined" onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OtherDetailsModal;

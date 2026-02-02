import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    Typography,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const InvoiceGSTDetailsModal = ({ open, handleClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        gstNo: "",
        gstType: "",
        placeOfSupply: "",
        reverseCharge: "",
        gstRate: "",
        cgstAmt: "",
        sgstAmt: "",
        igstAmt: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ color: "#6C2BD9", fontWeight: 600 }}>
                GST Details
                <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 10, top: 10 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="GST No"
                            name="gstNo"
                            value={formData.gstNo}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="GST Type"
                            name="gstType"
                            value={formData.gstType}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Place Of Supply"
                            name="placeOfSupply"
                            value={formData.placeOfSupply}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Reverse Charge"
                            name="reverseCharge"
                            value={formData.reverseCharge}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="GST Rate (%)"
                            name="gstRate"
                            value={formData.gstRate}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="CGST Amount"
                            name="cgstAmt"
                            value={formData.cgstAmt}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="SGST Amount"
                            name="sgstAmt"
                            value={formData.sgstAmt}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="IGST Amount"
                            name="igstAmt"
                            value={formData.igstAmt}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{ backgroundColor: "#9CA3AF" }}
                >
                    Close
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ backgroundColor: "#6C2BD9" }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InvoiceGSTDetailsModal;

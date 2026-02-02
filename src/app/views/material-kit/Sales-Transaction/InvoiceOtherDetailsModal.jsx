import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Typography,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const InvoiceOtherDetailsModal = ({ open, handleClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        insurance: "N.A",
        deliveryTerm: "",
        labReport: ""
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
                Other Details
                <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 10, top: 10 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Insurance</Typography>
                        <FormControl>
                            <RadioGroup
                                row
                                name="insurance"
                                value={formData.insurance}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Our A/c" control={<Radio />} label="Our A/c" />
                                <FormControlLabel value="Your A/c" control={<Radio />} label="Your A/c" />
                                <FormControlLabel value="N.A" control={<Radio />} label="N.A" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Delivery Term"
                            name="deliveryTerm"
                            value={formData.deliveryTerm}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Lab Report"
                            name="labReport"
                            value={formData.labReport}
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

export default InvoiceOtherDetailsModal;

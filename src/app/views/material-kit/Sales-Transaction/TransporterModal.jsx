import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    MenuItem,
    IconButton,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const TransporterModal = ({ open, onClose, onSave }) => {
    const [state, setState] = useState({
        transporterOn: "Our A/c",
        transporterCode: "",
        transportMode: "By Road",
        vehicleNo: "",
        packFwdAmt: "",
        ewayBillNo: "",
    });

    useEffect(() => {
        if (!open) return;
        setState({
            transporterOn: "Our A/c",
            transporterCode: "",
            transportMode: "By Road",
            vehicleNo: "",
            packFwdAmt: "",
            ewayBillNo: "",
        });
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSave = () => {
        onSave(state);
        onClose();
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
                Transporter Details
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 10, top: 10 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={3}>
                    <RadioGroup
                        row
                        name="transporterOn"
                        value={state.transporterOn}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Our A/c" control={<Radio />} label="Our A/c" />
                        <FormControlLabel value="Your A/c" control={<Radio />} label="Your A/c" />
                        <FormControlLabel value="N.A" control={<Radio />} label="N.A" />
                    </RadioGroup>

                    <TextField
                        fullWidth
                        size="small"
                        label="Transporter Code"
                        name="transporterCode"
                        value={state.transporterCode}
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        fullWidth
                        size="small"
                        label="Transport Mode"
                        name="transportMode"
                        value={state.transportMode}
                        onChange={handleChange}
                    >
                        <MenuItem value="By Road">By Road</MenuItem>
                        <MenuItem value="By Air">By Air</MenuItem>
                        <MenuItem value="By Rail">By Rail</MenuItem>
                        <MenuItem value="By Sea">By Sea</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        size="small"
                        label="Vehicle No"
                        name="vehicleNo"
                        value={state.vehicleNo}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        size="small"
                        label="Pack Fwd Amt"
                        name="packFwdAmt"
                        type="number"
                        value={state.packFwdAmt}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        size="small"
                        label="Eway Bill Number"
                        name="ewayBillNo"
                        value={state.ewayBillNo}
                        onChange={handleChange}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
                <Button variant="outlined" onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TransporterModal;

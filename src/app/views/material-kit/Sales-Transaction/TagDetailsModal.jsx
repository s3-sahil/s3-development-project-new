import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material";
import { useState } from "react";

const TagDetailsModal = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        invNo: "",
        invDate: "",
        itemCode: "",
        packingType: "",
        qtyPerPack: "",
        packQty: "",
        wtPerBox: "",
        tBoxNo: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({
            invNo: "",
            invDate: "",
            itemCode: "",
            packingType: "",
            qtyPerPack: "",
            packQty: "",
            wtPerBox: "",
            tBoxNo: ""
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Tag Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField label="Invoice No" name="invNo" value={formData.invNo} onChange={handleChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="date" label="Invoice Date" name="invDate" value={formData.invDate} onChange={handleChange} fullWidth size="small" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Packing Type" name="packingType" value={formData.packingType} onChange={handleChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Qty Per Pack" name="qtyPerPack" value={formData.qtyPerPack} onChange={handleChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Pack Qty" name="packQty" value={formData.packQty} onChange={handleChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Weight Per Box" name="wtPerBox" value={formData.wtPerBox} onChange={handleChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Total Box No" name="tBoxNo" value={formData.tBoxNo} onChange={handleChange} fullWidth size="small" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary" variant="contained">Add</Button>
            </DialogActions>
        </Dialog>
    );
};
export default TagDetailsModal;
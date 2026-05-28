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
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const InvoiceOtherDetailsModal = ({ open, handleClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    hsnCode: "",
    description: "",
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
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth
     PaperProps={{
                sx: { width: 800, maxWidth: 800 },
            }}>
      <DialogTitle sx={{ color: "#800080", fontWeight: 600 }}>
        Other Details
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Inner Box like old UI panel */}
        <Box
          sx={{
            border: "1px solid #999",
            padding: 2,
            marginTop: 1
          }}
        >
          <Grid container spacing={2} alignItems="center">

            {/* HSN Code */}
            <Grid item xs={12} md={6}>
              <Typography>1) HSN Code</Typography>
              <TextField
                size="small"
                fullWidth
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleChange}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12} md={6}>
              <Typography>Actuator Permanent Assembly</Typography>
              <TextField
                size="small"
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            {/* Insurance */}
            <Grid item xs={12}>
              <Typography>2) Insurance</Typography>
              <FormControl>
                <RadioGroup
                  row
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Our A/c" control={<Radio size="small" />} label="Our A/c" />
                  <FormControlLabel value="Your A/c" control={<Radio size="small" />} label="Your A/c" />
                  <FormControlLabel value="N.A" control={<Radio size="small" />} label="N.A" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Delivery Term */}
            <Grid item xs={6}>
              <Typography>3) Delivery Term</Typography>
              <TextField
                size="small"
                fullWidth
                name="deliveryTerm"
                value={formData.deliveryTerm}
                onChange={handleChange}
              />
            </Grid>

            {/* Lab Report */}
            <Grid item xs={6}>
              <Typography>6) Lab Report</Typography>
              <TextField
                size="small"
                fullWidth
                name="labReport"
                value={formData.labReport}
                onChange={handleChange}
              />
            </Grid>

          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceOtherDetailsModal;
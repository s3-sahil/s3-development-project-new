import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const InvoiceOtherModal = ({ open, onClose, onSave }) => {
  const [state, setState] = useState({
    hsnCode: "",
    description: "",
    insurance: "N.A",
    deliveryTerm: "",
    labReport: "",
  });

  useEffect(() => {
    if (!open) return;
    setState({
      hsnCode: "84149090",
      description: "Actuator Permanent Assembly",
      insurance: "N.A",
      deliveryTerm: "",
      labReport: "",
    });
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(state);
    onClose();
  };

  // compact ERP-style fields
  const smallField = {
    size: "small",
    fullWidth: true,
    sx: {
      "& .MuiInputBase-root": { height: 28 },
      "& input": { padding: "4px 8px", fontSize: 12 },
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogTitle sx={{ fontSize: 13, p: 1 }}>
        Other Details
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 5, top: 5 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 1 }}>
        <Box sx={{ border: "1px solid #999", p: 1 }}>
          {/* HSN Code */}
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={3}>
              <Typography fontSize={12}>1) HSN Code</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="hsnCode"
                value={state.hsnCode}
                onChange={handleChange}
                {...smallField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="description"
                value={state.description}
                onChange={handleChange}
                {...smallField}
              />
            </Grid>
          </Grid>

          {/* Insurance */}
          <Grid container spacing={1} alignItems="center" mt={0.5}>
            <Grid item xs={3}>
              <Typography fontSize={12}>2) Insurance</Typography>
            </Grid>
            <Grid item xs={9}>
              <RadioGroup
                row
                name="insurance"
                value={state.insurance}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Our A/c"
                  control={<Radio size="small" />}
                  label={<Typography fontSize={12}>Our A/c</Typography>}
                />
                <FormControlLabel
                  value="Your A/c"
                  control={<Radio size="small" />}
                  label={<Typography fontSize={12}>Your A/c</Typography>}
                />
                <FormControlLabel
                  value="N.A"
                  control={<Radio size="small" />}
                  label={<Typography fontSize={12}>N.A</Typography>}
                />
              </RadioGroup>
            </Grid>
          </Grid>

          {/* Delivery Term */}
          <Grid container spacing={1} alignItems="center" mt={0.5}>
            <Grid item xs={3}>
              <Typography fontSize={12}>3) Delivery Term</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                name="deliveryTerm"
                value={state.deliveryTerm}
                onChange={handleChange}
                {...smallField}
              />
            </Grid>
          </Grid>

          {/* Lab Report */}
          <Grid container spacing={1} alignItems="center" mt={0.5}>
            <Grid item xs={3}>
              <Typography fontSize={12}>6) Lab Report</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                name="labReport"
                value={state.labReport}
                onChange={handleChange}
                {...smallField}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 1 }}>
        <Button variant="contained" size="small" onClick={handleSave}>
          OK
        </Button>
        <Button variant="outlined" size="small" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceOtherModal;
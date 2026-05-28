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
  Grid,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const InvoiceTransporterModal = ({ open, onClose, onSave }) => {
  const [state, setState] = useState({
    transporterOn: "Our A/c",
    transporterCode: "",
    transportMode: "By Road",
    gstNo: "",
    vehicleNo: "",
    route: "",
    tripNo: "",
    transportAmt: "",
    otherCharges: "",
    lrNo: "",
    lrDate: "",
    ewayBillNo: "",
    ewayBillDate: "",
  });

  useEffect(() => {
    if (!open) return;
    setState({
      transporterOn: "Our A/c",
      transporterCode: "",
      transportMode: "By Road",
      gstNo: "",
      vehicleNo: "",
      route: "",
      tripNo: "",
      transportAmt: "",
      otherCharges: "",
      lrNo: "",
      lrDate: "",
      ewayBillNo: "",
      ewayBillDate: "",
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

  const smallField = {
    size: "small",
    fullWidth: true,
    sx: {
      "& .MuiInputBase-root": { height: 28 },
      "& input": { padding: "4px 8px" },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{ sx: { width: 700 } }}
    >
      <DialogTitle sx={{ fontSize: 14, p: 1 }}>
        Transport Details
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 5, top: 5 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 1 }}>
        <Box sx={{ border: "1px solid #999", p: 1 }}>
          {/* Transporter On */}
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={4}>
              <Typography fontSize={13}>Transporter On</Typography>
            </Grid>
            <Grid item xs={8}>
              <RadioGroup
                row
                name="transporterOn"
                value={state.transporterOn}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Our A/c"
                  control={<Radio size="small" />}
                  label="Our A/c"
                />
                <FormControlLabel
                  value="Your A/c"
                  control={<Radio size="small" />}
                  label="Your A/c"
                />
                <FormControlLabel
                  value="N.A"
                  control={<Radio size="small" />}
                  label="N.A"
                />
              </RadioGroup>
            </Grid>
          </Grid>

          {/* Row 1 */}
          <Grid container spacing={1} mt={0.5}>
            <Grid item xs={4}>
              <Typography fontSize={12}>Transporter & Mode</Typography>
              <TextField
                {...smallField}
                name="transporterCode"
                value={state.transporterCode}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography fontSize={12}>&nbsp;</Typography>
              <TextField
                select
                {...smallField}
                name="transportMode"
                value={state.transportMode}
                onChange={handleChange}
              >
                <MenuItem value="By Road">By Road</MenuItem>
                <MenuItem value="By Air">By Air</MenuItem>
                <MenuItem value="By Rail">By Rail</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <Typography fontSize={12}>GST No.</Typography>
              <TextField
                {...smallField}
                name="gstNo"
                value={state.gstNo}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Row 2 */}
          <Grid container spacing={1} mt={0.5}>
            <Grid item xs={4}>
              <Typography fontSize={12}>Vehicle No & Type</Typography>
              <TextField
                {...smallField}
                name="vehicleNo"
                value={state.vehicleNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography fontSize={12}>&nbsp;</Typography>
              <TextField
                select
                {...smallField}
                name="vehicleType"
                value={state.vehicleType || ""}
                onChange={handleChange}
              >
                <MenuItem value="Truck">Truck</MenuItem>
                <MenuItem value="Tempo">Tempo</MenuItem>
                <MenuItem value="Container">Container</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Typography fontSize={12}>Route</Typography>
              <TextField
                select
                {...smallField}
                name="route"
                value={state.route}
                onChange={handleChange}
              >
                <MenuItem value="Route1">Route 1</MenuItem>
                <MenuItem value="Route2">Route 2</MenuItem>
                <MenuItem value="Route3">Route 3</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <Typography fontSize={12}>Trip No.</Typography>
              <TextField
                {...smallField}
                name="tripNo"
                value={state.tripNo}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Row 3 */}
          <Grid container spacing={1} mt={0.5}>
            <Grid item xs={4}>
              <Typography fontSize={12}>Transport Amt.</Typography>
              <TextField
                {...smallField}
                name="transportAmt"
                value={state.transportAmt}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography fontSize={12}>Other Charges</Typography>
              <TextField
                {...smallField}
                name="otherCharges"
                value={state.otherCharges}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Row 4 */}
          <Grid container spacing={1} mt={0.5}>
            <Grid item xs={4}>
              <Typography fontSize={12}>LR No</Typography>
              <TextField
                {...smallField}
                name="lrNo"
                value={state.lrNo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography fontSize={12}>LR Date</Typography>
              <TextField
                {...smallField}
                type="date"
                name="lrDate"
                value={state.lrDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          {/* Row 5 */}
          <Grid container spacing={1} mt={0.5}>
            <Grid item xs={4}>
              <Typography fontSize={12}>Eway Bill No</Typography>
              <TextField
                {...smallField}
                name="ewayBillNo"
                value={state.ewayBillNo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography fontSize={12}>Eway Bill Date</Typography>
              <TextField
                {...smallField}
                type="date"
                name="ewayBillDate"
                value={state.ewayBillDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 1 }}>
        <Button variant="contained" size="small" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" size="small" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceTransporterModal;

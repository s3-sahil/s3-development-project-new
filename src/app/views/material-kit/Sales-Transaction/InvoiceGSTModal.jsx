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
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const InvoiceGSTModal = ({ open, onClose, onSave }) => {
  const [state, setState] = useState({
    issueDate: "",
    issueTime: "",
    removalDate: "",
    removalTime: "",
    natureOfRemoval: "",
    packingDetails: "",
    packingWeight: "",
    customerMatAmt: "",
  });

  useEffect(() => {
    if (!open) return;
    setState({
      issueDate: "",
      issueTime: "",
      removalDate: "",
      removalTime: "",
      natureOfRemoval: "",
      packingDetails: "",
      packingWeight: "",
      customerMatAmt: "",
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

  // compact style like old UI
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
      PaperProps={{ sx: { width: 600 } }}
    >
      <DialogTitle sx={{ fontSize: 14, p: 1 }}>
        GST Details
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 5, top: 5 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 1 }}>
        <Box sx={{ border: "1px solid #999", p: 1 }}>
          {/* Row 1 */}
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
              <Typography fontSize={12}>
                Issue Date & Issue Time
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    name="issueDate"
                    value={state.issueDate}
                    onChange={handleChange}
                    {...smallField}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="time"
                    name="issueTime"
                    value={state.issueTime}
                    onChange={handleChange}
                    {...smallField}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography fontSize={12}>
                Removal Date & Removal Time
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    name="removalDate"
                    value={state.removalDate}
                    onChange={handleChange}
                    {...smallField}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="time"
                    name="removalTime"
                    value={state.removalTime}
                    onChange={handleChange}
                    {...smallField}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Row 2 */}
          <Grid container spacing={1} mt={0.5}>
            <Grid item xs={12}>
              <Typography fontSize={12}>Nature of Removal</Typography>
              <TextField
                select
                name="natureOfRemoval"
                value={state.natureOfRemoval}
                onChange={handleChange}
                {...smallField}
              >
                <MenuItem value="Independent Buyer">
                  Independent Buyer
                </MenuItem>
                <MenuItem value="Job Work">Job Work</MenuItem>
                <MenuItem value="Export">Export</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Row 3 */}
          <Grid container spacing={1} mt={0.5}>
            <Grid item xs={12}>
              <Typography fontSize={12}>Packing Details</Typography>
              <TextField
                name="packingDetails"
                value={state.packingDetails}
                onChange={handleChange}
                {...smallField}
              />
            </Grid>
          </Grid>

          {/* Row 4 */}
          <Grid container spacing={1} mt={0.5}>
            <Grid item xs={6}>
              <Typography fontSize={12}>Packing Weight</Typography>
              <TextField
                name="packingWeight"
                value={state.packingWeight}
                onChange={handleChange}
                {...smallField}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography fontSize={12}>Customer Mat. Amt.</Typography>
              <TextField
                name="customerMatAmt"
                value={state.customerMatAmt}
                onChange={handleChange}
                {...smallField}
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

export default InvoiceGSTModal;
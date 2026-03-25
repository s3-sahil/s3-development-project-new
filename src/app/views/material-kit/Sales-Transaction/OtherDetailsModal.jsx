import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const OtherDetailsModal = ({ open, onClose, onSave }) => {
  const [state, setState] = useState({
    transporterName: "",
    mode: "By Road",
    deliveryTerm: "ExW",
    transport: "Our A/c",
    insurance: "Our A/c",
    buyer: "",
    amount: "",
    globalDisc: "",
    packingType: "Inclusive",
    packingAmt: "",
    packingPer: "",
    traderDisc: "",
    otherTerms: "",
    deliveryRemark: "",
    warrantyApplicable: false,
    warrantyPeriod: "",
    warrantyUnit: "",
    warrantyExtra: "",
    warrantyType: "",
    warrantyClause: "",
    advanceAmt: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    onSave(state);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: { width: 800, maxWidth: 800 },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Others
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={1} alignItems="center">
          {/* Transporter Name */}
          <Grid item xs={3}>
            <Typography>Transporter Name :</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              name="transporterName"
              value={state.transporterName}
              onChange={handleChange}
            />
          </Grid>

          {/* Mode */}
          <Grid item xs={3}>
            <Typography>Mode of Transport :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              size="small"
              name="mode"
              value={state.mode}
              onChange={handleChange}
            >
              <MenuItem value="By Road">By Road</MenuItem>
              <MenuItem value="By Air">By Air</MenuItem>
            </TextField>
          </Grid>

          {/* Delivery Term */}
          <Grid item xs={3}>
            <Typography>Delivery Term :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              size="small"
              name="deliveryTerm"
              value={state.deliveryTerm}
              onChange={handleChange}
            >
              <MenuItem value="ExW">ExW</MenuItem>
              <MenuItem value="FOB">FOB</MenuItem>
            </TextField>
          </Grid>

          {/* Transport */}
          <Grid item xs={3}>
            <Typography>1) Transport :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              size="small"
              name="transport"
              value={state.transport}
              onChange={handleChange}
            >
              <MenuItem value="Our A/c">Our A/c</MenuItem>
              <MenuItem value="Your A/c">Your A/c</MenuItem>
            </TextField>
          </Grid>

          {/* Amount */}
          <Grid item xs={3}>
            <Typography>Amount :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              name="amount"
              value={state.amount}
              onChange={handleChange}
            />
          </Grid>

          {/* Insurance */}
          <Grid item xs={3}>
            <Typography>2) Insurance :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              size="small"
              name="insurance"
              value={state.insurance}
              onChange={handleChange}
            >
              <MenuItem value="Our A/c">Our A/c</MenuItem>
              <MenuItem value="Your A/c">Your A/c</MenuItem>
            </TextField>
          </Grid>

          {/* Buyer */}
          <Grid item xs={3}>
            <Typography>Buyer :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              name="buyer"
              value={state.buyer}
              onChange={handleChange}
            />
          </Grid>

          {/* Discount */}
          <Grid item xs={3}>
            <Typography>3) Global Discount % :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              name="globalDisc"
              value={state.globalDisc}
              onChange={handleChange}
            />
          </Grid>

          {/* Packing Type */}
          <Grid item xs={3}>
            <Typography>4) Packing Type :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              size="small"
              name="packingType"
              value={state.packingType}
              onChange={handleChange}
            >
              <MenuItem value="Inclusive">Inclusive</MenuItem>
              <MenuItem value="Exclusive">Exclusive</MenuItem>
            </TextField>
          </Grid>

          {/* Packing */}
          <Grid item xs={3}>
            <Typography>5) Packing Amt & % :</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              size="small"
              fullWidth
              name="packingAmt"
              value={state.packingAmt}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              size="small"
              fullWidth
              name="packingPer"
              value={state.packingPer}
              onChange={handleChange}
            />
          </Grid>

          {/* Trader Discount */}
          <Grid item xs={3}>
            <Typography>6) Trader Disc % :</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              name="traderDisc"
              value={state.traderDisc}
              onChange={handleChange}
            />
          </Grid>

          {/* Other Terms */}
          <Grid item xs={3}>
            <Typography>7) Other Payment Terms :</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              multiline
              rows={3}
              fullWidth
              size="small"
              name="otherTerms"
              value={state.otherTerms}
              onChange={handleChange}
            />
          </Grid>

          {/* Delivery Remark */}
          <Grid item xs={3}>
            <Typography>8) Delivery Remark :</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              name="deliveryRemark"
              value={state.deliveryRemark}
              onChange={handleChange}
            />
          </Grid>

          {/* Warranty */}
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="warrantyApplicable"
                  checked={state.warrantyApplicable}
                  onChange={handleChange}
                />
              }
              label="Warranty Applicable"
            />
          </Grid>

          {state.warrantyApplicable && (
            <>
              <Grid item xs={2}>
                <TextField
                  size="small"
                  fullWidth
                  label="Period"
                  name="warrantyPeriod"
                  value={state.warrantyPeriod}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  label="Unit"
                  name="warrantyUnit"
                  value={state.warrantyUnit}
                  onChange={handleChange}
                >
                  <MenuItem value="Days">Days</MenuItem>
                  <MenuItem value="Months">Months</MenuItem>
                  <MenuItem value="Years">Years</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  size="small"
                  fullWidth
                  label="Extra"
                  name="warrantyExtra"
                  value={state.warrantyExtra}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  label="Type"
                  name="warrantyType"
                  value={state.warrantyType}
                  onChange={handleChange}
                >
                  <MenuItem value="Full">Full</MenuItem>
                  <MenuItem value="Partial">Partial</MenuItem>
                </TextField>
              </Grid>
            </>
          )}

          {/* Warranty Clause */}
          <Grid item xs={3}>
            <Typography>Warranty Clause :</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              name="warrantyClause"
              value={state.warrantyClause}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <br/>
        <Grid item xs={3}>
          <Typography>Advance Amt :</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            size="small"
            name="advanceAmt"
            value={state.advanceAmt}
            onChange={handleChange}
          />
        </Grid>

        {/* Buttons */}
        <Grid container justifyContent="flex-end" mt={3} spacing={2}>
          <Grid item>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default OtherDetailsModal;

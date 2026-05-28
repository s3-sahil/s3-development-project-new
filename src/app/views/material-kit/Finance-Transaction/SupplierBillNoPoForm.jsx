import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function SupplierBillNoPoForm() {
  const [formData, setFormData] = useState({
    billType: "Other",
    supplierCode: "",
    party: "",
    docNo: "",
    docDate: "",
    billAmount: "",
    tdsAmount: "",
    stateSupply: "",
    narration: "",
    invoiceNo: "",
    invoiceDate: "",
    dueDate: "",
    basicAmt: "",
    sgstAmt: "",
    cgstAmt: "",
    igstAmt: "",
    custDuty: "",
    custDutyCess: "",
    tcs: "",
    gstType: "SAC",
    gstAmount: "",
    rcmBill: false,
  });

  const handleChange = (field) => (event) => {
    const value =
      field === "rcmBill" ? event.target.checked : event.target.value;

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Container maxWidth="lg">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "Finance" }, { name: "Supplier Bills" }]}
        />
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          background: "#f7f7f7",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Supplier Bills (NO PO)
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Bill Type */}
          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Bill Type"
              fullWidth
              size="small"
              value={formData.billType}
              onChange={handleChange("billType")}
            >
              <MenuItem value="Other">Other</MenuItem>
              <MenuItem value="Purchase">Purchase</MenuItem>
            </TextField>
          </Grid>

          {/* Party */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Party"
              fullWidth
              size="small"
              value={formData.party}
              onChange={handleChange("party")}
            />
          </Grid>

          {/* Supplier Code */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Supplier Code"
              fullWidth
              size="small"
              value={formData.supplierCode}
              onChange={handleChange("supplierCode")}
            />
          </Grid>

          {/* RCM Bill */}
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.rcmBill}
                  onChange={handleChange("rcmBill")}
                />
              }
              label="RCM BILL"
            />
          </Grid>

          {/* Doc No */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Doc No"
              fullWidth
              size="small"
              value={formData.docNo}
              onChange={handleChange("docNo")}
            />
          </Grid>

          {/* Doc Date */}
          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              label="Doc Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formData.docDate}
              onChange={handleChange("docDate")}
            />
          </Grid>

          {/* Bill Amount */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Bill Amount"
              fullWidth
              size="small"
              value={formData.billAmount}
              onChange={handleChange("billAmount")}
            />
          </Grid>

          {/* TDS Amount */}
          <Grid item xs={12} md={3}>
            <TextField
              label="TDS Appl. Amt"
              fullWidth
              size="small"
              value={formData.tdsAmount}
              onChange={handleChange("tdsAmount")}
            />
          </Grid>

          {/* GST Type */}
          <Grid item xs={12}>
            <RadioGroup
              row
              value={formData.gstType}
              onChange={handleChange("gstType")}
            >
              <FormControlLabel value="NA" control={<Radio />} label="N.A" />
              <FormControlLabel value="HSN" control={<Radio />} label="HSN" />
              <FormControlLabel value="SAC" control={<Radio />} label="SAC" />
            </RadioGroup>
          </Grid>

          {/* State Supply */}
          <Grid item xs={12} md={6}>
            <TextField
              label="State of Supply"
              fullWidth
              size="small"
              value={formData.stateSupply}
              onChange={handleChange("stateSupply")}
            />
          </Grid>

          {/* GST Amount */}
          <Grid item xs={12} md={3}>
            <TextField
              label="GST Appl. Amt"
              fullWidth
              size="small"
              value={formData.gstAmount}
              onChange={handleChange("gstAmount")}
            />
          </Grid>

          {/* Narration */}
          <Grid item xs={12}>
            <TextField
              label="Narration"
              fullWidth
              multiline
              rows={2}
              size="small"
              value={formData.narration}
              onChange={handleChange("narration")}
            />
          </Grid>

          {/* Invoice No */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Invoice No"
              fullWidth
              size="small"
              value={formData.invoiceNo}
              onChange={handleChange("invoiceNo")}
            />
          </Grid>

          {/* Invoice Date */}
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              label="Invoice Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formData.invoiceDate}
              onChange={handleChange("invoiceDate")}
            />
          </Grid>

          {/* Due Date */}
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              label="Due Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formData.dueDate}
              onChange={handleChange("dueDate")}
            />
          </Grid>

          {/* Amount Fields */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Basic Amt"
              fullWidth
              size="small"
              value={formData.basicAmt}
              onChange={handleChange("basicAmt")}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="SGST Amt"
              fullWidth
              size="small"
              value={formData.sgstAmt}
              onChange={handleChange("sgstAmt")}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="CGST Amt"
              fullWidth
              size="small"
              value={formData.cgstAmt}
              onChange={handleChange("cgstAmt")}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="IGST Amt"
              fullWidth
              size="small"
              value={formData.igstAmt}
              onChange={handleChange("igstAmt")}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Cust Duty"
              fullWidth
              size="small"
              value={formData.custDuty}
              onChange={handleChange("custDuty")}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Cust Duty Cess"
              fullWidth
              size="small"
              value={formData.custDutyCess}
              onChange={handleChange("custDutyCess")}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="TCS"
              fullWidth
              size="small"
              value={formData.tcs}
              onChange={handleChange("tcs")}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" startIcon={<Icon>refresh</Icon>}>
            Reset
          </Button>

          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

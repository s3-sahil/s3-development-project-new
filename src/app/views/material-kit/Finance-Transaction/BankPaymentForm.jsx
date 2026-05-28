import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Breadcrumb } from "app/components";

import { useState } from "react";

export default function BankPaymentForm() {
  const [formData, setFormData] = useState({
    paymentType: "",
    type: "Supplier",
    partyCode: "",
    voucherNo: "",
    voucherDate: "",
    bankCode: "",
    chequeAmt: "",
    payType: "",
    chequeNo: "",
    chequeDate: "",
    narration: "",
    inFavour: "",
    enterVoucher: "",
    billNo: "",
    billDate: "",
    missingVoucher: false,
    predefinedNarration: false,
  });

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "Finance" }, { name: "Bank Payment" }]}
        />
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Bank Payment
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Payment Type */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Payment Type"
              fullWidth
              size="small"
              value={formData.paymentType}
              onChange={handleChange("paymentType")}
            />
          </Grid>

          {/* Type */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Type"
              fullWidth
              size="small"
              value={formData.type}
              onChange={handleChange("type")}
            >
              <MenuItem value="Supplier">Supplier</MenuItem>

              <MenuItem value="Customer">Customer</MenuItem>
            </TextField>
          </Grid>

          {/* Missing Voucher */}
          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.missingVoucher}
                  onChange={handleChange("missingVoucher")}
                />
              }
              label="Missing Voucher"
            />
          </Grid>

          {/* Party Code */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Party Code"
              fullWidth
              size="small"
              value={formData.partyCode}
              onChange={handleChange("partyCode")}
            />
          </Grid>

          {/* Voucher No */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Voucher No"
              fullWidth
              size="small"
              value={formData.voucherNo}
              onChange={handleChange("voucherNo")}
            />
          </Grid>

          {/* Voucher Date */}
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              label="Voucher Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formData.voucherDate}
              onChange={handleChange("voucherDate")}
            />
          </Grid>

          {/* Bank Code */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Bank Code"
              fullWidth
              size="small"
              value={formData.bankCode}
              onChange={handleChange("bankCode")}
            />
          </Grid>

          {/* Cheque Amount */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Cheque Amt"
              fullWidth
              size="small"
              value={formData.chequeAmt}
              onChange={handleChange("chequeAmt")}
            />
          </Grid>

          {/* Pay Type */}
          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Pay Type"
              fullWidth
              size="small"
              value={formData.payType}
              onChange={handleChange("payType")}
            >
              <MenuItem value="Cash">Cash</MenuItem>

              <MenuItem value="Cheque">Cheque</MenuItem>

              <MenuItem value="Online">Online</MenuItem>
            </TextField>
          </Grid>

          {/* Bank Balance */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="primary" mt={1}>
              Bank Balance : 0
            </Typography>
          </Grid>

          {/* Cheque No */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Cheque No"
              fullWidth
              size="small"
              value={formData.chequeNo}
              onChange={handleChange("chequeNo")}
            />
          </Grid>

          {/* Cheque Date */}
          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              label="Cheque Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formData.chequeDate}
              onChange={handleChange("chequeDate")}
            />
          </Grid>

          {/* In Favour */}
          <Grid item xs={12} md={3}>
            <TextField
              label="In Favour"
              fullWidth
              size="small"
              value={formData.inFavour}
              onChange={handleChange("inFavour")}
            />
          </Grid>

          {/* Enter Voucher */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Enter Voucher/Inv No"
              fullWidth
              size="small"
              value={formData.enterVoucher}
              onChange={handleChange("enterVoucher")}
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

          {/* Predefined Narration */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.predefinedNarration}
                  onChange={handleChange("predefinedNarration")}
                />
              }
              label="Predefined Narration"
            />
          </Grid>

          {/* Bill No */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Bill No"
              fullWidth
              size="small"
              value={formData.billNo}
              onChange={handleChange("billNo")}
            />
          </Grid>

          {/* Bill Date */}
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              label="Bill Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formData.billDate}
              onChange={handleChange("billDate")}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined">Reset</Button>

          <Button variant="contained">Save</Button>
        </Box>
      </Paper>
    </Container>
  );
}

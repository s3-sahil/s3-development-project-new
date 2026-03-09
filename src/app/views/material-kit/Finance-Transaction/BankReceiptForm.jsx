import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function BankReceiptForm() {
  const [formData, setFormData] = useState({
    receiptType: "",
    customerCode: "",
    voucherNo: "",
    voucherDate: "",
    bankCode: "",
    chequeAmt: "",
    chequeType: "",
    chequeNo: "",
    chequeDate: "",
    custBank: "",
    narration: "",
    invoiceNo: "",
    missingVoucher: false,
    predefinedNarration: false,
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckbox = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.checked });

  const handleAdd = () => {
    if (formData.voucherNo && formData.bankCode) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        receiptType: "",
        customerCode: "",
        voucherNo: "",
        voucherDate: "",
        bankCode: "",
        chequeAmt: "",
        chequeType: "",
        chequeNo: "",
        chequeDate: "",
        custBank: "",
        narration: "",
        invoiceNo: "",
        missingVoucher: false,
        predefinedNarration: false,
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Bank Requests" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Bank Request</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Receipt Type" size="small" fullWidth value={formData.receiptType} onChange={handleChange("receiptType")} /></Grid>
          <Grid item xs={6}><TextField label="Customer Code" size="small" fullWidth value={formData.customerCode} onChange={handleChange("customerCode")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher No" size="small" fullWidth value={formData.voucherNo} onChange={handleChange("voucherNo")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher Date" size="small" fullWidth value={formData.voucherDate} onChange={handleChange("voucherDate")} /></Grid>
          <Grid item xs={6}><TextField label="Bank Code" size="small" fullWidth value={formData.bankCode} onChange={handleChange("bankCode")} /></Grid>
          <Grid item xs={6}><TextField label="Cheque Amt" size="small" fullWidth value={formData.chequeAmt} onChange={handleChange("chequeAmt")} /></Grid>
          <Grid item xs={6}><TextField label="Cheque Type" size="small" fullWidth value={formData.chequeType} onChange={handleChange("chequeType")} /></Grid>
          <Grid item xs={6}><TextField label="Cheque No" size="small" fullWidth value={formData.chequeNo} onChange={handleChange("chequeNo")} /></Grid>
          <Grid item xs={6}><TextField label="Cheque Date" size="small" fullWidth value={formData.chequeDate} onChange={handleChange("chequeDate")} /></Grid>
          <Grid item xs={6}><TextField label="Customer Bank" size="small" fullWidth value={formData.custBank} onChange={handleChange("custBank")} /></Grid>
          <Grid item xs={12}><TextField label="Narration" size="small" fullWidth value={formData.narration} onChange={handleChange("narration")} /></Grid>
          <Grid item xs={12}><TextField label="Invoice No" size="small" fullWidth value={formData.invoiceNo} onChange={handleChange("invoiceNo")} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.missingVoucher} onChange={handleCheckbox("missingVoucher")} />} label="Missing Voucher" />
            <FormControlLabel control={<Checkbox checked={formData.predefinedNarration} onChange={handleCheckbox("predefinedNarration")} />} label="Predefined Narration" />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Bank Requests</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.receiptType} | Customer: ${rec.customerCode} | Voucher: ${rec.voucherNo} | Date: ${rec.voucherDate} | Bank: ${rec.bankCode} | Cheque Amt: ${rec.chequeAmt} | Cheque Type: ${rec.chequeType} | Cheque No: ${rec.chequeNo} | Cheque Date: ${rec.chequeDate} | Cust Bank: ${rec.custBank} | Invoice: ${rec.invoiceNo} | Narration: ${rec.narration}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
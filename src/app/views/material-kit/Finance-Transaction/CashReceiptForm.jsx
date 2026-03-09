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

export default function CashReceiptForm() {
  const [formData, setFormData] = useState({
    receiptType: "",
    partyCode: "",
    voucherNo: "",
    voucherDate: "",
    invoiceNo: "",
    invoiceDate: "",
    narration: "",
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
    if (formData.receiptType && formData.voucherNo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        receiptType: "",
        partyCode: "",
        voucherNo: "",
        voucherDate: "",
        invoiceNo: "",
        invoiceDate: "",
        narration: "",
        missingVoucher: false,
        predefinedNarration: false,
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Cash Receipt" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Cash Receipt</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Receipt Type" size="small" fullWidth value={formData.receiptType} onChange={handleChange("receiptType")} /></Grid>
          <Grid item xs={6}><TextField label="Party Code" size="small" fullWidth value={formData.partyCode} onChange={handleChange("partyCode")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher No" size="small" fullWidth value={formData.voucherNo} onChange={handleChange("voucherNo")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher Date" size="small" fullWidth value={formData.voucherDate} onChange={handleChange("voucherDate")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice No" size="small" fullWidth value={formData.invoiceNo} onChange={handleChange("invoiceNo")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice Date" size="small" fullWidth value={formData.invoiceDate} onChange={handleChange("invoiceDate")} /></Grid>
          <Grid item xs={12}><TextField label="Narration" size="small" fullWidth value={formData.narration} onChange={handleChange("narration")} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.missingVoucher} onChange={handleCheckbox("missingVoucher")} />} label="Missing Voucher" />
            <FormControlLabel control={<Checkbox checked={formData.predefinedNarration} onChange={handleCheckbox("predefinedNarration")} />} label="Predefined Narration" />
          </Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Cash Receipts</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.receiptType} | Party: ${rec.partyCode} | Voucher: ${rec.voucherNo} | Date: ${rec.voucherDate} | Invoice: ${rec.invoiceNo} | Narration: ${rec.narration}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
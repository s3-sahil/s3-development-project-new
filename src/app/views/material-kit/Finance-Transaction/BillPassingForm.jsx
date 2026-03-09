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

export default function BillPassingForm() {
  const [formData, setFormData] = useState({
    voucherType: "",
    voucherNo: "",
    supplierCode: "",
    grnNo: "",
    invoiceNo: "",
    invoiceDate: "",
    invoiceAmt: "",
    narration: "",
    voucherDate: "",
    missingVoucher: false,
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckbox = (event) =>
    setFormData({ ...formData, missingVoucher: event.target.checked });

  const handleAdd = () => {
    if (formData.voucherNo && formData.supplierCode) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        voucherType: "",
        voucherNo: "",
        supplierCode: "",
        grnNo: "",
        invoiceNo: "",
        invoiceDate: "",
        invoiceAmt: "",
        narration: "",
        voucherDate: "",
        missingVoucher: false,
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Bill Passing" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Bill Passing</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Voucher Type" size="small" fullWidth value={formData.voucherType} onChange={handleChange("voucherType")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher No" size="small" fullWidth value={formData.voucherNo} onChange={handleChange("voucherNo")} /></Grid>
          <Grid item xs={6}><TextField label="Supplier Code" size="small" fullWidth value={formData.supplierCode} onChange={handleChange("supplierCode")} /></Grid>
          <Grid item xs={6}><TextField label="GRN No" size="small" fullWidth value={formData.grnNo} onChange={handleChange("grnNo")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice No" size="small" fullWidth value={formData.invoiceNo} onChange={handleChange("invoiceNo")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice Date" size="small" fullWidth value={formData.invoiceDate} onChange={handleChange("invoiceDate")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice Amount" size="small" fullWidth value={formData.invoiceAmt} onChange={handleChange("invoiceAmt")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher Date" size="small" fullWidth value={formData.voucherDate} onChange={handleChange("voucherDate")} /></Grid>
          <Grid item xs={12}><TextField label="Narration" size="small" fullWidth value={formData.narration} onChange={handleChange("narration")} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.missingVoucher} onChange={handleCheckbox} />}
              label="Missing Voucher"
            />
          </Grid>
        </Grid>

        {/* View PO and GRN Buttons */}
        <Box mt={2} display="flex" gap={2}>
          <Button variant="outlined" startIcon={<Icon>visibility</Icon>}>View PO</Button>
          <Button variant="outlined" startIcon={<Icon>visibility</Icon>}>View GRN</Button>
        </Box>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Bill Passing Records</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.voucherType} | Voucher: ${rec.voucherNo} | Supplier: ${rec.supplierCode} | GRN: ${rec.grnNo} | Invoice: ${rec.invoiceNo} | Date: ${rec.invoiceDate} | Amt: ${rec.invoiceAmt} | Narration: ${rec.narration}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function AssetRegisterEntryForm() {
  const [formData, setFormData] = useState({
    voucherNo: "",
    date: "",
    party: "",
    invoiceNo: "",
    grnMcSrNo: "",
    mcSrNo: "",
    invoiceAmt: "",
    basicAmt: "",
    balanceAmt: "",
    putToUseDt: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.voucherNo && formData.invoiceNo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        voucherNo: "",
        date: "",
        party: "",
        invoiceNo: "",
        grnMcSrNo: "",
        mcSrNo: "",
        invoiceAmt: "",
        basicAmt: "",
        balanceAmt: "",
        putToUseDt: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Asset Register Entry" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Asset Register Entry</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Voucher No" size="small" fullWidth value={formData.voucherNo} onChange={handleChange("voucherNo")} /></Grid>
          <Grid item xs={6}><TextField label="Date" size="small" fullWidth value={formData.date} onChange={handleChange("date")} /></Grid>
          <Grid item xs={6}><TextField label="Party" size="small" fullWidth value={formData.party} onChange={handleChange("party")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice No" size="small" fullWidth value={formData.invoiceNo} onChange={handleChange("invoiceNo")} /></Grid>
          <Grid item xs={6}><TextField label="GRN M/C Sr No" size="small" fullWidth value={formData.grnMcSrNo} onChange={handleChange("grnMcSrNo")} /></Grid>
          <Grid item xs={6}><TextField label="M/C Sr No" size="small" fullWidth value={formData.mcSrNo} onChange={handleChange("mcSrNo")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice Amt" size="small" fullWidth value={formData.invoiceAmt} onChange={handleChange("invoiceAmt")} /></Grid>
          <Grid item xs={6}><TextField label="Basic Amt" size="small" fullWidth value={formData.basicAmt} onChange={handleChange("basicAmt")} /></Grid>
          <Grid item xs={6}><TextField label="Balance Amt" size="small" fullWidth value={formData.balanceAmt} onChange={handleChange("balanceAmt")} /></Grid>
          <Grid item xs={6}><TextField label="Put To Use Dt" size="small" fullWidth value={formData.putToUseDt} onChange={handleChange("putToUseDt")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Asset Entries</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.voucherNo} | Date: ${rec.date} | Party: ${rec.party} | Invoice: ${rec.invoiceNo} | GRN: ${rec.grnMcSrNo} | M/C: ${rec.mcSrNo} | Invoice Amt: ${rec.invoiceAmt} | Basic Amt: ${rec.basicAmt} | Balance: ${rec.balanceAmt} | Put To Use: ${rec.putToUseDt}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
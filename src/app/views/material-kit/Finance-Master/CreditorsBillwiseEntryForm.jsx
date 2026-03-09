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

export default function CreditorsBillwiseEntryForm() {
  const [formData, setFormData] = useState({
    subCode: "",
    voucherNo: "",
    voucherDate: "",
    voucherType: "Purchase Voucher",
    invoiceNo: "",
    invoiceDate: "",
    billAmt: "",
    balanceAmt: "",
    dueDate: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.subCode && formData.voucherNo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        subCode: "",
        voucherNo: "",
        voucherDate: "",
        voucherType: "Purchase Voucher",
        invoiceNo: "",
        invoiceDate: "",
        billAmt: "",
        balanceAmt: "",
        dueDate: "",
        unit: "UNIT-1",
      });
    }
  };

  const handleChangeSubCode = () => {
    setFormData({ ...formData, subCode: "" });
    alert("Change Sub Code clicked!");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Creditors Billwise Entry" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Creditors Billwise Entry</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Sub Code" size="small" fullWidth value={formData.subCode} onChange={handleChange("subCode")} />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" startIcon={<Icon>edit</Icon>} onClick={handleChangeSubCode}>
              Change Sub Code
            </Button>
          </Grid>
          <Grid item xs={4}><TextField label="Voucher No" size="small" fullWidth value={formData.voucherNo} onChange={handleChange("voucherNo")} /></Grid>
          <Grid item xs={4}><TextField label="Voucher Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.voucherDate} onChange={handleChange("voucherDate")} /></Grid>
          <Grid item xs={4}><TextField label="Voucher Type" size="small" fullWidth value={formData.voucherType} disabled /></Grid>
          <Grid item xs={4}><TextField label="Invoice No" size="small" fullWidth value={formData.invoiceNo} onChange={handleChange("invoiceNo")} /></Grid>
          <Grid item xs={4}><TextField label="Invoice Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.invoiceDate} onChange={handleChange("invoiceDate")} /></Grid>
          <Grid item xs={4}><TextField label="Bill Amt" size="small" fullWidth value={formData.billAmt} onChange={handleChange("billAmt")} /></Grid>
          <Grid item xs={4}><TextField label="Balance Amt" size="small" fullWidth value={formData.balanceAmt} onChange={handleChange("balanceAmt")} /></Grid>
          <Grid item xs={4}><TextField label="Due Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.dueDate} onChange={handleChange("dueDate")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>OK</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Entries</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.subCode} - Voucher: ${rec.voucherNo} | Invoice: ${rec.invoiceNo} | Bill: ${rec.billAmt} | Balance: ${rec.balanceAmt} | Due: ${rec.dueDate}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
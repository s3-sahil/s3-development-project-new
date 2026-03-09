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

export default function PaymentRequestForm() {
  const [formData, setFormData] = useState({
    requestNo: "",
    requestDate: "",
    amount: "",
    bankCode: "",
    supplierCode: "",
    selectAll: false,
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckbox = (event) =>
    setFormData({ ...formData, selectAll: event.target.checked });

  const handleAdd = () => {
    if (formData.requestNo && formData.amount) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        requestNo: "",
        requestDate: "",
        amount: "",
        bankCode: "",
        supplierCode: "",
        selectAll: false,
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Payment Requests" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Payment Requests</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Request No" size="small" fullWidth value={formData.requestNo} onChange={handleChange("requestNo")} /></Grid>
          <Grid item xs={6}><TextField label="Request Date" size="small" fullWidth value={formData.requestDate} onChange={handleChange("requestDate")} /></Grid>
          <Grid item xs={6}><TextField label="Amount" size="small" fullWidth value={formData.amount} onChange={handleChange("amount")} /></Grid>
          <Grid item xs={6}><TextField label="Bank Code" size="small" fullWidth value={formData.bankCode} onChange={handleChange("bankCode")} /></Grid>
          <Grid item xs={6}><TextField label="Supplier Code" size="small" fullWidth value={formData.supplierCode} onChange={handleChange("supplierCode")} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.selectAll} onChange={handleCheckbox} />}
              label="Select ALL"
            />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Payment Requests</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.requestNo} | Date: ${rec.requestDate} | Amount: ${rec.amount} | Bank: ${rec.bankCode} | Supplier: ${rec.supplierCode} | SelectAll: ${rec.selectAll}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
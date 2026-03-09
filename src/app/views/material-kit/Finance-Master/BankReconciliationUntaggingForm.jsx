import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function BankReconciliationUntaggingForm() {
  const [formData, setFormData] = useState({
    bankName: "",
    month: "",
    year: "",
    chequeNo: "",
    type: "Payment",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.bankName && formData.month && formData.year) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        bankName: "",
        month: "",
        year: "",
        chequeNo: "",
        type: "Payment",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Bank Reconciliation Untagging" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Bank Reconciliation Untagging</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Bank Name" size="small" fullWidth value={formData.bankName} onChange={handleChange("bankName")} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Month" size="small" fullWidth value={formData.month} onChange={handleChange("month")} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Year" size="small" fullWidth value={formData.year} onChange={handleChange("year")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Cheque No" size="small" fullWidth value={formData.chequeNo} onChange={handleChange("chequeNo")} />
          </Grid>
          <Grid item xs={4}>
            <TextField select label="Type" size="small" fullWidth value={formData.type} onChange={handleChange("type")}>
              <MenuItem value="Payment">Payment</MenuItem>
              <MenuItem value="Receipt">Receipt</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Records</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.bankName} - ${rec.month}/${rec.year} - Cheque: ${rec.chequeNo} - ${rec.type}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
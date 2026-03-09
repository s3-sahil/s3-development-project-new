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

export default function BankReconciliationMasterForm() {
  const [formData, setFormData] = useState({
    bankCode: "",
    bankName: "",
    month: "",
    year: "",
    fromDate: "",
    toDate: "",
    passBookBalance: "",
    bankBookBalance: "",
    issuedNotPresent: "",
    depositedNotCleared: "",
    difference: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.bankCode && formData.bankName) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        bankCode: "",
        bankName: "",
        month: "",
        year: "",
        fromDate: "",
        toDate: "",
        passBookBalance: "",
        bankBookBalance: "",
        issuedNotPresent: "",
        depositedNotCleared: "",
        difference: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Bank Reconciliation Master" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Bank Reconciliation Master</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Bank Code" size="small" fullWidth value={formData.bankCode} onChange={handleChange("bankCode")} /></Grid>
          <Grid item xs={4}><TextField label="Bank Name" size="small" fullWidth value={formData.bankName} onChange={handleChange("bankName")} /></Grid>
          <Grid item xs={2}><TextField label="Month" size="small" fullWidth value={formData.month} onChange={handleChange("month")} /></Grid>
          <Grid item xs={2}><TextField label="Year" size="small" fullWidth value={formData.year} onChange={handleChange("year")} /></Grid>
          <Grid item xs={4}><TextField label="From Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.fromDate} onChange={handleChange("fromDate")} /></Grid>
          <Grid item xs={4}><TextField label="To Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.toDate} onChange={handleChange("toDate")} /></Grid>
          <Grid item xs={4}><TextField label="Pass Book Balance" size="small" fullWidth value={formData.passBookBalance} onChange={handleChange("passBookBalance")} /></Grid>
          <Grid item xs={4}><TextField label="Bank Book Balance" size="small" fullWidth value={formData.bankBookBalance} onChange={handleChange("bankBookBalance")} /></Grid>
          <Grid item xs={4}><TextField label="Issued Not Present" size="small" fullWidth value={formData.issuedNotPresent} onChange={handleChange("issuedNotPresent")} /></Grid>
          <Grid item xs={4}><TextField label="Deposited Not Cleared" size="small" fullWidth value={formData.depositedNotCleared} onChange={handleChange("depositedNotCleared")} /></Grid>
          <Grid item xs={4}><TextField label="Difference" size="small" fullWidth value={formData.difference} onChange={handleChange("difference")} /></Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Records</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.bankCode} - ${rec.bankName} - ${rec.month}/${rec.year} - Diff: ${rec.difference}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
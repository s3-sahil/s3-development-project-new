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

export default function OnAccountRequestForm() {
  const [formData, setFormData] = useState({
    requestType: "",
    supplierCode: "",
    requestNo: "",
    requestDate: "",
    amount: "",
    narration: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.requestNo && formData.amount) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        requestType: "",
        supplierCode: "",
        requestNo: "",
        requestDate: "",
        amount: "",
        narration: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "On Account Requests" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">On Account Requests</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Request Type" size="small" fullWidth value={formData.requestType} onChange={handleChange("requestType")} /></Grid>
          <Grid item xs={6}><TextField label="Supplier Code" size="small" fullWidth value={formData.supplierCode} onChange={handleChange("supplierCode")} /></Grid>
          <Grid item xs={6}><TextField label="Request No" size="small" fullWidth value={formData.requestNo} onChange={handleChange("requestNo")} /></Grid>
          <Grid item xs={6}><TextField label="Request Date" size="small" fullWidth value={formData.requestDate} onChange={handleChange("requestDate")} /></Grid>
          <Grid item xs={6}><TextField label="Amount" size="small" fullWidth value={formData.amount} onChange={handleChange("amount")} /></Grid>
          <Grid item xs={12}><TextField label="Narration" size="small" fullWidth value={formData.narration} onChange={handleChange("narration")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added On Account Requests</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.requestType} | Supplier: ${rec.supplierCode} | Request No: ${rec.requestNo} | Date: ${rec.requestDate} | Amount: ${rec.amount} | Narration: ${rec.narration}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
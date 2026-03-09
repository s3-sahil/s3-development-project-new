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

export default function RoDTEPMasterEntryForm() {
  const [formData, setFormData] = useState({
    hsnCode: "",
    rate: "",
    country: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.hsnCode && formData.rate) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        hsnCode: "",
        rate: "",
        country: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "RoDTEP Master Entry" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">RoDTEP Master Entry</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="HSN Code" size="small" fullWidth value={formData.hsnCode} onChange={handleChange("hsnCode")} /></Grid>
          <Grid item xs={6}><TextField label="Rate %" size="small" fullWidth value={formData.rate} onChange={handleChange("rate")} /></Grid>
          <Grid item xs={6}><TextField label="Country" size="small" fullWidth value={formData.country} onChange={handleChange("country")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added RoDTEP Entries</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.hsnCode} | Rate: ${rec.rate} | Country: ${rec.country}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
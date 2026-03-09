import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function CashFlowProvisionForm() {
  const [formData, setFormData] = useState({
    glCode: "",
    period: "",
    week: "",
    amount: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.glCode && formData.period) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        glCode: "",
        period: "",
        week: "",
        amount: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Cash Flow Provision" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Cash Flow Provision</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="GL Code" size="small" fullWidth value={formData.glCode} onChange={handleChange("glCode")} /></Grid>
          <Grid item xs={6}><TextField label="Period" size="small" fullWidth value={formData.period} onChange={handleChange("period")} /></Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              size="small"
              value={formData.week}
              onChange={handleChange("week")}
              displayEmpty
            >
              <MenuItem value="">Select Week</MenuItem>
              <MenuItem value="Week 1">Week 1</MenuItem>
              <MenuItem value="Week 2">Week 2</MenuItem>
              <MenuItem value="Week 3">Week 3</MenuItem>
              <MenuItem value="Week 4">Week 4</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}><TextField label="Amount" size="small" fullWidth value={formData.amount} onChange={handleChange("amount")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Cash Flow Provisions</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.glCode} | Period: ${rec.period} | Week: ${rec.week} | Amount: ${rec.amount}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
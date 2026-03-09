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

export default function ScheduleDetailsForm() {
  const [formData, setFormData] = useState({
    schedule: "",
    scheduleName: "",
    glCategory: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.schedule && formData.scheduleName) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        schedule: "",
        scheduleName: "",
        glCategory: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Schedule Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Schedule Details</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Schedule" size="small" fullWidth value={formData.schedule} onChange={handleChange("schedule")} /></Grid>
          <Grid item xs={4}><TextField label="Schedule Name" size="small" fullWidth value={formData.scheduleName} onChange={handleChange("scheduleName")} /></Grid>
          <Grid item xs={4}>
            <TextField select label="GL Category" size="small" fullWidth value={formData.glCategory} onChange={handleChange("glCategory")}>
              <MenuItem value="Assets">Assets</MenuItem>
              <MenuItem value="Liabilities">Liabilities</MenuItem>
              <MenuItem value="Expenses">Expenses</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Schedules</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.schedule} | ${rec.scheduleName} | GL: ${rec.glCategory}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function GenerateMusterForm() {
  const [formData, setFormData] = useState({
    month: "04",
    year: "2026",
  });

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const getMusterPeriod = () => {
    const start = `01/${formData.month}/${formData.year}`;
    const end = `30/${formData.month}/${formData.year}`;
    return `${start} To ${end}`;
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Generate Muster" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Generate Muster
          </Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
            <Button variant="contained" color="secondary" startIcon={<Icon>play_arrow</Icon>}>Generate</Button>
            <Button variant="outlined" color="error" startIcon={<Icon>close</Icon>}>Close</Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Month"
              size="small"
              fullWidth
              value={formData.month}
              onChange={handleChange("month")}
            >
              {months.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.value} - {m.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Year"
              size="small"
              fullWidth
              value={formData.year}
              onChange={handleChange("year")}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Muster Period: {getMusterPeriod()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
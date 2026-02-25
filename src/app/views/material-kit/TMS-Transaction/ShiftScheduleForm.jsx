import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ShiftScheduleForm() {
  const [formData, setFormData] = useState({
    period: "",
    employee: "",
    fromDay: "",
    toDay: "",
    shift: "",
    weeklyOff: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Shift Schedule" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Shift Schedule Details
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Period (MMYYYY)" size="small" fullWidth value={formData.period} onChange={handleChange("period")} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Employee" size="small" fullWidth value={formData.employee} onChange={handleChange("employee")} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="From Day" size="small" fullWidth value={formData.fromDay} onChange={handleChange("fromDay")} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="To Day" size="small" fullWidth value={formData.toDay} onChange={handleChange("toDay")} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Shift" size="small" fullWidth value={formData.shift} onChange={handleChange("shift")} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Weekly Off (e.g. Sunday)" size="small" fullWidth value={formData.weeklyOff} onChange={handleChange("weeklyOff")} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
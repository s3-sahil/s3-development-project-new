import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function InOutFlagForm() {
  const [formData, setFormData] = useState({
    period: "102022",
    day: "",
    employee: "",
    shift: "",
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const shifts = ["F", "S", "G"];

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "In Out Flag Correction" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            In Out Flag Correction
          </Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
            <Button variant="contained" color="secondary" startIcon={<Icon>update</Icon>}>Update</Button>
            <Button variant="outlined" color="error" startIcon={<Icon>delete</Icon>}>Remove</Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Period" size="small" fullWidth value={formData.period} onChange={handleChange("period")} />
          </Grid>
          <Grid item xs={3}>
            <TextField select label="Day" size="small" fullWidth value={formData.day} onChange={handleChange("day")}>
              {days.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Employee No" size="small" fullWidth value={formData.employee} onChange={handleChange("employee")} />
          </Grid>
          <Grid item xs={3}>
            <TextField select label="Shift" size="small" fullWidth value={formData.shift} onChange={handleChange("shift")}>
              {shifts.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
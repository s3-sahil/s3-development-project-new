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

export default function ManualPunchingForm() {
  const [formData, setFormData] = useState({
    period: "102022",
    day: "",
    employee: "",
    shift: "",
    punches: [
      { in: "", out: "" },
      { in: "", out: "" },
      { in: "", out: "" },
      { in: "", out: "" },
      { in: "", out: "" },
    ],
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const shifts = ["F", "S", "G"];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePunchChange = (index, field, value) => {
    const updatedPunches = [...formData.punches];
    updatedPunches[index][field] = value;
    setFormData({ ...formData, punches: updatedPunches });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "PAYROLL" }, { name: "Manual Punching" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Manual Punching
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
            <TextField label="Period" size="small" fullWidth value={formData.period} onChange={(e) => handleChange("period", e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField select label="Day" size="small" fullWidth value={formData.day} onChange={(e) => handleChange("day", e.target.value)}>
              {days.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Employee No" size="small" fullWidth value={formData.employee} onChange={(e) => handleChange("employee", e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField select label="Shift" size="small" fullWidth value={formData.shift} onChange={(e) => handleChange("shift", e.target.value)}>
              {shifts.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {formData.punches.map((punch, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  label={`In Time ${index + 1}`}
                  size="small"
                  fullWidth
                  value={punch.in}
                  onChange={(e) => handlePunchChange(index, "in", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={`Out Time ${index + 1}`}
                  size="small"
                  fullWidth
                  value={punch.out}
                  onChange={(e) => handlePunchChange(index, "out", e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
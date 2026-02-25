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

export default function OvertimeForm() {
  const [formData, setFormData] = useState({
    period: "",
    day: "",
    employee: "",
    shift: "",
    inTime: "",
    outTime: "",
    extraHrs: "",
    otInTime: "",
    otOutTime: "",
    otHrs: "",
  });

  const shifts = ["F", "S", "G"];

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "TMS" }, { name: "Overtime Details" }]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" startIcon={<Icon>save</Icon>}>
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Icon>update</Icon>}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Icon>delete</Icon>}
            >
              Remove
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label="Period"
              size="small"
              fullWidth
              value={formData.period}
              onChange={handleChange("period")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Day"
              size="small"
              fullWidth
              value={formData.day}
              onChange={handleChange("day")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employee"
              size="small"
              fullWidth
              value={formData.employee}
              onChange={handleChange("employee")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              label="Shift"
              size="small"
              fullWidth
              value={formData.shift}
              onChange={handleChange("shift")}
            >
              {shifts.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="In Time"
              size="small"
              fullWidth
              value={formData.inTime}
              onChange={handleChange("inTime")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Out Time"
              size="small"
              fullWidth
              value={formData.outTime}
              onChange={handleChange("outTime")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Extra Hrs"
              size="small"
              fullWidth
              value={formData.extraHrs}
              onChange={handleChange("extraHrs")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="OT In Time"
              size="small"
              fullWidth
              value={formData.otInTime}
              onChange={handleChange("otInTime")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="OT Out Time"
              size="small"
              fullWidth
              value={formData.otOutTime}
              onChange={handleChange("otOutTime")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="OT Hrs"
              size="small"
              fullWidth
              value={formData.otHrs}
              onChange={handleChange("otHrs")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

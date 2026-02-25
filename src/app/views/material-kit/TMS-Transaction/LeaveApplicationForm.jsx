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

export default function LeaveApplicationForm() {
  const [formData, setFormData] = useState({
    employee: "",
    requestDate: "",
    leaveFrom: "",
    leaveUpto: "",
    leaveDays: "",
    reason: "",
    leaveType: "",
  });

  const leaveTypes = [
    { value: "CL", label: "Casual Leave" },
    { value: "SL", label: "Sick Leave" },
    { value: "PL", label: "Privilege Leave" },
  ];

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Leave Application" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Leave Application
          </Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
            <Button variant="contained" color="secondary" startIcon={<Icon>add</Icon>}>Add</Button>
            <Button variant="outlined" color="error" startIcon={<Icon>delete</Icon>}>Remove</Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Employee" size="small" fullWidth value={formData.employee} onChange={handleChange("employee")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Request Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.requestDate} onChange={handleChange("requestDate")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Leave From" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.leaveFrom} onChange={handleChange("leaveFrom")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Leave Upto" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.leaveUpto} onChange={handleChange("leaveUpto")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Leave Days" size="small" fullWidth value={formData.leaveDays} onChange={handleChange("leaveDays")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Reason" size="small" fullWidth value={formData.reason} onChange={handleChange("reason")} />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Leave Type"
              size="small"
              fullWidth
              value={formData.leaveType}
              onChange={handleChange("leaveType")}
            >
              {leaveTypes.map((lt) => (
                <MenuItem key={lt.value} value={lt.value}>
                  {lt.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
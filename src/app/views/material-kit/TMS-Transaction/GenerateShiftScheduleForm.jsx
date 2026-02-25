import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function GenerateShiftScheduleForm() {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    accordingTo: "Rotation",
    department: "ALL",
    forEmployee: "All",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Generate Shift Schedule" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Generate Shift Schedule
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
              label="From Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fromDate}
              onChange={handleChange("fromDate")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="To Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.toDate}
              onChange={handleChange("toDate")}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">According To:</Typography>
            <RadioGroup row value={formData.accordingTo} onChange={handleChange("accordingTo")}>
              <FormControlLabel value="Rotation" control={<Radio />} label="Rotation" />
              <FormControlLabel value="SelectedShift" control={<Radio />} label="Selected Shift" />
            </RadioGroup>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Department"
              size="small"
              fullWidth
              value={formData.department}
              onChange={handleChange("department")}
            >
              <MenuItem value="ALL">ALL</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Production">Production</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">For:</Typography>
            <RadioGroup row value={formData.forEmployee} onChange={handleChange("forEmployee")}>
              <FormControlLabel value="All" control={<Radio />} label="All Employees" />
              <FormControlLabel value="Selective" control={<Radio />} label="Selective Employees" />
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
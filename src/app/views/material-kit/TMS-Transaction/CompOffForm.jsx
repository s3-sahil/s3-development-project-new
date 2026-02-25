import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function CompOffForm() {
  const [formData, setFormData] = useState({
    employee: "",
    coffIn: "Days",
    encash: false,
    coffDate: "",
    coffDays: "",
    requiredMinHrs: "",
    extraHours: "",
    takenHrs: "",
    totalTakenHrs: "",
  });

  const handleChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Compensatory Off" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Compensatory Off
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Employee" size="small" fullWidth value={formData.employee} onChange={handleChange("employee")} />
          </Grid>
          <Grid item xs={3}>
            <RadioGroup row value={formData.coffIn} onChange={handleChange("coffIn")}>
              <FormControlLabel value="Days" control={<Radio />} label="Days" />
              <FormControlLabel value="Hours" control={<Radio />} label="Hours" />
            </RadioGroup>
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={<Checkbox checked={formData.encash} onChange={handleChange("encash")} />}
              label="Encash COff"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField label="COff Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.coffDate} onChange={handleChange("coffDate")} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="COff Days" size="small" fullWidth value={formData.coffDays} onChange={handleChange("coffDays")} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Required Min Hrs" size="small" fullWidth value={formData.requiredMinHrs} onChange={handleChange("requiredMinHrs")} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Extra Hours" size="small" fullWidth value={formData.extraHours} onChange={handleChange("extraHours")} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Taken Hrs For COff" size="small" fullWidth value={formData.takenHrs} onChange={handleChange("takenHrs")} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Total Taken Hours" size="small" fullWidth value={formData.totalTakenHrs} onChange={handleChange("totalTakenHrs")} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
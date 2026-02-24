import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function RotationDetailsForm() {
  const [formData, setFormData] = useState({
    rotationCode: "",
    description: "",
    patternType: "",
    weekdays: [],
    shifts: [],
    unit: "UNIT-1",
  });

  const [showDays, setShowDays] = useState(false);
  const [showShifts, setShowShifts] = useState(false);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const shiftOptions = [
    "F - FIRST",
    "G - GENERAL",
    "S - SECOND",
    "T - THIRD",
    "P - PIRANGUT",
    "C - TEMPORARY",
    "A - TEMP SEC",
    "B - TEMP FIRST",
  ];

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });

    if (field === "patternType") {
      // auto show weekdays if "weekdays" selected
      setShowDays(event.target.value === "weekdays");
    }
  };

  const handleCheckboxChange = (field, value) => (event) => {
    const updated = event.target.checked
      ? [...formData[field], value]
      : formData[field].filter((v) => v !== value);
    setFormData({ ...formData, [field]: updated });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "HR" }, { name: "Rotation Details" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <h2></h2>
          <Box display="flex" gap={2}>
           
            <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Rotation Code" size="small" fullWidth value={formData.rotationCode} onChange={handleChange("rotationCode")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Description" size="small" fullWidth value={formData.description} onChange={handleChange("description")} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Rotation Pattern</Typography>
            <RadioGroup value={formData.patternType} onChange={handleChange("patternType")}>
              <FormControlLabel value="days" control={<Radio />} label="After Specified No. Of Days" />
              <FormControlLabel value="monthDates" control={<Radio />} label="On The Specified Dates Of Month" />
              <FormControlLabel value="weekdays" control={<Radio />} label="On Specified Week Days" />
            </RadioGroup>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setShowDays(!showDays)}>
              {showDays ? "Hide Days" : "Select Days"}
            </Button>
          </Grid>

          {showDays && (
            <Grid item xs={12}>
              <FormGroup row>
                {weekdays.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={<Checkbox checked={formData.weekdays.includes(day)} onChange={handleCheckboxChange("weekdays", day)} />}
                    label={day}
                  />
                ))}
              </FormGroup>
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography variant="subtitle1">Shift Change Pattern</Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setShowShifts(!showShifts)}>
              {showShifts ? "Hide Shifts" : "Select Shifts"}
            </Button>
            {showShifts && (
              <FormGroup row sx={{ mt: 1 }}>
                {shiftOptions.map((shift) => (
                  <FormControlLabel
                    key={shift}
                    control={<Checkbox checked={formData.shifts.includes(shift)} onChange={handleCheckboxChange("shifts", shift)} />}
                    label={shift}
                  />
                ))}
              </FormGroup>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
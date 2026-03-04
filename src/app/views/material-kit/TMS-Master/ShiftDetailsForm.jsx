import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ShiftDetailsForm() {
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state;

  const [formData, setFormData] = useState({
    shiftCode: "",
    description: "",
    shiftStart: "",
    shiftEnd: "",
    lunchStart: "",
    lunchEnd: "",
    earlyIn: "",
    allowLateStart: "",
    maxIn: "",
    allowEarlyOut: "",
    allowOTStart: "",
    tea1Start: "",
    tea1End: "",
    tea2Start: "",
    tea2End: "",
    allowLateStartOn: "same",
    maxInOn: "same",
    shiftEndOn: "same",
    allowOTStartOn: "same",
    division: "C",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const timeField = (label, field) => (
    <TextField
      label={label}
      type="time"
      size="small"
      fullWidth
      InputLabelProps={{ shrink: true }}
      value={formData[field]}
      onChange={handleChange(field)}
    />
  );

  return (
    <Container maxWidth="xl">
      <Box mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Shift Details" }]} />
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>


        {/* Basic Info */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Shift Code"
              size="small"
              fullWidth
              value={formData.shiftCode}
              onChange={handleChange("shiftCode")}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Description"
              size="small"
              fullWidth
              value={formData.description}
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid item xs={4}>
            <Select
              size="small"
              fullWidth
              value={formData.division}
              onChange={handleChange("division")}
            >
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Time Fields */}
        <Grid container spacing={2}>
          <Grid item xs={3}>{timeField("Shift Start", "shiftStart")}</Grid>
          <Grid item xs={3}>{timeField("Shift End", "shiftEnd")}</Grid>
          <Grid item xs={3}>{timeField("Lunch Start", "lunchStart")}</Grid>
          <Grid item xs={3}>{timeField("Lunch End", "lunchEnd")}</Grid>

          <Grid item xs={3}>{timeField("Early In", "earlyIn")}</Grid>
          <Grid item xs={3}>{timeField("Allow In / Late Start", "allowLateStart")}</Grid>
          <Grid item xs={3}>{timeField("Max In", "maxIn")}</Grid>
          <Grid item xs={3}>{timeField("Allow Early Out", "allowEarlyOut")}</Grid>

          <Grid item xs={3}>{timeField("Allow Out / OT Start", "allowOTStart")}</Grid>
          <Grid item xs={3}>{timeField("1st Tea Start", "tea1Start")}</Grid>
          <Grid item xs={3}>{timeField("1st Tea End", "tea1End")}</Grid>
          <Grid item xs={3}>{timeField("2nd Tea Start", "tea2Start")}</Grid>

          <Grid item xs={3}>{timeField("2nd Tea End", "tea2End")}</Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Same Day / Next Day Options */}
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <FormControl>
              <FormLabel>Allow In / Late On</FormLabel>
              <RadioGroup
                row
                value={formData.allowLateStartOn}
                onChange={handleChange("allowLateStartOn")}
              >
                <FormControlLabel value="same" control={<Radio />} label="Same Day" />
                <FormControlLabel value="next" control={<Radio />} label="Next Day" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl>
              <FormLabel>Max In On</FormLabel>
              <RadioGroup
                row
                value={formData.maxInOn}
                onChange={handleChange("maxInOn")}
              >
                <FormControlLabel value="same" control={<Radio />} label="Same Day" />
                <FormControlLabel value="next" control={<Radio />} label="Next Day" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl>
              <FormLabel>Shift End On</FormLabel>
              <RadioGroup
                row
                value={formData.shiftEndOn}
                onChange={handleChange("shiftEndOn")}
              >
                <FormControlLabel value="same" control={<Radio />} label="Same Day" />
                <FormControlLabel value="next" control={<Radio />} label="Next Day" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl>
              <FormLabel>Allow OT Start On</FormLabel>
              <RadioGroup
                row
                value={formData.allowOTStartOn}
                onChange={handleChange("allowOTStartOn")}
              >
                <FormControlLabel value="same" control={<Radio />} label="Same Day" />
                <FormControlLabel value="next" control={<Radio />} label="Next Day" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
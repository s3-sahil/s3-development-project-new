import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function TMSParameterForm() {
  const [formData, setFormData] = useState({
    punchingFileFlag: "No",
    woffShiftGen: "No",
    odTourApproval: "No",
    shiftPlanApplicable: "Yes",
    holidayShiftGen: "Yes",
    leaveApproval: "1",
    lateEarlyRule: "Grade Rules",
    minPresentFullDay: "",
    doublePunchDiff: "",
    addMinutesCoff: "",
    minPresentHalfDay: "",
    shortLeaveHrs: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("TMS Parameter Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "TMS Parameter" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
          <Button variant="contained" startIcon={<Icon>print</Icon>}>
            Print
          </Button>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Radio Options */}
          <Grid item xs={6}>
            <FormLabel>Punching File With In Out Flag</FormLabel>
            <RadioGroup row name="punchingFileFlag" value={formData.punchingFileFlag} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>WOff While Shift Generation</FormLabel>
            <RadioGroup row name="woffShiftGen" value={formData.woffShiftGen} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>OD/Tour Approval</FormLabel>
            <RadioGroup row name="odTourApproval" value={formData.odTourApproval} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Shift Plan Applicable</FormLabel>
            <RadioGroup row name="shiftPlanApplicable" value={formData.shiftPlanApplicable} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Holiday While Shift Generation</FormLabel>
            <RadioGroup row name="holidayShiftGen" value={formData.holidayShiftGen} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Leave Approval</FormLabel>
            <RadioGroup row name="leaveApproval" value={formData.leaveApproval} onChange={handleChange}>
              <FormControlLabel value="1" control={<Radio />} label="1 Level" />
              <FormControlLabel value="2" control={<Radio />} label="2 Level" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Late Early Rule From</FormLabel>
            <RadioGroup row name="lateEarlyRule" value={formData.lateEarlyRule} onChange={handleChange}>
              <FormControlLabel value="Grade Rules" control={<Radio />} label="Grade Rules" />
              <FormControlLabel value="Shift Master" control={<Radio />} label="Shift Master" />
            </RadioGroup>
          </Grid>

          {/* Input Fields */}
          <Grid item xs={6}>
            <TextField label="Minimum Presenty Req. For Full Day (%)" name="minPresentFullDay" value={formData.minPresentFullDay} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Double Punching Difference (minutes)" name="doublePunchDiff" value={formData.doublePunchDiff} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Additional Minutes If Insufficient Extra Time For COff" name="addMinutesCoff" value={formData.addMinutesCoff} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Minimum Presenty Req. For Half Day (%)" name="minPresentHalfDay" value={formData.minPresentHalfDay} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Short Leave Hrs" name="shortLeaveHrs" value={formData.shortLeaveHrs} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
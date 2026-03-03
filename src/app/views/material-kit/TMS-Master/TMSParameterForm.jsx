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
import { saveTmsParameter } from "app/utils/authServices";
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

  const handleSave = async () => {
    const profcen_cd = localStorage.getItem("PROFCEN_CD") || "";
    try {
      const payload = {
        PROFCEN_CD: profcen_cd,
        shift_Plan_Appl: formData.shiftPlanApplicable === "Yes",
        use_Our_Shift: true, // set based on your logic

        punching_Diff: Number(formData.doublePunchDiff) || 0,
        full_Day_From: Number(formData.minPresentFullDay) || 0,
        half_Day_From: Number(formData.minPresentHalfDay) || 0,

        shift_Plan_WO: formData.woffShiftGen === "Yes" ? "Y" : "N",
        shift_Plan_PH: formData.holidayShiftGen === "Yes" ? "Y" : "N",

        short_Leave_Hrs: Number(formData.shortLeaveHrs) || 0,

        allowed_LE_From: formData.lateEarlyRule === "Grade Rules" ? "G" : "S",

        additional_Coff_Min: Number(formData.addMinutesCoff) || 0,

        shiftMst_DivWise: true, // set if you have UI for this

        inOut_Flag: formData.punchingFileFlag === "Yes",

        wH_BtnCL_Flag: "Y", // set if required
        wH_BtnSL_Flag: "Y",
        wH_BtnPL_Flag: "Y",

        extra_Early_Min: 0, // set if UI available
        extra_Late_Min: 0,

        oD_Appr_Flag: formData.odTourApproval === "Yes" ? "Y" : "N",

        leave_Appr_Flag: formData.leaveApproval === "1" ? "Y" : "N",
      };

      const result = await saveTmsParameter(payload);

      alert("TMS Parameter Saved Successfully");
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "TMS" }, { name: "TMS Parameter" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
          <Button variant="contained" startIcon={<Icon>print</Icon>}>
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Radio Options */}
          <Grid item xs={6}>
            <FormLabel>Punching File With In Out Flag</FormLabel>
            <RadioGroup
              row
              name="punchingFileFlag"
              value={formData.punchingFileFlag}
              onChange={handleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>WOff While Shift Generation</FormLabel>
            <RadioGroup
              row
              name="woffShiftGen"
              value={formData.woffShiftGen}
              onChange={handleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>OD/Tour Approval</FormLabel>
            <RadioGroup
              row
              name="odTourApproval"
              value={formData.odTourApproval}
              onChange={handleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Shift Plan Applicable</FormLabel>
            <RadioGroup
              row
              name="shiftPlanApplicable"
              value={formData.shiftPlanApplicable}
              onChange={handleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Holiday While Shift Generation</FormLabel>
            <RadioGroup
              row
              name="holidayShiftGen"
              value={formData.holidayShiftGen}
              onChange={handleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Leave Approval</FormLabel>
            <RadioGroup
              row
              name="leaveApproval"
              value={formData.leaveApproval}
              onChange={handleChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="1 Level" />
              <FormControlLabel value="2" control={<Radio />} label="2 Level" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Late Early Rule From</FormLabel>
            <RadioGroup
              row
              name="lateEarlyRule"
              value={formData.lateEarlyRule}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Grade Rules"
                control={<Radio />}
                label="Grade Rules"
              />
              <FormControlLabel
                value="Shift Master"
                control={<Radio />}
                label="Shift Master"
              />
            </RadioGroup>
          </Grid>

          {/* Input Fields */}
          <Grid item xs={6}>
            <TextField
              label="Minimum Presenty Req. For Full Day (%)"
              name="minPresentFullDay"
              value={formData.minPresentFullDay}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Double Punching Difference (minutes)"
              name="doublePunchDiff"
              value={formData.doublePunchDiff}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Additional Minutes If Insufficient Extra Time For COff"
              name="addMinutesCoff"
              value={formData.addMinutesCoff}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Minimum Presenty Req. For Half Day (%)"
              name="minPresentHalfDay"
              value={formData.minPresentHalfDay}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Short Leave Hrs"
              name="shortLeaveHrs"
              value={formData.shortLeaveHrs}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

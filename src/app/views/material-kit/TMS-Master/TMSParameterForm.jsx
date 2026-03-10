import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { saveTmsParameter } from "app/utils/authServices";

const INITIAL_FORM = {
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
};

export default function TMSParameterForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const [actionMode, setActionMode] = useState("new");
  const [saveMode, setSaveMode] = useState(false);

  const isEdit = location.pathname.includes("edit");

  useEffect(() => {
    if (location.state) {
      setActionMode("edit");
      setSaveMode(true);

      const data = location.state;

      setFormData({
        punchingFileFlag: data.InOut_Flag ? "Yes" : "No",
        woffShiftGen: data.Shift_Plan_WO === "Y" ? "Yes" : "No",
        odTourApproval: data.OD_Appr_Flag === "Y" ? "Yes" : "No",
        shiftPlanApplicable: data.Shift_Plan_Appl ? "Yes" : "No",
        holidayShiftGen: data.Shift_Plan_PH === "Y" ? "Yes" : "No",
        leaveApproval:
          data.leave_Appr_Flag === "Y"
            ? "1"
            : data.leave_Appr_Flag === "N"
              ? "2"
              : "1",
        lateEarlyRule:
          data.Allowed_LE_From === "G" ? "Grade Rules" : "Shift Master",
        minPresentFullDay: data.Full_Day_From || "",
        minPresentHalfDay: data.Half_Day_From || "",
        doublePunchDiff: data.Punching_Diff || "",
        addMinutesCoff: data.Additional_Coff_Min || "",
        shortLeaveHrs: data.Short_Leave_Hrs || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const newbuttonapi = () => {
    setFormData(INITIAL_FORM);
    setSaveMode(true);
    setActionMode("new");
  };

  const confirmDelete = () => {
    alert("Delete functionality not implemented");
  };

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      const payload = {
        profceN_CD: localStorage.getItem("PROFCEN_CD"),

        shift_Plan_Appl: formData.shiftPlanApplicable === "Yes",
        use_Our_Shift: true,

        punching_Diff: Number(formData.doublePunchDiff) || 0,
        full_Day_From: Number(formData.minPresentFullDay) || 0,
        half_Day_From: Number(formData.minPresentHalfDay) || 0,

        shift_Plan_WO: formData.woffShiftGen === "Yes" ? "Y" : "N",
        shift_Plan_PH: formData.holidayShiftGen === "Yes" ? "Y" : "N",

        short_Leave_Hrs: Number(formData.shortLeaveHrs) || 0,

        allowed_LE_From: formData.lateEarlyRule === "Grade Rules" ? "G" : "S",

        additional_Coff_Min: Number(formData.addMinutesCoff) || 0,

        shiftMst_DivWise: true,

        inOut_Flag: formData.punchingFileFlag === "Yes",

        wH_BtnCL_Flag: "N",
        wH_BtnSL_Flag: "N",
        wH_BtnPL_Flag: "N",

        extra_Early_Min: 0,
        extra_Late_Min: 0,

        oD_Appr_Flag: formData.odTourApproval === "Yes" ? "Y" : "N",

        leave_Appr_Flag: formData.leaveApproval === "1" ? "Y" : "N",
      };

      console.log("Payload:", payload);

      const result = await saveTmsParameter(payload);

      if (result) {
        alert(result.message || "Saved Successfully");

        navigate("/material/TMS-parameter-table", {
          state: { refresh: true },
        });
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "TMS" },
            { name: isEdit ? "Edit TMS Parameter" : "Add TMS Parameter" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={() => {
              if (actionMode === "edit") {
                handleSave();
              } else if (!saveMode) {
                newbuttonapi();
              } else {
                handleSave();
              }
            }}
          >
            {actionMode === "edit" ? "Update" : saveMode ? "Save" : "New"}
          </Button>

          <Button
            variant="outlined"
            startIcon={<Icon>arrow_back</Icon>}
            onClick={() => navigate("/material/TMS-parameter-table")}
          >
            Back
          </Button>
        </Box>

        <Grid container spacing={3}>
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

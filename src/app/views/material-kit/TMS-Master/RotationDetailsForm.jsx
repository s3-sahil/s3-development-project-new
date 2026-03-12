import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { fetchShift, saveRotationDetails } from "app/utils/authServices";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RotationDetailsForm() {
  const [leadObj, setLeadObj] = useState({});
  const [showDaySelector, setShowDaySelector] = useState(false);
  const [showShiftSelector, setShowShiftSelector] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedShiftCodes, setSelectedShiftCodes] = useState([]);

  const [shifts, setShifts] = useState([]);

  const slabIdRefs = useRef(null);
  const navigate = useNavigate();

  const dayOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    masterloan();
  }, []);

  /* UPDATE FORM */

  const updateFormValue = ({ updateType, value }) => {
    setLeadObj((prev) => ({
      ...prev,
      [updateType]: value,
    }));
  };

  /* FETCH SHIFTS */

  const masterloan = async () => {
    try {
      const response = await fetchShift();

      const normalized = Object.keys(response).reduce((acc, key) => {
        acc[key.toLowerCase()] = response[key];
        return acc;
      }, {});

      if (normalized.data) {
        setShifts(normalized.data);
      }
    } catch (error) {
      console.error("Shift Fetch Error:", error);
    }
  };

  /* DAY SELECT */

  const handleDayChange = (day) => {
    let updatedDays = [];

    if (selectedDays.includes(day)) {
      updatedDays = selectedDays.filter((d) => d !== day);
    } else {
      updatedDays = [...selectedDays, day];
    }

    setSelectedDays(updatedDays);

    updateFormValue({
      updateType: "rotation_days",
      value: updatedDays.join(","),
    });
  };

  /* SHIFT SELECT */

  const handleShiftChange = (code) => {
    let updatedShift = [];

    if (selectedShiftCodes.includes(code)) {
      updatedShift = selectedShiftCodes.filter((s) => s !== code);
    } else {
      updatedShift = [...selectedShiftCodes, code];
    }

    setSelectedShiftCodes(updatedShift);

    updateFormValue({
      updateType: "shift_pattern",
      value: updatedShift.join(","),
    });
  };

  /* SAVE */

  const handleSave = async () => {
    try {
      const payload = {
        ...leadObj,
        rotation_days: selectedDays.join(","),
        shift_pattern: selectedShiftCodes.join(","),
      };

      console.log("Save Payload:", payload);

      const data = await saveRotationDetails(payload);

      if (data?.message) {
        alert("Data saved successfully");
      }
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "TMS" }, { name: "Rotation Details" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6"></Typography>

          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* ROTATION CODE */}

          <Grid item xs={4}>
            <TextField
              label="Rotation Code"
              size="small"
              fullWidth
              value={leadObj.rotation_code || ""}
              inputRef={slabIdRefs}
              onChange={(e) =>
                updateFormValue({
                  updateType: "rotation_code",
                  value: e.target.value,
                })
              }
            />
          </Grid>

          {/* DESCRIPTION */}

          <Grid item xs={4}>
            <TextField
              label="Description"
              size="small"
              fullWidth
              value={leadObj.description || ""}
              onChange={(e) =>
                updateFormValue({
                  updateType: "description",
                  value: e.target.value,
                })
              }
            />
          </Grid>

          {/* ROTATION PATTERN */}

          <Grid item xs={12}>
            <Typography variant="subtitle1">Rotation Pattern</Typography>

            <RadioGroup
              value={leadObj.pattern_type || ""}
              onChange={(e) =>
                updateFormValue({
                  updateType: "pattern_type",
                  value: e.target.value,
                })
              }
            >
              <FormControlLabel
                value="days"
                control={<Radio />}
                label="After Specified No. Of Days"
              />

              <FormControlLabel
                value="monthDates"
                control={<Radio />}
                label="On The Specified Dates Of Month"
              />

              <FormControlLabel
                value="weekdays"
                control={<Radio />}
                label="On Specified Week Days"
              />
            </RadioGroup>

            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => setShowDaySelector(!showDaySelector)}
            >
              Select Days
            </Button>
          </Grid>

          {/* DAY SELECTOR */}

          {showDaySelector && (
            <Grid item xs={12}>
              <FormGroup row>
                {dayOptions.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={selectedDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                      />
                    }
                    label={day}
                  />
                ))}
              </FormGroup>
            </Grid>
          )}

          {/* SHOW SELECTED DAYS */}

          <Grid item xs={12}>
            <TextField
              label="Selected Days"
              size="small"
              fullWidth
              value={selectedDays.join(", ")}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* SHIFT PATTERN */}

          <Grid item xs={12}>
            <Typography variant="subtitle1">Shift Change Pattern</Typography>

            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => setShowShiftSelector(!showShiftSelector)}
            >
              Select Shifts
            </Button>
          </Grid>

          {/* SHIFT SELECTOR */}

          {showShiftSelector && (
            <Grid item xs={12}>
              <FormGroup row>
                {shifts.map((shift) => (
                  <FormControlLabel
                    key={shift.Shift_Code}
                    control={
                      <Checkbox
                        checked={selectedShiftCodes.includes(shift.Shift_Code)}
                        onChange={() => handleShiftChange(shift.Shift_Code)}
                      />
                    }
                    label={`${shift.Shift_Code} - ${shift.Shift_Desc}`}
                  />
                ))}
              </FormGroup>
            </Grid>
          )}

          {/* SHOW SELECTED SHIFTS */}

          <Grid item xs={12}>
            <TextField
              label="Selected Shifts"
              size="small"
              fullWidth
              value={selectedShiftCodes.join(", ")}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

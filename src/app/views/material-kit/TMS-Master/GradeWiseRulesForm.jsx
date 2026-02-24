import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function GradeWiseRulesForm() {
  const [formData, setFormData] = useState({
    grade: "",
    validLate: "0.05",
    validEarly: "",
    halfDayLate: "4",
    halfDayEarly: "4",
    deductLateExtra: true,
    deductEarlyExtra: false,
    presentDay: "Actual",
    minFullDay: "0.9",
    minHalfDay: "0.4",
    coffApplicable: true,
    deductLate: false,
    deductEarly: false,
    maxLateDays: "",
    deductDaysLate: "",
    thereafterLate: "",
    maxEarlyDays: "",
    deductDaysEarly: "",
    thereafterEarly: "",
    priority1: "CL",
    priority2: "PL",
    priority3: "SL",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCheckboxChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.checked });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "PAYROLL" }, { name: "Grade Wise Rules" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold"></Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" startIcon={<Icon>save</Icon>}>
              Save
            </Button>
          </Box>
        </Box>

        {/* Grade */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Grade"
              size="small"
              fullWidth
              value={formData.grade}
              onChange={handleChange("grade")}
            />
          </Grid>
        </Grid>

        {/* Section 1: Late/Early Rules */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Late Coming / Early Going Rules
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>
              <TextField
                label="Valid Late Coming (Hours)"
                size="small"
                fullWidth
                value={formData.validLate}
                onChange={handleChange("validLate")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Valid Early Going (Hours)"
                size="small"
                fullWidth
                value={formData.validEarly}
                onChange={handleChange("validEarly")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Deduct Half Day Late (Hours)"
                size="small"
                fullWidth
                value={formData.halfDayLate}
                onChange={handleChange("halfDayLate")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Deduct Half Day Early (Hours)"
                size="small"
                fullWidth
                value={formData.halfDayEarly}
                onChange={handleChange("halfDayEarly")}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.deductLateExtra}
                    onChange={handleCheckboxChange("deductLateExtra")}
                  />
                }
                label="Deduct Late Come From Extra Hrs"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.deductEarlyExtra}
                    onChange={handleCheckboxChange("deductEarlyExtra")}
                  />
                }
                label="Deduct Early Going From Extra Hrs"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Present Day</Typography>
              <RadioGroup
                row
                value={formData.presentDay}
                onChange={handleChange("presentDay")}
              >
                <FormControlLabel
                  value="Actual"
                  control={<Radio />}
                  label="Actual"
                />
                <FormControlLabel
                  value="Rounded"
                  control={<Radio />}
                  label="Rounded (0/.5/1)"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Min Presenty Req. For Full Day (%)"
                size="small"
                fullWidth
                value={formData.minFullDay}
                onChange={handleChange("minFullDay")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Min Presenty Req. For Half Day (%)"
                size="small"
                fullWidth
                value={formData.minHalfDay}
                onChange={handleChange("minHalfDay")}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Section 2: COff & Late Deduction */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            COff Applicable
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.coffApplicable}
                onChange={handleCheckboxChange("coffApplicable")}
              />
            }
            label="Enable COff"
          />

          <Typography variant="subtitle2" fontWeight="bold" mt={2}>
            Rule For Late Deduction
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.deductLate}
                onChange={handleCheckboxChange("deductLate")}
              />
            }
            label="Deduct Late Coming"
          />

          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>
              <Select size="small" fullWidth value="Days">
                <MenuItem value="Days">Days</MenuItem>
                <MenuItem value="Hours">Hours</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Max Late Days in Month"
                size="small"
                fullWidth
                value={formData.maxLateDays}
                onChange={handleChange("maxLateDays")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Deduct Days"
                size="small"
                fullWidth
                value={formData.deductDaysLate}
                onChange={handleChange("deductDaysLate")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Thereafter For Every Late"
                size="small"
                fullWidth
                value={formData.thereafterLate}
                onChange={handleChange("thereafterLate")}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Deduct From</Typography>
              <RadioGroup
                row
                value={formData.deductFromLate || "PresentDays"}
                onChange={handleChange("deductFromLate")}
              >
                <FormControlLabel
                  value="PresentDays"
                  control={<Radio />}
                  label="Present Days"
                />
                <FormControlLabel
                  value="Leaves"
                  control={<Radio />}
                  label="Leaves"
                />
              </RadioGroup>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Select
                size="small"
                fullWidth
                value={formData.priority1}
                onChange={handleChange("priority1")}
              >
                <MenuItem value="CL">CL</MenuItem>
                <MenuItem value="PL">PL</MenuItem>
                <MenuItem value="SL">SL</MenuItem>
              </Select>
              <Typography variant="caption">1st Priority</Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                size="small"
                fullWidth
                value={formData.priority2}
                onChange={handleChange("priority2")}
              >
                <MenuItem value="CL">CL</MenuItem>
                <MenuItem value="PL">PL</MenuItem>
                <MenuItem value="SL">SL</MenuItem>
              </Select>
              <Typography variant="caption">2nd Priority</Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                size="small"
                fullWidth
                value={formData.priority3}
                onChange={handleChange("priority3")}
              >
                <MenuItem value="CL">CL</MenuItem>
                <MenuItem value="PL">PL</MenuItem>
                <MenuItem value="SL">SL</MenuItem>
              </Select>
              <Typography variant="caption">3rd Priority</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Section 3: Early Deduction */}
        <Box mt={3}>
          <Typography variant="subtitle2" fontWeight="bold">
            Rule For Early Deduction
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.deductEarly}
                onChange={handleCheckboxChange("deductEarly")}
              />
            }
            label="Deduct Early Going"
          />

          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>
              <Select size="small" fullWidth value="Days">
                <MenuItem value="Days">Days</MenuItem>
                <MenuItem value="Hours">Hours</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Max Early Days in Month"
                size="small"
                fullWidth
                value={formData.maxEarlyDays}
                onChange={handleChange("maxEarlyDays")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Deduct Days"
                size="small"
                fullWidth
                value={formData.deductDaysEarly}
                onChange={handleChange("deductDaysEarly")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Thereafter For Every Early"
                size="small"
                fullWidth
                value={formData.thereafterEarly}
                onChange={handleChange("thereafterEarly")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Thereafter For Every Early"
                size="small"
                fullWidth
                value={formData.thereafterEarly}
                onChange={handleChange("thereafterEarly")}
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
            </Grid>
              <Grid item xs={3}></Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Deduct From</Typography>
              <RadioGroup
                row
                value={formData.deductFromLate || "PresentDays"}
                onChange={handleChange("deductFromLate")}
              >
                <FormControlLabel
                  value="PresentDays"
                  control={<Radio />}
                  label="Present Days"
                />
                <FormControlLabel
                  value="Leaves"
                  control={<Radio />}
                  label="Leaves"
                />
              </RadioGroup>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Select
                size="small"
                fullWidth
                value={formData.priority1}
                onChange={handleChange("priority1")}
              >
                <MenuItem value="CL">CL</MenuItem>
                <MenuItem value="PL">PL</MenuItem>
                <MenuItem value="SL">SL</MenuItem>
              </Select>
              <Typography variant="caption">1st Priority</Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                size="small"
                fullWidth
                value={formData.priority2}
                onChange={handleChange("priority2")}
              >
                <MenuItem value="CL">CL</MenuItem>
                <MenuItem value="PL">PL</MenuItem>
                <MenuItem value="SL">SL</MenuItem>
              </Select>
              <Typography variant="caption">2nd Priority</Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                size="small"
                fullWidth
                value={formData.priority3}
                onChange={handleChange("priority3")}
              >
                <MenuItem value="CL">CL</MenuItem>
                <MenuItem value="PL">PL</MenuItem>
                <MenuItem value="SL">SL</MenuItem>
              </Select>
              <Typography variant="caption">3rd Priority</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

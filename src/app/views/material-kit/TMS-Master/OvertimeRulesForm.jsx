import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function OvertimeRulesForm() {
  const [formData, setFormData] = useState({
    ruleCode: "",
    description: "",
    otApproval: "Yes",
    applicableOn: [],
    minHours: "",
    maxHours: "",
    unit: "UNIT-1",
  });

  const [slabs, setSlabs] = useState([
    { id: 1, from: "", to: "", roundTo: "" },
    { id: 2, from: "", to: "", roundTo: "" },
    { id: 3, from: "", to: "", roundTo: "" },
    { id: 4, from: "", to: "", roundTo: "" },
    { id: 5, from: "", to: "", roundTo: "" },
  ]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCheckboxChange = (value) => (event) => {
    const updated = event.target.checked
      ? [...formData.applicableOn, value]
      : formData.applicableOn.filter((v) => v !== value);
    setFormData({ ...formData, applicableOn: updated });
  };

  const handleSlabChange = (id, field) => (event) => {
    setSlabs(
      slabs.map((slab) =>
        slab.id === id ? { ...slab, [field]: event.target.value } : slab,
      ),
    );
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "TMS" }, { name: "Overtime Rules" }]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Box display="flex" gap={2}>
           
            <Button variant="contained" startIcon={<Icon>save</Icon>}>
              Save
            </Button>
          </Box>
        </Box>


        {/* Rule Details */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Rule Code"
              size="small"
              fullWidth
              value={formData.ruleCode}
              onChange={handleChange("ruleCode")}
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
        </Grid>

        {/* Approval */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            OT Approval
          </Typography>
          <RadioGroup
            row
            value={formData.otApproval}
            onChange={handleChange("otApproval")}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Applicable On */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            OT Applicable On
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.applicableOn.includes("Working Days")}
                    onChange={handleCheckboxChange("Working Days")}
                  />
                }
                label="Working Days"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.applicableOn.includes("Weekly Offs")}
                    onChange={handleCheckboxChange("Weekly Offs")}
                  />
                }
                label="Weekly Offs"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.applicableOn.includes("Public Holidays")}
                    onChange={handleCheckboxChange("Public Holidays")}
                  />
                }
                label="Public Holidays"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Hours */}
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Minimum OT Hrs"
                size="small"
                fullWidth
                value={formData.minHours}
                onChange={handleChange("minHours")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Maximum OT Hrs"
                size="small"
                fullWidth
                value={formData.maxHours}
                onChange={handleChange("maxHours")}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Slabs */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            OT Minutes Rounding
          </Typography>
          {slabs.map((slab) => (
            <Grid container spacing={2} key={slab.id} sx={{ mb: 1 }}>
              <Grid item xs={3}>
                <TextField
                  label="From"
                  size="small"
                  fullWidth
                  value={slab.from}
                  onChange={handleSlabChange(slab.id, "from")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="To"
                  size="small"
                  fullWidth
                  value={slab.to}
                  onChange={handleSlabChange(slab.id, "to")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Round To"
                  size="small"
                  fullWidth
                  value={slab.roundTo}
                  onChange={handleSlabChange(slab.id, "roundTo")}
                />
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

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
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const PreventiveSlipForm = () => {
  const [formData, setFormData] = useState({
    maintenanceType: "Preventive",
    slipNo: "",
    machine: "",
    preventiveReason: "",
    startAt: "",
    date: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Preventive Slip Entry saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Preventive Slip Entry" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Preventive Slip Entry</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* Maintenance Type */}
          <Grid item xs={12}>
            <RadioGroup
              row
              name="maintenanceType"
              value={formData.maintenanceType}
              onChange={handleChange}
            >
              <FormControlLabel value="Preventive" control={<Radio />} label="Preventive" />
              <FormControlLabel value="Periodic Overhauling" control={<Radio />} label="Periodic Overhauling" />
              <FormControlLabel value="Predictive" control={<Radio />} label="Predictive" />
            </RadioGroup>
          </Grid>

          {/* Slip No */}
          <Grid item xs={4}>
            <TextField
              label="Slip No"
              name="slipNo"
              value={formData.slipNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Machine */}
          <Grid item xs={8}>
            <TextField
              label="Machine"
              name="machine"
              value={formData.machine}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Preventive Reason */}
          <Grid item xs={12}>
            <TextField
              label="Preventive Reason"
              name="preventiveReason"
              value={formData.preventiveReason}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Start At */}
          <Grid item xs={6}>
            <TextField
              label="Start At"
              name="startAt"
              type="time"
              value={formData.startAt}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Date */}
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Remark */}
          <Grid item xs={12}>
            <TextField
              label="Remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PreventiveSlipForm;
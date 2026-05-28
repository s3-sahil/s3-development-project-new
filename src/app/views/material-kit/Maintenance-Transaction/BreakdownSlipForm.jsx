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
import { addBreakdownSlipEntry } from "app/utils/MaintenanceTransactionServices";
import { useState } from "react";

const BreakdownSlipForm = () => {
  const [formData, setFormData] = useState({
    maintenanceType: "Breakdown",
    slipNo: "",
    date: "",
    reason: "",
    machine: "",
    breakdownDate: "",
    breakdownTime: "",
    reportedTime: "",
    reportedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        slipNo: formData.slipNo,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        breakdownTime: formData.breakdownTime,
        reportedTime: formData.reportedTime,
        machine: formData.machine,
        reason: formData.reason,
        reportedBy: formData.reportedBy,
        shift: "",
        profcen_cd: "",
        breakdownDate: formData.breakdownDate
          ? new Date(formData.breakdownDate).toISOString()
          : null,
        flag: "s",
        productive_Flag: "s",
      };

      const res = await addBreakdownSlipEntry(payload);

      console.log("Response:", res);
      alert(res?.message || "Saved successfully!");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Maintenance" },
            { name: "Breakdown Slip Entry" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2></h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            {/* <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button> */}
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
              <FormControlLabel
                value="Breakdown"
                control={<Radio />}
                label="Breakdown"
              />
              <FormControlLabel
                value="Shutdown"
                control={<Radio />}
                label="Shutdown"
              />
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

          {/* Date */}
          <Grid item xs={4}>
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

          {/* Reason */}
          <Grid item xs={4}>
            <TextField
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Machine */}
          <Grid item xs={6}>
            <TextField
              label="Machine"
              name="machine"
              value={formData.machine}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Breakdown Date */}
          <Grid item xs={6}>
            <TextField
              label="Breakdown Date"
              name="breakdownDate"
              type="date"
              value={formData.breakdownDate}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Breakdown Time */}
          <Grid item xs={6}>
            <TextField
              label="Breakdown Time"
              name="breakdownTime"
              type="time"
              value={formData.breakdownTime}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Reported Time */}
          <Grid item xs={6}>
            <TextField
              label="Reported Time"
              name="reportedTime"
              type="time"
              value={formData.reportedTime}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Reported By */}
          <Grid item xs={6}>
            <TextField
              label="Reported By"
              name="reportedBy"
              value={formData.reportedBy}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BreakdownSlipForm;

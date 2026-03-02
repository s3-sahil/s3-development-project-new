import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const BreakdownStartForm = () => {
  const [formData, setFormData] = useState({
    slipNo: "",
    machine: "",
    startDate: "",
    startAt: "",
    reasonCode: "",
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
    alert("Breakdown/Shutdown Start Entry saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Breakdown/Shutdown Start Entry" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Breakdown / Shutdown Start Entry</h2>

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

          <Grid item xs={6}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

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

          <Grid item xs={6}>
            <TextField
              label="Reason Code"
              name="reasonCode"
              value={formData.reasonCode}
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

export default BreakdownStartForm;
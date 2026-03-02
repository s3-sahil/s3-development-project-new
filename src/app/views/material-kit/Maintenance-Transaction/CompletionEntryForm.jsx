import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const CompletionEntryForm = () => {
  const [formData, setFormData] = useState({
    slipNo: "",
    machine: "",
    date: "",
    actualReason: "",
    finishedAt: "",
    rootCause: "",
    completionStatus: "",
    correctiveAction: "",
    otherLabour: "",
    otherRepairs: "",
    serviceContract: "",
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
    alert("Completion Entry saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Completion Entry" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Completion Entry</h2>

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

          <Grid item xs={4}>
            <TextField
              label="Machine"
              name="machine"
              value={formData.machine}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

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

          <Grid item xs={6}>
            <TextField
              label="Actual Reason"
              name="actualReason"
              value={formData.actualReason}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Finished At"
              name="finishedAt"
              type="time"
              value={formData.finishedAt}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Root Cause"
              name="rootCause"
              value={formData.rootCause}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="Improper Lubrication">Improper Lubrication</MenuItem>
              <MenuItem value="Operator Error">Operator Error</MenuItem>
              <MenuItem value="Material Defect">Material Defect</MenuItem>
              <MenuItem value="Wear & Tear">Wear & Tear</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Completion Status"
              name="completionStatus"
              value={formData.completionStatus}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Corrective Action"
              name="correctiveAction"
              value={formData.correctiveAction}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Other Labour"
              name="otherLabour"
              value={formData.otherLabour}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Other Repairs"
              name="otherRepairs"
              value={formData.otherRepairs}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Service Contract"
              name="serviceContract"
              value={formData.serviceContract}
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

export default CompletionEntryForm;
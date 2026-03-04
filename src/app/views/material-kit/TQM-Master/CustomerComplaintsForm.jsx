import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function CustomerComplaintsForm() {
  const [formData, setFormData] = useState({
    complaintNo: "",
    customer: "",
    attendedBy: "",
    dispositionAction: "",
    containmentAction: "",
    correctiveAction: "",
    correctiveImpact: "",
    correctiveVerification: "",
    status: "",
    date: "",
    attendedDate: "",
    dispositionRemark: "",
    rootCause: "",
    responsibility: "",
    certifiedBy: "",
    verifiedBy: "",
    feedback: "",
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "Customer Complaints" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Customer Complaints
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Complaint No" size="small" fullWidth value={formData.complaintNo} onChange={handleChange("complaintNo")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Customer" size="small" fullWidth value={formData.customer} onChange={handleChange("customer")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Attended By" size="small" fullWidth value={formData.attendedBy} onChange={handleChange("attendedBy")} />
          </Grid>
          <Grid item xs={6}>
            <TextField select label="Disposition Action" size="small" fullWidth value={formData.dispositionAction} onChange={handleChange("dispositionAction")}>
              <MenuItem value="Repair">Repair</MenuItem>
              <MenuItem value="Replace">Replace</MenuItem>
              <MenuItem value="Reject">Reject</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Containment Action" size="small" fullWidth value={formData.containmentAction} onChange={handleChange("containmentAction")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Corrective Action" size="small" fullWidth value={formData.correctiveAction} onChange={handleChange("correctiveAction")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Corrective Action Impact" size="small" fullWidth value={formData.correctiveImpact} onChange={handleChange("correctiveImpact")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Corrective Action Verification" size="small" fullWidth value={formData.correctiveVerification} onChange={handleChange("correctiveVerification")} />
          </Grid>
          <Grid item xs={6}>
            <TextField select label="Status" size="small" fullWidth value={formData.status} onChange={handleChange("status")}>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Root Cause Analysis" size="small" fullWidth value={formData.rootCause} onChange={handleChange("rootCause")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Responsibility" size="small" fullWidth value={formData.responsibility} onChange={handleChange("responsibility")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Certified By" size="small" fullWidth value={formData.certifiedBy} onChange={handleChange("certifiedBy")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Verified By" size="small" fullWidth value={formData.verifiedBy} onChange={handleChange("verifiedBy")} />
          </Grid>
          <Grid item xs={6}>
            <TextField select label="Feedback to Customer" size="small" fullWidth value={formData.feedback} onChange={handleChange("feedback")}>
              <MenuItem value="Positive">Positive</MenuItem>
              <MenuItem value="Neutral">Neutral</MenuItem>
              <MenuItem value="Negative">Negative</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
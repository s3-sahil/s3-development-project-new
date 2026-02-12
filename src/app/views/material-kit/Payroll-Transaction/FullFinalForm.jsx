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

const FullFinalForm = () => {
  const [formData, setFormData] = useState({
    employeeNo: "",
    fullFinalDate: "",
    reason: "",
    companyLoan: "",
    advance: "",
    socLoan: "",
    otherRecovery1: "",
    remark1: "",
    otherRecovery2: "",
    remark2: "",
    otherRecovery3: "",
    remark3: "",
    otherRecovery4: "",
    remark4: "",
    lta: "",
    medicalAllow: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Full & Final Save:", formData);
    alert("Full & Final Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Full and Final Entry" },
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
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Employee No"
              name="employeeNo"
              value={formData.employeeNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="date"
              label="Full and Final Date"
              name="fullFinalDate"
              value={formData.fullFinalDate}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Reason of Leaving"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Company Loan" name="companyLoan" value={formData.companyLoan} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Advance" name="advance" value={formData.advance} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Soc. Loan" name="socLoan" value={formData.socLoan} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Other Recoveries */}
          <Grid item xs={3}>
            <TextField label="Other Recovery 1" name="otherRecovery1" value={formData.otherRecovery1} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Remark 1" name="remark1" value={formData.remark1} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Other Recovery 2" name="otherRecovery2" value={formData.otherRecovery2} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Remark 2" name="remark2" value={formData.remark2} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Other Recovery 3" name="otherRecovery3" value={formData.otherRecovery3} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Remark 3" name="remark3" value={formData.remark3} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Other Recovery 4" name="otherRecovery4" value={formData.otherRecovery4} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Remark 4" name="remark4" value={formData.remark4} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="LTA" name="lta" value={formData.lta} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Medical Allow" name="medicalAllow" value={formData.medicalAllow} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FullFinalForm;

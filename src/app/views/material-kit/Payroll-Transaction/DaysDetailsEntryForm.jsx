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

const DaysDetailsEntryForm = () => {
  const [formData, setFormData] = useState({
    period: "",
    employeeNo: "",
    payableDays: "",
    absentDays: "",
    casualLeave: "",
    sickLeave: "",
    paidLeave: "",
    maternityLeave: "",
    compensatoryOff: "",
    weeklyOff: "",
    lwpAuthorized: "",
    publicHoliday: "",
    presentDays: "",
    overtimeHours: "",
    remark: "",
    division: "",
    miscEarning1: "",
    miscEarning2: "",
    miscEarning3: "",
    miscEarning4: "",
    arrearDays: "",
    arrearCasualLeave: "",
    arrearSickLeave: "",
    arrearEarnedLeave: "",
    arrearMaternity: "",
    arrearOvertime: "",
    lwpUnAuth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Days Details Saved:", formData);
    alert("Days Details Entry Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Days Details Entry" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Days Details Entry</h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          {Object.keys(formData).map((field) => (
            <Grid item xs={4} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default DaysDetailsEntryForm;
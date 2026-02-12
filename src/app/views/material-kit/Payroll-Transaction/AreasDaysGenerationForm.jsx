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

const AreasDaysGenerationForm = () => {
  const [formData, setFormData] = useState({
    employeeType: "all",
    period: "",
    employee: "",
    arrearFrom: "",
    arrearTo: "",
    arrearDays: "",
    arrearOT: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Arrears Saved:", formData);
    alert("Arrears Entry Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Arrears Days Generation Entry" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
          <Grid item xs={12}>
            <RadioGroup
              row
              name="employeeType"
              value={formData.employeeType}
              onChange={handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="particular" control={<Radio />} label="Particular" />
            </RadioGroup>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Period"
              name="period"
              value={formData.period}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Employee"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="date"
              label="Arrear From"
              name="arrearFrom"
              value={formData.arrearFrom}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="date"
              label="Arrear To"
              name="arrearTo"
              value={formData.arrearTo}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Arrear Days"
              name="arrearDays"
              value={formData.arrearDays}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Arrear OT"
              name="arrearOT"
              value={formData.arrearOT}
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

export default AreasDaysGenerationForm;
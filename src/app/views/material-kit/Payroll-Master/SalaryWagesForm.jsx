import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Icon,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function SalaryWagesForm() {
  const [formData, setFormData] = useState({
    employeeNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    department: "",
    grade: "",
    designation: "",
    pfNo: "",
    uan: "",
    otRate: "",
    status: "",
    periodInDays: 0,
    probationStartDate: "",
    confirmDate: "",
    tempEndDate: "",
    incrDate: "",
    incrRemark: "",
    basic: "",
    fixedBasic: "",
    fixDA: "",
    hra: "",
    medical: "",
    conveyance: "",
    otherPayment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Payroll" }, { name: "Salary / Wages Details" }]} />
      </Box>

      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          {/* <Icon>arrow_back</Icon>
          <Box fontSize={20} fontWeight="bold" color="purple">
            Salary / Wages Details
          </Box> */}
        </Box>

        <Button variant="contained" color="secondary" startIcon={<Icon>save</Icon>}>
          Save
        </Button>
      </Box>

      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={2}>
          {/* Employee */}
          <Grid item xs={4}>
            <TextField label="Employee No" name="employeeNo" size="small" fullWidth onChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="First Name" name="firstName" size="small" fullWidth onChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Last Name" name="lastName" size="small" fullWidth onChange={handleChange} />
          </Grid>

          {/* Dept */}
          <Grid item xs={4}>
            <TextField label="Department" name="department" size="small" fullWidth onChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Grade" name="grade" size="small" fullWidth onChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Designation" name="designation" size="small" fullWidth onChange={handleChange} />
          </Grid>

          {/* PF */}
          <Grid item xs={4}>
            <TextField label="PF No" name="pfNo" size="small" fullWidth onChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="UAN" name="uan" size="small" fullWidth onChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="OT Rate" name="otRate" size="small" fullWidth onChange={handleChange} />
          </Grid>

          {/* Dates */}
          <Grid item xs={4}>
            <TextField type="date" label="Probation Start Date" name="probationStartDate" size="small" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <TextField type="date" label="Confirm Date" name="confirmDate" size="small" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <TextField type="date" label="Temporary End Date" name="tempEndDate" size="small" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} />
          </Grid>

          {/* Payment Type */}
          <Grid item xs={6}>
            <RadioGroup row>
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="bank" control={<Radio />} label="Bank" />
              <FormControlLabel value="dd" control={<Radio />} label="DD" />
            </RadioGroup>
          </Grid>

          {/* Salary */}
          <Grid item xs={3}>
            <TextField label="Basic" name="basic" size="small" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="HRA" name="hra" size="small" fullWidth onChange={handleChange} />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Medical Allowance" name="medical" size="small" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Conveyance" name="conveyance" size="small" fullWidth onChange={handleChange} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
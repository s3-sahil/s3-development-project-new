import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function EmployeeInformationForm() {
  const [formData, setFormData] = useState({
    employeeNo: "286",
    firstName: "",
    middleName: "",
    lastName: "",
    department: "",
    grade: "",
    designation: "",
    email: "",
    mobileNumber: "",
    birthDate: "",
    joinDate: "",
    gender: "Male",
    maritalStatus: "Unmarried",
    panNo: "",
    qualification: "",
    city: "",
    state: "",
    pinNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Employee Form Data:", formData);
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Payroll" }, { name: "Employee Information" }]} />
      </Box>

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
         
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      {/* Form */}
      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField label="Employee No" name="employeeNo" value={formData.employeeNo} size="small" fullWidth disabled />
          </Grid>

          <Grid item xs={4}>
            <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Department" name="department" value={formData.department} onChange={handleChange} size="small" fullWidth select>
              <MenuItem value="04">04</MenuItem>
              <MenuItem value="10">10</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField label="Designation" name="designation" value={formData.designation} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Grade" name="grade" value={formData.grade} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="E-mail" name="email" value={formData.email} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Birth Date" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Join Date" type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          {/* Gender */}
          <Grid item xs={6}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </Grid>

          {/* Marital */}
          <Grid item xs={6}>
            <FormLabel>Marital Status</FormLabel>
            <RadioGroup row name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
              <FormControlLabel value="Married" control={<Radio />} label="Married" />
              <FormControlLabel value="Unmarried" control={<Radio />} label="Unmarried" />
            </RadioGroup>
          </Grid>

          <Grid item xs={4}>
            <TextField label="PAN No" name="panNo" value={formData.panNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="City" name="city" value={formData.city} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="State" name="state" value={formData.state} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Pin No" name="pinNo" value={formData.pinNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
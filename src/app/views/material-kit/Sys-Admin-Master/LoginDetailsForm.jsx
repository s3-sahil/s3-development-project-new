import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const LoginDetailsForm = () => {
  const [formData, setFormData] = useState({
    loginName: "",
    password: "",
    role: "",
    loginAlias: "",
    employeeNo: "",
    email: "",
    profileName: "",
    divisions: [],
    expiryDate: "",
  });

  const divisionOptions = [
    "All Division",
    "UNIT-1 - 2",
    "TEST - 9",
    "UNIT-2 - 3",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDivisionChange = (division) => {
    setFormData((prev) => ({
      ...prev,
      divisions: prev.divisions.includes(division)
        ? prev.divisions.filter((d) => d !== division)
        : [...prev.divisions, division],
    }));
  };

  const handleSave = () => {
    console.log("Login Details Saved:", formData);
    alert("Login Details Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "System Admin" },
            { name: "Login Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Login Details</h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={6}>
            <TextField
              label="Login Name"
              name="loginName"
              value={formData.loginName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Login Alias"
              name="loginAlias"
              value={formData.loginAlias}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <TextField
              label="Employee No"
              name="employeeNo"
              value={formData.employeeNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email Id"
              name="email"
              value={formData.email}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Profile */}
          <Grid item xs={12}>
            <TextField
              label="Profile Name"
              name="profileName"
              value={formData.profileName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Division */}
          <Grid item xs={12}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                p: 2,
                maxHeight: 120,
                overflowY: "auto",
              }}
            >
              <strong>Division</strong>
              {divisionOptions.map((div) => (
                <Box key={div}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.divisions.includes(div)}
                        onChange={() => handleDivisionChange(div)}
                      />
                    }
                    label={div}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Expiry Date */}
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Expiry Date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginDetailsForm;
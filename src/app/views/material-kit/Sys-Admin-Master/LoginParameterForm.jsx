import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Icon,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginParameterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state || null;

  const [formData, setFormData] = useState({
    option: editData?.option || "expired",
    login: editData?.login || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Login Parameter Saved:", formData);
    alert("Login Parameter Saved (UI Only)");
    navigate("/sysadmin/login-parameter");
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "System Admin" },
            { name: "Login Parameter" },
          ]}
        />
      </Box>

      {/* Card */}
      <Box sx={{ background: "#fff", p: 4, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <h2>Login Parameter</h2>

          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        {/* Form Content */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "#f9f9f9",
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <FormControl>
                <FormLabel>Options</FormLabel>
                <RadioGroup
                  row
                  name="option"
                  value={formData.option}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="expired"
                    control={<Radio />}
                    label="Expired Login"
                  />
                  <FormControlLabel
                    value="alternate"
                    control={<Radio />}
                    label="Assign Alternate Login"
                  />
                </RadioGroup>
              </FormControl>

              <Box mt={3}>
                <TextField
                  label="Login"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginParameterForm;
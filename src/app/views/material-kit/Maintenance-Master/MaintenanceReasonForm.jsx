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
  Checkbox,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const MaintenanceReasonForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    category: "BreakDown",
    toBeChecked: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Maintenance Reason saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Reason Master" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Maintenance Reason Master</h2>

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
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <RadioGroup
              row
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <FormControlLabel value="Preventive" control={<Radio />} label="Preventive" />
              <FormControlLabel value="BreakDown" control={<Radio />} label="BreakDown" />
              <FormControlLabel value="ShutDown" control={<Radio />} label="ShutDown" />
              <FormControlLabel value="Periodic Overhauling" control={<Radio />} label="Periodic Overhauling" />
              <FormControlLabel value="Predictive" control={<Radio />} label="Predictive" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.toBeChecked}
                  onChange={handleChange}
                  name="toBeChecked"
                />
              }
              label="To Be Checked"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MaintenanceReasonForm;
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function CriticalInspectionForm() {
  const [formData, setFormData] = useState({
    parameter: "",
    dimensionApplicable: false,
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, dimensionApplicable: event.target.checked });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "TQM" }, { name: "Critical Inspection Parameter" }]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Critical Inspection Parameter
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Critical Parameter"
              size="small"
              fullWidth
              value={formData.parameter}
              onChange={handleChange("parameter")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.dimensionApplicable}
                  onChange={handleCheckboxChange}
                />
              }
              label="Dimension Applicable"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
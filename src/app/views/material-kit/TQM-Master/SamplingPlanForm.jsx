import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function SamplingPlanForm() {
  const [formData, setFormData] = useState({
    itemCategory: "",
    lotSize: "",
    sample: "",
    sampleSize: "",
    cumulativeSample: "",
    acceptanceNo: "",
    rejectedNo: "",
    uom: "",
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "Inspection Sampling Plan" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Inspection Sampling Plan
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          {Object.keys(formData).map((field) =>
            field !== "unit" ? (
              <Grid item xs={4} key={field}>
                <TextField
                  label={field.replace(/([A-Z])/g, " $1")}
                  size="small"
                  fullWidth
                  value={formData[field]}
                  onChange={handleChange(field)}
                />
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>
    </Container>
  );
}
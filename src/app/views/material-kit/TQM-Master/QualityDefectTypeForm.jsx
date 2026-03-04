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

export default function QualityDefectTypeForm() {
  const [formData, setFormData] = useState({
    defectCategory: "",
    defectType: "",
    desc: "",
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "Quality Defect Type" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Quality Defect Type
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Defect Category" size="small" fullWidth value={formData.defectCategory} onChange={handleChange("defectCategory")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Defect Type" size="small" fullWidth value={formData.defectType} onChange={handleChange("defectType")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Description" size="small" fullWidth value={formData.desc} onChange={handleChange("desc")} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
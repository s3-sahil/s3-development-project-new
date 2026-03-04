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

export default function QualityDefectMasterForm() {
  const [formData, setFormData] = useState({
    defectType: "",
    defectCode: "",
    defectDetails: "",
    operationCode: "",
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
          <Grid item xs={6}>
            <TextField
              label="Defect Type"
              size="small"
              fullWidth
              value={formData.defectType}
              onChange={handleChange("defectType")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Defect Code"
              size="small"
              fullWidth
              value={formData.defectCode}
              onChange={handleChange("defectCode")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Defect Details"
              size="small"
              fullWidth
              value={formData.defectDetails}
              onChange={handleChange("defectDetails")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Operation Code"
              size="small"
              fullWidth
              value={formData.operationCode}
              onChange={handleChange("operationCode")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
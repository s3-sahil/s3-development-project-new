import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ODDetailsForm() {
  const [formData, setFormData] = useState({
    employee: "",
    odDate: "",
    odHours: "",
    remark: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "OD Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Employee" size="small" fullWidth value={formData.employee} onChange={handleChange("employee")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="OD Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.odDate} onChange={handleChange("odDate")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="OD Hours" size="small" fullWidth value={formData.odHours} onChange={handleChange("odHours")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Remark" size="small" fullWidth value={formData.remark} onChange={handleChange("remark")} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
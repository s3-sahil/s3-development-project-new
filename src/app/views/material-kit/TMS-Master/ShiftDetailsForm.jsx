import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Icon,
    TextField,
    Typography
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ShiftDetailsForm() {
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state;

  const [formData, setFormData] = useState({
    shiftCode: "",
    description: "",
    shiftStart: "",
    shiftEnd: "",
    totalHrs: "",
    lunchStart: "",
    lunchEnd: "",
    earlyIn: "",
    division: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Shift Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            {id ? "Edit Shift Details" : "New Shift Details"}
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={3}><TextField label="Shift Code" size="small" fullWidth value={formData.shiftCode} onChange={handleChange("shiftCode")} /></Grid>
          <Grid item xs={3}><TextField label="Description" size="small" fullWidth value={formData.description} onChange={handleChange("description")} /></Grid>
          <Grid item xs={3}><TextField label="Shift Start" size="small" fullWidth value={formData.shiftStart} onChange={handleChange("shiftStart")} /></Grid>
          <Grid item xs={3}><TextField label="Shift End" size="small" fullWidth value={formData.shiftEnd} onChange={handleChange("shiftEnd")} /></Grid>
          <Grid item xs={3}><TextField label="Total Hrs" size="small" fullWidth value={formData.totalHrs} onChange={handleChange("totalHrs")} /></Grid>
          <Grid item xs={3}><TextField label="Lunch Start" size="small" fullWidth value={formData.lunchStart} onChange={handleChange("lunchStart")} /></Grid>
          <Grid item xs={3}><TextField label="Lunch End" size="small" fullWidth value={formData.lunchEnd} onChange={handleChange("lunchEnd")} /></Grid>
          <Grid item xs={3}><TextField label="Early In" size="small" fullWidth value={formData.earlyIn} onChange={handleChange("earlyIn")} /></Grid>
          <Grid item xs={3}><TextField label="Division" size="small" fullWidth value={formData.division} onChange={handleChange("division")} /></Grid>
        </Grid>
      </Box>
    </Container>
  );
}
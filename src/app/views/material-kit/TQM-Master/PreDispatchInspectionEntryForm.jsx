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

export default function PreDispatchInspectionEntryForm() {
  const [formData, setFormData] = useState({
    customerCode: "",
    invoiceNo: "",
    invoiceDate: "",
    productCode: "",
    serialNo: "",
    parameter: "",
    dimension: "",
    dimensionMin: "",
    dimensionMax: "",
    observations: Array(10).fill(""),
    actualValue: "",
    remark: "",
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleObservationChange = (index) => (event) => {
    const updated = [...formData.observations];
    updated[index] = event.target.value;
    setFormData({ ...formData, observations: updated });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: "TQM" },
            { name: "Pre-Dispatch Inspection Entry" },
          ]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Pre-Dispatch Inspection Entry
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Customer Code" size="small" fullWidth value={formData.customerCode} onChange={handleChange("customerCode")} /></Grid>
          <Grid item xs={4}><TextField label="Invoice No" size="small" fullWidth value={formData.invoiceNo} onChange={handleChange("invoiceNo")} /></Grid>
          <Grid item xs={4}><TextField label="Invoice Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.invoiceDate} onChange={handleChange("invoiceDate")} /></Grid>
          <Grid item xs={4}><TextField label="Product Code" size="small" fullWidth value={formData.productCode} onChange={handleChange("productCode")} /></Grid>
          <Grid item xs={4}><TextField label="Serial No" size="small" fullWidth value={formData.serialNo} onChange={handleChange("serialNo")} /></Grid>
          <Grid item xs={4}><TextField label="Parameter" size="small" fullWidth value={formData.parameter} onChange={handleChange("parameter")} /></Grid>
          <Grid item xs={4}><TextField label="Dimension" size="small" fullWidth value={formData.dimension} onChange={handleChange("dimension")} /></Grid>
          <Grid item xs={4}><TextField label="Dimension Min" size="small" fullWidth value={formData.dimensionMin} onChange={handleChange("dimensionMin")} /></Grid>
          <Grid item xs={4}><TextField label="Dimension Max" size="small" fullWidth value={formData.dimensionMax} onChange={handleChange("dimensionMax")} /></Grid>

          {/* Observations */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">Observations</Typography>
          </Grid>
          {formData.observations.map((obs, index) => (
            <Grid item xs={2} key={index}>
              <TextField
                label={`Obs ${index + 1}`}
                size="small"
                fullWidth
                value={obs}
                onChange={handleObservationChange(index)}
              />
            </Grid>
          ))}

          <Grid item xs={4}><TextField label="Actual Value" size="small" fullWidth value={formData.actualValue} onChange={handleChange("actualValue")} /></Grid>
          <Grid item xs={8}><TextField label="Remark" size="small" fullWidth value={formData.remark} onChange={handleChange("remark")} /></Grid>
        </Grid>
      </Box>
    </Container>
  );
}
import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function MaterialStockAdjustmentForm() {
  const [formData, setFormData] = useState({
    adjustmentNo: "",
    date: "",
    project: "",
    department: "",
    employee: "",
    remark: "",
    itemCode: "",
    uom: "",
    identification: "",
    location: "",
    rate: "",
    quantity: "",
    avlStock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Material Stock Adjustment Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Stock Adjustment" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="Adjustment No." name="adjustmentNo" value={formData.adjustmentNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Project" name="project" value={formData.project} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Department" name="department" value={formData.department} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Employee" name="employee" value={formData.employee} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="UOM" name="uom" value={formData.uom} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Identification" name="identification" value={formData.identification} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Rate" name="rate" value={formData.rate} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Available Stock" name="avlStock" value={formData.avlStock} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
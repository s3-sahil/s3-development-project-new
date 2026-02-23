import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Typography,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function MaterialRequisitionForm() {
  const [formData, setFormData] = useState({
    mrNo: "",
    date: "",
    type: "",
    mrForOutwardChallan: false,
    vendor: "",
    requiredDate: "",
    project: "",
    department: "",
    poNo: "",
    requisitionBy: "",
    deptCode: "",
    referWorkorder: false,
    remark: "",
    itemCode: "",
    avlStock: "",
    uom: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Material Requisition Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Material Requisition" }]} />
      </Box>

      <Paper sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Save Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        {/* Section: Requisition Details */}
        <Typography variant="h6" gutterBottom>Requisition Details</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={6}><TextField label="MR No." name="mrNo" value={formData.mrNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Type" name="type" value={formData.type} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><FormControlLabel control={<Checkbox checked={formData.mrForOutwardChallan} onChange={handleChange} name="mrForOutwardChallan" />} label="MR For Outward Challan" /></Grid>
          <Grid item xs={6}><TextField label="Vendor" name="vendor" value={formData.vendor} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Required Date" name="requiredDate" type="date" value={formData.requiredDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Project" name="project" value={formData.project} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Department" name="department" value={formData.department} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="PO No." name="poNo" value={formData.poNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Requisition By" name="requisitionBy" value={formData.requisitionBy} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Dept Code" name="deptCode" value={formData.deptCode} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><FormControlLabel control={<Checkbox checked={formData.referWorkorder} onChange={handleChange} name="referWorkorder" />} label="Refer Workorder / Jobcard" /></Grid>
          <Grid item xs={12}><TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth multiline rows={2} /></Grid>
        </Grid>

        {/* Section: Item Details */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>Item Details</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={6}><TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Available Stock" name="avlStock" value={formData.avlStock} onChange={handleChange} size="small" fullWidth /></Grid>
            <Grid item xs={6}><TextField label="UOM" name="uom" value={formData.uom} onChange={handleChange} size="small" fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} size="small" fullWidth /></Grid>
          </Grid>

          <Box mt={2} display="flex" gap={2}>
            <Button variant="outlined" startIcon={<Icon>add</Icon>}>Add</Button>
            <Button variant="outlined" color="error" startIcon={<Icon>remove</Icon>}>Remove</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
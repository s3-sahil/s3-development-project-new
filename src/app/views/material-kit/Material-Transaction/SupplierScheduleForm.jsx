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

export default function SupplierScheduleForm() {
  const [formData, setFormData] = useState({
    scheduleNo: "",
    date: "",
    supplierCode: "",
    poNo: "",
    itemCode: "",
    uom: "",
    quantity: "",
    deliveryDate: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Supplier Schedule Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Supplier Schedule" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="Schedule No." name="scheduleNo" value={formData.scheduleNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Supplier Code" name="supplierCode" value={formData.supplierCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="PO No." name="poNo" value={formData.poNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="UOM" name="uom" value={formData.uom} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Delivery Date" name="deliveryDate" type="date" value={formData.deliveryDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth multiline rows={2} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
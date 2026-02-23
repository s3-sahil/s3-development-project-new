import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function PurchaseLineRejectionForm() {
  const [formData, setFormData] = useState({
    rejectionNo: "",
    date: "",
    stock: false,
    referWo: false,
    woNo: "",
    supplier: "",
    grnType: "",
    customer: "",
    grnNo: "",
    grnDate: "",
    poNo: "",
    poDate: "",
    department: "",
    remark: "",
  });

  const [items, setItems] = useState([
    { itemCode: "", identification: "", location: "", quantity: "", batchNo: "", defect: "" },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { itemCode: "", identification: "", location: "", quantity: "", batchNo: "", defect: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSave = () => {
    console.log("Saved:", { ...formData, items });
    alert("Purchase Line Rejection Saved with Items (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Purchase Line Rejection" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        {/* Header Fields */}
        <Grid container spacing={3}>
          <Grid item xs={6}><TextField label="Rejection No." name="rejectionNo" value={formData.rejectionNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.stock} onChange={handleChange} name="stock" />} label="Stock" />
            <FormControlLabel control={<Checkbox checked={formData.referWo} onChange={handleChange} name="referWo" />} label="Refer WO" />
          </Grid>
          <Grid item xs={6}><TextField label="WO No." name="woNo" value={formData.woNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Supplier" name="supplier" value={formData.supplier} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="GRN Type" name="grnType" value={formData.grnType} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Customer" name="customer" value={formData.customer} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="GRN No." name="grnNo" value={formData.grnNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="GRN Date" name="grnDate" type="date" value={formData.grnDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="PO No." name="poNo" value={formData.poNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="PO Date" name="poDate" type="date" value={formData.poDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Department" name="department" value={formData.department} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth multiline rows={2} /></Grid>
        </Grid>

        {/* Item Grid */}
        <Box mt={4}>
          <h3>Item Details</h3>
          {items.map((item, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={2}><TextField label="Item Code" name="itemCode" value={item.itemCode} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Identification" name="identification" value={item.identification} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Location" name="location" value={item.location} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Quantity" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Batch No." name="batchNo" value={item.batchNo} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Defect" name="defect" value={item.defect} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={12}><Button color="error" onClick={() => removeItem(index)}>Remove</Button></Grid>
            </Grid>
          ))}
          <Box mt={2}>
            <Button variant="outlined" startIcon={<Icon>add</Icon>} onClick={addItem}>
              Add Item
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
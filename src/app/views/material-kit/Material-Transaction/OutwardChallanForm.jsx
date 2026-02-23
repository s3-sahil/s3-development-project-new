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

export default function OutwardChallanForm() {
  const [formData, setFormData] = useState({
    challanNo: "",
    date: "",
    outwardType: "Normal",
    billable: false,
    returnable: false,
    packingDetails: false,
    materialValue: "",
    returnDate: "",
    supplier: "",
    poNo: "",
    poDate: "",
    transporter: "",
    transportBy: "Road",
    vehicleNo: "",
    ewayBillNo: "",
    remark: "",
  });

  const [items, setItems] = useState([
    { item: "", quantity: "", unit: "", totalWeight: "", operation: "", remark: "" },
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
    setItems([...items, { item: "", quantity: "", unit: "", totalWeight: "", operation: "", remark: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSave = () => {
    console.log("Saved:", { ...formData, items });
    alert("Outward Challan Saved with Items (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Outward Challan" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        {/* Header Fields */}
        <Grid container spacing={3}>
          <Grid item xs={6}><TextField label="Challan No." name="challanNo" value={formData.challanNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Outward Type" name="outwardType" value={formData.outwardType} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Material Value" name="materialValue" value={formData.materialValue} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Return Date" name="returnDate" type="date" value={formData.returnDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Supplier" name="supplier" value={formData.supplier} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="PO No." name="poNo" value={formData.poNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="PO Date" name="poDate" type="date" value={formData.poDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Transporter" name="transporter" value={formData.transporter} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Transport By" name="transportBy" value={formData.transportBy} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Vehicle No." name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Eway Bill No." name="ewayBillNo" value={formData.ewayBillNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth multiline rows={2} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.billable} onChange={handleChange} name="billable" />} label="Billable" />
            <FormControlLabel control={<Checkbox checked={formData.returnable} onChange={handleChange} name="returnable" />} label="Returnable" />
            <FormControlLabel control={<Checkbox checked={formData.packingDetails} onChange={handleChange} name="packingDetails" />} label="Packing Details" />
          </Grid>
        </Grid>

        {/* Item Grid */}
        <Box mt={4}>
          <h3>Item Details</h3>
          {items.map((item, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={2}><TextField label="Item" name="item" value={item.item} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Quantity" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Unit" name="unit" value={item.unit} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Total Weight" name="totalWeight" value={item.totalWeight} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Operation" name="operation" value={item.operation} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Remark" name="remark" value={item.remark} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
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
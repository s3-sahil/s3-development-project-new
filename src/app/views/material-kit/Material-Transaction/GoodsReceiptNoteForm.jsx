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

export default function GoodsReceiptNoteForm() {
  const [formData, setFormData] = useState({
    grnNo: "",
    date: "",
    grnType: "Jobwork",
    billable: false,
    gateInDate: "",
    gateInNo: "",
    supplier: "",
    poNo: "",
    poDate: "",
    dept: "",
    challanNo: "",
    challanDate: "",
    invNo: "",
    invDate: "",
    lrNo: "",
    lrDate: "",
    lrWt: "",
    lrUom: "",
    invAmt: "",
    sgstAmt: "",
    cgstAmt: "",
    igstAmt: "",
    ewayBillNo: "",
    remark: "",
  });

  const [items, setItems] = useState([
    { itemCode: "", itemName: "", hsnCode: "", operation: "", challanQty: "", actualQty: "", uom: "", amount: "" },
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
    setItems([...items, { itemCode: "", itemName: "", hsnCode: "", operation: "", challanQty: "", actualQty: "", uom: "", amount: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSave = () => {
    console.log("Saved:", { ...formData, items });
    alert("Goods Receipt Note (Jobwork) Saved with Items (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Goods Receipt Note" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        {/* Header Fields */}
        <Grid container spacing={3}>
          {Object.keys(formData).map((key) =>
            key === "billable" ? (
              <Grid item xs={6} key={key}>
                <FormControlLabel
                  control={<Checkbox checked={formData.billable} onChange={handleChange} name="billable" />}
                  label="Billable"
                />
              </Grid>
            ) : (
              <Grid item xs={6} key={key}>
                <TextField
                  label={key.replace(/([A-Z])/g, " $1")}
                  name={key}
                  type={key.toLowerCase().includes("date") ? "date" : "text"}
                  value={formData[key]}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  InputLabelProps={key.toLowerCase().includes("date") ? { shrink: true } : {}}
                />
              </Grid>
            )
          )}
        </Grid>

        {/* Item Grid */}
        <Box mt={4}>
          <h3>Item Details</h3>
          {items.map((item, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={2}><TextField label="Item Code" name="itemCode" value={item.itemCode} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Item Name" name="itemName" value={item.itemName} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="HSN Code" name="hsnCode" value={item.hsnCode} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Operation" name="operation" value={item.operation} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Challan Qty" name="challanQty" value={item.challanQty} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Actual Qty" name="actualQty" value={item.actualQty} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="UOM" name="uom" value={item.uom} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}><TextField label="Amount" name="amount" value={item.amount} onChange={(e) => handleItemChange(index, e)} size="small" fullWidth /></Grid>
              <Grid item xs={2}>
                <Button color="error" onClick={() => removeItem(index)}>Remove</Button>
              </Grid>
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
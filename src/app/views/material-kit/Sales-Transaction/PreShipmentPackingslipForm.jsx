import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

const PreShipmentPackingslipForm = () => {
  const [formData, setFormData] = useState({
    packingType: "",
    subType: "",
    slipNo: "",
    date: "",
    customer: "",
    orderNo: "",
    poNoDate: "",
    itemCode: "",
    operation: "",
    remarkHeader: "",
    quantity: "",
    currency: "",
    itemRemark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Packing Slip Payload:", formData);
  };

  const handleAdd = () => {
    console.log("Add Item");
  };

  const handleRemove = () => {
    console.log("Remove Item");
  };

  const handleTransporter = () => {
    console.log("Transporter Click");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "SALES" }, { name: "PRE Shipment Packingslip" }]} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
          Save
        </Button>
      </Box>

      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          {/* Header Row */}
          <Grid item xs={3}>
            <TextField
              select
              label="Packing Type"
              name="packingType"
              value={formData.packingType}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="BOX">BOX</MenuItem>
              <MenuItem value="PALLET">PALLET</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              select
              label="Sub Type"
              name="subType"
              value={formData.subType}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="EXPORT">EXPORT</MenuItem>
              <MenuItem value="DOMESTIC">DOMESTIC</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Slip No"
              name="slipNo"
              value={formData.slipNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              type="date"
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Second Row */}
          <Grid item xs={6}>
            <TextField label="Customer" name="customer" value={formData.customer} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Order No" name="orderNo" value={formData.orderNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Third Row */}
          <Grid item xs={6}>
            <TextField label="Remark" name="remarkHeader" value={formData.remarkHeader} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="P.O No / Date" name="poNoDate" value={formData.poNoDate} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Item Section */}
          <Grid item xs={4}>
            <TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Operation" name="operation" value={formData.operation} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Item Remark"
              name="itemRemark"
              value={formData.itemRemark}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Currency" name="currency" value={formData.currency} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              ADD
            </Button>
            <Button variant="contained" color="secondary" onClick={handleRemove}>
              REMOVE
            </Button>
            <Button variant="contained" color="info" onClick={handleTransporter}>
              TRANSPORTER
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PreShipmentPackingslipForm;
import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

const CustomerWiseProductPriceForm = () => {
  const [formData, setFormData] = useState({
    customer: "",
    productCode: "",
    productName: "",
    packingQty: "",
    mrp: "",
    salesRate: "",
    additionalRate: "",
    finalRate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Customer Price Save:", formData);
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Sales" },
            { name: "Customer Wise Product Price List" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={1}></Box>

          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Product Code"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Packing Qty"
              name="packingQty"
              value={formData.packingQty}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="MRP"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Sales Rate"
              name="salesRate"
              value={formData.salesRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Additional Rate"
              name="additionalRate"
              value={formData.additionalRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Final Rate"
              name="finalRate"
              value={formData.finalRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="secondary">
              Add Detail
            </Button>
            <Button variant="outlined" color="secondary">
              Remove Product
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerWiseProductPriceForm;

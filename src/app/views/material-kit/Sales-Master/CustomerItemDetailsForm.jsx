import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const CustomerItemDetailsForm = () => {
  const [formData, setFormData] = useState({
    customer: "",
    productCode: "",
    productName: "",
    customerItemCode: "",
    customerItemDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Customer Item:", formData);
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Sales" }, { name: "Customer Item Details" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2>Customer Item Details</h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}></Grid>

          <Grid item xs={6}>
            <TextField
              label="Product Code"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Customer Item Code"
              name="customerItemCode"
              value={formData.customerItemCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Customer Item Description"
              name="customerItemDescription"
              value={formData.customerItemDescription}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3} gap={1}>
          <Button variant="contained" color="secondary">
            Add Detail
          </Button>
          <Button variant="outlined" color="error">
            Remove Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CustomerItemDetailsForm;

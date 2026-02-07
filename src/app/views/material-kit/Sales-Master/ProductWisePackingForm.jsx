import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const ProductWisePackingForm = () => {
  const [formData, setFormData] = useState({
    productCode: "",
    packingQty: "",
    actualPackingQty: "",
    packingUOM: "",
    packingType: "",
    qty: "",
    packingCodeForType: "",
    packingCodeForSubType: "",
    packingCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Packing Detail:", formData);
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Product Wise Packing Detail" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Product Wise Packing Detail</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Product Code" name="productCode" value={formData.productCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Packing Qty" name="packingQty" value={formData.packingQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Actual Packing Qty" name="actualPackingQty" value={formData.actualPackingQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Packing UOM" name="packingUOM" value={formData.packingUOM} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Packing Type" name="packingType" value={formData.packingType} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Qty" name="qty" value={formData.qty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Packing Code For Packing Type" name="packingCodeForType" value={formData.packingCodeForType} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Packing Code For Sub Type" name="packingCodeForSubType" value={formData.packingCodeForSubType} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Packing Code" name="packingCode" value={formData.packingCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3} gap={1}>
          <Button variant="contained" color="secondary">ADD</Button>
          <Button variant="outlined" color="error">REMOVE</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductWisePackingForm;

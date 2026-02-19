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

export default function GRNWiseOpeningStockForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    identification: "",
    grnNo: "",
    grnDate: "",
    location: "",
    party: "",
    partyName: "",
    quantity: "",
    rate: "",
    hsn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("GRN Opening Stock Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "GRN Wise Opening Stock" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="Item" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Item Name" name="itemName" value={formData.itemName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Identification" name="identification" value={formData.identification} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="GRN No" name="grnNo" value={formData.grnNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="date"
              label="GRN Date"
              name="grnDate"
              value={formData.grnDate}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Party" name="party" value={formData.party} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Party Name" name="partyName" value={formData.partyName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Rate" name="rate" value={formData.rate} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="HSN" name="hsn" value={formData.hsn} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
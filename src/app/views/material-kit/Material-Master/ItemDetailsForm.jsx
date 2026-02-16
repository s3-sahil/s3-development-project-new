import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ItemDetailsForm() {
  const [formData, setFormData] = useState({
    materialGroup: "",
    category: "",
    subCategory: "",
    itemName: "",
    unit: "",
    makeDrgNo: "",
    abcFlag: false,
    hsnCode: "",
    useFlag: false,
    itemCode: "",
    stockUnit: "",
    unitWeight: "",
    storingLocation: "",
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
    alert("Item Details Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Item Details" },
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
            <TextField
              label="Material Group"
              name="materialGroup"
              value={formData.materialGroup}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="Raw Material">Raw Material</MenuItem>
              <MenuItem value="Semi-Finished">Semi-Finished</MenuItem>
              <MenuItem value="Finished Product">Finished Product</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="Mechanical">Mechanical</MenuItem>
              <MenuItem value="Electrical">Electrical</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Sub-Category"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="NOS">NOS</MenuItem>
              <MenuItem value="KG">KG</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Make/Drg.No"
              name="makeDrgNo"
              value={formData.makeDrgNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.abcFlag}
                  onChange={handleChange}
                  name="abcFlag"
                />
              }
              label="ABC Flag"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="HSN Code"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.useFlag}
                  onChange={handleChange}
                  name="useFlag"
                />
              }
              label="Use Flag"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Item Code"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Stock Unit"
              name="stockUnit"
              value={formData.stockUnit}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="NOS">NOS</MenuItem>
              <MenuItem value="KG">KG</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Unit Weight"
              name="unitWeight"
              value={formData.unitWeight}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Storing Location"
              name="storingLocation"
              value={formData.storingLocation}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
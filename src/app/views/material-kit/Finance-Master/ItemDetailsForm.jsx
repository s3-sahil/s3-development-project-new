import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ItemDetailsForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    category: "",
    subCategory: "",
    desc: "",
    unit: "",
    glCode: "",
    unitName: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.itemCode && formData.category) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        itemCode: "",
        category: "",
        subCategory: "",
        desc: "",
        unit: "",
        glCode: "",
        unitName: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Item Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Item Details</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Item Code" size="small" fullWidth value={formData.itemCode} onChange={handleChange("itemCode")} /></Grid>
          <Grid item xs={4}>
            <TextField select label="Category" size="small" fullWidth value={formData.category} onChange={handleChange("category")}>
              <MenuItem value="Raw Material">Raw Material</MenuItem>
              <MenuItem value="Finished Goods">Finished Goods</MenuItem>
              <MenuItem value="Consumables">Consumables</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField select label="Sub-Category" size="small" fullWidth value={formData.subCategory} onChange={handleChange("subCategory")}>
              <MenuItem value="Steel">Steel</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}><TextField label="Description" size="small" fullWidth value={formData.desc} onChange={handleChange("desc")} /></Grid>
          <Grid item xs={3}>
            <TextField select label="Unit" size="small" fullWidth value={formData.unit} onChange={handleChange("unit")}>
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="Nos">Nos</MenuItem>
              <MenuItem value="Litres">Litres</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}><TextField label="GL Code" size="small" fullWidth value={formData.glCode} onChange={handleChange("glCode")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Items</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.itemCode} | ${rec.category} | ${rec.subCategory} | ${rec.desc} | ${rec.unit} | GL: ${rec.glCode}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
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
import { Span } from "app/components/Typography";
import { useState } from "react";

const ItemCategoryForm = () => {
  const [formData, setFormData] = useState({
    materialGroup: "",
    categoryCode: "",
    categoryName: "",
    otherIndicator: "",
    inUse: false,
    locationCompulsory: false,
    importMaterial: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Item Category Save:", formData);
    alert("Item Category Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Item Category Detail" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Material Group */}
          <Grid item xs={4}>
            <TextField
              select
              label="Material Group"
              name="materialGroup"
              value={formData.materialGroup}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="RM">Raw Material</MenuItem>
              <MenuItem value="FP">Finished Product</MenuItem>
            </TextField>
          </Grid>

          {/* Category Code */}
          <Grid item xs={4}>
            <TextField
              label="Category Code"
              name="categoryCode"
              value={formData.categoryCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* In Use */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="inUse"
                  checked={formData.inUse}
                  onChange={handleChange}
                />
              }
              label="In Use"
            />
          </Grid>

          {/* Category Name */}
          <Grid item xs={4}>
            <TextField
              label="Category Name"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Other Indicator */}
          <Grid item xs={4}>
            <TextField
              select
              label="Other Indicator"
              name="otherIndicator"
              value={formData.otherIndicator}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="BO">BO</MenuItem>
              <MenuItem value="RM">RM</MenuItem>
              <MenuItem value="FP">FP</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}></Grid>
          {/* Location Compulsory */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="locationCompulsory"
                  checked={formData.locationCompulsory}
                  onChange={handleChange}
                />
              }
              label="Location Compulsory"
            />
          </Grid>

          {/* Import Material */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="importMaterial"
                  checked={formData.importMaterial}
                  onChange={handleChange}
                />
              }
              label="Import Material"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ItemCategoryForm;

import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function SubCategoryForm() {
  const [formData, setFormData] = useState({
    materialGroup: "",
    category: "",
    subCode: "",
    subName: "",
    hsn: "",
    inUse: false,
    lifeApplicable: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Sub Category Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Sub Category Master" },
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
              select
              label="Material Group"
              name="materialGroup"
              value={formData.materialGroup}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="MG1">MG1</MenuItem>
              <MenuItem value="MG2">MG2</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Category Name"
              name="category"
              value={formData.category}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="CAT1">CAT1</MenuItem>
              <MenuItem value="CAT2">CAT2</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Sub Category Code"
              name="subCode"
              value={formData.subCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Sub Category Name"
              name="subName"
              value={formData.subName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="HSN Code"
              name="hsn"
              value={formData.hsn}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.inUse}
                  onChange={handleCheck}
                  name="inUse"
                />
              }
              label="In Use"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.lifeApplicable}
                  onChange={handleCheck}
                  name="lifeApplicable"
                />
              }
              label="Life Applicable"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
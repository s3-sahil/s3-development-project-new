import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { addItemMaterialGrade } from "app/utils/materialMaterialServices";
import { useState } from "react";

export default function ItemMaterialGradeForm() {
  const [formData, setFormData] = useState({
    itemCategory: "",
    categoryName: "",
    itemSubCategory: "",
    subCategoryName: "",
    gradeCode: "",
    gradeDescription: "",
    density: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      itemCategory: "",
      categoryName: "",
      itemSubCategory: "",
      subCategoryName: "",
      gradeCode: "",
      gradeDescription: "",
      density: "",
    });
  };

  const handleSave = async () => {
    try {
      if (
        !formData.itemCategory ||
        !formData.itemSubCategory ||
        !formData.gradeCode ||
        !formData.gradeDescription
      ) {
        alert("Please fill required fields");
        return;
      }

      setLoading(true);

      const payload = [
        {
          catg_Code: formData.itemCategory,
          subcatg_code: formData.itemSubCategory,
          grade_type: formData.gradeCode,
          grade_name: formData.gradeDescription,
          density: Number(formData.density) || 0,
          mat_code: formData.gradeCode,
        },
      ];

      console.log("Payload =>", payload);

      const response = await addItemMaterialGrade(payload);

      alert(response?.message || "Saved Successfully ✅");

      resetForm();
    } catch (error) {
      console.error(error);
      alert(error?.message || "Save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Itemwise Material Grade Detail" },
          ]}
        />
      </Box>

      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        {/* Save Button */}
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Item Category"
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleChange}
              size="small"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Category Name"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Item Sub Category"
              name="itemSubCategory"
              value={formData.itemSubCategory}
              onChange={handleChange}
              size="small"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Sub Category Name"
              name="subCategoryName"
              value={formData.subCategoryName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Grade Code"
              name="gradeCode"
              value={formData.gradeCode}
              onChange={handleChange}
              size="small"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Grade Description"
              name="gradeDescription"
              value={formData.gradeDescription}
              onChange={handleChange}
              size="small"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Density"
              name="density"
              value={formData.density}
              onChange={handleChange}
              size="small"
              fullWidth
              type="number"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
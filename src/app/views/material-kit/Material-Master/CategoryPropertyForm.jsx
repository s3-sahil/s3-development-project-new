import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addCategoryPropertyValues, fetchCategoryTypeAPI } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function CategoryPropertyForm() {
  const [formData, setFormData] = useState({
    category: "",
    propertyCode: "",
    description: "",
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingDropdown, setLoadingDropdown] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingDropdown(true);
      const res = await fetchCategoryTypeAPI();
      setCategoryOptions(res || []);
    } catch (error) {
      console.error("Category API Error:", error);
      setCategoryOptions([]);
    } finally {
      setLoadingDropdown(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // 🔴 Validation
    if (!formData.category) {
      alert("Category is required");
      return;
    }

    if (!formData.propertyCode) {
      alert("Property Code is required");
      return;
    }

    try {
      // ✅ Payload (array format)
      const payload = [
        {
          catg_Code: formData.category.substring(0, 2), // max 2 chars
          property_no: Number(formData.propertyCode), // must be number
        },
      ];

      const res = await addCategoryPropertyValues(payload);

      console.log("API Response:", res);

      if (res?.success) {
        alert(res.message || "Saved successfully");

        // ✅ Reset form
        setFormData({
          categoryOptions: "",
          propertyCode: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Categorywise Property Value" },
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
            <Autocomplete
              options={categoryOptions}
              size="small"
              getOptionLabel={(option) =>
                `${option.categorytype} (${option.indicator})`
              }
              onChange={(e, value) => {
                setFormData((prev) => ({
                  ...prev,
                  category: value?.indicator || "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Category" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Property Code"
              name="propertyCode"
              value={formData.propertyCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
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

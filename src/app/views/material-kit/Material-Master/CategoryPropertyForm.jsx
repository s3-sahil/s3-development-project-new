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
import {
  addCategoryPropertyValues,
  fetchCategoryTypeAPI,
} from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CategoryPropertyForm() {
  const [formData, setFormData] = useState({
    category: "",
    propertyCode: "",
    description: "",
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const mode = location.state?.mode || "add";

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (location.state) {
      setFormData({
        uom: location.state.uom || "",
        desc: location.state.desc || "",
        decimal: location.state.decimal || false,
        conversion: false,
      });
    }
  }, [location.state]);

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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${formData.propertyCode}?`,
    );

    if (!confirmDelete) return;
    try {
      setLoading(true);

      const res = await deleteUOMAPI(formData.propertyCode);

      alert(res?.message || "Deleted successfully");

      navigate("/material/material-category-property-table");
    } catch (err) {
      alert("Delete failed");
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
            { name: "Categorywise Property Value" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            {mode === "delete" ? (
              <Button
                variant="contained"
                color="error"
                startIcon={<Icon>delete</Icon>}
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<Icon>save</Icon>}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            )}
          </Box>
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

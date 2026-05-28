import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  addPropertyValues,
  deletePropertyValuesAPI,
} from "app/utils/materialMaterialServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function PropertyValuesForm() {
  const [formData, setFormData] = useState({
    productProperty: "",
    code: "",
    description: "",
  });
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = [
        {
          property_name: formData.productProperty,
          code: formData.code,
          property_desc: formData.description,
          property_no: 0, // or dynamic if needed
        },
      ];

      const res = await addPropertyValues(payload);

      console.log("API Response:", res);

      alert(res.message || "Saved successfully ✅");

      // ✅ Reset form
      setFormData({
        productProperty: "",
        code: "",
        description: "",
      });
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message || "Save failed ❌");
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Property ${formData.Property_name}?`,
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deletePropertyValuesAPI(formData.Property_name);

      alert(res?.message || res?.error || "Deleted successfully");

      navigate("/material/Property-Values-Table");
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
          routeSegments={[{ name: "Material" }, { name: "Property Values" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
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

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              select
              label="Product Property"
              name="productProperty"
              value={formData.productProperty}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Size">Size</MenuItem>
              <MenuItem value="Color">Color</MenuItem>
              <MenuItem value="Weight">Weight</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Code"
              name="code"
              value={formData.code}
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
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

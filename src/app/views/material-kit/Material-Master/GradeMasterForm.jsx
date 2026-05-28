import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { addGradeMaster, deleteGradeMasterDetailAPI } from "app/utils/materialMaterialServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function GradeMasterForm() {
  const [formData, setFormData] = useState({
    gradeCode: "",
    gradeDescription: "",
    density: "",
  });
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const mode = location.state?.mode || "add";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // 🔴 Validation
    if (!formData.gradeCode) {
      alert("Grade Code is required");
      return;
    }

    if (!formData.gradeDescription) {
      alert("Grade Description is required");
      return;
    }

    try {
      // ✅ API expects ARRAY
      const payload = [
        {
          mat_code: formData.gradeCode.substring(0, 2), // max 2 chars if needed
          grade_name: formData.gradeDescription,
          density: Number(formData.density) || 0,
        },
      ];

      const res = await addGradeMaster(payload);

      console.log("API Response:", res);

      if (res?.success) {
        alert(res.message || "Saved successfully");

        // ✅ Reset form
        setFormData({
          gradeCode: "",
          gradeDescription: "",
          density: "",
        });
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Material Code ${formData.mat_code}?`,
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deleteGradeMasterDetailAPI(formData.mat_code);

      alert(
        res?.message ||
          res?.Errormessage ||
          res?.error ||
          "Deleted successfully",
      );

      navigate("/material/Grade-Master-Detail-Table");
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
            { name: "Grade Master Details" },
          ]}
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
          <Grid item xs={4}>
            <TextField
              label="Grade Code"
              name="gradeCode"
              value={formData.gradeCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Grade Description"
              name="gradeDescription"
              value={formData.gradeDescription}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Density"
              name="density"
              type="number"
              value={formData.density}
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

import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { addGradeMaster } from "app/utils/materialMaterialServices";
import { useState } from "react";

export default function GradeMasterForm() {
  const [formData, setFormData] = useState({
    gradeCode: "",
    gradeDescription: "",
    density: "",
  });

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
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
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

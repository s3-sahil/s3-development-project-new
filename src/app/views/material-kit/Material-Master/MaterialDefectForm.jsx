import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  fetchCategoryTypeAPI,
  addMaterialDefect,
} from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function MaterialDefectForm() {
  const [formData, setFormData] = useState({
    defectCode: "",
    materialGroup: "",
    defectName: "",
  });

  const [materialGroupOptions, setMaterialGroupOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  // ✅ Load dropdown data
  const loadInitialData = async () => {
    try {
      const res = await fetchCategoryTypeAPI();
      console.log("Material Group API:", res);

      // handle both formats
      setMaterialGroupOptions(res?.Data || res || []);
    } catch (error) {
      console.error("Dropdown API Error:", error);
      setMaterialGroupOptions([]);
    }
  };

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save API
  const handleSave = async () => {
    if (!formData.materialGroup || !formData.defectName) {
      alert("Material Group & Defect Name required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        defect_cd: Number(formData.defectCode) || 0,
        defect_desc: formData.defectName,
        category_type: formData.materialGroup,
        profcen_Cd: localStorage.getItem("PROFCEN_CD")
      };

      const res = await addMaterialDefect(payload);

      console.log("API Response:", res);

      alert(res.message || "Saved successfully ✅");

      // reset form
      setFormData({
        defectCode: "",
        materialGroup: "",
        defectName: "",
      });
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message || "Save failed ❌");
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
            { name: "Material Defect Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Save Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Icon>save</Icon>
              )
            }
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Defect Code */}
          <Grid item xs={6}>
            <TextField
              label="Defect Code"
              name="defectCode"
              value={formData.defectCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Material Group Dropdown */}
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
              <MenuItem value="">
                <em>Select Material Group</em>
              </MenuItem>

              {materialGroupOptions.map((item, index) => (
                <MenuItem key={index} value={item.indicator}>
                  { item.categorytype }-{ item.indicator}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Defect Name */}
          <Grid item xs={12}>
            <TextField
              label="Defect Name"
              name="defectName"
              value={formData.defectName}
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
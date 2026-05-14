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
import { Span } from "app/components/Typography";
import { addSectionDetails } from "app/utils/ProductionMaterialServices";
import { useState } from "react";

const SectionForm = () => {
  const [formData, setFormData] = useState({
    sectionCode: "",
    sectionName: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const departments = [
    {
      label: "Production",
      value: "PROD",
    },
    {
      label: "Maintenance",
      value: "MAIN",
    },
    {
      label: "Quality",
      value: "QUAL",
    },
    {
      label: "Finance",
      value: "FIN",
    },
  ];
  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        shop_Code: formData.sectionCode,
        shop_Desc: formData.sectionName,
        dept_code: formData.department,
        password: "string",
        planning_Req: true,
        negative_flag: true,
      };

      const response = await addSectionDetails(payload);

      alert(response?.message || "Section Details Added Successfully");

      // Optional Reset
      setFormData({
        sectionCode: "",
        sectionName: "",
        department: "",
      });
    } catch (error) {
      console.error("Save Error:", error);

      alert(error.message || "Failed to save section details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Production" }, { name: "Section Details" }]}
        />
      </Box>

      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2></h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
              disabled={loading}
            >
              <Span>{loading ? "Saving..." : "Save"}</Span>
            </Button>

            <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Section Code"
              name="sectionCode"
              value={formData.sectionCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Section Name"
              name="sectionName"
              value={formData.sectionName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              {departments.map((dept) => (
                <MenuItem key={dept.value} value={dept.value}>
                  {dept.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SectionForm;

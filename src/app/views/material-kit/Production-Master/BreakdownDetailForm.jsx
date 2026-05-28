import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { addBreakDownDetail } from "app/utils/ProductionMaterialServices";
import { useState } from "react";

const BreakdownDetailForm = () => {
  const [formData, setFormData] = useState({
    breakdownTypeCode: "",
    breakdownCode: "",
    description: "",
    category: "",
    overallEffApplicable: false,
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        // max length 1
        down_Type_Id:
          formData.breakdownTypeCode.substring(0, 1),

        // max length 3
        down_Code:
          formData.breakdownCode.substring(0, 3),

        down_Desc: formData.description,

        // max length 2
        fld_CategCd:
          formData.category.substring(0, 2),

        // max length 1
        eff_Applicable:
          formData.overallEffApplicable
            ? "Y"
            : "N",
      };

      console.log("Payload:", payload);

      const response =
        await addBreakDownDetail(payload);

      alert(
        response?.message ||
          "Break Down Details Added Successfully"
      );

      // Reset Form
      setFormData({
        breakdownTypeCode: "",
        breakdownCode: "",
        description: "",
        category: "",
        overallEffApplicable: false,
      });
    } catch (error) {
      console.error("Save Error:", error);

      alert(
        error.message ||
          "Failed to save break down details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            {
              name: "Maintenance",
            },
            {
              name: "Breakdown Details",
            },
          ]}
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
          <h2>Breakdown Details</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
              disabled={loading}
            >
              <Span>
                {loading ? "Saving..." : "Save"}
              </Span>
            </Button>

            <Button
              variant="outlined"
              startIcon={<Icon>print</Icon>}
            >
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Breakdown Type Code"
              name="breakdownTypeCode"
              value={formData.breakdownTypeCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Breakdown Code"
              name="breakdownCode"
              value={formData.breakdownCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="overallEffApplicable"
                  checked={
                    formData.overallEffApplicable
                  }
                  onChange={handleChange}
                />
              }
              label="Overall Efficiency Applicable"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BreakdownDetailForm;
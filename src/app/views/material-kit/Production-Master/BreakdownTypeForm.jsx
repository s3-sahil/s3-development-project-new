import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { addBreakDownTypeDetails } from "app/utils/ProductionMaterialServices";
import { useState } from "react";

const BreakdownTypeForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

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
        down_Type_id: formData.code?.slice(0, 1),
        down_Type_Desc: formData.description,
      };

      const response = await addBreakDownTypeDetails(payload);

      if (response?.Errormessage) {
        alert(response.Errormessage);
        return;
      }

      alert(response?.message || "Break Down Type Details Added Successfully");

      console.log("Save Response:", response);

      // ================= RESET =================
      setFormData({
        code: "",
        description: "",
      });
    } catch (error) {
      console.error("Save Error:", error);

      alert(error?.Errormessage || error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Maintenance" },
            { name: "Breakdown Type Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2>Breakdown Type Details</h2>

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

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Breakdown Type Code"
              placeholder="Breakdown Type Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Description"
              placeholder="Description"
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
};

export default BreakdownTypeForm;

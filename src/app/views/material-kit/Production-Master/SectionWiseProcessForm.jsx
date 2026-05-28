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
import { addSectionWiseProcessDetails } from "app/utils/ProductionMaterialServices";
import { useState } from "react";

const SectionWiseProcessForm = () => {
  const [formData, setFormData] = useState({
    sectionCode: "",
    process: "",
  });

  const [loading, setLoading] = useState(false);

  const sections = [
    {
      label: "SEC001 - Assembly",
      value: "S1",
    },
    {
      label: "SEC002 - Welding",
      value: "S2",
    },
    {
      label: "SEC003 - Testing",
      value: "S3",
    },
  ];

  const processes = ["Cutting", "Welding", "Inspection", "Packaging"];

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        desc: formData.process,

        // max 5 characters
        oP_CODE: formData.process.substring(0, 5),

        // max 2 characters
        shop_Code: formData.sectionCode.substring(0, 2),

        // max 3 characters
        division: "PRO",
      };

      console.log("Payload:", payload);

      const response = await addSectionWiseProcessDetails(payload);

      alert(response?.message || "Section Wise Process Added Successfully");

      setFormData({
        sectionCode: "",
        process: "",
      });
    } catch (error) {
      console.error("Save Error:", error);

      alert(error.message);
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
              name: "Production",
            },
            {
              name: "Section-wise Process Details",
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
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Section Code"
              name="sectionCode"
              value={formData.sectionCode}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              {sections.map((sec) => (
                <MenuItem key={sec.value} value={sec.value}>
                  {sec.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Process"
              name="process"
              value={formData.process}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              {processes.map((proc) => (
                <MenuItem key={proc} value={proc}>
                  {proc}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SectionWiseProcessForm;

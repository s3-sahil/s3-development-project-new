import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { addMachineProcessDetails } from "app/utils/ProductionMaterialServices";
import { useState } from "react";

const MachineProcessForm = () => {
  const [formData, setFormData] = useState({
    machineCode: "",
    machineName: "",
    process: "",
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
        oP_DESC: formData.process,
        oP_CODE: formData.process?.slice(0, 5),
        unit_Code: formData.machineCode?.slice(0, 5),
        division: formData.machineName?.slice(0, 3),
      };

      const response = await addMachineProcessDetails(payload);

      alert(
        response?.message ||
          "Machine Process Details Added Successfully"
      );

      console.log("Save Response:", response);

      // ================= RESET =================
      setFormData({
        machineCode: "",
        machineName: "",
        process: "",
      });
    } catch (error) {
      console.error("Save Error:", error);

      alert(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Machine Process Details" },
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
          <h2>Machine Process Details</h2>

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

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Machine Code"
              placeholder="Machine Code"
              name="machineCode"
              value={formData.machineCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Machine Name"
              placeholder="Machine Name"
              name="machineName"
              value={formData.machineName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Process"
              placeholder="Process"
              name="process"
              value={formData.process}
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

export default MachineProcessForm;
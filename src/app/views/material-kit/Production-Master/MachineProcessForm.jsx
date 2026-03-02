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
import { useState } from "react";

const MachineProcessForm = () => {
  const [formData, setFormData] = useState({
    machineCode: "",
    machineName: "",
    process: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Saved (UI Only)");
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Machine Process Details</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            <Button
              variant="outlined"
              startIcon={<Icon>print</Icon>}
            >
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Machine Code"
              name="machineCode"
              value={formData.machineCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Machine Name"
              name="machineName"
              value={formData.machineName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Process"
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
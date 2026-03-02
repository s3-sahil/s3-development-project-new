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

const RootCauseForm = () => {
  const [formData, setFormData] = useState({
    rootCauseCode: "",
    rootCause: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Root Cause Details saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Root Cause Details" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Root Cause Details</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Root Cause Code"
              name="rootCauseCode"
              value={formData.rootCauseCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Root Cause"
              name="rootCause"
              value={formData.rootCause}
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

export default RootCauseForm;
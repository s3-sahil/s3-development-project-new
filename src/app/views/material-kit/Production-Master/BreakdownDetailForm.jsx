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
import { useState } from "react";

const BreakdownDetailForm = () => {
  const [formData, setFormData] = useState({
    breakdownTypeCode: "",
    breakdownCode: "",
    description: "",
    category: "",
    overallEffApplicable: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Breakdown detail saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Maintenance" },
            { name: "Breakdown Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Breakdown Details</h2>

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
          <Grid item xs={6}>
            <TextField
              label="Breakdown Type Code"
              name="breakdownTypeCode"
              value={formData.breakdownTypeCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Breakdown Code"
              name="breakdownCode"
              value={formData.breakdownCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
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
                  checked={formData.overallEffApplicable}
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
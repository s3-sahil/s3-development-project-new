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

const MaintenanceCategoryForm = () => {
  const [formData, setFormData] = useState({
    categoryCode: "",
    description: "",
    indicator: "",
    inUse: false,
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
    alert("Category saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Item Categories" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Category Form</h2>

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
              label="Category Code"
              name="categoryCode"
              value={formData.categoryCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Indicator"
              name="indicator"
              value={formData.indicator}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.inUse}
                  onChange={handleChange}
                  name="inUse"
                />
              }
              label="In Use"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MaintenanceCategoryForm;
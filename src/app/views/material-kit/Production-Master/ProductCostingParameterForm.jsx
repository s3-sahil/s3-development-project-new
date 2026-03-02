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

const ProductCostingParameterForm = () => {
  const [formData, setFormData] = useState({
    unloading: "",
    systems: "",
    followUp: "",
    administrative: "",
    financialInterest: "",
    sellingDistribution: "",
    nonCostItem: "",
    profit: "",
    rejection: "",
    operationEfficiency: "",
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
    alert("Product Costing Parameters saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Product Costing Parameters" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Product Costing Parameters</h2>

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
          {/* Material Overheads */}
          <Grid item xs={12}><h3>Material Overheads</h3></Grid>
          <Grid item xs={4}>
            <TextField
              label="Unloading %"
              name="unloading"
              value={formData.unloading}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Systems %"
              name="systems"
              value={formData.systems}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Follow Up %"
              name="followUp"
              value={formData.followUp}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Overheads */}
          <Grid item xs={12}><h3>Overheads</h3></Grid>
          {[
            { name: "administrative", label: "Administrative %" },
            { name: "financialInterest", label: "Financial Interest %" },
            { name: "sellingDistribution", label: "Selling & Distribution %" },
            { name: "nonCostItem", label: "Non-Cost Item %" },
            { name: "profit", label: "Profit %" },
            { name: "rejection", label: "Rejection %" },
            { name: "operationEfficiency", label: "Operation Efficiency %" },
          ].map((field) => (
            <Grid item xs={4} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductCostingParameterForm;
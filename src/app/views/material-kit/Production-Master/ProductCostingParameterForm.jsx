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
import { addProductCostingParameters } from "app/utils/ProductionMaterialServices";
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
        download: Number(formData.unloading) || 0,
        systems: Number(formData.systems) || 0,
        followups: Number(formData.followUp) || 0,
        admin: Number(formData.administrative) || 0,
        fin: Number(formData.financialInterest) || 0,
        selling: Number(formData.sellingDistribution) || 0,
        noncost: Number(formData.nonCostItem) || 0,
        prof_per: Number(formData.profit) || 0,
        rej_per: Number(formData.rejection) || 0,
        op_eff_per: Number(formData.operationEfficiency) || 0,
      };

      const response = await addProductCostingParameters(payload);

      if (response?.Errormessage) {
        alert(response.Errormessage);
        return;
      }

      alert(
        response?.message ||
          "Product Costing Parameters Added Successfully"
      );

      console.log("Save Response:", response);

      // ================= RESET =================
      setFormData({
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
    } catch (error) {
      console.error("Save Error:", error);

      alert(
        error?.Errormessage ||
          error?.message ||
          "Something went wrong"
      );
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
            { name: "Product Costing Parameters" },
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
          <h2>Product Costing Parameters</h2>

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

        <Grid container spacing={2}>
          {/* Material Overheads */}
          <Grid item xs={12}>
            <h3>Material Overheads</h3>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Unloading %"
              placeholder="Unloading %"
              name="unloading"
              value={formData.unloading}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Systems %"
              placeholder="Systems %"
              name="systems"
              value={formData.systems}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Follow Up %"
              placeholder="Follow Up %"
              name="followUp"
              value={formData.followUp}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Overheads */}
          <Grid item xs={12}>
            <h3>Overheads</h3>
          </Grid>

          {[
            { name: "administrative", label: "Administrative %" },
            { name: "financialInterest", label: "Financial Interest %" },
            { name: "sellingDistribution", label: "Selling & Distribution %" },
            { name: "nonCostItem", label: "Non-Cost Item %" },
            { name: "profit", label: "Profit %" },
            { name: "rejection", label: "Rejection %" },
            { name: "operationEfficiency", label: "Operation Efficiency %" },
          ].map((field) => (
            <Grid item xs={12} md={4} key={field.name}>
              <TextField
                label={field.label}
                placeholder={field.label}
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
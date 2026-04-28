import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { addExchangeCurrency } from "app/utils/materialMaterialServices";
import { useState } from "react";

export default function ExchangeCurrencyForm() {
  const [formData, setFormData] = useState({
    wef: "",
    currency: "",
    importRate: "",
    exportRate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // 🔴 Validation
    if (!formData.wef) {
      alert("W.E.F date is required");
      return;
    }

    if (!formData.currency) {
      alert("Currency is required");
      return;
    }

    try {
      const payload = {
        currency: formData.currency.toUpperCase(),

        conv_rate: Number(formData.importRate) || 0, // you can change logic if needed

        conv_date: new Date(formData.wef).toISOString(), // important format

        period: "", // if you have period field, map here

        export_rate: Number(formData.exportRate) || 0,
        import_rate: Number(formData.importRate) || 0,

        user_name: "admin", // replace with logged-in user
      };

      const res = await addExchangeCurrency(payload);

      console.log("API Response:", res);

      alert(res.message || "Saved successfully");

      // ✅ Reset form
      setFormData({
        wef: "",
        currency: "",
        importRate: "",
        exportRate: "",
      });
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Exchange Currency Master" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="W.E.F."
              name="wef"
              value={formData.wef}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Import Rate"
              name="importRate"
              value={formData.importRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Export Rate"
              name="exportRate"
              value={formData.exportRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

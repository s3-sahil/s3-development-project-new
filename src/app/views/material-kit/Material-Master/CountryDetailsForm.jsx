import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addCountryDetails } from "app/utils/materialMaterialServices";
import { useState } from "react";

export default function CountryDetailsForm() {
  const [formData, setFormData] = useState({
    country: "",
    currency: "",
    subCurrency: "",
    transportAirFrom: "",
    transportAirTo: "",
    transportSeaFrom: "",
    transportSeaTo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        country: formData.country,
        currency: formData.currency,
        conv_rate: 0,
        conv_date: new Date().toISOString(),
        curR_FRACTION: "",
        sub_Currency: formData.subCurrency,
        airFrom: Number(formData.transportAirFrom) || 0,
        airto: Number(formData.transportAirTo) || 0,
        seaFrom: Number(formData.transportSeaFrom) || 0,
        seato: Number(formData.transportSeaTo) || 0,
        country_code: formData.country
          ? formData.country.slice(0, 2).toUpperCase()
          : "",
      };

      const res = await addCountryDetails(payload);

      alert(res.message);

      // Reset form (optional)
      setFormData({
        country: "",
        currency: "",
        subCurrency: "",
        transportAirFrom: "",
        transportAirTo: "",
        transportSeaFrom: "",
        transportSeaTo: "",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Country Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              size="small"
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
              label="Sub Currency"
              name="subCurrency"
              value={formData.subCurrency}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Transport By Air From"
              name="transportAirFrom"
              value={formData.transportAirFrom}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Transport By Air To"
              name="transportAirTo"
              value={formData.transportAirTo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Transport By Sea From"
              name="transportSeaFrom"
              value={formData.transportSeaFrom}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Transport By Sea To"
              name="transportSeaTo"
              value={formData.transportSeaTo}
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
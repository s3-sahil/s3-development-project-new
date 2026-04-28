import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  addDistrictDetails,
  fetchCountries,
  fetchStates,
} from "app/utils/materialMaterialServices";
import { useState, useEffect } from "react";

export default function DistrictDetailsForm() {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    districtCode: "",
    districtName: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  // ✅ Load Countries API
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();

        const uniqueCountries = [
          ...new Map(data.map((item) => [item.country, item])).values(),
        ];

        setCountries(uniqueCountries);
      } catch (err) {
        console.error(err);
      }
    };

    loadCountries();
  }, []);

  // ✅ Load States API
  useEffect(() => {
    const loadStates = async () => {
      try {
        const data = await fetchStates();

        const uniqueStates = [
          ...new Map(data.map((item) => [item.State, item])).values(),
        ];

        setStates(uniqueStates);
      } catch (err) {
        console.error(err);
      }
    };

    loadStates();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        state: formData.state,
        country: formData.country,
        district_cd: formData.districtCode,
        district_name: formData.districtName,
      };

      const res = await addDistrictDetails(payload);

      alert(res.message);

      // reset form
      setFormData({
        country: "",
        state: "",
        districtCode: "",
        districtName: "",
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
          routeSegments={[{ name: "Material" }, { name: "District Details" }]}
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
          {/* ✅ COUNTRY AUTOCOMPLETE */}
          <Grid item xs={6}>
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option.country || ""}
              value={
                countries.find((c) => c.country === formData.country) || null
              }
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  country: newValue ? newValue.country : "",
                  state: "", // reset state when country changes
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* ✅ STATE AUTOCOMPLETE */}
          <Grid item xs={6}>
            <Autocomplete
              options={states}
              getOptionLabel={(option) => option.State || ""}
              value={states.find((s) => s.State === formData.state) || null}
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  state: newValue ? newValue.State : "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="State" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* District Code */}
          <Grid item xs={6}>
            <TextField
              label="District Code"
              value={formData.districtCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  districtCode: e.target.value,
                }))
              }
              size="small"
              fullWidth
            />
          </Grid>

          {/* District Name */}
          <Grid item xs={6}>
            <TextField
              label="District Name"
              value={formData.districtName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  districtName: e.target.value,
                }))
              }
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  addStateDetails,
  fetchCountries,
} from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function StateDetailForm() {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    stateCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();

        // remove duplicates (your API has duplicates)
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

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        state: formData.state,
        country: formData.country,
        state_cd: formData.stateCode, // mapping
        zone: "", // not in UI (send empty or add field)
        state_Code: formData.stateCode, // API requires both
      };

      const res = await addStateDetails(payload);

      alert(res.message);

      // reset form
      setFormData({
        country: "",
        state: "",
        stateCode: "",
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
          routeSegments={[{ name: "Material" }, { name: "State Detail" }]}
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
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" size="small" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="State Code"
              name="stateCode"
              value={formData.stateCode}
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

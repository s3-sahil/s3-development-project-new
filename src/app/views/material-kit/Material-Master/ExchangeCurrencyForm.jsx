import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { fetchCurrencyAPI } from "app/utils/authServices";
import { addExchangeCurrency } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ExchangeCurrencyForm() {
  const [formData, setFormData] = useState({
    wef: "",
    currency: "",
    importRate: "",
    exportRate: "",
  });
  const [loading, setLoading] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    loadCurrencies();
  }, []);

  const loadCurrencies = async () => {
    try {
      const res = await fetchCurrencyAPI();
      setCurrencyOptions(res || []);
    } catch (error) {
      console.error("Currency API Error:", error);
      setCurrencyOptions([]);
    }
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${formData.propertyCode}?`,
    );

    if (!confirmDelete) return;
    try {
      setLoading(true);

      const res = await deleteUOMAPI(formData.propertyCode);

      alert(res?.message || "Deleted successfully");

      navigate("/material/material-category-property-table");
    } catch (err) {
      alert("Delete failed");
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
            { name: "Exchange Currency Master" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {mode === "delete" ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<Icon>delete</Icon>}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          )}
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
              select
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">
                <em>Select Currency</em>
              </MenuItem>

              {currencyOptions.map((item) => (
                <MenuItem key={item.currency} value={item.currency}>
                  {item.currency} | {item.currency_name}
                </MenuItem>
              ))}
            </TextField>
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

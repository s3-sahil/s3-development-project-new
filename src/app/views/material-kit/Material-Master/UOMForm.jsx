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
import { addUOM, deleteUOMAPI } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UOMForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const [formData, setFormData] = useState({
    uom: "",
    desc: "",
    decimal: false,
    conversion: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state) {
      setFormData({
        uom: location.state.uom || "",
        desc: location.state.desc || "",
        decimal: location.state.decimal || false,
        conversion: false,
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.uom.trim()) {
      return alert("UOM is required");
    }

    if (formData.uom.length > 3) {
      return alert("UOM must be maximum 3 characters");
    }

    if (!formData.desc.trim()) {
      return alert("UOM Description is required");
    }

    try {
      setLoading(true);

      const payload = {
        uom: formData.uom,
        uom_desc: formData.desc,
        deci_flag: formData.decimal ? "Y" : "N",
      };

      const res = await addUOM(payload);

      alert(res.message);
      navigate("/material/Unit-Of-Management-Table");

      // reset form
      setFormData({
        uom: "",
        desc: "",
        decimal: false,
        conversion: false,
      });
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${formData.uom}?`,
    );

    if (!confirmDelete) return;
    try {
      setLoading(true);

      const res = await deleteUOMAPI(formData.uom);

      alert(res?.message || "Deleted successfully");

      navigate("/material/Unit-Of-Management-Table");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Inventory" }, { name: "UOM Master" }]}
        />
      </Box>

      {/* FORM CARD */}
      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* TOP SAVE BUTTON */}
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

        {/* FORM FIELDS */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="UOM"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={mode === "delete"}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="UOM Description"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={mode === "delete"}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="decimal"
                  checked={formData.decimal}
                  onChange={handleChange}
                />
              }
              label="Decimal Applicable"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="conversion"
                  checked={formData.conversion}
                  onChange={handleChange}
                />
              }
              label="Conversion Applicable"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

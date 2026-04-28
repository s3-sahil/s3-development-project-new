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
import { addInspectionParameter } from "app/utils/materialMaterialServices";
import { useState } from "react";

export default function InspectionParameterForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    parameter: "",
    dimension: false,
  });

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 SAVE
  const handleSave = async () => {
    // ✅ Validation
    if (!form.parameter.trim()) {
      return alert("Parameter is required");
    }

    try {
      setLoading(true);

      const payload = {
        rM_parameter: form.parameter.trim(),
        dimension_Flg: form.dimension ? "Y" : "N", // ✅ correct
      };

      const res = await addInspectionParameter(payload);

      alert("Saved Successfully ✅");

      // reset form
      setForm({
        parameter: "",
        dimension: false,
      });

    } catch (error) {
      console.error(error);
      alert(error.Errormessage || "Save failed ❌");
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
            { name: "Inspection Parameter" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* SAVE BUTTON */}
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

        {/* FORM */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Parameter"
              name="parameter"
              value={form.parameter}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="dimension"
                  checked={form.dimension}
                  onChange={handleChange}
                />
              }
              label="Dimension Applicable"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
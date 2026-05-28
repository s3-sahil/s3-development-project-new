import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Icon,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addProfessionTaxSlab } from "app/utils/masterPayrollServices";
import { useState } from "react";

export default function ProfessionTaxForm() {
  const [formData, setFormData] = useState({
    state: "",
    slabID: "",
    salFrom: "",
    salTo: "",
    taxRate: "",
    taxRate1: "",
    gender: "M",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      state: "",
      slabID: "",
      salFrom: "",
      salTo: "",
      taxRate: "",
      taxRate1: "",
      gender: "M",
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.state || !formData.slabID) {
        alert("Please fill required fields");
        return;
      }

      setLoading(true);

      const payload = {
        state: formData.state,
        slab_ID: formData.slabID,
        sal_from: Number(formData.salFrom) || 0,
        sal_to: Number(formData.salTo) || 0,
        tax_rate: Number(formData.taxRate) || 0,
        sal_from1: Number(formData.salFrom) || 0,
        sal_to1: Number(formData.salTo) || 0,
        tax_rate1: Number(formData.taxRate1) || 0,
        period: "MN",
        from_To_Desc: `${formData.salFrom} - ${formData.salTo}`,
        gender: formData.gender,
      };

      console.log("Payload =>", payload);

      const res = await addProfessionTaxSlab(payload);

      alert(res.message || "Saved Successfully ✅");

      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message || "Save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: "Master" },
            { name: "Profession Tax Slab" },
          ]}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>

      <Box p={3} boxShadow={2} borderRadius={2} bgcolor="#fff">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="B" control={<Radio />} label="Both F & M" />
            </RadioGroup>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Slab ID"
              name="slabID"
              value={formData.slabID}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Salary From"
              name="salFrom"
              type="date"
              value={formData.salFrom}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Salary To"
              name="salTo"
              type="date"
              value={formData.salTo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Tax Amount"
              name="taxRate"
              type="number"
              value={formData.taxRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Tax Amount For Feb"
              name="taxRate1"
              type="number"
              value={formData.taxRate1}
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
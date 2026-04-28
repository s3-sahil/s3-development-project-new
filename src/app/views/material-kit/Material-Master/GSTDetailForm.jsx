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
import { addGSTDetails } from "app/utils/materialMaterialServices";
import { useState } from "react";

export default function GSTDetailForm() {
  const [formData, setFormData] = useState({
    taxType: "",
    taxCode: "",
    taxName: "",
    taxPercent: "",
    wefMonth: "",
    wefYear: "",
    glCode: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // 🔴 Validation
    if (!formData.taxCode) {
      alert("Tax Code is required");
      return;
    }

    if (!formData.taxPercent) {
      alert("Tax % is required");
      return;
    }

    try {
      // ✅ Format WEF → MMYYYY (or whatever backend expects)
      const wef =
        formData.wefMonth && formData.wefYear
          ? `${formData.wefMonth.padStart(2, "0")}${formData.wefYear}`
          : "";

      const payload = {
        taX_CODE: formData.taxCode,

        desc: formData.taxName || "",

        percent: Number(formData.taxPercent) || 0,

        acC_CODE: formData.glCode || "",

        indicator: formData.taxType?.charAt(0) || "", // C/S/I/T

        wef: wef,

        calC_ON: "BASIC", // default (change if needed)

        state: "", // optional or map if you add state dropdown

        inusE_FLAG: "Y", // default

        cenvaT_APPL: "N", // default

        forM_ID: "GST", // default

        flag: "N", // default
      };

      const res = await addGSTDetails(payload);

      console.log("API Response:", res);

      alert(res.message || "Saved successfully");

      // ✅ Reset form
      setFormData({
        taxType: "",
        taxCode: "",
        taxName: "",
        taxPercent: "",
        wefMonth: "",
        wefYear: "",
        glCode: "",
        description: "",
      });
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Finance" }, { name: "GST Detail" }]}
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
              select
              label="Tax Type"
              name="taxType"
              value={formData.taxType}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="CGST">CGST</MenuItem>
              <MenuItem value="SGST">SGST</MenuItem>
              <MenuItem value="IGST">IGST</MenuItem>
              <MenuItem value="TCS">TCS</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tax Code"
              name="taxCode"
              value={formData.taxCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tax Name"
              name="taxName"
              value={formData.taxName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tax (%)"
              name="taxPercent"
              value={formData.taxPercent}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="WEF (MM)"
              name="wefMonth"
              value={formData.wefMonth}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="WEF (YYYY)"
              name="wefYear"
              value={formData.wefYear}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="GL Code"
              name="glCode"
              value={formData.glCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
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

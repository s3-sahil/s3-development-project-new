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

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("GST Detail Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "GST Detail" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
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
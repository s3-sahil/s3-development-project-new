import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function HSNForm() {
  const [formData, setFormData] = useState({
    hsnCode: "",
    name: "",
    flag: "",
    notificationNo: "",
    notificationDate: "",
    uom: "",
    ourHSN: false,
    supplierHSN: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("HSN/SAC Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "HSN/SAC Master" }]} />
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
              label="HSN Flag"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="HSN/SAC Code"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Notification No."
              name="notificationNo"
              value={formData.notificationNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Notification Date"
              name="notificationDate"
              value={formData.notificationDate}
              onChange={handleChange}
              size="small"
              fullWidth
              placeholder="dd/mm/yyyy"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="UOM"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.ourHSN}
                  onChange={handleCheck}
                  name="ourHSN"
                />
              }
              label="Our HSN"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.supplierHSN}
                  onChange={handleCheck}
                  name="supplierHSN"
                />
              }
              label="Supplier HSN"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
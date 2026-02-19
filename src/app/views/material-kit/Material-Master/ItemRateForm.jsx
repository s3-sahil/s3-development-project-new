import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ItemRateForm() {
  const [formData, setFormData] = useState({
    rateType: "Supplier",
    itemCode: "",
    itemName: "",
    rate: "",
    scrapRate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Item Rate Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Item Rate Details" },
          ]}
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
          <Grid item xs={12}>
            <RadioGroup
              row
              name="rateType"
              value={formData.rateType}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Supplier"
                control={<Radio />}
                label="Supplier Rate"
              />
              <FormControlLabel
                value="Jobwork"
                control={<Radio />}
                label="Jobwork Rate"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Item Code"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Rate"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Scrap Rate"
              name="scrapRate"
              value={formData.scrapRate}
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
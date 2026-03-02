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
import { Span } from "app/components/Typography";
import { useState } from "react";

const SparesConsumptionForm = () => {
  const [formData, setFormData] = useState({
    maintenanceType: "Preventive",
    item: "",
    quantityUsed: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Spares Consumption saved (UI Only)");
  };

  const handleAddSpares = () => {
    alert("Add Spares clicked (UI Only)");
  };

  const handleRemoveSpares = () => {
    alert("Remove Spares clicked (UI Only)");
  };

  const handleAddOtherMaterials = () => {
    alert("Add Other Materials clicked (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Spares Consumption" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Spares Consumption</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* Maintenance Type */}
          <Grid item xs={12}>
            <RadioGroup
              row
              name="maintenanceType"
              value={formData.maintenanceType}
              onChange={handleChange}
            >
              <FormControlLabel value="Preventive" control={<Radio />} label="Preventive" />
              <FormControlLabel value="Breakdown" control={<Radio />} label="Breakdown" />
              <FormControlLabel value="Shutdown" control={<Radio />} label="Shutdown" />
            </RadioGroup>
          </Grid>

          {/* Item */}
          <Grid item xs={8}>
            <TextField
              label="Item"
              name="item"
              value={formData.item}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Quantity Used */}
          <Grid item xs={4}>
            <TextField
              label="Quantity Used"
              name="quantityUsed"
              value={formData.quantityUsed}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Action Buttons inside Form */}
          <Grid item xs={12} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Icon>add</Icon>}
              onClick={handleAddOtherMaterials}
            >
              Add Other Materials
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<Icon>add</Icon>}
              onClick={handleAddSpares}
            >
              Add Spares
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<Icon>remove</Icon>}
              onClick={handleRemoveSpares}
            >
              Remove Spares
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SparesConsumptionForm;
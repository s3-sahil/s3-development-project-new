import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ShareOfBusinessForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    supplier: "",
    share: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Share Of Business Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Share Of Business" },
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
          <Grid item xs={6}>
            <TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Item Name" name="itemName" value={formData.itemName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Supplier" name="supplier" value={formData.supplier} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Share (%)" name="share" value={formData.share} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
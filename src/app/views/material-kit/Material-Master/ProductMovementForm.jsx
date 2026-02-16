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

export default function ProductMovementForm() {
  const [formData, setFormData] = useState({
    fromDepartment: "",
    toDepartment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Product Movement Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Product Movement Flow" },
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
            <TextField
              select
              label="From Department"
              name="fromDepartment"
              value={formData.fromDepartment}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Assembly">Assembly</MenuItem>
              <MenuItem value="Fabrication">Fabrication</MenuItem>
              <MenuItem value="Warehouse">Warehouse</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="To Department"
              name="toDepartment"
              value={formData.toDepartment}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Painting">Painting</MenuItem>
              <MenuItem value="Packing">Packing</MenuItem>
              <MenuItem value="Dispatch">Dispatch</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
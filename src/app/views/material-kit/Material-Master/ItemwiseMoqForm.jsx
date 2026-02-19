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

export default function ItemwiseMoqForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    leadTime: "",
    minQty: "",
    maxQty: "",
    reorderLevel: "",
    orderQty: "",
    uom: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("MOQ Saved:", formData);
    alert("Itemwise MOQ Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Itemwise MOQ" },
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
              label="Lead Time (Days)"
              name="leadTime"
              value={formData.leadTime}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Min Quantity"
              name="minQty"
              value={formData.minQty}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Max Quantity"
              name="maxQty"
              value={formData.maxQty}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Reorder Level"
              name="reorderLevel"
              value={formData.reorderLevel}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Order Quantity"
              name="orderQty"
              value={formData.orderQty}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Order Qty UOM"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Nos">Nos</MenuItem>
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="Mtr">Mtr</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
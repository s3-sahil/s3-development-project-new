import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addItemWiseMOQ } from "app/utils/materialMaterialServices";
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SAVE API
  const handleSave = async () => {
    if (!formData.itemCode) {
      alert("Item Code is required");
      return;
    }

    const payload = {
      iteM_CODE: formData.itemCode,
      minqty: Number(formData.minQty || 0),
      maxqty: Number(formData.maxQty || 0),
      rolqty: Number(formData.reorderLevel || 0),
      leadtime: Number(formData.leadTime || 0),
      profcen_cd: "", // optional or map if you have field
      orderqty: Number(formData.orderQty || 0),
    };

    try {
      setLoading(true);

      const res = await addItemWiseMOQ(payload);

      alert(res?.message || res?.Errormessage || "Saved successfully");

      // reset
      setFormData({
        itemCode: "",
        leadTime: "",
        minQty: "",
        maxQty: "",
        reorderLevel: "",
        orderQty: "",
        uom: "",
      });
    } catch (error) {
      alert(error.message);
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
            { name: "Itemwise MOQ" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* SAVE BUTTON */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Icon>save</Icon>
              )
            }
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="UOM"
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
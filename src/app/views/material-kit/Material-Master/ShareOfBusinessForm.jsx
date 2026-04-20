import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { fetchItemcodeAPI } from "app/utils/authServices";
import { addShareOfBusiness } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function ShareOfBusinessForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    supplier: "",
    share: "",
  });
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItemcodeAPI();
      setItemOptions(data);
    };

    loadItems();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = [
        {
          item_code: formData.itemCode,
          vend_code: formData.supplier, 
          share_per: Number(formData.share) || 0,
        },
      ];

      console.log("Payload:", payload);

      const res = await addShareOfBusiness(payload);

      console.log("Success:", res);
      alert(res.message || "Saved Successfully ✅");
    } catch (error) {
      console.error(error);
      alert(error.message || "Save failed ❌");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Share Of Business" }]}
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
            <Autocomplete
              options={itemOptions}
              getOptionLabel={(option) => `${option.ITEM_CODE}`}
              // 👇 ADD HERE
              filterOptions={(options, state) =>
                options.filter((opt) =>
                  opt.ITEM_CODE.toLowerCase().includes(
                    state.inputValue.toLowerCase(),
                  ),
                )
              }
              value={
                itemOptions.find(
                  (item) => item.ITEM_CODE === formData.itemCode,
                ) || null
              }
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  itemCode: newValue?.ITEM_CODE || "",
                  itemName: newValue?.DESC || "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item Code"
                  size="small"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              size="small"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Share (%)"
              name="share"
              value={formData.share}
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

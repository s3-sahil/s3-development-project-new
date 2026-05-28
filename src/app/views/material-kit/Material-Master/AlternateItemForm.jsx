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
import { addAlternateItemDetails } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function AlternateItemForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    alternateItemCode: "",
    description: "",
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
      // API expects array payload
      const payload = [
        {
          item_Code: formData.itemCode,
          alternate_item: formData.alternateItemCode,
          cust_Code: "", // optional (add field if needed)
          cust_item_desc: formData.description,
        },
      ];

      const res = await addAlternateItemDetails(payload);

      console.log("API Response:", res);
      debugger;
      if (res?.success) {
        alert(res.message || "Saved successfully");

        // Reset form
        setFormData({
          itemCode: "",
          alternateItemCode: "",
          description: "",
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Alternate Item Details" },
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
            <Autocomplete
              options={itemOptions}
              size="small"
              getOptionLabel={(option) => option.ITEM_CODE || ""}
              onChange={(e, value) => {
                setFormData((prev) => ({
                  ...prev,
                  itemCode: value?.ITEM_CODE || "",
                }));
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.ITEM_CODE}>
                  {option.ITEM_CODE}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Item Code" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Alternate Item Code"
              name="alternateItemCode"
              value={formData.alternateItemCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
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

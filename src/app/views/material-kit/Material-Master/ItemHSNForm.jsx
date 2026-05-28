import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { fetchItemcodeAPI } from "app/utils/authServices";
import {
  fetchCategoryTypeAPI,
  fetchSubCategoryAPI,
} from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function ItemHSNForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    category: "",
    subCategory: "",
    description: "",
    hsnCode: "",
    customTariffCode: "",
  });
  const [itemOptions, setItemOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);
  const loadInitialData = async () => {
    const matGroup = await fetchCategoryTypeAPI();
    setCategoryOptions(matGroup);

    const subCat = await fetchSubCategoryAPI();
    setSubCategoryOptions(subCat);
  };

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

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Item HSN Details Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Item HSN Details" }]}
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
              value={
                itemOptions.find(
                  (opt) => opt.ITEM_CODE === formData.itemCode,
                ) || null
              }
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
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>

              {categoryOptions.map((item) => (
                <MenuItem key={item.indicator} value={item.indicator}>
                  {item.categorytype}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Sub-Category"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">
                <em>Select SubCategory</em>
              </MenuItem>

              {subCategoryOptions.map((item) => (
                <MenuItem key={item.CATG_CODE} value={item.CATG_CODE}>
                  {item.SUBCATG_CODE}
                </MenuItem>
              ))}
            </TextField>
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

          <Grid item xs={6}>
            <TextField
              label="HSN Code"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Custom Tariff Code"
              name="customTariffCode"
              value={formData.customTariffCode}
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

import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { fetchItemcodeAPI } from "app/utils/authServices";
import { addPhysicalInventory } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function PhysicalInventoryForm() {
  const [formData, setFormData] = useState({
    financialYear: "",
    month: "",
    stockType: "",
    department: "",
    inventory: "",
    supplier: "",
    customer: "",
    itemCode: "",
    itemName: "",
    operation: "",
    stockUOM: "",
  });
  const [itemOptions, setItemOptions] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoadingItems(true);
      const res = await fetchItemcodeAPI();
      setItemOptions(res || []);
    } catch (error) {
      console.error("Item API Error:", error);
      setItemOptions([]);
    } finally {
      setLoadingItems(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.itemCode || !formData.month) {
      alert("Item Code and Month required");
      return;
    }

    try {
      const payload = {
        iteM_CODE: formData.itemCode,

        iteM_IDNT: formData.inventory || "",

        period: formData.financialYear || "",

        profcen_cd: formData.department || "",

        location: formData.inventory || "",

        month: formData.month, // format: MMYYYY

        uom: formData.stockUOM || "",

        c_WT_AVG_RATE: 0,

        oP_BALANCE: 0,

        act_BALANCE: 0, // 🔴 you can add input later

        sys_BALANCE: 0,

        layout_no: "",

        heat_code: "",

        qty_in_Nos: 0,

        adj_no: "",
      };

      console.log("Payload:", payload);

      const res = await addPhysicalInventory(payload);

      alert(res.Message || "Saved successfully");

      // ✅ reset form
      setFormData({
        financialYear: "",
        month: "",
        stockType: "",
        department: "",
        inventory: "",
        supplier: "",
        customer: "",
        itemCode: "",
        itemName: "",
        operation: "",
        stockUOM: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Physical Inventory" }]}
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
              label="Financial Year"
              name="financialYear"
              value={formData.financialYear}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Month (MMYYYY)"
              name="month"
              value={formData.month}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Stock Type"
              name="stockType"
              value={formData.stockType}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Raw">Raw</MenuItem>
              <MenuItem value="Finished">Finished</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handleChange}
              size="small"
              fullWidth
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
              label="Customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={itemOptions}
              size="small"
              loading={loadingItems}
              getOptionLabel={(option) =>
                `${option.ITEM_CODE} - ${option.DESC}`
              }
              isOptionEqualToValue={(option, value) =>
                option.ITEM_CODE === value.ITEM_CODE
              }
              onChange={(e, value) => {
                setFormData((prev) => ({
                  ...prev,
                  itemCode: value?.ITEM_CODE || "",
                  itemName: value?.DESC || "",
                  stockUOM: value?.stock_uom || "", // optional
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item Code"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingItems && <CircularProgress size={20} />}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
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
              select
              label="Operation"
              name="operation"
              value={formData.operation}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Packing">Packing</MenuItem>
              <MenuItem value="Assembly">Assembly</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Stock UOM"
              name="stockUOM"
              value={formData.stockUOM}
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

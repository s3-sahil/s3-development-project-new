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
import { addGRNOpeningStock } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function GRNWiseOpeningStockForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    identification: "",
    grnNo: "",
    grnDate: "",
    location: "",
    party: "",
    partyName: "",
    quantity: "",
    rate: "",
    hsn: "",
  });
  const [itemOptions, setItemOptions] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoadingItems(true);
        const data = await fetchItemcodeAPI();
        setItemOptions(data || []);
      } catch (err) {
        console.error(err);
        setItemOptions([]);
      } finally {
        setLoadingItems(false);
      }
    };

    loadItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // 🔴 Validation
    if (!formData.itemCode || !formData.grnNo) {
      alert("Item Code and GRN No are required");
      return;
    }
    const formatDate = (date) => {
      if (!date) return null;

      const d = new Date(date);
      return isNaN(d.getTime()) ? null : d.toISOString();
    };
    try {
      const payload = {
        giN_NO: formData.grnNo || "",

        giN_DATE: new Date(formData.grnDate).toISOString(),

        venD_CODE: formData.party || "",
        iteM_CODE: formData.itemCode || "",

        qty: Number(formData.quantity) || 0,
        rate: Number(formData.rate) || 0,

        yyyy_mm: formData.grnDate
          ? formData.grnDate.replace("-", "").substring(0, 6)
          : "",

        profcen_cd: "GEN", // required default

        item_idnt: formData.identification || "",

        location: formData.location || "",

        man_dt: new Date(formData.grnDate).toISOString(),

        exp_dt: new Date(formData.grnDate).toISOString(),

        uom: "NOS", // 🔴 MUST NOT BE EMPTY

        issue_qty: 0,
        reserved_qty: 0,

        stk_opening: Number(formData.quantity) || 0,

        rawmat_Cost: 0,
        cumm_opncost: 0,

        hsN_Code: formData.hsn || "",

        newstk: Number(formData.quantity) || 0,
      };
      const res = await addGRNOpeningStock(payload);

      console.log("API Response:", res);

      alert(res.message || "Saved successfully");

      // ✅ Reset form
      setFormData({
        itemCode: "",
        itemName: "",
        identification: "",
        grnNo: "",
        grnDate: "",
        location: "",
        party: "",
        partyName: "",
        quantity: "",
        rate: "",
        hsn: "",
      });
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "GRN Wise Opening Stock" },
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
              loading={loadingItems}
              getOptionLabel={(option) =>
                `${option.ITEM_CODE || ""} - ${option.DESC || ""}`
              }
              isOptionEqualToValue={(option, value) =>
                option.ITEM_CODE === value.ITEM_CODE
              }
              onChange={(e, value) => {
                setFormData((prev) => ({
                  ...prev,
                  itemCode: value?.ITEM_CODE || "",
                  itemName: value?.DESC || "",
                  hsn: value?.HSN_Code || "",
                }));
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.ITEM_CODE}>
                  {option.ITEM_CODE} - {option.DESC}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingItems ? "Loading..." : null}
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
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Identification"
              name="identification"
              value={formData.identification}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="GRN No"
              name="grnNo"
              value={formData.grnNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="date"
              label="GRN Date"
              name="grnDate"
              value={formData.grnDate}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Party"
              name="party"
              value={formData.party}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Party Name"
              name="partyName"
              value={formData.partyName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
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
              label="HSN"
              name="hsn"
              value={formData.hsn}
              onChange={handleChange}
              size="small"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

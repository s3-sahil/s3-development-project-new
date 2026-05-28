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
import {
  addShareOfBusiness,
  deleteShareOfBusinessAPI,
} from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ShareOfBusinessForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    supplier: "",
    share: "",
  });
  const [itemOptions, setItemOptions] = useState([]);
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const [loading, setLoading] = useState(false);

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

  // Handle Delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Item Code ${formData.itemCode} and Vendor Code ${formData.Vend_code}?`,
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deleteShareOfBusinessAPI(
        formData.itemCode,
        formData.Vend_code,
      );

      alert(res?.Errormessage || "Deleted successfully");

      navigate("/purchase/Share-Of-Business-Table");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
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
          {mode === "delete" ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<Icon>delete</Icon>}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          )}
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

import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addHSN, fetchUOMAPI } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";

export default function HSNForm() {
  const [formData, setFormData] = useState({
    hsnCode: "",
    name: "",
    flag: "",
    notificationNo: "",
    notificationDate: "",
    uom: "",
    sgst: "",
    cgst: "",
    igst: "",
    exemption: "",
    ourHSN: false,
    supplierHSN: false,
  });
  const [uomOptions, setUomOptions] = useState([]);

  useEffect(() => {
    const loadUOM = async () => {
      const data = await fetchUOMAPI();
      setUomOptions(data);
    };

    loadUOM();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        tarifF_CODE: formData.hsnCode,
        tarifF_DESC: formData.name,
        notification: formData.notificationNo,
        noT_DATE: formData.notificationDate
          ? new Date(formData.notificationDate).toISOString()
          : null,

        flag: formData.flag,
        hsN_uom: formData.uom,

        sgst_code: formData.sgst,
        cgst_code: formData.cgst,
        igst_code: formData.igst,
        exemption_NOTIFICATION: formData.exemption,

        abatment: 0,
        exc_code: "",
        cess_code: "",
        hcess_code: "",
        vat_code: "",
        cst_code: "",
        add_exc: "",
        add_cess: "",
        add_hcess: "",
        catG_Cd: "",
        subcatG_Cd: "",
        cst_Code1: "",
        tType: "",
        tgroupcode: "",
        bcd_Code: "",
        bcdcess_Code: "",
      };

      console.log("Payload:", payload);

      const res = await addHSN(payload);

      alert(res.message || "Saved Successfully ✅");
    } catch (error) {
      console.error(error);
      alert(error.message || "Save failed ❌");
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "HSN/SAC Master" }]}
        />
      </Box>

      {/* Card */}
      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Save Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        {/* FORM */}
        <Grid container spacing={3}>
          {/* Row 1 */}
          <Grid item xs={6}>
            <TextField
              select
              label="HSN Flag"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="S">Service</MenuItem>
              <MenuItem value="H">Manufacturing</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="HSN/SAC Code"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              options={uomOptions}
              getOptionLabel={(option) => option?.UOM || ""}
              // 🔍 search filter
              filterOptions={(options, state) =>
                options.filter((opt) =>
                  opt?.UOM?.toLowerCase().includes(
                    state.inputValue.toLowerCase(),
                  ),
                )
              }
              value={
                uomOptions.find((item) => item.UOM === formData.uom) || null
              }
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  uom: newValue?.UOM || "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="UOM" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <TextField
              label="Notification No"
              name="notificationNo"
              value={formData.notificationNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="date"
              label="Notification Date"
              name="notificationDate"
              value={formData.notificationDate}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={4}>
            <TextField
              label="SGST Code"
              name="sgst"
              value={formData.sgst}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="CGST Code"
              name="cgst"
              value={formData.cgst}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="IGST Code"
              name="igst"
              value={formData.igst}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Row 5 */}
          <Grid item xs={12}>
            <TextField
              label="Exemption Notification"
              name="exemption"
              value={formData.exemption}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Row 6 */}
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.ourHSN}
                  onChange={handleCheck}
                  name="ourHSN"
                />
              }
              label="Our HSN"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.supplierHSN}
                  onChange={handleCheck}
                  name="supplierHSN"
                />
              }
              label="Supplier HSN"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

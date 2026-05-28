import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  addItemDetails,
  fetchCategoryByTypeAPI,
  fetchCategoryTypeAPI,
  fetchSubCategoryAPI,
  fetchUOMAPI,
} from "app/utils/materialMaterialServices";

export default function ItemDetailsForm() {
  const [formData, setFormData] = useState({
    materialGroup: "",
    category: "",
    subCategory: "",
    itemName: "",
    unit: "",
    makeDrgNo: "",
    abcFlag: false,
    hsnCode: "",
    useFlag: false,
    itemCode: "",
    stockUnit: "",
    unitWeight: "",
    storingLocation: "",
    otherInd: "",
    thickness: "",
    width: "",
    length: "",
    height: "",
    ib: "",
    colourCode: "",
    diaRcs: "",
    sideArmHeight: "",
    sideArmWidth: "",
    middleArmWidth: "",
    middleArmHeight: "",
    noOfRuns: "",
  });

  const [loading, setLoading] = useState(false);
  const [materialGroupOptions, setMaterialGroupOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [uomOptions, setUomOptions] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadUOM = async () => {
      const data = await fetchUOMAPI();
      setUomOptions(data);
    };

    loadUOM();
  }, []);
  const loadInitialData = async () => {
    const matGroup = await fetchCategoryTypeAPI();
    setMaterialGroupOptions(matGroup);

    const subCat = await fetchSubCategoryAPI();
    setAllSubCategories(subCat);
  };

  useEffect(() => {
    if (!formData.materialGroup) return;

    const loadCategory = async () => {
      const data = await fetchCategoryByTypeAPI(formData.materialGroup);

      const active = data.filter((item) => item.IN_use);
      setCategoryOptions(active);
    };

    loadCategory();

    // reset dependent fields
    setFormData((prev) => ({
      ...prev,
      category: "",
      subCategory: "",
    }));
  }, [formData.materialGroup]);

  useEffect(() => {
    // if (!formData.category) {
    //   setSubCategoryOptions([]);
    //   return;
    // }

    const loadSubCategory = async () => {
      const data = await fetchSubCategoryAPI(); // 👈 direct API call

      const filtered = data.filter(
        (item) => item.CATG_CODE === formData.category && item.In_use,
      );

      setSubCategoryOptions(filtered);
    };

    loadSubCategory();

    // reset subcategory
    setFormData((prev) => ({
      ...prev,
      subCategory: "",
    }));
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const payload = {
        iteM_CODE: formData.itemCode,
        desc: formData.itemName,
        uom: formData.unit,
        catG_CODE: formData.category,
        subcatG_CODE: formData.subCategory,
        acC_CODE: formData.materialGroup,
        make: formData.makeDrgNo,
        abcfg: formData.abcFlag ? "Y" : "N",
        hsN_Code: formData.hsnCode,
        stock_uom: formData.stockUnit,
        weight: Number(formData.unitWeight) || 0,
        location: formData.storingLocation,

        // defaults
        minqty: 0,
        maxqty: 0,
        rolqty: 0,
        leadtime: 0,
        cenvaT_PERCENT: 0,
        length: Number(formData.length) || 0,
        width: Number(formData.width) || 0,
        height: Number(formData.height) || 0,
        plys: 0,
        lifeInDays: 0,
        thickness: Number(formData.thickness) || 0,
        lbt_per: 0,
        sidE_ARM_HEIGHT: Number(formData.sideArmHeight) || 0,
        sidE_ARM_WIDTH: Number(formData.sideArmWidth) || 0,
        middlE_ARM_WIDTH: Number(formData.middleArmWidth) || 0,
        middlE_ARM_HEIGHT: Number(formData.middleArmHeight) || 0,
        nO_OF_RUNS: Number(formData.noOfRuns) || 0,
        ib: Number(formData.ib) || 0,

        excise: "N",
        modvat: "N",
        rG23FLG: "N",
        insp_flag: "N",
        printYN: "N",
        life_flag: "N",
        rcsDiaFlag: "N",
        bulk_issue: "N",

        bar_Code: "",
        colour_code: "",
        mat_grade: "",
        mdS_TDS: "",
        sub_subcag: "",
        sub_subcatg_code: "",
        item_desc1: "",
        item_desc2: "",

        wt_uom: "",
        thickness_uom: "",
        width_uom: "",
        length_uom: "",
      };

      const result = await addItemDetails(payload);

      console.log("Success:", result);
      alert("Item Saved Successfully ✅");
    } catch (error) {
      console.error(error);
      alert(error.message || "Save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Item Details" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label="Material Group"
              name="materialGroup"
              value={formData.materialGroup}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="">
                <em>Select Material Group</em>
              </MenuItem>

              {materialGroupOptions.map((item) => (
                <MenuItem key={item.indicator} value={item.indicator}>
                  {item.categorytype}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={(e) => {
                const value = e.target.value;

                const selected = categoryOptions.find(
                  (item) => item.CATG_CODE === value,
                );

                setFormData((prev) => ({
                  ...prev,
                  category: value,
                  otherInd: selected?.other_ind || "", // 👈 store this
                }));
              }}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>

              {categoryOptions.map((item) => (
                <MenuItem key={item.CATG_CODE} value={item.CATG_CODE}>
                  {item.DESC}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Sub-Category"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              size="small"
              fullWidth
              select
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

          <Grid item xs={4}>
            <TextField
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="">
                <em>Select Unit</em>
              </MenuItem>

              {uomOptions.map((item) => (
                <MenuItem key={item.UOM} value={item.UOM}>
                  {item.UOM}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Make/Drg.No"
              name="makeDrgNo"
              value={formData.makeDrgNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          {(String(formData.otherInd).trim() === "3" ||
            String(formData.otherInd).trim().toUpperCase() === "F") && (
            <>
              <Grid item xs={2}>
                <TextField
                  label="Thickness"
                  name="thickness"
                  value={formData.thickness}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Width"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Length"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="IB"
                  name="ib"
                  value={formData.ib}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}></Grid>
            </>
          )}

          {(String(formData.otherInd).trim() === "X" ||
            String(formData.otherInd).trim().toUpperCase() === "U" ||
            String(formData.otherInd).trim().toUpperCase() === "H" ||
            String(formData.otherInd).trim().toUpperCase() === "R") && (
            <>
              <Grid item xs={4}>
                <TextField
                  label="Thickness"
                  name="thickness"
                  value={formData.thickness}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Width"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Length"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>
            </>
          )}

          {String(formData.otherInd).trim().toUpperCase() === "T" && (
            <>
              <Grid item xs={4}>
                <TextField
                  label="Colour Code"
                  name="colourCode"
                  value={formData.colourCode || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Dia/Rcs"
                  name="diaRcs"
                  type="number"
                  value={formData.diaRcs}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Length"
                  name="length"
                  value={formData.length || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>
            </>
          )}

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.abcFlag}
                  onChange={handleChange}
                  name="abcFlag"
                />
              }
              label="ABC Flag"
            />
          </Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.useFlag}
                  onChange={handleChange}
                  name="useFlag"
                />
              }
              label="Use Flag"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="HSN Code"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
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
              label="Stock Unit"
              name="stockUnit"
              value={formData.stockUnit}
              onChange={handleChange}
              size="small"
              fullWidth
              select
            >
              <MenuItem value="">
                <em>Select Stock Unit</em>
              </MenuItem>

              {uomOptions.map((item) => (
                <MenuItem key={item.UOM} value={item.UOM}>
                  {item.UOM}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Unit Weight"
              name="unitWeight"
              value={formData.unitWeight}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Storing Location"
              name="storingLocation"
              value={formData.storingLocation}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}></Grid>
          {String(formData.otherInd).trim().toUpperCase() === "R" && (
            <>
              <Grid item xs={3}>
                <TextField
                  label="Side Arm Height"
                  name="sideArmHeight"
                  value={formData.sideArmHeight || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Side Arm Width"
                  name="sideArmWidth"
                  value={formData.sideArmWidth || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Middle Arm Width"
                  name="middleArmWidth"
                  value={formData.middleArmWidth || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Middle Arm Height"
                  name="middleArmHeight"
                  value={formData.middleArmHeight || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="No Of Runs"
                  name="noOfRuns"
                  type="number"
                  value={formData.noOfRuns || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

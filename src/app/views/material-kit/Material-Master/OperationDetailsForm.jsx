import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addOperationDetails } from "app/utils/materialMaterialServices";
import { useState } from "react";

export default function OperationDetailsForm() {
  const [formData, setFormData] = useState({
    code: "",
    operationName: "",
    bomFlag: false,
    sacCode: "",
    operationType: "MACHINE",
    uom: "HOUR",
    inUse: false,
    productionOperation: false,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        desc: formData.operationName,
        oP_CODE: formData.code,
        oP_TYPE: formData.operationType,
        bom_flag: formData.bomFlag ? "Y" : "N",
        inuse_flag: formData.inUse ? "Y" : "N",
        op_UOM: formData.uom,
        ohs: 0,
        opn_cost: 0,
        prod_flag: formData.productionOperation ? "Y" : "N",
        extraQty_per: 0,
        packing_flag: "N",
        rM_required: "N",
        op_uom1: formData.uom,
        tariff_Code: formData.sacCode,
        profcenCd: "",
      };

      const res = await addOperationDetails(payload);

      alert(res.message);

      // reset form
      setFormData({
        code: "",
        operationName: "",
        bomFlag: false,
        sacCode: "",
        operationType: "MACHINE",
        uom: "HOUR",
        inUse: false,
        productionOperation: false,
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Operation Details" }]}
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
          <Grid item xs={6}>
            <TextField
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Operation Name"
              name="operationName"
              value={formData.operationName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.bomFlag}
                  onChange={handleChange}
                  name="bomFlag"
                />
              }
              label="BOM Flag"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="SAC Code"
              name="sacCode"
              value={formData.sacCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Operation Type"
              name="operationType"
              value={formData.operationType}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="UOM"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.inUse}
                  onChange={handleChange}
                  name="inUse"
                />
              }
              label="In Use"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.productionOperation}
                  onChange={handleChange}
                  name="productionOperation"
                />
              }
              label="Production Operation"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

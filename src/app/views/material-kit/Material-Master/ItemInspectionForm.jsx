import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ItemInspectionForm() {
  const [formData, setFormData] = useState({
    productCode: "",
    operationCode: "",
    serialNo: "",
    dimensionMin: "",
    dimensionMax: "",
    otherValue: "",
    parameter: "",
    tolerancePositive: "",
    toleranceNegative: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Item Inspection Parameter Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Item Inspection Parameter Details" },
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
            <TextField
              label="Product Code"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Operation Code"
              name="operationCode"
              value={formData.operationCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Serial No"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Dimension Min"
              name="dimensionMin"
              value={formData.dimensionMin}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Dimension Max"
              name="dimensionMax"
              value={formData.dimensionMax}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Other Value"
              name="otherValue"
              value={formData.otherValue}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Parameter"
              name="parameter"
              value={formData.parameter}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="+Ve Tolerance"
              name="tolerancePositive"
              value={formData.tolerancePositive}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="-Ve Tolerance"
              name="toleranceNegative"
              value={formData.toleranceNegative}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Remark"
              name="remark"
              value={formData.remark}
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
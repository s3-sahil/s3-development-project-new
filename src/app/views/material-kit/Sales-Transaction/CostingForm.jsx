import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

const CostingForm = () => {
  const [formData, setFormData] = useState({
    costingNo: "",
    costingDate: "",
    enquiryNo: "",
    enquiryDate: "",
    productName: "",
    customerProductCode: "",
    customerName: "",
    netWt: "",
    inputWt: "",
    grossWt: "",
    currency: "INR",
    materialGroup: "",
    category: "",
    reqQty: "",
    rawMaterial: "",
    bomPercent: "",
    bomQty: "",
    rateInr: "",
    totalRawCost: "",
    operationCode: "",
    operationDescription: "",
    machineCode: "",
    machineName: "",
    operationEff: "",
    machineGroup: "",
    machineHrRate: "",
    productionShift: "",
    toolCost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Costing Save Payload:", formData);
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Production" }, { name: "Costing" }]} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
          Save
        </Button>
      </Box>

      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Costing No" name="costingNo" value={formData.costingNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Costing Date" type="date" name="costingDate" value={formData.costingDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Enquiry No" name="enquiryNo" value={formData.enquiryNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Enquiry Date" type="date" name="enquiryDate" value={formData.enquiryDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Product Name" name="productName" value={formData.productName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Customer Product Code" name="customerProductCode" value={formData.customerProductCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Net Wt" name="netWt" value={formData.netWt} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Input Wt" name="inputWt" value={formData.inputWt} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Gross Wt" name="grossWt" value={formData.grossWt} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Currency" name="currency" value={formData.currency} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Material Group" name="materialGroup" value={formData.materialGroup} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Category" name="category" value={formData.category} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Req Qty" name="reqQty" value={formData.reqQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Rate (INR)" name="rateInr" value={formData.rateInr} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained">Add</Button>
              <Button variant="contained" color="secondary">Remove</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CostingForm;
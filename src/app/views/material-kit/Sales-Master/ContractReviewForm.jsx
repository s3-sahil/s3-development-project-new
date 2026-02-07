import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const ContractReviewForm = () => {
  const [formData, setFormData] = useState({
    contractNo: "",
    contractDate: "",
    revisionNo: "",
    customer: "",
    orderNo: "",
    orderDate: "",
    poNo: "",
    poDate: "",
    customerName: "",
    productCode: "",
    salesman: "",
    salesmanName: "",
    projectLeader: "",
    productName: "",
    leaderName: "",
    projectTeam: "",
    checklistCode: "",
    statusDescription: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Contract Review Save:", formData);
    alert("Contract Review Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sales" }, { name: "Contract Review" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Contract Review</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={4}>
            <TextField label="Contract No" name="contractNo" value={formData.contractNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField type="date" label="Contract Date" name="contractDate" value={formData.contractDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Revision No" name="revisionNo" value={formData.revisionNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={3}>
            <TextField label="Customer" name="customer" value={formData.customer} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Order No" name="orderNo" value={formData.orderNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" label="Order Date" name="orderDate" value={formData.orderDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="PO No" name="poNo" value={formData.poNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField type="date" label="PO Date" name="poDate" value={formData.poDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={12}>
            <TextField label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={3}>
            <TextField label="Product Code" name="productCode" value={formData.productCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Salesman" name="salesman" value={formData.salesman} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Salesman Name" name="salesmanName" value={formData.salesmanName} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Project Leader" name="projectLeader" value={formData.projectLeader} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 5 */}
          <Grid item xs={3}>
            <TextField label="Product Name" name="productName" value={formData.productName} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Leader Name" name="leaderName" value={formData.leaderName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 6 */}
          <Grid item xs={12}>
            <TextField label="Project Team" name="projectTeam" value={formData.projectTeam} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 7 */}
          <Grid item xs={6}>
            <TextField label="Checklist Code" name="checklistCode" value={formData.checklistCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Status Description" name="statusDescription" value={formData.statusDescription} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 8 */}
          <Grid item xs={12}>
            <TextField label="Comment" name="comment" value={formData.comment} onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="secondary">
            ADD Checklist
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContractReviewForm;
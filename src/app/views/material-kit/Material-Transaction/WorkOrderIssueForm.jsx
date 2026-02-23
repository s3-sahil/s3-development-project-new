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

export default function WorkOrderIssueForm() {
  const [formData, setFormData] = useState({
    itemCode: "",
    workOrderNo: "",
    issueNo: "",
    date: "",
    quantityIssuing: "",
    customerCode: "",
    remark: "",
    rawMaterialSearch: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Work Order Issue Saved (UI Only)");
  };

  const handleSearch = () => {
    alert(`Searching Raw Material: ${formData.rawMaterialSearch}`);
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Work Order Issue" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
          <Button variant="contained" startIcon={<Icon>print</Icon>}>
            Print
          </Button>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Work Order No." name="workOrderNo" value={formData.workOrderNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Issue No." name="issueNo" value={formData.issueNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Quantity Issuing" name="quantityIssuing" value={formData.quantityIssuing} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Customer Code" name="customerCode" value={formData.customerCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth multiline rows={2} />
          </Grid>
          <Grid item xs={9}>
            <TextField label="Raw Material and Required Stock" name="rawMaterialSearch" value={formData.rawMaterialSearch} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" fullWidth onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
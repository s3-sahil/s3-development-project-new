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

const CustomerRCIAEntryForm = () => {
  const [formData, setFormData] = useState({
    customerCode: "",
    invoiceNo: "",
    invoiceDate: "",
    itemCode: "",
    rciaNo: "",
    rciaDate: "",
    invoiceQty: "",
    receivedQty: "",
    acceptedQty: "",
    rejectedQty: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("RCIA Payload:", formData);
  };

  return (
    <Container maxWidth="lg">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "Customer RCIA Entry" }]} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
          Save
        </Button>
      </Box>

      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          {/* Row 1 */}
          <Grid item xs={6}>
            <TextField label="Customer Code" name="customerCode" value={formData.customerCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Invoice No" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            <TextField label="Invoice Date" type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <TextField label="RCIA No" name="rciaNo" value={formData.rciaNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="RCIA Date" type="date" name="rciaDate" value={formData.rciaDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={6}>
            <TextField label="Invoice Qty" name="invoiceQty" value={formData.invoiceQty} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Received Qty" name="receivedQty" value={formData.receivedQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 5 */}
          <Grid item xs={6}>
            <TextField label="Accepted Qty" name="acceptedQty" value={formData.acceptedQty} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Rejected Qty" name="rejectedQty" value={formData.rejectedQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Remark */}
          <Grid item xs={12}>
            <TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth multiline rows={3} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerRCIAEntryForm;
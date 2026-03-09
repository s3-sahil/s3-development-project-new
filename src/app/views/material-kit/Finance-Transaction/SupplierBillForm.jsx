import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function SupplierBillForm() {
  const [formData, setFormData] = useState({
    supplierCode: "",
    docNo: "",
    docDate: "",
    poNo: "",
    invoiceNo: "",
    invoiceDate: "",
    dueDate: "",
    billAmount: "",
    basicAmt: "",
    cgst: "",
    sgst: "",
    igst: "",
    narration: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.supplierCode && formData.invoiceNo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        supplierCode: "",
        docNo: "",
        docDate: "",
        poNo: "",
        invoiceNo: "",
        invoiceDate: "",
        dueDate: "",
        billAmount: "",
        basicAmt: "",
        cgst: "",
        sgst: "",
        igst: "",
        narration: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Supplier Bills" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Supplier Bills</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Supplier Code" size="small" fullWidth value={formData.supplierCode} onChange={handleChange("supplierCode")} /></Grid>
          <Grid item xs={6}><TextField label="Doc No" size="small" fullWidth value={formData.docNo} onChange={handleChange("docNo")} /></Grid>
          <Grid item xs={6}><TextField label="Doc Date" size="small" fullWidth value={formData.docDate} onChange={handleChange("docDate")} /></Grid>
          <Grid item xs={6}><TextField label="PO No" size="small" fullWidth value={formData.poNo} onChange={handleChange("poNo")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice No" size="small" fullWidth value={formData.invoiceNo} onChange={handleChange("invoiceNo")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice Date" size="small" fullWidth value={formData.invoiceDate} onChange={handleChange("invoiceDate")} /></Grid>
          <Grid item xs={6}><TextField label="Due Date" size="small" fullWidth value={formData.dueDate} onChange={handleChange("dueDate")} /></Grid>
          <Grid item xs={6}><TextField label="Bill Amount" size="small" fullWidth value={formData.billAmount} onChange={handleChange("billAmount")} /></Grid>
          <Grid item xs={6}><TextField label="Basic Amt" size="small" fullWidth value={formData.basicAmt} onChange={handleChange("basicAmt")} /></Grid>
          <Grid item xs={4}><TextField label="CGST" size="small" fullWidth value={formData.cgst} onChange={handleChange("cgst")} /></Grid>
          <Grid item xs={4}><TextField label="SGST" size="small" fullWidth value={formData.sgst} onChange={handleChange("sgst")} /></Grid>
          <Grid item xs={4}><TextField label="IGST" size="small" fullWidth value={formData.igst} onChange={handleChange("igst")} /></Grid>
          <Grid item xs={12}><TextField label="Narration" size="small" fullWidth value={formData.narration} onChange={handleChange("narration")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Supplier Bills</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.supplierCode} | Doc: ${rec.docNo} | PO: ${rec.poNo} | Invoice: ${rec.invoiceNo} | Date: ${rec.invoiceDate} | Amt: ${rec.billAmount} | CGST: ${rec.cgst} | SGST: ${rec.sgst} | IGST: ${rec.igst} | Narration: ${rec.narration}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
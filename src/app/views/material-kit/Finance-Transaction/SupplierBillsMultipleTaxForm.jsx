import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function SupplierBillsMultipleTaxForm() {
  const [formData, setFormData] = useState({
    billType: "Other",
    supplierCode: "",
    docNo: "",
    docDate: "",
    invoiceNo: "",
    invoiceDate: "",
    dueDate: "",
    billAmount: "",
    basicAmt: "",
    cgstAmt: "",
    sgstAmt: "",
    igstAmt: "",
    gstApplAmt: "",
    tdsApplAmt: "",
    custDutyAmt: "",
    custDutyCess1: "",
    custDutyCess2: "",
    narration: "",
    party: "",
    stateOfSupply: "",
    rcmBill: false,
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckbox = (event) =>
    setFormData({ ...formData, rcmBill: event.target.checked });

  const handleAdd = () => {
    if (formData.supplierCode && formData.invoiceNo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        billType: "Other",
        supplierCode: "",
        docNo: "",
        docDate: "",
        invoiceNo: "",
        invoiceDate: "",
        dueDate: "",
        billAmount: "",
        basicAmt: "",
        cgstAmt: "",
        sgstAmt: "",
        igstAmt: "",
        gstApplAmt: "",
        tdsApplAmt: "",
        custDutyAmt: "",
        custDutyCess1: "",
        custDutyCess2: "",
        narration: "",
        party: "",
        stateOfSupply: "",
        rcmBill: false,
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Supplier Bills Multiple Tax" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Supplier Bills (Multiple Tax)</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Bill Type" size="small" fullWidth value={formData.billType} onChange={handleChange("billType")} /></Grid>
          <Grid item xs={6}><TextField label="Supplier Code" size="small" fullWidth value={formData.supplierCode} onChange={handleChange("supplierCode")} /></Grid>
          <Grid item xs={6}><TextField label="Doc No" size="small" fullWidth value={formData.docNo} onChange={handleChange("docNo")} /></Grid>
          <Grid item xs={6}><TextField label="Doc Date" size="small" fullWidth value={formData.docDate} onChange={handleChange("docDate")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice No" size="small" fullWidth value={formData.invoiceNo} onChange={handleChange("invoiceNo")} /></Grid>
          <Grid item xs={6}><TextField label="Invoice Date" size="small" fullWidth value={formData.invoiceDate} onChange={handleChange("invoiceDate")} /></Grid>
          <Grid item xs={6}><TextField label="Due Date" size="small" fullWidth value={formData.dueDate} onChange={handleChange("dueDate")} /></Grid>
          <Grid item xs={6}><TextField label="Bill Amount" size="small" fullWidth value={formData.billAmount} onChange={handleChange("billAmount")} /></Grid>
          <Grid item xs={6}><TextField label="Basic Amt" size="small" fullWidth value={formData.basicAmt} onChange={handleChange("basicAmt")} /></Grid>
          <Grid item xs={4}><TextField label="CGST Amt" size="small" fullWidth value={formData.cgstAmt} onChange={handleChange("cgstAmt")} /></Grid>
          <Grid item xs={4}><TextField label="SGST Amt" size="small" fullWidth value={formData.sgstAmt} onChange={handleChange("sgstAmt")} /></Grid>
          <Grid item xs={4}><TextField label="IGST Amt" size="small" fullWidth value={formData.igstAmt} onChange={handleChange("igstAmt")} /></Grid>
          <Grid item xs={6}><TextField label="GST Appl Amt" size="small" fullWidth value={formData.gstApplAmt} onChange={handleChange("gstApplAmt")} /></Grid>
          <Grid item xs={6}><TextField label="TDS Appl Amt" size="small" fullWidth value={formData.tdsApplAmt} onChange={handleChange("tdsApplAmt")} /></Grid>
          <Grid item xs={6}><TextField label="Cust Duty Amt" size="small" fullWidth value={formData.custDutyAmt} onChange={handleChange("custDutyAmt")} /></Grid>
          <Grid item xs={6}><TextField label="Cust Duty Cess 1" size="small" fullWidth value={formData.custDutyCess1} onChange={handleChange("custDutyCess1")} /></Grid>
          <Grid item xs={6}><TextField label="Cust Duty Cess 2" size="small" fullWidth value={formData.custDutyCess2} onChange={handleChange("custDutyCess2")} /></Grid>
          <Grid item xs={12}><TextField label="Narration" size="small" fullWidth value={formData.narration} onChange={handleChange("narration")} /></Grid>
          <Grid item xs={6}><TextField label="Party" size="small" fullWidth value={formData.party} onChange={handleChange("party")} /></Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              size="small"
              value={formData.stateOfSupply}
              onChange={handleChange("stateOfSupply")}
              displayEmpty
            >
              <MenuItem value="">Select State</MenuItem>
              <MenuItem value="MH">Maharashtra</MenuItem>
              <MenuItem value="KA">Karnataka</MenuItem>
              <MenuItem value="DL">Delhi</MenuItem>
              <MenuItem value="TN">Tamil Nadu</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.rcmBill} onChange={handleCheckbox} />}
              label="RCM Bill"
            />
          </Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Supplier Bills</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.billType} | Supplier: ${rec.supplierCode} | Doc: ${rec.docNo} | Invoice: ${rec.invoiceNo} | Date: ${rec.invoiceDate} | Amt: ${rec.billAmount} | CGST: ${rec.cgstAmt} | SGST: ${rec.sgstAmt} | IGST: ${rec.igstAmt} | Narration: ${rec.narration}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
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
  MenuItem,
  Select,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function DebitNoteForm() {
  const [formData, setFormData] = useState({
    category: "",
    customerCode: "",
    voucherNo: "",
    voucherDate: "",
    narration: "",
    billNo: "",
    billDate: "",
    predefinedNarration: false,
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);
  const [selectedNarration, setSelectedNarration] = useState("");

  const predefinedOptions = [
    "Goods returned due to damage",
    "Adjustment against previous invoice",
    "Debit note for excess billing",
    "Correction entry for supplier account",
  ];

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckbox = (event) =>
    setFormData({ ...formData, predefinedNarration: event.target.checked });

  const handleNarrationSelect = (event) => {
    setSelectedNarration(event.target.value);
    setFormData({ ...formData, narration: event.target.value });
  };

  const handleAdd = () => {
    if (formData.category && formData.voucherNo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        category: "",
        customerCode: "",
        voucherNo: "",
        voucherDate: "",
        narration: "",
        billNo: "",
        billDate: "",
        predefinedNarration: false,
        unit: "UNIT-1",
      });
      setSelectedNarration("");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Debit Note" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Debit Note</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Category" size="small" fullWidth value={formData.category} onChange={handleChange("category")} /></Grid>
          <Grid item xs={6}><TextField label="Customer Code" size="small" fullWidth value={formData.customerCode} onChange={handleChange("customerCode")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher No" size="small" fullWidth value={formData.voucherNo} onChange={handleChange("voucherNo")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher Date" size="small" fullWidth value={formData.voucherDate} onChange={handleChange("voucherDate")} /></Grid>

          {/* Narration with Predefined Option */}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.predefinedNarration} onChange={handleCheckbox} />}
              label="Predefined Narration"
            />
          </Grid>
          {formData.predefinedNarration ? (
            <Grid item xs={12}>
              <Select
                fullWidth
                size="small"
                value={selectedNarration}
                onChange={handleNarrationSelect}
                displayEmpty
              >
                <MenuItem value="">Select Narration</MenuItem>
                {predefinedOptions.map((option, idx) => (
                  <MenuItem key={idx} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField label="Narration" size="small" fullWidth value={formData.narration} onChange={handleChange("narration")} />
            </Grid>
          )}

          <Grid item xs={6}><TextField label="Bill No" size="small" fullWidth value={formData.billNo} onChange={handleChange("billNo")} /></Grid>
          <Grid item xs={6}><TextField label="Bill Date" size="small" fullWidth value={formData.billDate} onChange={handleChange("billDate")} /></Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Debit Notes</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.category} | Cust: ${rec.customerCode} | Voucher: ${rec.voucherNo} | Date: ${rec.voucherDate} | Narration: ${rec.narration} | Bill: ${rec.billNo} | Bill Date: ${rec.billDate}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
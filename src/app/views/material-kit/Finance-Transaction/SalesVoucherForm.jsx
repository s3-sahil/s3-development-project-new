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

export default function SalesVoucherForm() {
  const [formData, setFormData] = useState({
    voucherNo: "",
    voucherDate: "",
    partyCode: "",
    narration: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.voucherNo && formData.partyCode) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        voucherNo: "",
        voucherDate: "",
        partyCode: "",
        narration: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "SALES" }, { name: "Sales Voucher" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Sales Voucher</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Voucher No" size="small" fullWidth value={formData.voucherNo} onChange={handleChange("voucherNo")} /></Grid>
          <Grid item xs={6}><TextField label="Voucher Date" size="small" fullWidth value={formData.voucherDate} onChange={handleChange("voucherDate")} /></Grid>
          <Grid item xs={6}><TextField label="Party Code" size="small" fullWidth value={formData.partyCode} onChange={handleChange("partyCode")} /></Grid>
          <Grid item xs={12}><TextField label="Narration" size="small" fullWidth value={formData.narration} onChange={handleChange("narration")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Sales Vouchers</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.voucherNo} | Date: ${rec.voucherDate} | Party: ${rec.partyCode} | Narration: ${rec.narration}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
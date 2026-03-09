import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ChequeOpeningEntryForm() {
  const [formData, setFormData] = useState({
    bankCode: "",
    chequeNo: "",
    chequeDate: "",
    amount: "",
    mode: "Payment",
    flag: "Debit",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.bankCode && formData.chequeNo && formData.amount) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        bankCode: "",
        chequeNo: "",
        chequeDate: "",
        amount: "",
        mode: "Payment",
        flag: "Debit",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Cheque Opening Entry" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Cheque Opening Entry</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Bank Code" size="small" fullWidth value={formData.bankCode} onChange={handleChange("bankCode")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Cheque No" size="small" fullWidth value={formData.chequeNo} onChange={handleChange("chequeNo")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Cheque Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={formData.chequeDate} onChange={handleChange("chequeDate")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Amount" size="small" fullWidth value={formData.amount} onChange={handleChange("amount")} />
          </Grid>
          <Grid item xs={4}>
            <TextField select label="Mode" size="small" fullWidth value={formData.mode} onChange={handleChange("mode")}>
              <MenuItem value="Payment">Payment</MenuItem>
              <MenuItem value="Receipt">Receipt</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField select label="Flag" size="small" fullWidth value={formData.flag} onChange={handleChange("flag")}>
              <MenuItem value="Debit">Debit</MenuItem>
              <MenuItem value="Credit">Credit</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Entries</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.bankCode} - Cheque: ${rec.chequeNo} - Date: ${rec.chequeDate} - Amount: ${rec.amount} - ${rec.mode} (${rec.flag})`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
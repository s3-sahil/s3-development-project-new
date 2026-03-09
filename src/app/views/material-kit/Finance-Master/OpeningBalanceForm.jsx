import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function OpeningBalanceForm() {
  const [formData, setFormData] = useState({
    yearFrom: "",
    yearTo: "",
    type: "General Ledger",
    glCode: "",
    amount: "",
    drcr: "D",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.yearFrom && formData.yearTo && formData.glCode) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        yearFrom: "",
        yearTo: "",
        type: "General Ledger",
        glCode: "",
        amount: "",
        drcr: "D",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Opening Balance" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Opening Balance</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label="Financial Year From"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.yearFrom}
              onChange={handleChange("yearFrom")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="To"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.yearTo}
              onChange={handleChange("yearTo")}
            />
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              row
              value={formData.type}
              onChange={handleChange("type")}
            >
              <FormControlLabel value="General Ledger" control={<Radio />} label="General Ledger" />
              <FormControlLabel value="Sub Ledger" control={<Radio />} label="Sub Ledger" />
            </RadioGroup>
          </Grid>
          <Grid item xs={4}><TextField label="GL Code" size="small" fullWidth value={formData.glCode} onChange={handleChange("glCode")} /></Grid>
          <Grid item xs={4}><TextField label="Amount" size="small" fullWidth value={formData.amount} onChange={handleChange("amount")} /></Grid>
          <Grid item xs={4}><TextField label="Debit/Credit" size="small" fullWidth value={formData.drcr} onChange={handleChange("drcr")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Opening Balances</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`FY: ${rec.yearFrom} to ${rec.yearTo} | ${rec.type} | GL: ${rec.glCode} | Amt: ${rec.amount} | ${rec.drcr}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
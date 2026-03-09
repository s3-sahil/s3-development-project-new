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
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function DbkMasterEntryForm() {
  const [formData, setFormData] = useState({
    tariffCode: "",
    srNo: "",
    rate: "",
    inputTariff: false,
    rateKg: "",
    remark: "",
    wefDate: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckbox = (event) =>
    setFormData({ ...formData, inputTariff: event.target.checked });

  const handleAdd = () => {
    if (formData.tariffCode && formData.rate) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        tariffCode: "",
        srNo: "",
        rate: "",
        inputTariff: false,
        rateKg: "",
        remark: "",
        wefDate: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Dbk Master Entry" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Dbk Master Entry</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Tariff Code" size="small" fullWidth value={formData.tariffCode} onChange={handleChange("tariffCode")} /></Grid>
          <Grid item xs={6}><TextField label="Sr No" size="small" fullWidth value={formData.srNo} onChange={handleChange("srNo")} /></Grid>
          <Grid item xs={6}><TextField label="Rate" size="small" fullWidth value={formData.rate} onChange={handleChange("rate")} /></Grid>
          <Grid item xs={6}><FormControlLabel control={<Checkbox checked={formData.inputTariff} onChange={handleCheckbox} />} label="Input Tariff" /></Grid>
          <Grid item xs={6}><TextField label="Rate/kg" size="small" fullWidth value={formData.rateKg} onChange={handleChange("rateKg")} /></Grid>
          <Grid item xs={6}><TextField label="Remark" size="small" fullWidth value={formData.remark} onChange={handleChange("remark")} /></Grid>
          <Grid item xs={6}><TextField label="WEF Date" size="small" fullWidth value={formData.wefDate} onChange={handleChange("wefDate")} /></Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Dbk Entries</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.tariffCode} | Sr: ${rec.srNo} | Rate: ${rec.rate} | InputTariff: ${rec.inputTariff ? "Yes" : "No"} | Rate/kg: ${rec.rateKg} | Remark: ${rec.remark} | WEF: ${rec.wefDate}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
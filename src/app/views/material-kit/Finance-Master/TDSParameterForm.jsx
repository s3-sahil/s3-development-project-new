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

export default function TDSParameterForm() {
  const [formData, setFormData] = useState({
    applicableGL: "",
    tdsGL: "",
    certificateType: "",
    section: "",
    companyTDS: "",
    nonCompanyTDS: "",
    nonItrCompanyTDS: "",
    nonItrNonCompanyTDS: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.applicableGL && formData.tdsGL) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        applicableGL: "",
        tdsGL: "",
        certificateType: "",
        section: "",
        companyTDS: "",
        nonCompanyTDS: "",
        nonItrCompanyTDS: "",
        nonItrNonCompanyTDS: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "TDS Parameter" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">TDS Parameter</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Applicable GL Code" size="small" fullWidth value={formData.applicableGL} onChange={handleChange("applicableGL")} /></Grid>
          <Grid item xs={6}><TextField label="TDS GL Code" size="small" fullWidth value={formData.tdsGL} onChange={handleChange("tdsGL")} /></Grid>
          <Grid item xs={6}><TextField label="Certificate Type" size="small" fullWidth value={formData.certificateType} onChange={handleChange("certificateType")} /></Grid>
          <Grid item xs={6}><TextField label="Section" size="small" fullWidth value={formData.section} onChange={handleChange("section")} /></Grid>
          <Grid item xs={3}><TextField label="Company TDS %" size="small" fullWidth value={formData.companyTDS} onChange={handleChange("companyTDS")} /></Grid>
          <Grid item xs={3}><TextField label="Non Company TDS %" size="small" fullWidth value={formData.nonCompanyTDS} onChange={handleChange("nonCompanyTDS")} /></Grid>
          <Grid item xs={3}><TextField label="NON ITR Company TDS %" size="small" fullWidth value={formData.nonItrCompanyTDS} onChange={handleChange("nonItrCompanyTDS")} /></Grid>
          <Grid item xs={3}><TextField label="NON ITR Non Company TDS %" size="small" fullWidth value={formData.nonItrNonCompanyTDS} onChange={handleChange("nonItrNonCompanyTDS")} /></Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added TDS Parameters</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${rec.applicableGL} | TDS GL: ${rec.tdsGL} | Cert: ${rec.certificateType} | Sec: ${rec.section} | Co: ${rec.companyTDS} | NonCo: ${rec.nonCompanyTDS} | NON ITR Co: ${rec.nonItrCompanyTDS} | NON ITR NonCo: ${rec.nonItrNonCompanyTDS}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
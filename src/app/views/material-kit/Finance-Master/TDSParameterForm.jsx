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
import {
  TDSParameterSave,
  UpdateTDSParameter,
} from "app/utils/FinanceMasterServices";
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

  const handleSave = async () => {
    if (!records.length) {
      alert("Please add at least one record.");
      return;
    }

    try {
      let response;

      if (actionMode === "edit") {
        const payload = {
          acc_code: records[0].applicableGL,
          tds_percent: Number(records[0].companyTDS || 0),
          tds_code: records[0].tdsGL,
          cert_type: records[0].certificateType,
          cess_flag: "N",
          cess_code: "",
          section: records[0].section,
          service_code: "",
          tds_appl: "Y",
          hcess_code: "",
          nonComp_TdsPer: Number(records[0].nonCompanyTDS || 0),
          calcOn: "A",
          comP_NONITR_percent: Number(records[0].nonItrCompanyTDS || 0),
          noncomP_NONITR_percent: Number(records[0].nonItrNonCompanyTDS || 0),
        };

        response = await UpdateTDSParameter(payload);
      } else {
        const payload = records.map((rec) => ({
          acc_code: rec.applicableGL,
          tds_percent: Number(rec.companyTDS || 0),
          tds_code: rec.tdsGL,
          cert_type: rec.certificateType,
          cess_flag: "N",
          cess_code: "",
          section: rec.section,
          service_code: "",
          tds_appl: "Y",
          hcess_code: "",
          nonComp_TdsPer: Number(rec.nonCompanyTDS || 0),
          calcOn: "A",
          comP_NONITR_percent: Number(rec.nonItrCompanyTDS || 0),
          noncomP_NONITR_percent: Number(rec.nonItrNonCompanyTDS || 0),
        }));

        response = await TDSParameterSave(payload);
      }

      console.log(response);

      alert(
        actionMode === "edit"
          ? "TDS Parameter Updated Successfully"
          : "TDS Parameter Saved Successfully",
      );
    } catch (error) {
      console.error(error);

      alert(
        actionMode === "edit"
          ? "Failed to Update TDS Parameter"
          : "Failed to Save TDS Parameter",
      );
    }
  };
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "Finace" }, { name: "TDS Parameter" }]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Applicable GL Code"
              size="small"
              fullWidth
              value={formData.applicableGL}
              onChange={handleChange("applicableGL")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="TDS GL Code"
              size="small"
              fullWidth
              value={formData.tdsGL}
              onChange={handleChange("tdsGL")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Certificate Type"
              size="small"
              fullWidth
              value={formData.certificateType}
              onChange={handleChange("certificateType")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Section"
              size="small"
              fullWidth
              value={formData.section}
              onChange={handleChange("section")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Company TDS %"
              size="small"
              fullWidth
              value={formData.companyTDS}
              onChange={handleChange("companyTDS")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Non Company TDS %"
              size="small"
              fullWidth
              value={formData.nonCompanyTDS}
              onChange={handleChange("nonCompanyTDS")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="NON ITR Company TDS %"
              size="small"
              fullWidth
              value={formData.nonItrCompanyTDS}
              onChange={handleChange("nonItrCompanyTDS")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="NON ITR Non Company TDS %"
              size="small"
              fullWidth
              value={formData.nonItrNonCompanyTDS}
              onChange={handleChange("nonItrNonCompanyTDS")}
            />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Added TDS Parameters
          </Typography>
          {records.map((rec) => (
            <Box
              key={rec.id}
              sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}
            >
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

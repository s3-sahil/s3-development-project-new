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

export default function DepreciationParameterForm() {
  const [formData, setFormData] = useState({
    mode: "Group Wise",
    groupCode: "",
    subGroup: "",
    depreciation: "",
    companyAct: "",
    incomeTax: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.groupCode && formData.subGroup) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        mode: "Group Wise",
        groupCode: "",
        subGroup: "",
        depreciation: "",
        companyAct: "",
        incomeTax: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Depreciation Parameter" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Depreciation Parameter</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Mode Selection */}
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">Mode</Typography>
          <RadioGroup
            row
            value={formData.mode}
            onChange={handleChange("mode")}
          >
            <FormControlLabel value="Group Wise" control={<Radio />} label="Group Wise" />
            <FormControlLabel value="GL Code Wise" control={<Radio />} label="GL Code Wise" />
          </RadioGroup>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label={formData.mode === "Group Wise" ? "Group Code" : "GL Code"} size="small" fullWidth value={formData.groupCode} onChange={handleChange("groupCode")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Sub Group" size="small" fullWidth value={formData.subGroup} onChange={handleChange("subGroup")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Depreciation %" size="small" fullWidth value={formData.depreciation} onChange={handleChange("depreciation")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="As per Company Act" size="small" fullWidth value={formData.companyAct} onChange={handleChange("companyAct")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="As per Income Tax" size="small" fullWidth value={formData.incomeTax} onChange={handleChange("incomeTax")} />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Parameters</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.mode} | ${rec.groupCode} - ${rec.subGroup} | Dep: ${rec.depreciation} | Co Act: ${rec.companyAct} | IT: ${rec.incomeTax}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
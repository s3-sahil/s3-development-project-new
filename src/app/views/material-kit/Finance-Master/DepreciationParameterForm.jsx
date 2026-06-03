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
import {
  addDepreciationParameter,
  updateDepreciationParameter,
} from "app/utils/FinanceMasterServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DepreciationParameterForm() {
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(false);
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

  useEffect(() => {
    if (location.state?.isEdit) {
      setIsEdit(true);

      const row = location.state.rowData;

      setFormData({
        accCode: row.acc_code || "",
        depreciation: row.depr_percent || "",
        incomeTax: row.income_Tax || "",
        additionalDepreciation: row.additional_depr_per || "",
      });
    }
  }, [location]);

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

  const handleSave = async () => {
    try {
      const payload = {
        acc_code: formData.accCode,
        depr_percent: Number(formData.depreciation || 0),
        income_Tax: Number(formData.incomeTax || 0),
        additional_depr_per: Number(formData.additionalDepreciation || 0),
      };

      if (isEdit) {
        await updateDepreciationParameter(payload);
        alert("Depreciation Parameter Updated Successfully");
      } else {
        await addDepreciationParameter([payload]); // POST array expect karto
        alert("Depreciation Parameter Saved Successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: "Finace" },
            { name: "Depreciation Parameter" },
          ]}
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
            Depreciation Parameter
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon>{isEdit ? "edit" : "save"}</Icon>}
            onClick={handleSave}
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </Box>

        {/* Mode Selection */}
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Mode
          </Typography>
          <RadioGroup row value={formData.mode} onChange={handleChange("mode")}>
            <FormControlLabel
              value="Group Wise"
              control={<Radio />}
              label="Group Wise"
            />
            <FormControlLabel
              value="GL Code Wise"
              control={<Radio />}
              label="GL Code Wise"
            />
          </RadioGroup>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label={formData.mode === "Group Wise" ? "Group Code" : "GL Code"}
              size="small"
              fullWidth
              value={formData.groupCode}
              onChange={handleChange("groupCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Sub Group"
              size="small"
              fullWidth
              value={formData.subGroup}
              onChange={handleChange("subGroup")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Depreciation %"
              size="small"
              fullWidth
              value={formData.depreciation}
              onChange={handleChange("depreciation")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="As per Company Act"
              size="small"
              fullWidth
              value={formData.companyAct}
              onChange={handleChange("companyAct")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="As per Income Tax"
              size="small"
              fullWidth
              value={formData.incomeTax}
              onChange={handleChange("incomeTax")}
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
            Added Parameters
          </Typography>
          {records.map((rec) => (
            <Box
              key={rec.id}
              sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}
            >
              <Typography>{`${rec.mode} | ${rec.groupCode} - ${rec.subGroup} | Dep: ${rec.depreciation} | Co Act: ${rec.companyAct} | IT: ${rec.incomeTax}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

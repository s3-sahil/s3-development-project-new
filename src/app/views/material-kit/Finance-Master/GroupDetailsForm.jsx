import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function GroupDetailsForm() {
  const [formData, setFormData] = useState({
    groupCode: "",
    belongsTo: "",
    subGroupApplicable: false,
    desc: "",
    category: "",
    schedule: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckboxChange = (event) =>
    setFormData({ ...formData, subGroupApplicable: event.target.checked });

  const handleAdd = () => {
    if (formData.groupCode && formData.belongsTo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        groupCode: "",
        belongsTo: "",
        subGroupApplicable: false,
        desc: "",
        category: "",
        schedule: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Group Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Group Details</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Group Code" size="small" fullWidth value={formData.groupCode} onChange={handleChange("groupCode")} /></Grid>
          <Grid item xs={4}>
            <TextField select label="Group Belongs To" size="small" fullWidth value={formData.belongsTo} onChange={handleChange("belongsTo")}>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Operations">Operations</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Checkbox checked={formData.subGroupApplicable} onChange={handleCheckboxChange} />}
              label="Sub Group Applicable"
            />
          </Grid>
          <Grid item xs={6}><TextField label="Group Desc" size="small" fullWidth value={formData.desc} onChange={handleChange("desc")} /></Grid>
          <Grid item xs={3}>
            <TextField select label="Group Category" size="small" fullWidth value={formData.category} onChange={handleChange("category")}>
              <MenuItem value="Assets">Assets</MenuItem>
              <MenuItem value="Liabilities">Liabilities</MenuItem>
              <MenuItem value="Expenses">Expenses</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select label="Schedule" size="small" fullWidth value={formData.schedule} onChange={handleChange("schedule")}>
              <MenuItem value="Schedule I">Schedule I</MenuItem>
              <MenuItem value="Schedule II">Schedule II</MenuItem>
              <MenuItem value="Schedule III">Schedule III</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Groups</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.groupCode} | ${rec.belongsTo} | SubGroup: ${rec.subGroupApplicable ? "Yes" : "No"} | ${rec.desc} | ${rec.category} | ${rec.schedule}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
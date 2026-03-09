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
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function CloseFinancialYearForm() {
  const [formData, setFormData] = useState({
    mode: "Close Financial Year",
    division: "",
    periodFrom: "",
    periodTo: "",
    status: "Pending",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.division && formData.periodFrom && formData.periodTo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        mode: "Close Financial Year",
        division: "",
        periodFrom: "",
        periodTo: "",
        status: "Pending",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Close Financial Year" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Close Financial Year</Typography>
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
            <FormControlLabel value="Close Financial Year" control={<Radio />} label="Close Financial Year" />
            <FormControlLabel value="Close Finalization" control={<Radio />} label="Close Finalization" />
          </RadioGroup>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Division"
              size="small"
              fullWidth
              value={formData.division}
              onChange={handleChange("division")}
            >
              <MenuItem value="Division A">Division A</MenuItem>
              <MenuItem value="Division B">Division B</MenuItem>
              <MenuItem value="Division C">Division C</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Period From"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.periodFrom}
              onChange={handleChange("periodFrom")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Period To"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.periodTo}
              onChange={handleChange("periodTo")}
            />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" startIcon={<Icon>close</Icon>}>Cancel</Button>
          <Button variant="contained" startIcon={<Icon>done</Icon>} onClick={handleAdd}>Ok</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Records</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.mode} | ${rec.division} | From: ${rec.periodFrom} To: ${rec.periodTo} | Status: ${rec.status}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
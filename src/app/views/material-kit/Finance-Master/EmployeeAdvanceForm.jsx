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

export default function EmployeeAdvanceForm() {
  const [formData, setFormData] = useState({
    empNo: "",
    empName: "",
    subCode: "",
    unit: "UNIT-1",
  });

  const [advances, setAdvances] = useState([]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAdd = () => {
    if (formData.empNo && formData.empName && formData.subCode) {
      setAdvances([...advances, { ...formData, id: advances.length + 1 }]);
      setFormData({ ...formData, empNo: "", empName: "", subCode: "" });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "Employee Advance Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Employee No"
              size="small"
              fullWidth
              value={formData.empNo}
              onChange={handleChange("empNo")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Employee Name"
              size="small"
              fullWidth
              value={formData.empName}
              onChange={handleChange("empName")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Sub Code"
              size="small"
              fullWidth
              value={formData.subCode}
              onChange={handleChange("subCode")}
            />
          </Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>
            Add
          </Button>
        </Box>

        {/* Added Advances Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Advances</Typography>
          {advances.map((adv) => (
            <Box key={adv.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${adv.empNo} - ${adv.empName} - ${adv.subCode}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
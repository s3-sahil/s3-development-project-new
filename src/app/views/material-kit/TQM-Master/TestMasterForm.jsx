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

export default function TestMasterForm() {
  const [formData, setFormData] = useState({
    testCode: "",
    testType: "",
    testDetails: "",
    unit: "UNIT-1",
  });

  const [tests, setTests] = useState([]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAdd = () => {
    if (formData.testCode && formData.testType && formData.testDetails) {
      setTests([...tests, { ...formData, id: tests.length + 1 }]);
      setFormData({ ...formData, testCode: "", testType: "", testDetails: "" });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "LABORATORY" }, { name: "Test Master" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Test Master
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Test Code"
              size="small"
              fullWidth
              value={formData.testCode}
              onChange={handleChange("testCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Test Type"
              size="small"
              fullWidth
              value={formData.testType}
              onChange={handleChange("testType")}
            >
              <MenuItem value="Mechanical">Mechanical</MenuItem>
              <MenuItem value="Chemical">Chemical</MenuItem>
              <MenuItem value="Electrical">Electrical</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Test Details"
              size="small"
              fullWidth
              value={formData.testDetails}
              onChange={handleChange("testDetails")}
            />
          </Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>
            Add
          </Button>
        </Box>

        {/* Added Tests Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Tests</Typography>
          {tests.map((test) => (
            <Box key={test.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${test.testCode} - ${test.testType} - ${test.testDetails}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    deptCode: "",
    deptName: "",
    deptFamily: "",
    contractorFlag: false,
    inUse: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Department Save:", formData);
    alert("Department Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Master" },
            { name: "Department Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <h2></h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label="Department Code"
              name="deptCode"
              value={formData.deptCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Department Name"
              name="deptName"
              value={formData.deptName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Department Family"
              name="deptFamily"
              value={formData.deptFamily}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="contractorFlag"
                  checked={formData.contractorFlag}
                  onChange={handleChange}
                />
              }
              label="Contractor Flag"
            />
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="inUse"
                  checked={formData.inUse}
                  onChange={handleChange}
                />
              }
              label="In Use"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DepartmentForm;
import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const EmployeeConsumptionForm = () => {
  const [formData, setFormData] = useState({
    employeeCode: "",
    employeeName: "",
    department: "",
    item: "",
    quantity: "",
    unit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Employee Consumption saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Employee Consumption" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Employee Consumption Form</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Employee Code"
              name="employeeCode"
              value={formData.employeeCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Employee Name"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Item Consumed"
              name="item"
              value={formData.item}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EmployeeConsumptionForm;
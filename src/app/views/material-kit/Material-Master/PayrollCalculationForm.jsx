import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function PayrollCalculationForm() {
  const [formData, setFormData] = useState({
    month: "",
    year: "",
    division: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Payroll Calculation Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Payroll" }, { name: "Payroll Calculation" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              size="small"
              fullWidth
              placeholder="MM-Month"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Division"
              name="division"
              value={formData.division}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Consolidated">Consolidated</MenuItem>
              <MenuItem value="Particular">Particular</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
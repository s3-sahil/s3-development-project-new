import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const PayrollCalculationForm = () => {
  const [formData, setFormData] = useState({
    month: "",
    year: "",
    division: "consolidated",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProcess = () => {
    console.log("Payroll Processed:", formData);
    alert("Payroll Processed (UI Only)");
  };

  const handleSave = () => {
    console.log("Payroll Saved:", formData);
    alert("Payroll Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Payroll Calculation" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Payroll Calculation</h2>
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>
            <Button
              variant="outlined"
              startIcon={<Icon>print</Icon>}
            >
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              size="small"
              fullWidth
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

          <Grid item xs={12}>
            <RadioGroup
              row
              name="division"
              value={formData.division}
              onChange={handleChange}
            >
              <FormControlLabel
                value="consolidated"
                control={<Radio />}
                label="Consolidated"
              />
              <FormControlLabel
                value="particular"
                control={<Radio />}
                label="Particular"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProcess}
            >
              Process
            </Button>
            <Button variant="outlined" color="secondary">
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PayrollCalculationForm;
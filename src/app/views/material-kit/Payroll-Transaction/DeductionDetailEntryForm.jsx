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

const DeductionDetailEntryForm = () => {
  const [formData, setFormData] = useState({
    period: "",
    employeeNo: "",
    advanceAmt: "",
    companyLoan: "",
    otherLoan: "",
    societyContri: "",
    compLoanInt: "",
    licInstallment: "",
    societyLoan: "",
    otherRecovery: "",
    miscDed1: "",
    canteen: "",
    salaryRecovery: "",
    miscDed2: "",
    traveling: "",
    incomeTax: "",
    miscDed3: "",
    remark: "",
    miscDed4: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Deduction Details Saved:", formData);
    alert("Deduction Detail Entry Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Deduction Detail Entry" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Deduction Detail Entry</h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          {Object.keys(formData).map((field) => (
            <Grid item xs={4} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default DeductionDetailEntryForm;
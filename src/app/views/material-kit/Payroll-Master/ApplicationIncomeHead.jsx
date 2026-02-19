import {
  Box,
  Container,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Icon,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

const incomeHeadsList = [
  "Basic",
  "Fix Basic",
  "VAR DA",
  "LTA",
  "Medical All.",
  "Child Edu.",
  "Uniform",
  "HRA",
  "Conveyance",
  "Canteen",
  "Fix DA",
  "Misc. All.",
  "Washing All.",
  "Special All.",
  "Misc. All 1",
  "Misc. All 2",
  "Misc. All 3",
  "Misc. All 4",
  "Misc. All 5",
  "Misc. All 6",
  "Misc. All 7",
  "Misc. All 8",
  "Misc. All 9",
  "Misc. All 10",
];

const ApplicationIncomeHead = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (name) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = () => {
    console.log("Selected Income Heads:", checkedItems);
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Application Income Heads" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
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

        {/* ================= INCOME HEAD SECTION ================= */}
        <Box mb={4}>
          <h3 style={{ textAlign: "center", marginBottom: 20 }}>
            Nomenclature
          </h3>

          <Grid container spacing={2}>
            {incomeHeadsList.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedItems[item] || false}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  }
                  label={item}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ================= DAYS & DEDUCTION ================= */}
        <Box>
          <h3 style={{ marginBottom: 20 }}>
            Days And Deduction Nomenclature
          </h3>

          <Grid container spacing={3}>
            {/* Days Head */}
            <Grid item xs={12}>
              <h4>Days Head and Nomenclatures</h4>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Misc Earn 1"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Misc Earn 3"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Misc Earn 2"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Misc Earn 4"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Deduction Head */}
            <Grid item xs={12} mt={3}>
              <h4>Deduction Head Nomenclature</h4>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Society Contribution"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Misc Ded. 1"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Society Loan"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Misc Ded. 2"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Misc Ded. 3"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Misc Ded. 4"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ApplicationIncomeHead;
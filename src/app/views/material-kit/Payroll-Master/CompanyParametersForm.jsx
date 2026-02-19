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
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

const CompanyParametersForm = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleSave = () => {
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Company Parameters Entry" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2 style={{ color: "#6a1b9a" }}></h2>

          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>


        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
        >
          <Tab label="General Parameters" />
          <Tab label="Salary/Wages Calculation Parameters" />
          <Tab label="Leave Parameters" />
        </Tabs>

        {/* ================= GENERAL PARAMETERS ================= */}
        {tabValue === 0 && (
          <Box mt={3}>
            <Grid container spacing={3}>
              {/* LEFT COLUMN */}
              <Grid item xs={4}>
                <TextField label="State" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="PF Employee (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Exgratia (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="FPP Employee (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="PF Employer (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Monthly Bonus Appl Amt Limit" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="FPP Amount Limit (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Yearly Max Bonus" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Min Bonus Present Days" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="ESIC Employee (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="ESIC Employer (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Monthly Bonus Appl Amt Lock" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="ESIC Amt Limit (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Weekly Off1" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Weekly Off2" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Bonus (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Emp No. Format (%)" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Attendance System" size="small" fullWidth />
              </Grid>

              <Grid item xs={4}>
                <TextField label="Super Annuation (%)" size="small" fullWidth />
              </Grid>

              {/* RADIO GROUP SECTIONS */}

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={4}>
                <strong>ESIC Applicable</strong>
                <RadioGroup row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              <Grid item xs={4}>
                <strong>Employee No</strong>
                <RadioGroup row>
                  <FormControlLabel value="auto" control={<Radio />} label="Auto" />
                  <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                </RadioGroup>
              </Grid>

              <Grid item xs={4}>
                <strong>Salary Structure Appl.</strong>
                <RadioGroup row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              <Grid item xs={4}>
                <strong>Emp Approval Appl.</strong>
                <RadioGroup row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              <Grid item xs={4}>
                <strong>Union Appl.</strong>
                <RadioGroup row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              <Grid item xs={4}>
                <strong>Washing Allowance</strong>
                <RadioGroup row>
                  <FormControlLabel value="auto" control={<Radio />} label="Auto" />
                  <FormControlLabel value="predefined" control={<Radio />} label="Predefined" />
                </RadioGroup>
              </Grid>

              <Grid item xs={4}>
                <strong>Salary Extra Fields</strong>
                <RadioGroup row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              <Grid item xs={4}>
                <strong>Voucher No.</strong>
                <RadioGroup row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              <Grid item xs={4}>
                <strong>Welfare Appl.</strong>
                <RadioGroup row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* TAB 2 Placeholder */}
        {tabValue === 1 && (
          <Box mt={3}>
            <h4>Salary/Wages Calculation Parameters</h4>
          </Box>
        )}

        {/* TAB 3 Placeholder */}
        {tabValue === 2 && (
          <Box mt={3}>
            <h4>Leave Parameters</h4>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CompanyParametersForm;
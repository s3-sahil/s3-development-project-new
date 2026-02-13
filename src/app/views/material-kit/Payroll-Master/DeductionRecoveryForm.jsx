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
import { Span } from "app/components/Typography";

const leftFields = [
  "Provident Fund",
  "Profession Tax",
  "E.S.I.C",
  "Advance amt",
  "Society Contribution",
  "Society Loan",
  "Canteen",
  "Travelling",
  "Company Loan",
  "LIC Loan",
  "Other Loan",
  "Revenue Stamp",
];

const rightFields = [
  "Misc Ded 1",
  "Misc Ded 2",
  "Income Tax",
  "Other Recovery",
  "LIC Installment",
  "Misc Ded 3",
  "Misc Ded 4",
  "Sal Recovery",
  "Welfare",
  "LWF",
  "Union Contribution",
];

export default function DeductionRecoveryForm() {
  const renderRow = (label) => (
    <Grid container spacing={1} alignItems="center" key={label} mb={1}>
      <Grid item xs={4}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField size="small" fullWidth />
      </Grid>
      <Grid item xs={2}>
        <TextField size="small" fullWidth />
      </Grid>
      <Grid item xs={2}>
        <TextField size="small" fullWidth />
      </Grid>
      <Grid item xs={2}>
        <TextField size="small" fullWidth />
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Deducation Recovery Method Entry" },
          ]}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="purple">
          {/* Deduction Recovery Method Entry */}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
        //   onClick={handleSave}
        >
          <Span>Save</Span>
        </Button>
      </Box>

      <Box sx={{ background: "#f4f4f4", p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container mb={1} fontWeight="bold">
              <Grid item xs={4}>
                {" "}
              </Grid>
              <Grid item xs={2}>
                Priority
              </Grid>
              <Grid item xs={2}>
                Flag
              </Grid>
              <Grid item xs={2}>
                Acc Code
              </Grid>
              <Grid item xs={2}>
                Carry Forward
              </Grid>
            </Grid>

            {leftFields.map((item) => renderRow(item))}
          </Grid>

          <Grid item xs={6}>
            <Grid container mb={1} fontWeight="bold">
              <Grid item xs={4}>
                {" "}
              </Grid>
              <Grid item xs={2}>
                Priority
              </Grid>
              <Grid item xs={2}>
                Flag
              </Grid>
              <Grid item xs={2}>
                Acc Code
              </Grid>
              <Grid item xs={2}>
                Carry Forward
              </Grid>
            </Grid>

            {rightFields.map((item) => renderRow(item))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

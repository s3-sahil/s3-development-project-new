import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Typography,
  Paper,
  Divider,
  MenuItem,
  Stack,
} from "@mui/material";
import { Breadcrumb } from "app/components";

const paymentGroups = [
  ["Basic", "Fix Basic", "DA", "Variable DA", "Child Edu.", "Uniform", "HRA"],
  [
    "Conveyance",
    "Overtime",
    "Attend. Bonus",
    "Misc. All.",
    "Canteen",
    "Leave Encash",
    "Misc All 1",
  ],
  [
    "Misc. All 2",
    "Misc. All 3",
    "Misc. All 4",
    "Misc. All 5",
    "Misc. All 8",
    "Misc. All 9",
    "Misc. All 10",
    "Other Days Income",
  ],
];

export default function GradeWisePaymentDetailsForm() {
  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Grade Wise Payment Details" },
          ]}
        />
      </Box>

      <Stack elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold"></Typography>

          <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
              >
                Save
              </Button>
            </Box>
        </Box>

        {/* Grade Dropdown */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Grade"
              fullWidth
              size="small"
              defaultValue="Sunday"
            >
              <MenuItem value="Sunday">Sunday</MenuItem>
              <MenuItem value="Grade A">Grade A</MenuItem>
              <MenuItem value="Grade B">Grade B</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 4 }} />

        {/* Payment Sections */}
        <Grid container spacing={4}>
          {paymentGroups.map((group, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grid container spacing={2}>
                {/* Column Headers */}
                <Grid item xs={4}>
                  <Typography fontWeight="bold">Payment Type</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">Period</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">GL Code</Typography>
                </Grid>

                {group.map((item, i) => (
                  <Grid container spacing={2} key={i} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                      <Typography variant="body2">{item}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField size="small" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField size="small" fullWidth />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}

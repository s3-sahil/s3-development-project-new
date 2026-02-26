import {
  Box,
  Button,
  Container,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

export default function PayrollCalculationForms() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Breadcrumb
        routeSegments={[
          { name: "Payroll" },
          { name: "Payroll Calculation" },
        ]}
      />

      <Stack sx={{ p: 4, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold" color="#7b1fa2">
          </Typography>

          <Button variant="contained" sx={{ background: "#7b1fa2" }}>
            Save
          </Button>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Month"
              type="month"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Year"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight="500">Division</Typography>
            <RadioGroup row defaultValue="Consolidated">
              <FormControlLabel
                value="Consolidated"
                control={<Radio />}
                label="Consolidated"
              />
              <FormControlLabel
                value="Particular"
                control={<Radio />}
                label="Particular"
              />
            </RadioGroup>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={4} display="flex" gap={2}>
          <Button variant="contained" sx={{ background: "#7b1fa2" }}>
            Process
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Close
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
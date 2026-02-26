import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

export default function LeaveDetailsForm() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Breadcrumb
        routeSegments={[{ name: "Master" }, { name: "Leave Details" }]}
      />

      <Stack elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={2}></Box>

          <Box display="flex" gap={2}>
            <Button variant="contained" sx={{ background: "#7b1fa2" }}>
              Save
            </Button>
          </Box>
        </Box>

        {/* Period */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Period"
              fullWidth
              size="small"
              placeholder="YYYY"
              defaultValue="2026"
              helperText="Enter Period (Format YYYY)"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Employee Info */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Employee No"
              fullWidth
              size="small"
              defaultValue=""
            >
              <MenuItem value="">Select Employee</MenuItem>
              <MenuItem value="00165">00165</MenuItem>
              <MenuItem value="00171">00171</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField label="First Name" fullWidth size="small" />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField label="Middle Name" fullWidth size="small" />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField label="Last Name" fullWidth size="small" />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Leave Details Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField label="Open Casual Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Encash Casual Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Casual Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Paid Leave Taken" fullWidth size="small" />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField label="Open Sick Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Encash Earned Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Sick Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Casual Leave Taken" fullWidth size="small" />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField label="Open Paid Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Encash Sick Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Paid Leave" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Sick Leave Taken" fullWidth size="small" />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

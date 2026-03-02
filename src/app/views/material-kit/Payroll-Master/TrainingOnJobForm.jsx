import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

export default function TrainingOnJobForm() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Breadcrumb
        routeSegments={[
          { name: "Master" },
          { name: "Training On Job" },
        ]}
      />

      <Stack>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold" color="#7b1fa2">
          </Typography>

          
        </Box>

        {/* Form Fields */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Employee"
              fullWidth
              size="small"
              select
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="emp1">Employee 1</MenuItem>
              <MenuItem value="emp2">Employee 2</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Training Activity"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="From Date"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="To Date"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Trainer Employee"
              fullWidth
              size="small"
              select
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="trainer1">Trainer 1</MenuItem>
              <MenuItem value="trainer2">Trainer 2</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Completion Status"
              fullWidth
              size="small"
              select
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={4} display="flex" gap={2}>
          <Button variant="contained" sx={{ background: "#7b1fa2" }}>
            Save
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
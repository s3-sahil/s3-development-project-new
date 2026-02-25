import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function InvalidPunchForm() {
  const [formData, setFormData] = useState({
    employee: "",
    musterDate: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: "TMS" },
            { name: "Invalid Punching Correction" },
          ]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" startIcon={<Icon>save</Icon>}>
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Icon>update</Icon>}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Icon>delete</Icon>}
            >
              Remove
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Employee"
              size="small"
              fullWidth
              value={formData.employee}
              onChange={handleChange("employee")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Muster Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.musterDate}
              onChange={handleChange("musterDate")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

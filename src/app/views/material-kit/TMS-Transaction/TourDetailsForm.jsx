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

export default function TourDetailsForm() {
  const [formData, setFormData] = useState({
    employee: "",
    tourFrom: "",
    tourUpto: "",
    tourDays: "",
    remark: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "TMS" }, { name: "Tour Details" }]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Tour Details
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
              label="Tour From"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.tourFrom}
              onChange={handleChange("tourFrom")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tour Upto"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.tourUpto}
              onChange={handleChange("tourUpto")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tour Days"
              size="small"
              fullWidth
              value={formData.tourDays}
              onChange={handleChange("tourDays")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remark"
              size="small"
              fullWidth
              value={formData.remark}
              onChange={handleChange("remark")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

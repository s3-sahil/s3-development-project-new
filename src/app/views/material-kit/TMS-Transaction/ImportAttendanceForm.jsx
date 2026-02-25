import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ImportAttendanceForm() {
  const [formData, setFormData] = useState({
    file: "",
  });

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Import Attendance" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff", boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
            <Button variant="contained" color="secondary" startIcon={<Icon>upload</Icon>}>Import</Button>
            <Button variant="outlined" color="error" startIcon={<Icon>close</Icon>}>Close</Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Choose File
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0]?.name })
                }
              />
            </Button>
            {formData.file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {formData.file}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
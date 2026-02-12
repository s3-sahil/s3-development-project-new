import { Box, Container, TextField, Button, Icon, Grid, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function TrainingAttendanceForm() {
  const [formData, setFormData] = useState({});

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "HR" }, { name: "Training Attendance" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <h2>Training Attendance</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Training Ident" size="small" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField type="date" label="Training Date" size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Venue" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Party Code" size="small" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Faculty Name" size="small" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <h4>Applicable Employee</h4>
          </Grid>

          <Grid item xs={4}>
            <TextField label="Employee" size="small" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <RadioGroup row>
              <FormControlLabel value="P" control={<Radio />} label="Present" />
              <FormControlLabel value="A" control={<Radio />} label="Absent" />
            </RadioGroup>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Hours" size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
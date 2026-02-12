import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";

export default function EducationDetailsForm() {
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "HR" }, { name: "Education Details" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <h2>Education Details</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Employee No" size="small" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Course" size="small" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Percentage" size="small" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Year of Passing" size="small" fullWidth /></Grid>
        </Grid>
      </Box>
    </Container>
  );
}
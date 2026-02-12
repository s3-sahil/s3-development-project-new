import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";

export default function FamilyDetailsForm() {
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "HR" }, { name: "Family Details" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <h2>Family Details</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Employee No" size="small" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Family Member Name" size="small" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Relation" size="small" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Age" size="small" fullWidth /></Grid>
        </Grid>
      </Box>
    </Container>
  );
}
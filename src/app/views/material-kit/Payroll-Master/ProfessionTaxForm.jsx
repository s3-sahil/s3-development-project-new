import { Container, Box, Grid, TextField, Button, Icon, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Breadcrumb } from "app/components";

export default function ProfessionTaxForm() {
  return (
    <Container maxWidth="lg">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Master" }, { name: "Profession Tax Slab" }]} />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Icon>arrow_back</Icon>
          <Box fontSize={20} fontWeight="bold" color="purple">
            Profession Tax Slab
          </Box>
        </Box>

        <Button variant="contained" color="secondary" startIcon={<Icon>save</Icon>}>
          Save
        </Button>
      </Box>

      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="State" size="small" fullWidth />
          </Grid>

          <Grid item xs={8}>
            <RadioGroup row>
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="B" control={<Radio />} label="Both F & M" />
            </RadioGroup>
          </Grid>

          <Grid item xs={4}>
            <TextField label="Slab ID" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Salary From" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Salary To" size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Tax Amount" size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Tax Amount For Feb" size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
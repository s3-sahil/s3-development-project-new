import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import { Breadcrumb } from "app/components";

const EmployeeInformationForm = () => {
  const handleSave = () => {
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Employee Information" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2 style={{ color: "#6a1b9a" }}></h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        {/* <Divider sx={{ my: 2 }} /> */}

        <Grid container spacing={3}>

          {/* Row 1 */}
          <Grid item xs={4}>
            <TextField label="Refer" size="small" select fullWidth>
              <MenuItem value="">Select</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField label="Employee No" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Status" size="small" select fullWidth>
              <MenuItem value="">Select</MenuItem>
            </TextField>
          </Grid>

          {/* Row 2 */}
          <Grid item xs={4}>
            <TextField label="First Name" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Middle Name" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Last Name" size="small" fullWidth />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={4}>
            <TextField label="Department" size="small" select fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Mobile Number" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Week Off 1" size="small" select fullWidth />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={4}>
            <TextField label="Grade" size="small" select fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="E-mail" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Week Off 2" size="small" select fullWidth />
          </Grid>

          {/* Row 5 */}
          <Grid item xs={4}>
            <TextField label="Emp Category" size="small" select fullWidth>
              <MenuItem value="T">Technical</MenuItem>
              <MenuItem value="N">Non Technical</MenuItem>
              <MenuItem value="H">Head Office</MenuItem>
              <MenuItem value="F">Field</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField label="Blood Group" size="small" select fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Designation" size="small" select fullWidth />
          </Grid>

          {/* Row 6 */}
          <Grid item xs={4}>
            <TextField label="Notice Period In Days" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Birth Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Birth Place" size="small" fullWidth />
          </Grid>

          {/* Gender + Marital */}
          <Grid item xs={4}>
            <strong>Gender</strong>
            <RadioGroup row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </Grid>

          <Grid item xs={4}>
            <strong>Marital Status</strong>
            <RadioGroup row>
              <FormControlLabel value="married" control={<Radio />} label="Married" />
              <FormControlLabel value="unmarried" control={<Radio />} label="Unmarried" />
            </RadioGroup>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Join Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={4}>
            <TextField label="Permanent Address 1" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Permanent Address 2" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Permanent Address 3" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="City" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Pin No" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="State" size="small" select fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Contact Number" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Aadhar Card No" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="PAN No" size="small" fullWidth />
          </Grid>

          {/* Experience + Extra */}
          <Grid item xs={4}>
            <TextField label="No. Of Children" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Qualification" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Prev. Experience (Years)" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Prev. Experience (Months)" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Confirm Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Temporary Status" size="small" select fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Temporary Status Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Gratuity ID" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Referred By" size="small" fullWidth />
          </Grid>

          <Grid item xs={4}>
            <TextField label="Reporting" size="small" fullWidth />
          </Grid>

          {/* Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="secondary">
              Other Details
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
};

export default EmployeeInformationForm;
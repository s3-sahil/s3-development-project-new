import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Icon,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Divider,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SalaryWagesDetailsForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      console.log(formData);
      alert("Saved Successfully");
      setLoading(false);
    }, 800);
  };

  const input = (label, name) => (
    <TextField
      label={label}
      name={name}
      size="small"
      fullWidth
      onChange={handleChange}
    />
  );

  const allowances = [
    "Basic","Fixed Basic","Dearness Allowance","Variable DA",
    "Leave Travel","Medical","Child Education","Uniform",
    "House Rent","Conveyance","Canteen","Magazine",
    "Driver Salary","Guest House","Soft Furnishing",
    "Misc 1","Misc 2","Misc 3","Misc 4","Misc 5",
    "Misc 6","Misc 7","Misc 8","Misc 9",
  ];

  return (
    <Container maxWidth="xl">

      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Salary / Wages Details" },
          ]}
        />
      </Box>

      {/* MAIN FORM BOX */}
      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">
            Salary / Wages Details
          </Typography>

          <Stack direction="row" spacing={1}>

            <Tooltip title="Print">
              <IconButton
                sx={{
                  background: "#E8F5E9",
                  "&:hover": { background: "#C8E6C9" },
                }}
              >
                <Icon color="success">print</Icon>
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={
                <Icon>{loading ? "hourglass_top" : "save"}</Icon>
              }
              disabled={loading}
              onClick={handleSave}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                fontWeight: 600,
              }}
            >
              {loading ? "Saving..." : "Save"}
            </Button>

            <Button
              variant="outlined"
              startIcon={<Icon>arrow_back</Icon>}
              onClick={() => navigate(-1)}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Back
            </Button>

          </Stack>
        </Box>

        {/* EMPLOYEE INFO */}
        <Typography fontWeight="bold">Employee Info</Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={3}>{input("Employee No","empNo")}</Grid>
          <Grid item xs={3}>{input("First Name","firstName")}</Grid>
          <Grid item xs={3}>{input("Middle Name","middleName")}</Grid>
          <Grid item xs={3}>{input("Last Name","lastName")}</Grid>

          <Grid item xs={3}>{input("Department","department")}</Grid>
          <Grid item xs={3}>{input("Grade","grade")}</Grid>
          <Grid item xs={3}>{input("Designation","designation")}</Grid>

          <Grid item xs={3}>
            <FormControlLabel control={<Checkbox />} label="Daily / Monthly"/>
          </Grid>
        </Grid>

        {/* PF / ESIC */}
        <Box mt={3}>
          <Typography fontWeight="bold">PF / ESIC Details</Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={3}>{input("PF No","pfNo")}</Grid>
            <Grid item xs={3}>{input("UAN","uan")}</Grid>
            <Grid item xs={3}>{input("OT Rate","otRate")}</Grid>

            <Grid item xs={3}>
              <FormControlLabel control={<Checkbox />} label="ESIC"/>
              <br/>
              <FormControlLabel control={<Checkbox />} label="PF Applicable"/>
            </Grid>
          </Grid>
        </Box>

        {/* STATUS */}
        <Box mt={3}>
          <Typography fontWeight="bold">Status & Dates</Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={2}>{input("Status","status")}</Grid>
            <Grid item xs={2}>{input("Period Days","period")}</Grid>

            <Grid item xs={2}>
              <TextField type="date" size="small" fullWidth label="Probation Start"
                InputLabelProps={{ shrink:true }}/>
            </Grid>

            <Grid item xs={2}>
              <TextField type="date" size="small" fullWidth label="Confirm Date"
                InputLabelProps={{ shrink:true }}/>
            </Grid>

            <Grid item xs={2}>
              <TextField type="date" size="small" fullWidth label="Temporary End"
                InputLabelProps={{ shrink:true }}/>
            </Grid>
          </Grid>
        </Box>

        {/* PAYMENT */}
        <Box mt={3}>
          <Typography fontWeight="bold">Payment Type</Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <RadioGroup row>
                <FormControlLabel value="cash" control={<Radio/>} label="Cash"/>
                <FormControlLabel value="bank" control={<Radio/>} label="Bank"/>
                <FormControlLabel value="dd" control={<Radio/>} label="DD"/>
              </RadioGroup>
            </Grid>

            <Grid item xs={2}>
              <TextField type="date" size="small" fullWidth label="Increment Date"
                InputLabelProps={{ shrink:true }}/>
            </Grid>

            <Grid item xs={4}>{input("Increment Remark","remark")}</Grid>
          </Grid>
        </Box>

        {/* ALLOWANCES */}
        <Box mt={3}>
          <Typography fontWeight="bold">Allowances</Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {allowances.map((item) => (
              <Grid item xs={2} key={item}>
                {input(item,item)}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* OTHER PARAMETER BUTTON */}
        <Box mt={3}>
          <Button
            variant="contained"
            sx={{ borderRadius:2, textTransform:"none", px:3 }}
          >
            Other Parameter
          </Button>
        </Box>

        {/* TOTAL SECTION */}
        <Box mt={3}>
          <Grid container spacing={2} alignItems="center">

            <Grid item xs={2}>
              <TextField label="Slip Total (A)" size="small" fullWidth/>
            </Grid>

            <Grid item xs={2}>
              <TextField label="Annual Benefits (B)" size="small" fullWidth/>
            </Grid>

            <Grid item xs={2}>
              <TextField label="Total (A+B)" defaultValue="0.00" size="small" fullWidth/>
            </Grid>

            <Grid item xs={1.5}>
              <TextField label="ESIC" size="small" fullWidth/>
            </Grid>

            <Grid item xs={1.5}>
              <TextField label="PF" size="small" fullWidth/>
            </Grid>

            <Grid item xs={1.5}>
              <TextField label="Super Ann." size="small" fullWidth/>
            </Grid>

            <Grid item xs={1.5}>
              <TextField label="Gratuity" size="small" fullWidth/>
            </Grid>

            <Grid item xs={2}>
              <TextField label="CTC Per Month" size="small" fullWidth/>
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="contained"
                sx={{
                  width:"100%",
                  borderRadius:2,
                  textTransform:"none",
                  height:40
                }}
              >
                Click For Annual Benefit Details
              </Button>
            </Grid>

          </Grid>
        </Box>

      </Box>
    </Container>
  );
}
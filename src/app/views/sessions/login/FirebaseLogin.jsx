import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled, useTheme } from "@mui/material/styles";

import { login } from "app/utils/authServices";
import useAuth from "app/hooks/useAuth";

// Styled Components
const FirebaseRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1A2038",
  minHeight: "100vh",
  "& .card": { maxWidth: 450, margin: "1rem", width: "100%" },
}));

// Initial form values
const initialValues = {
  Login_Name: "",
  Login_Pwd: "",
};

// Validation Schema
const validationSchema = Yup.object().shape({
  Login_Name: Yup.string().required("Login Name is required!"),
  Login_Pwd: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required!"),
});

export default function FirebaseLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useAuth();

  // ✅ State
  const [openModal, setOpenModal] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();

    setFromDate(`${year}-04-01`);
    setToDate(`${year + 1}-03-31`);
  }, []);
  // ✅ Login Submit
  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setOpenModal(true);

      // const data = await login(values.Login_Name, values.Login_Pwd);

      // if (data.status === "succeed") {
      //   const { token, JsonData } = data;

      //   const userData = {
      //     token,
      //     JsonData,
      //     login_name: JsonData.Divisions?.[0]?.login_name || "",
      //     PROFCEN_CD: JsonData.Divisions?.[0]?.PROFCEN_CD || ""
      //   };

      //   setUser(userData);

      //   localStorage.setItem("token", token);
      //   localStorage.setItem("divisions", JSON.stringify(JsonData.Divisions || []));
      //   localStorage.setItem("modules", JSON.stringify(JsonData.Modules || []));
      //   localStorage.setItem("departments", JSON.stringify(JsonData.Departments || []));
      //   localStorage.setItem("userData", JSON.stringify(userData));

      //   enqueueSnackbar("Logged in successfully", { variant: "success" });

      //   // ✅ Open Modal instead of navigating
      //   setDivisions(JsonData.Divisions || []);
      //   setSelectedDivision(JsonData.Divisions?.[0]?.PROFCEN_CD || "");
      //   setOpenModal(true);
      // } else {
      //   enqueueSnackbar(data.message || "Login failed", { variant: "error" });
      // }
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar(error.message || "Login failed", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Continue after selecting division
  const handleContinue = () => {
    if (!selectedDivision) {
      enqueueSnackbar("Please select a division", { variant: "warning" });
      return;
    }

    localStorage.setItem("selectedDivision", selectedDivision);

    setOpenModal(false);
    navigate(state?.from || "/dashboard/default", { replace: true });
  };

  return (
    <FirebaseRoot>
      <Card className="card">
        <Grid container>
          <Grid xs={12}>
            <Box p={4}>
              <h2 style={{ marginBottom: 24, textAlign: "center" }}>Login</h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      name="Login_Name"
                      label="Login Name"
                      value={values.Login_Name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.Login_Name && errors.Login_Name}
                      error={Boolean(errors.Login_Name && touched.Login_Name)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="Login_Pwd"
                      type="password"
                      label="Password"
                      value={values.Login_Pwd}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.Login_Pwd && errors.Login_Pwd}
                      error={Boolean(errors.Login_Pwd && touched.Login_Pwd)}
                      sx={{ mb: 2 }}
                    />

                    <Box display="flex" justifyContent="flex-end" mb={2}>
                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink>
                    </Box>

                    <LoadingButton
                      type="submit"
                      loading={isSubmitting}
                      fullWidth
                      variant="contained"
                    >
                      Login
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* ✅ Modal */}
     <Dialog open={openModal} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ fontWeight: 600 }}>
    Setup Details
  </DialogTitle>

  <DialogContent dividers>
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      mt={1}
    >
      {/* Subtitle */}
      <Box sx={{ color: "text.secondary", fontSize: 14 }}>
        Select Division & Financial Year
      </Box>

      {/* Division */}
      <TextField
        select
        label="Division"
        fullWidth
        value={selectedDivision}
        onChange={(e) => setSelectedDivision(e.target.value)}
      >
        <MenuItem value="">Select Division</MenuItem>
        {divisions.map((div, index) => (
          <MenuItem key={index} value={div.PROFCEN_CD}>
            {div.DESC}
          </MenuItem>
        ))}
      </TextField>

      {/* Date Fields */}
      <Box display="flex" gap={2}>
        <TextField
          label="From Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <TextField
          label="To Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </Box>
    </Box>
  </DialogContent>

  <DialogActions sx={{ px: 3, py: 2 }}>
    <Button
      onClick={() => setOpenModal(false)}
      variant="outlined"
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={() => {
        if (!selectedDivision) {
          enqueueSnackbar("Please select division", { variant: "warning" });
          return;
        }

        if (!fromDate || !toDate) {
          enqueueSnackbar("Please select dates", { variant: "warning" });
          return;
        }

        localStorage.setItem("selectedDivision", selectedDivision);
        localStorage.setItem("fromDate", fromDate);
        localStorage.setItem("toDate", toDate);

        setOpenModal(false);

        navigate(state?.from || "/dashboard/default", {
          replace: true
        });
      }}
    >
      Continue
    </Button>
  </DialogActions>
</Dialog>
    </FirebaseRoot>
  );
}

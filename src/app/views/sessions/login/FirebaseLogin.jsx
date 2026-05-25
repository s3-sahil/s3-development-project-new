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

import useAuth from "app/hooks/useAuth";
import { loginApi } from "app/utils/authServices";

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
    // .min(6, "Password must be at least 6 characters")
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
  const [financeYears, setFinanceYears] = useState([]);
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();

    setFromDate(`${year}-04-01`);
    setToDate(`${year + 1}-03-31`);
  }, []);
  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const data = await loginApi(values.Login_Name, values.Login_Pwd);
      console.log("LOGIN RESPONSE:", data);

      if (!data) throw new Error("No response from server");

      if (data.status === "succeed") {
        const { token, JsonData } = data;

        const userData = {
          token,
          JsonData,
          login_name: JsonData.Divisions?.[0]?.login_name || "",
          PROFCEN_CD: JsonData.Divisions?.[0]?.PROFCEN_CD || "",
        };

        setUser(userData);

        localStorage.setItem("token", token);
        localStorage.setItem("login_name", userData.login_name);
        localStorage.setItem(
          "divisions",
          JSON.stringify(JsonData.Divisions || []),
        );
        localStorage.setItem("modules", JSON.stringify(JsonData.Modules || []));
        localStorage.setItem(
          "departments",
          JSON.stringify(JsonData.Departments || []),
        );
        localStorage.setItem("userData", JSON.stringify(userData));

        enqueueSnackbar("Logged in successfully", { variant: "success" });

        // ✅ SET DATA FOR MODAL
        setDivisions(JsonData.Divisions || []);
        const defaultDivision = JsonData.Divisions?.[0]?.PROFCEN_CD;

        const selectedDivisionData =
          JsonData.Divisions?.find(
            (item) => String(item.PROFCEN_CD) === String(defaultDivision),
          ) || {};
        console.log("Selected Division:", selectedDivisionData);

        localStorage.setItem(
          "selectedDivisionData",
          JSON.stringify(selectedDivisionData),
        );

        const fyList = JsonData.FINANCE_YEAR || [];
        setFinanceYears(fyList);

        // ✅ AUTO SELECT LAST FY
        if (fyList.length > 0) {
          const lastFY = fyList[fyList.length - 1];

          setFromDate(formatFYDate(lastFY.FROM_DATE, true));
          setToDate(formatFYDate(lastFY.TO_DATE, false));
        }

        setSelectedDivision(JsonData.Divisions?.[0]?.PROFCEN_CD || "");
        setOpenModal(true);
      } else {
        enqueueSnackbar(data.message || "Login failed", { variant: "error" });
      }
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar(error.message || "Login failed", { variant: "error" });
    } finally {
      setSubmitting(false); // ✅ FIX LOADING ISSUE
    }
  };

  const formatFYDate = (str, isFrom) => {
    const [month, year] = str.split("/");
    return `${year}-${month}-${isFrom ? "01" : "31"}`;
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
        <DialogTitle sx={{ fontWeight: 600 }}>SIBS</DialogTitle>

        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={3} mt={1}>
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

            {/* Financial Year */}
            <Box display="flex" gap={2}>
              <TextField
                select
                label="From Date"
                fullWidth
                value={fromDate}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    backgroundColor: "#fff",
                    color: "#000",
                    cursor: "text !important",
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                    cursor: "text !important",
                  },
                  "& .MuiInputBase-root.Mui-disabled *": {
                    cursor: "text !important", // ✅ force override all children
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc !important",
                  },
                }}
                onChange={(e) => {
                  const selected = financeYears.find(
                    (fy) => formatFYDate(fy.FROM_DATE, true) === e.target.value,
                  );

                  if (selected) {
                    setFromDate(formatFYDate(selected.FROM_DATE, true));
                    setToDate(formatFYDate(selected.TO_DATE, false));
                  }
                }}
              >
                {financeYears.map((fy, index) => (
                  <MenuItem
                    key={index}
                    value={formatFYDate(fy.FROM_DATE, true)}
                  >
                    {fy.FROM_DATE}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="To Date"
                fullWidth
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                disabled
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    backgroundColor: "#fff",
                    color: "#000",
                    cursor: "text !important",
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                    cursor: "text !important",
                  },
                  "& .MuiInputBase-root.Mui-disabled *": {
                    cursor: "text !important", // ✅ force override all children
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc !important",
                  },
                }}
              >
                {financeYears.map((fy, index) => (
                  <MenuItem key={index} value={formatFYDate(fy.TO_DATE, false)}>
                    {fy.TO_DATE}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={() => {
              if (!selectedDivision) {
                enqueueSnackbar("Select division", { variant: "warning" });
                return;
              }

              localStorage.setItem("selectedDivision", selectedDivision);
              localStorage.setItem("fromDate", fromDate);
              localStorage.setItem("toDate", toDate);

              setOpenModal(false);
              navigate("/dashboard/default");
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </FirebaseRoot>
  );
}

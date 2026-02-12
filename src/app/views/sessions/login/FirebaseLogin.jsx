import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { styled, useTheme } from "@mui/material/styles";

import { login } from "app/utils/authServices";
import useAuth from "app/hooks/useAuth";

// Styled Components
const FirebaseRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": { maxWidth: 450, margin: "1rem", width: "100%" }
}));

// Initial form values
const initialValues = {
  Login_Name: "",
  Login_Pwd: ""
};

// Validation Schema
const validationSchema = Yup.object().shape({
  Login_Name: Yup.string().required("Login Name is required!"),
  Login_Pwd: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required!")
});

export default function FirebaseLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useAuth();

  // const handleFormSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     setSubmitting(true);

  //     // Call login API
  //     const data = await login(values.Login_Name, values.Login_Pwd);

  //     if (data.status === "succeed") {
  //       const { token, JsonData } = data;

  //       localStorage.setItem("token", token);
  //       localStorage.setItem("divisions", JSON.stringify(JsonData.Divisions || []));
  //       localStorage.setItem("modules", JSON.stringify(JsonData.Modules || []));
  //       localStorage.setItem("departments", JSON.stringify(JsonData.Departments || []));
  //       localStorage.setItem("PROFCEN_CD", JsonData.Divisions?.[0]?.PROFCEN_CD || "");
  //       localStorage.setItem("login_name", JsonData.Divisions?.[0]?.login_name || "");

  //       enqueueSnackbar("Logged in successfully", { variant: "success" });
  //       console.log("Navigating to:", state?.from || "/dashboard/default");
  //       navigate(state?.from || "/dashboard/default", { replace: true });
  //       window.location.reload();
  //     } else {
  //       enqueueSnackbar(data.message || "Login failed", { variant: "error" });
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     enqueueSnackbar(error.message || "Login failed", { variant: "error" });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // const handleFormSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     setSubmitting(true);

  //     // Call your custom API
  //     const data = await login(values.Login_Name, values.Login_Pwd);

  //     if (data.status === "succeed") {
  //       const { token, JsonData } = data; // <-- destructure from API response

  //       // Prepare user data for context
  //       const userData = {
  //         token,
  //         JsonData,
  //         login_name: JsonData.Divisions?.[0]?.login_name || "",
  //         PROFCEN_CD: JsonData.Divisions?.[0]?.PROFCEN_CD || ""
  //       };

  //       // ✅ Update AuthContext (AuthGuard will now allow dashboard)
  //       setUser(userData);

  //       // ✅ Persist in localStorage
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("divisions", JSON.stringify(JsonData.Divisions || []));
  //       localStorage.setItem("modules", JSON.stringify(JsonData.Modules || []));
  //       localStorage.setItem("departments", JSON.stringify(JsonData.Departments || []));
  //       localStorage.setItem("PROFCEN_CD", userData.PROFCEN_CD);
  //       localStorage.setItem("login_name", userData.login_name);
  //       localStorage.setItem("userData", JSON.stringify(userData)); // optional, for context recovery

  //       enqueueSnackbar("Logged in successfully", { variant: "success" });

  //       // ✅ Navigate to dashboard without page reload
  //       navigate(state?.from || "/dashboard/default", { replace: true });
  //     } else {
  //       enqueueSnackbar(data.message || "Login failed", { variant: "error" });
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     enqueueSnackbar(error.message || "Login failed", { variant: "error" });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleFormSubmit = async (values, { setSubmitting }) => {
  try {
    setSubmitting(true);

    // 🔴 Skip API — create dummy user
    const dummyUserData = {
      token: "dummy-token",
      JsonData: {
        Divisions: [
          {
            login_name: values.Login_Name || "admin",
            PROFCEN_CD: "DEFAULT"
          }
        ],
        Modules: [],
        Departments: []
      },
      login_name: values.Login_Name || "admin",
      PROFCEN_CD: "DEFAULT"
    };

    // ✅ Set Auth Context
    setUser(dummyUserData);

    // ✅ Save in localStorage (for AuthGuard / refresh)
    localStorage.setItem("token", dummyUserData.token);
    localStorage.setItem("divisions", JSON.stringify(dummyUserData.JsonData.Divisions));
    localStorage.setItem("modules", JSON.stringify([]));
    localStorage.setItem("departments", JSON.stringify([]));
    localStorage.setItem("PROFCEN_CD", dummyUserData.PROFCEN_CD);
    localStorage.setItem("login_name", dummyUserData.login_name);
    localStorage.setItem("userData", JSON.stringify(dummyUserData));

    enqueueSnackbar("Logged in (API bypassed)", { variant: "success" });

    // ✅ Directly go to dashboard
    navigate("/dashboard/default", { replace: true });

  } catch (error) {
    console.error("Login error:", error);
    enqueueSnackbar("Login failed", { variant: "error" });
  } finally {
    setSubmitting(false);
  }
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
                // validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      name="Login_Name"
                      label="Login Name"
                      variant="outlined"
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
                      variant="outlined"
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
                      color="primary"
                      variant="contained"
                      sx={{ py: 1.5 }}
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
    </FirebaseRoot>
  );
}

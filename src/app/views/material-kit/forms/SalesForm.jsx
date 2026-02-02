import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Breadcrumb, SimpleCard } from "app/components";
import { Span } from "app/components/Typography";
import { addSalesman, fetchEmployeesDropdown } from "app/utils/authServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SalesmanForm = () => {
  const navigate = useNavigate();
  const { employeeCode: paramEmpCode } = useParams();
  const location = useLocation();

  const actionMode = paramEmpCode ? "edit" : "add";

  const [state, setState] = useState({
    employeeCode: "",
    employeeName: "",
    email: "",
    contactNo: "",
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /* 🔹 Load employee dropdown */
  useEffect(() => {
    fetchEmployeesDropdown(2).then(setEmployees);
  }, []);

  /* 🔹 Prefill data in EDIT mode */
  useEffect(() => {
    if (actionMode === "edit" && location.state) {
      setState({
        employeeCode: location.state.employeeCode,
        employeeName: location.state.employeeName,
        email: location.state.email,
        contactNo: location.state.contactNo,
      });
    }
  }, [actionMode, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const payload = {
      emp_no: state.employeeCode,
      sman_name: state.employeeName,
      fname: state.employeeName.split(" ")[0] || "",
      lname: state.employeeName.split(" ")[1] || "",
      semail: state.email,
      scontact_no: state.contactNo,
      status: "Active",
    };

    try {
      let result;
      if (actionMode === "add") {
        result = await addSalesman(payload);
      } else {
        // if you have a separate update API, call it here
        result = await addSalesman(payload);
      }

      // ✅ check the actual field returned by backend
      if (result?.message?.toLowerCase().includes("success")) {
        navigate("/material/salesman"); // redirect to table view
      } else {
        setErrorMessage(result?.message || "Operation failed");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Master" }, { name: "Salesman" }]} />
      </Box>

      <SimpleCard title={actionMode === "add" ? "Add Salesman" : "Edit Salesman"}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid size={{ md: 6, xs: 12 }}>
              <Stack spacing={3}>
                <TextField
                  select
                  label="Employee Code"
                  name="employeeCode"
                  value={state.employeeCode}
                  onChange={handleChange}
                  disabled={actionMode === "edit"}
                >
                  {employees.map((emp) => (
                    <MenuItem key={emp.emp_no} value={emp.emp_no}>
                      {emp.emp_no} - {emp.fname} {emp.lname}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Employee Name"
                  name="employeeName"
                  value={state.employeeName}
                  onChange={handleChange}
                />

                <TextField
                  label="Email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />

                <TextField
                  label="Contact No"
                  name="contactNo"
                  value={state.contactNo}
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
          </Grid>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <Box mt={4} textAlign="right">
            <Button type="submit" variant="contained" disabled={loading}>
              <Icon>{actionMode === "add" ? "save" : "update"}</Icon>
              <Span sx={{ pl: 1 }}>
                {loading
                  ? "Processing..."
                  : actionMode === "add"
                    ? "Save"
                    : "Update"}
              </Span>
            </Button>
          </Box>
        </form>
      </SimpleCard>
    </Container>
  );
};

export default SalesmanForm;

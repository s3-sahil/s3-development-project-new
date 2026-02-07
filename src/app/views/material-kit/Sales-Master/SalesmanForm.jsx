import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Icon from "@mui/material/Icon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { Span } from "app/components/Typography";
import { Box, Container } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Employeelistapichange,
  salesmanDetailsAdd,
  salesmanDetailsEdit,
} from "app/utils/authServices";

const INITIAL_FORM = {
  employeeCode: "",
  employeeName: "",
  email: "",
  contactNo: "",
  gender: "",
  agreedToTerms: false,
};

const SalesmanForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // for edit data

  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [actionMode, setActionMode] = useState("new"); // new | edit
  const [loading, setLoading] = useState(false);

  // 🔹 Input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Fetch employee dropdown
  const fetchEmployeeCode = async () => {
    try {
      const profcenCd = localStorage.getItem("PROFCEN_CD") || "";
      if (!profcenCd) return;

      const res = await Employeelistapichange(profcenCd);
      if (res?.data) setEmployeeOptions(res.data);
    } catch (error) {
      console.error("Employee dropdown error:", error);
    }
  };

  // 🔹 If Edit mode, fetch full record
  const fetchEditData = async (empNo) => {
    try {
      const res = await salesmanDetailsEdit(empNo);

      if (res?.data) {
        const data = res.data;
        setFormData({
          employeeCode: data.emp_no ?? "",
          employeeName: data.sman_name ?? "",
          email: data.semail ?? "",
          contactNo: data.scontact_no ?? "",
          gender: data.gender ?? "",
          agreedToTerms: false,
        });
      }
    } catch (error) {
      console.error("Edit fetch error:", error);
    }
  };

  // 🔹 Save (Add / Update)
  const handleSave = async () => {
    if (
      !formData.employeeCode ||
      !formData.employeeName ||
      !formData.email ||
      !formData.contactNo
    ) {
      alert("Please fill all required fields");
      return;
    }

    const nameParts = formData.employeeName.trim().split(" ");

    const payload = {
      emp_no: formData.employeeCode,
      sman_name: formData.employeeName,
      fname: nameParts[0] || "",
      mname: nameParts.length === 3 ? nameParts[1] : "",
      lname:
        nameParts.length === 3
          ? nameParts[2]
          : nameParts.length === 2
          ? nameParts[1]
          : "",
      semail: formData.email,
      scontact_no: formData.contactNo,
      gender: formData.gender,
    };

    try {
      setLoading(true);

      await salesmanDetailsAdd(payload); // same API for add/update

      alert(
        actionMode === "edit"
          ? "Salesman updated successfully!"
          : "Salesman added successfully!"
      );

      navigate("/material/salesman"); // go back to table
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save salesman");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 On load
  useEffect(() => {
    fetchEmployeeCode();

    // If coming from Edit
    if (location.state?.employeeCode) {
      setActionMode("edit");
      fetchEditData(location.state.employeeCode);
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Sales" }, { name: "Salesman Details" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2>Salesman Details</h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
            disabled={loading}
          >
            <Span>{actionMode === "edit" ? "Update" : "Save"}</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <TextField
                size="small"
                select
                fullWidth
                name="employeeCode"
                label="Employee Code"
                value={formData.employeeCode}
                onChange={handleChange}
                disabled={actionMode === "edit"}
              >
                <MenuItem value="">-- Select Employee --</MenuItem>
                {employeeOptions.map((emp) => (
                  <MenuItem key={emp.emp_no} value={emp.emp_no}>
                    {emp.emp_no} {emp.fname} {emp.mname} {emp.lname}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                size="small"
                fullWidth
                name="employeeName"
                label="Employee Name"
                value={formData.employeeName}
                onChange={handleChange}
              />

              <TextField
                size="small"
                fullWidth
                name="email"
                label="Email ID"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                size="small"
                fullWidth
                name="contactNo"
                label="Contact No"
                value={formData.contactNo}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Male"
                  label="Male"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="Female"
                  label="Female"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="Others"
                  label="Others"
                  control={<Radio />}
                />
              </RadioGroup>

              <FormControlLabel
                control={
                  <Checkbox
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                  />
                }
                label="I have read and agree to the terms of service."
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SalesmanForm;
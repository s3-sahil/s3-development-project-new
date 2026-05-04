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
import { Box, Container, ListSubheader } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useLocation, useNavigate } from "react-router-dom";

import { Snackbar, Alert } from "@mui/material";
//import { , Alert } from "@mui/material";

import {
  fetchEmployeesDropdown,
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
  externalSalesman: false,
  inUseFlag: true,
};

const SalesmanForm = () => {
  
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const navigate = useNavigate();
  const location = useLocation(); // for edit data

  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [actionMode, setActionMode] = useState("new"); // new | edit
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  // 🔹 Input change
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (name === "employeeCode") {
  //     const selectedEmp = employeeOptions.find(
  //       (emp) => emp.emp_no === value
  //     );

  //     setFormData((prev) => ({
  //       ...prev,
  //       employeeCode: value,
  //       employeeName: selectedEmp ? ([selectedEmp.fname, selectedEmp.mname, selectedEmp.lname].filter(Boolean).join(" ")) : "",
  //       email:  selectedEmp ? selectedEmp.email : "",
  //       contactNo:  selectedEmp ? ( selectedEmp.phone == "" ? selectedEmp.Mobile_No : selectedEmp.phone ) : "",
  //     }));
  //   }

  //    setFormData((prev) => ({
  //   ...prev,
  //   [name]: checked,
  //   ...(name === "externalSalesman" && checked && { employeeName: "" })
  //    }));


  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));


  //   if (name === "email") {
  //     if (value && !emailRegex.test(value)) {
  //       setEmailError("Enter a valid email (example: abc@gmail.com)");
  //     } else {
  //       setEmailError("");
  //     }
  //   }

  // };


  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  setFormData((prev) => {
    let updated = {
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    };

    // employeeCode logic
    if (name === "employeeCode") {
      const selectedEmp = employeeOptions.find(
        (emp) => emp.emp_no === value
      );

      updated = {
        ...updated,
        employeeCode: value,
        employeeName: selectedEmp
          ? [selectedEmp.fname, selectedEmp.mname, selectedEmp.lname]
              .filter(Boolean)
              .join(" ")
          : "",
        email: selectedEmp ? selectedEmp.email : "",
        contactNo: selectedEmp
          ? selectedEmp.phone === ""
            ? selectedEmp.Mobile_No
            : selectedEmp.phone
          : "",
      };
    }

    // externalSalesman logic → clear employeeName when checked
    if (name === "externalSalesman" && checked) {
      updated.employeeName = "",
      updated.employeeCode = "",
      updated.email = "",
      updated.contactNo = "";
    }

    return updated;
  });

  // email validation (keep outside state update)
  if (name === "email") {
    if (value && !emailRegex.test(value)) {
      setEmailError("Enter a valid email (example: abc@gmail.com)");
    } else {
      setEmailError("");
    }
  }
};

  // 🔹 Fetch employee dropdown
  const fetchEmployeeCode = async () => {
    try {
      const profcenCd = localStorage.getItem("PROFCEN_CD") || "";
      if (!profcenCd) return;

      const res = await fetchEmployeesDropdown(profcenCd, true);
      if (res) setEmployeeOptions(res);
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
          //inUseFlag: data.status ? "" : "L",
          inUseFlag: data.status === "L" ? false : true,
          gender: data.gender ?? "",
          externalSalesman: data.emp_no?.substring(0, 2) === "EX",
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
      emp_no: ((formData.externalSalesman && actionMode === "new") ? "EX" : formData.employeeCode),
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
      status: formData.inUseFlag ? null : "L",
      gender: formData.gender,
      external: formData.externalSalesman,
    };

    try {
      setLoading(true);

      const res = await salesmanDetailsAdd(payload); // same API for add/update

      // if (res?.success) {
      //   alert(
      //     actionMode === "edit"
      //       ? "Salesman updated successfully!"
      //       : "Salesman added successfully!"
      //   );

      //   navigate("/Sales/material/salesman");
      // } else {
      //   console.error("Salesman handleSave Error:", res);
      //   alert("Failed to save salesman");
      // }

        if (res?.success) {
          setSnackbar({
            open: true,
            message: actionMode === "edit" 
                ? "Salesman Updated successfully!" 
                : "Salesman saved successfully!",
            severity: "success"
          });

          setTimeout(() => {
            navigate("/Sales/material/salesman");
          }, 1500); // 1.5 sec delay
        }else {
        setSnackbar({
          open: true,
          message: "Failed to save salesman",
          severity: "error"
        });
      }

    } catch (error) {
      console.error("Save Error:", error);
      setSnackbar({
        open: true,
        message: "Failed to save salesman",
        severity: "error"
      });
}
     finally {
      setLoading(false);
    }
  };

  // 🔹 On load
  useEffect(() => {
    fetchEmployeeCode();

    // If coming from Edit
    if (location.state?.Emp_no) {
      setActionMode("edit");
      fetchEditData(location.state.Emp_no);
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Sales" }, { name: "Salesman Details" }]}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
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
        <Box display="flex" gap={4} mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                name="externalSalesman"
                checked={formData.externalSalesman}
                onChange={handleChange}
                disabled={actionMode === "edit"}
              />
            }
            label="External Salesman"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="inUseFlag"
                checked={formData.inUseFlag}
                onChange={handleChange}
              />
            }
            label="In Use Flag"
          />
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
            <Stack spacing={3}>
              {/* <TextField
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
                    {emp.emp_no} - {emp.fname} {emp.mname} {emp.lname}
                  </MenuItem>
                ))}
              </TextField> */}
{formData.externalSalesman ? (
  // ✏️ Manual input (NO API)
  <TextField
    size="small"
    label="Employee Code"
    name="employeeCode"
    value={(formData.externalSalesman && actionMode === "new") ? "" : formData.employeeCode}
    onChange={handleChange}
    disabled={actionMode === "edit" || formData.externalSalesman}
    fullWidth
  />
) : (

      <TextField
        size="small"
        select
        fullWidth
        name="employeeCode"
        label="Employee Code"
        value={formData.employeeCode || ""}
        onChange={handleChange}
        disabled={actionMode === "edit"}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          },
        }}
      >
        {/* <MenuItem value="" disabled>
          -- Select Employee --
        </MenuItem> */}

        {/* Proper Header */}
        <ListSubheader
          style={{
            position: "sticky",
            top: 0,
            //lineheight: "33px",
            lineHeight: "33px", 
            background: "#391197",
            zIndex: 1,
            fontWeight: "bold",
          }}
        >
          <div style={{ display: "flex" , gap:20}}>
            <div style={{ flex: 1, color: "white" }}>EmpNo</div>
            <div style={{ flex: 2, color: "white" }}>FirstName</div>
            <div style={{ flex: 3, color: "white" }}>MiddleName</div>
            <div style={{ flex: 4, color: "white" }}>LastName</div>
          </div>
        </ListSubheader>

        {employeeOptions.map((emp) => (
          <MenuItem key={emp.emp_no} value={emp.emp_no}>
            <div style={{ display: "flex", width: "100%", gap:20 }}>
              <div style={{ flex: 1 }}>{emp.emp_no}</div>
              <div style={{ flex: 2 }}>{emp.fname}</div>
              <div style={{ flex: 3 }}>{emp.mname}</div>
              <div style={{ flex: 4 }}>{emp.lname}</div>
            </div>
          </MenuItem>
        ))}
      </TextField>
)}

              <TextField
                size="small"
                fullWidth
                name="employeeName"
                label="Employee Name"
                value={formData.employeeName}
                onChange={handleChange}
                //disabled={!formData.externalSalesman}
                   InputProps={{
                  readOnly: !formData.externalSalesman                  
                }}
              />

              {/* <TextField
                size="small"
                fullWidth
                name="email"
                label="Email ID"
                type="email"
                value={formData.email}
                onChange={handleChange}
              /> */}
<TextField
  size="small"
  fullWidth
  name="email"
  label="Email ID"
  type="email"
  value={formData.email}
  //disabled={!formData.externalSalesman}
   InputProps={{
                  readOnly: !formData.externalSalesman                  
                }}
  onChange={handleChange}
  error={!!emailError}
  helperText={emailError}
/>
              {/* <TextField
                size="small"
                fullWidth
                name="contactNo"
                label="Contact No"
                value={formData.contactNo}
                onChange={handleChange}
              /> */}

              <TextField
                size="small"
                fullWidth
                name="contactNo"
                label="Contact No"
                value={formData.contactNo}
                //disabled={!formData.externalSalesman}
                InputProps={{
                  readOnly: !formData.externalSalesman,
                  maxLength: 10
                }}
                onChange={(e) => {
                  // 👇 allow only numbers
                  const value = e.target.value.replace(/\D/g, "");
                  handleChange({
                    target: { name: "contactNo", value }
                  });
                }}
                //inputProps={{ maxLength: 10 }}
                error={formData.contactNo.length > 0 && formData.contactNo.length !== 10}
                helperText={
                  formData.contactNo.length > 0 && formData.contactNo.length !== 10
                    ? "Mobile number must be exactly 10 digits"
                    : ""
                }
              />

            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SalesmanForm;

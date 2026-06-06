import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  addEmployeeAdvanceDetails,
  updateEmployeeAdvanceDetails,
} from "app/utils/FinanceMasterServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function EmployeeAdvanceForm() {
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(location.state?.isEdit || false);
  const [formData, setFormData] = useState({
    empNo: "",
    empName: "",
    subCode: "",
    amount: "",
    officeAmount: "",
    unit: "UNIT-1",
  });

  const [advances, setAdvances] = useState([]);

  useEffect(() => {
    if (location.state?.isEdit) {
      const data = location.state;

      setFormData({
        empNo: data.emp_no || "",
        empName: data.subcode_desc || "",
        subCode: data.sub_code || "",
        amount: data.amt || "",
        officeAmount: data.office_amount || "",
        unit: "UNIT-1",
      });
    }
  }, [location]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAdd = () => {
    if (formData.empNo && formData.empName && formData.subCode) {
      setAdvances([...advances, { ...formData, id: advances.length + 1 }]);
      setFormData({ ...formData, empNo: "", empName: "", subCode: "" });
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        sub_code: formData.subCode,
        subcode_desc: formData.empName,
        emp_no: formData.empNo,

        amt: Number(formData.amount || 0),

        profcen_cd: localStorage.getItem("PROFCEN_CD") || "",

        office_amount: Number(formData.officeAmount || 0),
      };

      if (isEdit) {
        await updateEmployeeAdvanceDetails(payload);

        alert("Employee Advance Updated Successfully");
      } else {
        await addEmployeeAdvanceDetails([payload]);

        alert("Employee Advance Saved Successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: "Finance" },
            { name: "Employee Advance Details" },
          ]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold"></Typography>
          <Button
            variant="contained"
            startIcon={<Icon>{isEdit ? "edit" : "save"}</Icon>}
            onClick={handleSave}
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Employee No"
              size="small"
              fullWidth
              value={formData.empNo}
              onChange={handleChange("empNo")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Employee Name"
              size="small"
              fullWidth
              value={formData.empName}
              onChange={handleChange("empName")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Sub Code"
              size="small"
              fullWidth
              value={formData.subCode}
              onChange={handleChange("subCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Amount"
              size="small"
              fullWidth
              value={formData.amount}
              onChange={handleChange("amount")}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Office Amount"
              size="small"
              fullWidth
              value={formData.officeAmount}
              onChange={handleChange("officeAmount")}
            />
          </Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>

        {/* Added Advances Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Added Advances
          </Typography>
          {advances.map((adv) => (
            <Box
              key={adv.id}
              sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}
            >
              <Typography>{`${adv.empNo} - ${adv.empName} - ${adv.subCode}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

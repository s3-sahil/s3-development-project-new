import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { ScheduleDetailsSave, UpdateScheduleDetails } from "app/utils/authServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ScheduleDetailsForm() {
  const [formData, setFormData] = useState({
    schedule: "",
    scheduleName: "",
    glCategory: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMode, setActionMode] = useState("new"); // new | edit
  const navigate = useNavigate();
    const location = useLocation(); // for edit data

   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success"
    });

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  // const handleAdd = () => {
  //   if (formData.schedule && formData.scheduleName && formData.glCategory) {
  //     setRecords([...records, { ...formData, id: records.length + 1 }]);
  //     setFormData({
  //       schedule: "",
  //       scheduleName: "",
  //       glCategory: "",
  //       unit: "UNIT-1",
  //     });
  //   }else{
  //     alert("All Field is required.");
  //   }
  // };

  const handleAdd = () => {
  if (formData.schedule && formData.scheduleName && formData.glCategory) {

    if (actionMode === "edit") {
      setRecords([
        {
          id: 1,
          ...formData,
        },
      ]);
    } else {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
    }

    setFormData({
      schedule: "",
      scheduleName: "",
      glCategory: "",
      unit: "UNIT-1",
    });

  } else {
    alert("All Field is required.");
  }
};

  
//   // Edit ( Update )
//   useEffect(() => {
//   if (location.state) {
//     const data = location.state;

//     setActionMode("edit");

//     setFormData({
//       schedule: data.sch_no || "",
//       scheduleName: data.sch_desc || "",
//       glCategory: data.sch_for || "",
//       unit: "UNIT-1",
//     });

//     setRecords([
//       {
//         id: 1,
//         schedule: data.sch_no,
//         scheduleName: data.sch_desc,
//         glCategory: data.sch_for,
//       },
//     ]);
//   }
// }, [location.state]);



  //   // 🔹 Save (Add / Update)
  //   const handleSave = async () => {
  //     if (
  //       !records.length
  //     ) {
  //       alert("Please Add atleast one Schedule.");
  //       return;
  //     }
  //     const payload =
  //       records.map((rec) => ({
  //         sch_no: rec.schedule,
  //         sch_desc: rec.scheduleName,
  //         sch_for: rec.glCategory,
  //       }));

  //     try {
  //       setLoading(true);
  
  //       const res = await ScheduleDetailsSave(payload); // same API for add/update
   
  //         if (res?.success) {
  //           setSnackbar({
  //             open: true,
  //             message: actionMode === "edit" 
  //                 ? "Schedule Updated successfully!" 
  //                 : "Schedule saved successfully!",
  //             severity: "success"
  //           });
  
  //           setTimeout(() => {
  //             navigate("/material/finance-schedule-details-table");
  //           }, 1500); // 1.5 sec delay
  //         }else {
  //         setSnackbar({
  //           open: true,
  //           message: "Failed to save Schedule : " + res?.message,
  //           severity: "error"
  //         });
  //       }
  
  //     } catch (error) {
  //       console.error("Save Error:", error);
  //       setSnackbar({
  //         open: true,
  //         message: "Failed to save Schedule",
  //         severity: "error"
  //       });
  // }
  //      finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Schedule Details" }]} />
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

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Schedule Details</Typography>
          {/* <Button variant="contained" onClick={handleSave} startIcon={<Icon>save</Icon>}>Save</Button> */}
          <Button
  variant="contained"
  onClick={handleSave}
  startIcon={<Icon>save</Icon>}
>
  {actionMode === "edit" ? "Update" : "Save"}
</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Schedule" size="small" fullWidth value={formData.schedule} onChange={handleChange("schedule")} /></Grid>
          <Grid item xs={4}><TextField label="Schedule Name" size="small" fullWidth value={formData.scheduleName} onChange={handleChange("scheduleName")} /></Grid>
          <Grid item xs={4}>
            <TextField select label="GL Category" size="small" fullWidth value={formData.glCategory} onChange={handleChange("glCategory")}>
              <MenuItem value="A">Assets</MenuItem>
              <MenuItem value="L">Liabilities</MenuItem>
              <MenuItem value="E">Expenditure</MenuItem>
              <MenuItem value="I">Income</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          {/* <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button> */}
          <Button
  variant="contained"
  startIcon={<Icon>{actionMode === "edit" ? "edit" : "add"}</Icon>}
  onClick={handleAdd}
>
  {actionMode === "edit" ? "Update" : "Add"}
</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Schedules</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.schedule} | ${rec.scheduleName} | GL: ${rec.glCategory}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
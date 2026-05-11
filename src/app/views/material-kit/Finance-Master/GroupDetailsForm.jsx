import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
   Snackbar,
  Alert
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { getgr_indicatorDropdown, getSchDropdown, GroupDetailsSave } from "app/utils/authServices";
import { useState } from "react";

export default function GroupDetailsForm() {
  const [formData, setFormData] = useState({
    groupCode: "",
    belongsTo: "",
    subGroupApplicable: false,
    gplflag: false,
    desc: "",
    category: "",
    schedule: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

          const handleCheckboxChange = (e) => {
          const { name, checked } = e.target;

          setFormData((prev) => ({
            ...prev,
            [name]: checked
          }));
        };

  const handleAdd = () => {
    if (formData.belongsTo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        groupCode: "",
        belongsTo: "",
        subGroupApplicable: false,
        gplflag: false,
        desc: "",
        category: "",
        schedule: "",
        unit: "UNIT-1",
      });
    }
  };

const [scheduleOptions, setScheduleOptions] = useState([]);
const [grIndicatorOptions, setGrIndicatorOptions] = useState([]);

const handleCategoryChange = async (e) => {
  const value = e.target.value;

  // update category
  setFormData((prev) => ({
    ...prev,
    belongsTo: value,
    schedule: "",
    gr_indicator: "",
  }));

  try {
    // Schedule API
    const schResult = await getSchDropdown(value);

    if (schResult?.StatusCode === 200) {
      setScheduleOptions(schResult.Data);
    } else {
      setScheduleOptions([]);
    }

    // Group Indicator API
    const grResult = await getgr_indicatorDropdown(value);

    if (grResult?.StatusCode === 200) {
      setGrIndicatorOptions(grResult.Data);
    } else {
      setGrIndicatorOptions([]);
    }

  } catch (error) {
    console.error(error);
    setScheduleOptions([]);
    setGrIndicatorOptions([]);
  }
};

 const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success"
    });
    
    // 🔹 Save (Add / Update)
        const handleSave = async () => {
          if (
            !records.length
          ) {
            alert("Please Add atleast one Group.");
            return;
          }
          const payload =
            records.map((rec) => ({
              group_code: rec.schedule,
              group_desc: rec.schedule,
              bS_Status: rec.schedule,
              gr_indicator_cd: rec.schedule,
              sch_no: rec.schedule,
              subGroupFlag: rec.schedule,
              gplFlag: rec.schedule,
            }));
    
          try {
            setLoading(true);
      
            const res = await GroupDetailsSave(payload); // same API for add/update
       
              if (res?.success) {
                setSnackbar({
                  open: true,
                  message: actionMode === "edit" 
                      ? "Group Detail Updated successfully!" 
                      : "Group Detail Saved successfully!",
                  severity: "success"
                });
      
                setTimeout(() => {
                  navigate("/material/finance-group-details-table");
                }, 1500); // 1.5 sec delay
              }else {
              setSnackbar({
                open: true,
                message: "Failed to save Group Detail : " + res?.message,
                severity: "error"
              });
            }
      
          } catch (error) {
            console.error("Save Error:", error);
            setSnackbar({
              open: true,
              message: "Failed to save Group Detail",
              severity: "error"
            });
      }
           finally {
            setLoading(false);
          }
        };


//   const handleFetchMaxCode = async (BsStatus) => {
//   try {
//     const res = await getGroupMasterMaxCode(BsStatus);

//     console.log("MaxCode API:", res);

//     if (res?.MaxCode) {
//       setFormData((prev) => ({
//         ...prev,
//         groupCode: res.MaxCode, // set in Group Code field
//       }));
//     }
//   } catch (error) {
//     console.error("Error fetching max code:", error);
//   }
// };

    


  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Group Details" }]} />
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
          <Typography variant="h5" fontWeight="bold">Group Details</Typography>
          <Button variant="contained" onChange={handleSave} startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          {/* <Grid item xs={4}><TextField label="Group Code" size="small" fullWidth value={formData.groupCode} onChange={handleChange("groupCode")} /></Grid> */}
          <Grid item xs={4}>
            <TextField
              label="Group Code"
              size="small"
              fullWidth
              value={formData.groupCode}
              onChange={handleChange("groupCode")}
              InputProps={{
                    readOnly: true,
                  }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField select label="Group Belongs To" size="small" fullWidth value={formData.belongsTo} onChange={handleCategoryChange}>
               <MenuItem value="A">Assets</MenuItem>
              <MenuItem value="L">Liabilities</MenuItem>
              <MenuItem value="E">Expenses</MenuItem>
              <MenuItem value="I">Income</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
  <FormControlLabel
    control={
      <Checkbox
        checked={formData.subGroupApplicable}
        name="subGroupApplicable"
        onChange={handleCheckboxChange}
      />
    }
    label="Sub Group Applicable"
  />
</Grid>
          <Grid item xs={6}><TextField label="Group Desc" size="small" fullWidth value={formData.desc} onChange={handleChange("desc")} /></Grid>
          {/* <Grid item xs={3}>
            <TextField select label="Group Category" size="small" fullWidth value={formData.category} onChange={handleChange("category")}>
              <MenuItem value="A">Assets</MenuItem>
              <MenuItem value="L">Liabilities</MenuItem>
              <MenuItem value="E">Expenses</MenuItem>
              <MenuItem value="I">Income</MenuItem>
            </TextField>
          </Grid> */}
          <Grid item xs={3}>
            <TextField
              select
              label="Group Indicator"
              size="small"
              fullWidth
              value={formData.category}
              onChange={handleChange("category")}
            >
              {grIndicatorOptions.map((item) => (
                <MenuItem
                  key={item.gr_indicator_cd}
                  value={item.gr_indicator_cd}
                >
                  {item.gr_desc}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              label="Schedule"
              size="small"
              fullWidth
              value={formData.schedule}
              onChange={handleChange("schedule")}
            >
              {scheduleOptions.map((item) => (
                <MenuItem key={item.sch_no} value={item.sch_no}>
                  {item.sch_desc}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.gplflag}
                  name="gplflag"
                  onChange={handleCheckboxChange}
                />
              }
              label="GPL Flag"
            />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Groups</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.groupCode} | ${rec.belongsTo} | ${rec.subGroupApplicable ? "Yes" : "No"} | ${rec.desc} | ${rec.category} | ${rec.subGroupApplicable ? "Yes" : "No"} | ${rec.schedule}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
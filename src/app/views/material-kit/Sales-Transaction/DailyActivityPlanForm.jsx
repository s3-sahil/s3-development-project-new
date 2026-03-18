import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Icon
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveDailyActivityPlan } from "app/utils/authServices";

export default function DailyActivityPlanForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!location.state?.activityPlanDetails;

  const [formData, setFormData] = useState({
    activityNo: "",
    employeeNo: "",
    visitDate: "",
    fromTime: "",
    toTime: "",
    visitingTo: "",
    visitingPerson: "",
    visitingFor: "",
    visitStatus: "",
    traveledBy: "",
    traveledKm: "",
    busFare: "",
    autoFare: "",
    mealExpenses: "",
    lodgingExpenses: "",
    fareRemark: "",
    remark: "",
  });

  useEffect(() => {
    if (isEditMode) {
      const { activityPlanDetails } = location.state;
      // Assuming the API response has a flat structure matching the form state
      // And dates/times are in a format that the input fields can understand
      setFormData({
        activityNo: activityPlanDetails.activityNo || "",
        employeeNo: activityPlanDetails.employeeNo || "",
        visitDate: activityPlanDetails.visitDate ? activityPlanDetails.visitDate.substring(0, 10) : "",
        fromTime: activityPlanDetails.fromTime || "",
        toTime: activityPlanDetails.toTime || "",
        visitingTo: activityPlanDetails.visitingTo || "",
        visitingPerson: activityPlanDetails.visitingPerson || "",
        visitingFor: activityPlanDetails.visitingFor || "",
        visitStatus: activityPlanDetails.visitStatus || "",
        traveledBy: activityPlanDetails.traveledBy || "",
        traveledKm: activityPlanDetails.traveledKm || "",
        busFare: activityPlanDetails.busFare || "",
        autoFare: activityPlanDetails.autoFare || "",
        mealExpenses: activityPlanDetails.mealExpenses || "",
        lodgingExpenses: activityPlanDetails.lodgingExpenses || "",
        fareRemark: activityPlanDetails.fareRemark || "",
        remark: activityPlanDetails.remark || "",
      });
    }
  }, [location.state, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // The payload structure might need adjustments based on the actual API requirements
      const payload = {
        ...formData,
        // Convert number fields from string if necessary
        traveledKm: Number(formData.traveledKm) || 0,
        busFare: Number(formData.busFare) || 0,
        autoFare: Number(formData.autoFare) || 0,
        mealExpenses: Number(formData.mealExpenses) || 0,
        lodgingExpenses: Number(formData.lodgingExpenses) || 0,
      };

      // Assuming saveDailyActivityPlan can handle both create and update
      const data = await saveDailyActivityPlan(payload);

      alert(data?.message || (isEditMode ? "Updated Successfully" : "Saved Successfully"));
      navigate("/material/sales-daily-activity-plan-table");

    } catch (error) {
      console.error(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="lg">

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Planning" },
            { name: "Daily Activity Plan" }
          ]}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          {isEditMode ? "Update" : "Save"}
        </Button>
      </Box>

      <Box p={3} borderRadius={2} sx={{ backgroundColor: "#fff", boxShadow: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Activity No"
              name="activityNo"
              value={formData.activityNo}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={isEditMode} // Usually, the primary key is not editable
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Employee No"
              name="employeeNo"
              value={formData.employeeNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Visit Date"
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="From Time"
              type="time"
              name="fromTime"
              value={formData.fromTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="To Time"
              type="time"
              name="toTime"
              value={formData.toTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Visiting To"
              name="visitingTo"
              value={formData.visitingTo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Visiting Person"
              name="visitingPerson"
              value={formData.visitingPerson}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Visiting For"
              name="visitingFor"
              value={formData.visitingFor}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Visit Status"
              name="visitStatus"
              value={formData.visitStatus}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Traveled By"
              name="traveledBy"
              value={formData.traveledBy}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Traveled Km"
              name="traveledKm"
              type="number"
              value={formData.traveledKm}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Bus Fare"
              name="busFare"
              type="number"
              value={formData.busFare}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Auto Fare"
              name="autoFare"
              type="number"
              value={formData.autoFare}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Meal Expenses"
              name="mealExpenses"
              type="number"
              value={formData.mealExpenses}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Lodging Expenses"
              name="lodgingExpenses"
              type="number"
              value={formData.lodgingExpenses}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Fare Remark"
              name="fareRemark"
              value={formData.fareRemark}
              onChange={handleChange}
              multiline
              rows={2}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              multiline
              rows={3}
              size="small"
              fullWidth
            />
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
}
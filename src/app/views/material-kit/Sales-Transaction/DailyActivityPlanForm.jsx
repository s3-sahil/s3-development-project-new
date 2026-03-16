import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Icon
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { saveDailyActivityPlan } from "app/utils/authServices";

export default function DailyActivityPlanForm() {

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {

    try {

      const payload = {
        ...formData
      };

      const data = await saveDailyActivityPlan(payload);

      alert(data?.message || "Saved Successfully");

    } catch (error) {
      console.error(error.message);
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
          Save
        </Button>
      </Box>

      <Box p={3} borderRadius={2}>

        <Grid container spacing={3}>

          <Grid item xs={6}>
            <TextField
              label="Activity No"
              name="activityNo"
              value={formData.activityNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Employee No"
              name="employeeNo"
              value={formData.employeeNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
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

          <Grid item xs={4}>
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

          <Grid item xs={4}>
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

          <Grid item xs={6}>
            <TextField
              label="Visiting To"
              name="visitingTo"
              value={formData.visitingTo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Visiting Person"
              name="visitingPerson"
              value={formData.visitingPerson}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Visiting For"
              name="visitingFor"
              value={formData.visitingFor}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Visit Status"
              name="visitStatus"
              value={formData.visitStatus}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Traveled By"
              name="traveledBy"
              value={formData.traveledBy}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Traveled Km"
              name="traveledKm"
              value={formData.traveledKm}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Bus Fare"
              name="busFare"
              value={formData.busFare}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Auto Fare"
              name="autoFare"
              value={formData.autoFare}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Meal Expenses"
              name="mealExpenses"
              value={formData.mealExpenses}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Lodging Expenses"
              name="lodgingExpenses"
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
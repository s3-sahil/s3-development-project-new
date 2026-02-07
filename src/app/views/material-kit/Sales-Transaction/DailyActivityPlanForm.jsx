import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Icon,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
    // TODO: API call here
  };

  return (
    <Container maxWidth="lg">
      {/* Breadcrumb */}
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Daily Activity Plan" }]} />
      </Box>

      {/* Header + Save */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Icon color="primary">arrow_back</Icon>
          <Box fontSize="20px" fontWeight="bold" color="purple">
            Daily Activity Plan
          </Box>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      {/* Form Card */}
      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          {/* Row 1 */}
          <Grid item xs={6}>
            <TextField
              label="Activity No."
              name="activityNo"
              value={formData.activityNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Employee No."
              name="employeeNo"
              value={formData.employeeNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={4}>
            <TextField
              label="Visit Date"
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="From Time"
              type="time"
              name="fromTime"
              value={formData.fromTime}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="To Time"
              type="time"
              name="toTime"
              value={formData.toTime}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Row 3 */}
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

          {/* Row 4 */}
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

          {/* Row 5 */}
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
              label="Traveled Kilometers"
              name="traveledKm"
              value={formData.traveledKm}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Row 6 */}
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

          {/* Row 7 */}
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

          {/* Remarks */}
          <Grid item xs={12}>
            <TextField
              label="Fare Remark"
              name="fareRemark"
              value={formData.fareRemark}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
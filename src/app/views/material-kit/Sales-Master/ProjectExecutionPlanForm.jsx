import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const ProjectExecutionPlanForm = () => {
  const [formData, setFormData] = useState({
    customer: "",
    orderNo: "",
    orderDate: "",
    poNo: "",
    poDate: "",
    customerName: "",
    productCode: "",
    project: "",
    productName: "",
    approvalDate: "",
    deliveryDate: "",
    totalWeeksRequired: "",
    activityCode: "",
    activityName: "",
    fromTargetDate: "",
    toTargetDate: "",
  });

  const [activities, setActivities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(),
      activityCode: formData.activityCode,
      activityName: formData.activityName,
      fromTargetDate: formData.fromTargetDate,
      toTargetDate: formData.toTargetDate,
    };

    setActivities((prev) => [...prev, newActivity]);

    setFormData((prev) => ({
      ...prev,
      activityCode: "",
      activityName: "",
      fromTargetDate: "",
      toTargetDate: "",
    }));
  };

  const handleSave = () => {
    console.log("Project Execution Plan Save:", formData, activities);
    alert("Project Execution Plan Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Project Execution Plan" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Project Execution Plan</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={2.4}>
            <TextField label="Customer" name="customer" value={formData.customer} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={2.4}>
            <TextField label="Order No" name="orderNo" value={formData.orderNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={2.4}>
            <TextField type="date" label="Order Date" name="orderDate" value={formData.orderDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={2.4}>
            <TextField label="PO No" name="poNo" value={formData.poNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={2.4}>
            <TextField type="date" label="PO Date" name="poDate" value={formData.poDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            <TextField label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Product Code" name="productCode" value={formData.productCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <TextField label="Project" name="project" value={formData.project} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Product Name" name="productName" value={formData.productName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={4}>
            <TextField type="date" label="Approval Date" name="approvalDate" value={formData.approvalDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField type="date" label="Delivery Date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Total Weeks Required" name="totalWeeksRequired" value={formData.totalWeeksRequired} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Activity Section */}
          <Grid item xs={12}>
            <h3>Activity Planning</h3>
          </Grid>

          <Grid item xs={3}>
            <TextField label="Activity Code" name="activityCode" value={formData.activityCode} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Activity Name" name="activityName" value={formData.activityName} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" label="From Target Date" name="fromTargetDate" value={formData.fromTargetDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" label="To Target Date" name="toTargetDate" value={formData.toTargetDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleAddActivity}>
              Add Activity
            </Button>
          </Grid>

          {/* Activity Table */}
          <Grid item xs={12}>
            <Box sx={{ height: 300, width: "100%", background: "#fafafa", borderRadius: 2 }}>
              <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
                <thead style={{ background: "#eee" }}>
                  <tr>
                    <th>Activity Code</th>
                    <th>Activity Name</th>
                    <th>From Target Date</th>
                    <th>To Target Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 && (
                    <tr>
                      <td colSpan="4" align="center">
                        No Activities Added
                      </td>
                    </tr>
                  )}
                  {activities.map((row) => (
                    <tr key={row.id}>
                      <td>{row.activityCode}</td>
                      <td>{row.activityName}</td>
                      <td>{row.fromTargetDate}</td>
                      <td>{row.toTargetDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProjectExecutionPlanForm;

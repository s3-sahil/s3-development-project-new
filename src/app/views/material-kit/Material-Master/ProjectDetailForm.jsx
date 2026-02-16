import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function ProjectDetailForm() {
  const [formData, setFormData] = useState({
    projectCode: "",
    projectName: "",
    totalBudgetedCost: "",
    totalBudgetedPurchaseCost: "",
    totalPurchaseCost: "",
    totalPurchaseBalanceAvl: "",
    totalActualCost: "",
    totalBalanceAvl: "",
    startDate: "",
    endDate: "",
    inUse: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Project Detail Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Project Detail" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Project Code"
              name="projectCode"
              value={formData.projectCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Budgeted Cost"
              name="totalBudgetedCost"
              value={formData.totalBudgetedCost}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Budgeted Purchase Cost"
              name="totalBudgetedPurchaseCost"
              value={formData.totalBudgetedPurchaseCost}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Purchase Cost"
              name="totalPurchaseCost"
              value={formData.totalPurchaseCost}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Purchase Balance Avl"
              name="totalPurchaseBalanceAvl"
              value={formData.totalPurchaseBalanceAvl}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Actual Cost"
              name="totalActualCost"
              value={formData.totalActualCost}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Balance Avl"
              name="totalBalanceAvl"
              value={formData.totalBalanceAvl}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Start Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="End Date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.inUse}
                  onChange={handleChange}
                  name="inUse"
                />
              }
              label="In Use"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
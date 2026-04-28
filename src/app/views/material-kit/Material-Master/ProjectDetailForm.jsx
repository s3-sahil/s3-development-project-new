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
import { addProjectDetail } from "app/utils/materialMaterialServices";
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

  const handleSave = async () => {
    if (!formData.projectCode || !formData.projectName) {
      alert("Project Code & Name required");
      return;
    }

    try {
      const payload = {
        proJ_CODE: formData.projectCode,
        desc: formData.projectName,

        profceN_CD: "", // optional (add if you have dropdown)

        inusE_FLAG: formData.inUse ? "Y" : "N",

        start_Dt: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : null,

        end_dt: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : null,

        // 🔴 Cost Mapping (IMPORTANT)
        mat_Cost: Number(formData.totalBudgetedCost) || 0,

        purchase_Mat_Cost: Number(formData.totalBudgetedPurchaseCost) || 0,

        purchase_Jobwork_Cost: Number(formData.totalPurchaseCost) || 0,

        purchase_BO_Cost: Number(formData.totalPurchaseBalanceAvl) || 0,

        service_Cost: Number(formData.totalActualCost) || 0,

        financial_Cost: Number(formData.totalBalanceAvl) || 0,

        // remaining default fields
        jobwork_Cost: 0,
        other_Cost: 0,
        man_Cost: 0,
        drawing_Cost: 0,
        misc_pre_project_Cost: 0,
        misc_post_project_Cost: 0,
        bO_Cost: 0,
        pack_Cost: 0,
        common_bo: 0,
        man_cosumable: 0,
        contingency: 0,
        trial_valdation: 0,
        install_site_charge: 0,
        purchase_cosumable: 0,
        purchase_service_Cost: 0,
      };

      console.log("Payload:", payload);

      const res = await addProjectDetail(payload);

      alert(res.message || "Saved successfully");

      // ✅ Reset form
      setFormData({
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
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Project Detail" }]}
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

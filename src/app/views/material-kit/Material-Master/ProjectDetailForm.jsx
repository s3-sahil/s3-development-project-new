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
  const [loading, setLoading] = useState(false);

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
    if (!formData.projectCode.trim()) {
      return alert("Project Code required");
    }

    if (!formData.projectName.trim()) {
      return alert("Project Name required");
    }

    try {
      setLoading(true);

      const payload = {
        proJ_CODE: formData.projectCode.trim(),
        desc: formData.projectName.trim(),

        profceN_CD: localStorage.getItem("PROFCEN_CD"),

        inusE_FLAG: formData.inUse ? "Y" : "N",

        start_Dt: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : "",

        end_dt: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : "",

        // 🔹 COST MAPPING
        mat_Cost: Number(formData.totalBudgetedCost) || 0,
        purchase_Mat_Cost:
          Number(formData.totalBudgetedPurchaseCost) || 0,
        purchase_Jobwork_Cost:
          Number(formData.totalPurchaseCost) || 0,
        purchase_BO_Cost:
          Number(formData.totalPurchaseBalanceAvl) || 0,
        service_Cost: Number(formData.totalActualCost) || 0,
        financial_Cost: Number(formData.totalBalanceAvl) || 0,

        // 🔹 DEFAULT FIELDS
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

      alert(res.message || "Saved successfully ✅");

      // 🔹 RESET FORM
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
      alert(error.message || "Save failed ❌");
    } finally {
      setLoading(false);
    }
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
        {/* SAVE BUTTON */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
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

          {/* COST FIELDS */}
          {[
            ["totalBudgetedCost", "Total Budgeted Cost"],
            ["totalBudgetedPurchaseCost", "Total Budgeted Purchase Cost"],
            ["totalPurchaseCost", "Total Purchase Cost"],
            ["totalPurchaseBalanceAvl", "Total Purchase Balance Avl"],
            ["totalActualCost", "Total Actual Cost"],
            ["totalBalanceAvl", "Total Balance Avl"],
          ].map(([name, label]) => (
            <Grid item xs={6} key={name}>
              <TextField
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}

          {/* DATES */}
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

          {/* CHECKBOX */}
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
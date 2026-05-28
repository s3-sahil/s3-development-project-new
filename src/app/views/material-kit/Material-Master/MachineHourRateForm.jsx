import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { addMachineHourRate } from "app/utils/materialMaterialServices";
import { useState } from "react";

export default function MachineHourRateForm() {
  const [formData, setFormData] = useState({
    machineCode: "",
    gradeCode: "",
    gradeDescription: "",
    unitHourRate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.machineCode || !formData.gradeCode) {
      alert("Machine Code and Grade Code required");
      return;
    }

    try {
      const payload = [
        {
          unit_code: formData.machineCode, // Machine Code
          mat_code: formData.gradeCode, // Grade Code
          unitHrRate: Number(formData.unitHourRate) || 0,
        },
      ];

      console.log("Payload:", payload);

      const res = await addMachineHourRate(payload);

      alert(res.message || "Saved successfully");

      // ✅ Reset form
      setFormData({
        machineCode: "",
        gradeCode: "",
        gradeDescription: "",
        unitHourRate: "",
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
          routeSegments={[
            { name: "Material" },
            { name: "Machine Hour Rate Details" },
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
              label="Machine Code"
              name="machineCode"
              value={formData.machineCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Grade Code"
              name="gradeCode"
              value={formData.gradeCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Grade Description"
              name="gradeDescription"
              value={formData.gradeDescription}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Unit Hour Rate"
              name="unitHourRate"
              value={formData.unitHourRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

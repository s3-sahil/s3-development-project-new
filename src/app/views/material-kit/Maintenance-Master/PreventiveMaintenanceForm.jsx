import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { addPreventiveMaintenanceScheduling } from "app/utils/MaintenanceMaterialServices";
import { useState } from "react";

const PreventiveMaintenanceForm = () => {
  const [formData, setFormData] = useState({
    preventiveReason: "",
    machineGroup: "",
    frequency: "",
    employee: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        fld_SchNo: "",
        fld_PrevCd: formData.preventiveReason,
        fld_MachineNo: formData.machineGroup,
        fld_Frequency: formData.frequency,
        fld_TimeFrom: new Date().toISOString(),
        fld_TimeTo: "",
        profcen_cd: formData.employee,
        scheduleday: "",
        scheduledate: new Date().toISOString(),
      };

      const res = await addPreventiveMaintenanceScheduling(payload);

      console.log("Response:", res);
      alert(res?.message || "Saved successfully!");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Maintenance" },
            { name: "Preventive Scheduling" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2></h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            {/* <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button> */}
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Preventive Reason"
              name="preventiveReason"
              value={formData.preventiveReason}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Machine / Group"
              name="machineGroup"
              value={formData.machineGroup}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Employee"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PreventiveMaintenanceForm;

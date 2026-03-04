import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function DockAuditPlanForm() {
  const [formData, setFormData] = useState({
    item: "",
    scheduleDate: "",
    completedDate: "",
    remark: "",
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "Dock Audit Plan" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Dock Audit Plan (DAP)
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Item"
              size="small"
              fullWidth
              value={formData.item}
              onChange={handleChange("item")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Schedule Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.scheduleDate}
              onChange={handleChange("scheduleDate")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Schedule Completed Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.completedDate}
              onChange={handleChange("completedDate")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Remark"
              size="small"
              fullWidth
              value={formData.remark}
              onChange={handleChange("remark")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
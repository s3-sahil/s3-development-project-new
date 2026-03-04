import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function FirstPieceApprovalForm() {
  const [formData, setFormData] = useState({
    productCode: "",
    operationCode: "",
    serialNo: "",
    criticalParameter: "",
    dimension: "",
    inspMethod: "",
    range: "",
    leastCount: "",
    remark: "",
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "First Piece Approval" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            First Piece Approval
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Product Code" size="small" fullWidth value={formData.productCode} onChange={handleChange("productCode")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Operation Code" size="small" fullWidth value={formData.operationCode} onChange={handleChange("operationCode")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Serial No" size="small" fullWidth value={formData.serialNo} onChange={handleChange("serialNo")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Critical Parameter" size="small" fullWidth value={formData.criticalParameter} onChange={handleChange("criticalParameter")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Dimension" size="small" fullWidth value={formData.dimension} onChange={handleChange("dimension")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Inspection Method" size="small" fullWidth value={formData.inspMethod} onChange={handleChange("inspMethod")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Range" size="small" fullWidth value={formData.range} onChange={handleChange("range")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Least Count" size="small" fullWidth value={formData.leastCount} onChange={handleChange("leastCount")} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Remark" size="small" fullWidth value={formData.remark} onChange={handleChange("remark")} />
          </Grid>
        </Grid>

        {/* Keys for Dimension UI */}
        <Box mt={3}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Keys for Dimension
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}><Typography>F1 - ⌀</Typography></Grid>
              <Grid item xs={3}><Typography>F2 - ¼</Typography></Grid>
              <Grid item xs={3}><Typography>F3 - ½</Typography></Grid>
              <Grid item xs={3}><Typography>F4 - ¾</Typography></Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
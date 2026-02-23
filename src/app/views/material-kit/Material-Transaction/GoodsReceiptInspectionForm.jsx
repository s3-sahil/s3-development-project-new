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

export default function GoodsReceiptInspectionForm() {
  const [formData, setFormData] = useState({
    grnNo: "",
    date: "",
    grnType: "Official",
    inspectionDate: "",
    department: "",
    partyName: "",
    inspectedBy: "",
    remark: "",
    acceptsAll: false,
    showInspected: false,
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
    alert("Goods Receipt Inspection Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Good Receipt Note ( Inspection )" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.showInspected} onChange={handleChange} name="showInspected" />}
              label="Show Already Inspected GRNs"
            />
          </Grid>
          <Grid item xs={6}><TextField label="GRN No." name="grnNo" value={formData.grnNo} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="GRN Type" name="grnType" value={formData.grnType} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Inspection Date" name="inspectionDate" type="date" value={formData.inspectionDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Department" name="department" value={formData.department} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Party Name" name="partyName" value={formData.partyName} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Inspected By" name="inspectedBy" value={formData.inspectedBy} onChange={handleChange} size="small" fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth multiline rows={2} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.acceptsAll} onChange={handleChange} name="acceptsAll" />}
              label="Accepts All"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
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
import { Span } from "app/components/Typography";
import { useState } from "react";

const MachineAssetDetailForm = () => {
  const [formData, setFormData] = useState({
    productionMachine: false,
    inUse: false,
    group: "",
    machineNo: "",
    machineName: "",
    machineSrNo: "",
    modelNo: "",
    make: "",
    capacity: "",
    powerReq: "",
    powerUOM: "",
    mfgYear: "",
    location: "",
    sectionCode: "",
    remark: "",
    itemCode: "",
    division: "",
    alternateMachine: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Machine/Asset detail saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Machine/Asset Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Machine/Asset Details</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="productionMachine"
                  checked={formData.productionMachine}
                  onChange={handleChange}
                />
              }
              label="Production Machine"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="inUse"
                  checked={formData.inUse}
                  onChange={handleChange}
                />
              }
              label="In Use"
            />
          </Grid>

          {[
            "group",
            "machineNo",
            "machineName",
            "machineSrNo",
            "modelNo",
            "make",
            "capacity",
            "powerReq",
            "powerUOM",
            "mfgYear",
            "location",
            "sectionCode",
            "remark",
            "itemCode",
            "division",
            "alternateMachine",
          ].map((field) => (
            <Grid item xs={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MachineAssetDetailForm;
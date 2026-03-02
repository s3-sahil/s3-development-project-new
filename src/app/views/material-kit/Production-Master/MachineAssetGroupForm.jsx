import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const MachineAssetGroupForm = () => {
  const [formData, setFormData] = useState({
    type: "Machine", // Machine or Non-Machine
    groupCode: "",
    groupName: "",
    machineHrRate: "",
    machineCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Machine/Asset Group detail saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Machine/Asset Group Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Machine/Asset Group Details</h2>

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
          <Grid item xs={12}>
            <RadioGroup
              row
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <FormControlLabel value="Machine" control={<Radio />} label="Machine" />
              <FormControlLabel value="Non-Machine" control={<Radio />} label="Non-Machine" />
            </RadioGroup>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Group Code"
              name="groupCode"
              value={formData.groupCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Group Name"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Machine Hr. Rate"
              name="machineHrRate"
              value={formData.machineHrRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Machine Count"
              name="machineCount"
              value={formData.machineCount}
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

export default MachineAssetGroupForm;
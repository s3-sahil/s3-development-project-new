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
import { addMachineAssetGroupDetails } from "app/utils/ProductionMaterialServices";
import { useState } from "react";

const MachineAssetGroupForm = () => {
  const [formData, setFormData] = useState({
    type: "Machine",
    groupCode: "",
    groupName: "",
    machineHrRate: "",
    machineCount: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        group_name: formData.groupName,
        count: Number(formData.machineCount) || 0,
        unit_Hr_Rate: Number(formData.machineHrRate) || 0,
        group_Code: Number(formData.groupCode) || 0,
        m_flag: formData.type === "Machine" ? "M" : "N",
      };

      const response = await addMachineAssetGroupDetails(payload);

      alert(
        response?.message ||
          "Machine/Asset Group Details Added Successfully"
      );

      console.log("Save Response:", response);

      // ================= RESET =================
      setFormData({
        type: "Machine",
        groupCode: "",
        groupName: "",
        machineHrRate: "",
        machineCount: "",
      });
    } catch (error) {
      console.error("Save Error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2>Machine/Asset Group Details</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
              disabled={loading}
            >
              <Span>
                {loading ? "Saving..." : "Save"}
              </Span>
            </Button>

            <Button
              variant="outlined"
              startIcon={<Icon>print</Icon>}
            >
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RadioGroup
              row
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Machine"
                control={<Radio />}
                label="Machine"
              />

              <FormControlLabel
                value="Non-Machine"
                control={<Radio />}
                label="Non-Machine"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Group Code"
              placeholder="Group Code"
              name="groupCode"
              value={formData.groupCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Group Name"
              placeholder="Group Name"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Machine Hr. Rate"
              placeholder="Machine Hr. Rate"
              name="machineHrRate"
              value={formData.machineHrRate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Machine Count"
              placeholder="Machine Count"
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
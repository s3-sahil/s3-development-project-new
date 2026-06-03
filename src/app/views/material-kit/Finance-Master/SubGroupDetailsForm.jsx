import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { SubGroupDetailsSave, UpdateSubGroupDetails } from "app/utils/FinanceMasterServices";
import { useState } from "react";

export default function SubGroupDetailsForm() {
  const [formData, setFormData] = useState({
    subGroupCode: "",
    groupCode: "",
    desc: "",
    plant: false,
    oldPlant: false,
    newPlant: false,
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckboxChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.checked });

  const handleAdd = () => {
    if (formData.subGroupCode && formData.groupCode) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        subGroupCode: "",
        groupCode: "",
        desc: "",
        plant: false,
        oldPlant: false,
        newPlant: false,
        unit: "UNIT-1",
      });
    }
  };

  const handleSave = async () => {
    if (!records.length) {
      alert("Please add at least one record.");
      return;
    }

    try {
      let response;

      if (actionMode === "edit") {
        const payload = {
          group_code: records[0].groupCode,
          subGroup_code: records[0].subGroupCode,
          subGroup_desc: records[0].desc,
          planAndMachinary: records[0].plant ? "Y" : "N",
          planAndMachinary_new: records[0].newPlant ? "Y" : "N",
          planAndMachinary_Old: records[0].oldPlant ? "Y" : "N",
          subSubGroupFlag: "N",
        };

        response = await UpdateSubGroupDetails(payload);
      } else {
        const payload = records.map((rec) => ({
          group_code: rec.groupCode,
          subGroup_code: rec.subGroupCode,
          subGroup_desc: rec.desc,
          planAndMachinary: rec.plant ? "Y" : "N",
          planAndMachinary_new: rec.newPlant ? "Y" : "N",
          planAndMachinary_Old: rec.oldPlant ? "Y" : "N",
          subSubGroupFlag: "N",
        }));

        response = await SubGroupDetailsSave(payload);
      }

      console.log(response);
      alert(
        actionMode === "edit"
          ? "Sub Group Updated Successfully"
          : "Sub Group Saved Successfully",
      );
    } catch (error) {
      console.error(error);
      alert(
        actionMode === "edit"
          ? "Failed to Update Sub Group"
          : "Failed to Save Sub Group",
      );
    }
  };
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "Finace" }, { name: "Sub Group Details" }]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold">
            Sub Group Details
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Sub Group Code"
              size="small"
              fullWidth
              value={formData.subGroupCode}
              onChange={handleChange("subGroupCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Group Code"
              size="small"
              fullWidth
              value={formData.groupCode}
              onChange={handleChange("groupCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Sub Group Desc"
              size="small"
              fullWidth
              value={formData.desc}
              onChange={handleChange("desc")}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.plant}
                  onChange={handleCheckboxChange("plant")}
                />
              }
              label="Plant And Machinery"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.oldPlant}
                  onChange={handleCheckboxChange("oldPlant")}
                />
              }
              label="Old Plant & Machinery"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.newPlant}
                  onChange={handleCheckboxChange("newPlant")}
                />
              }
              label="New Plant & Machinery"
            />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Added Sub Groups
          </Typography>
          {records.map((rec) => (
            <Box
              key={rec.id}
              sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}
            >
              <Typography>
                {`${rec.subGroupCode} | ${rec.groupCode} | ${rec.desc} | Plant: ${rec.plant ? "Yes" : "No"} | Old: ${rec.oldPlant ? "Yes" : "No"} | New: ${rec.newPlant ? "Yes" : "No"}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

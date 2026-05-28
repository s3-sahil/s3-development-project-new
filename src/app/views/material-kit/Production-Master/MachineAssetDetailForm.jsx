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
import { addMachineAssetDetails } from "app/utils/ProductionMaterialServices";
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

  const [loading, setLoading] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        unit_Code: formData.machineNo?.slice(0, 5),
        unit_Desc: formData.machineName,
        location: formData.location,
        sr_No: formData.machineSrNo,
        model_No: formData.modelNo,
        unit_Hr_Rate: 0,
        ass_Lib_No: "string",
        shop_Code: formData.sectionCode?.slice(0, 2),
        iteM_CODE: formData.itemCode,
        flag: "Y",
        available_Hours: 0,
        group_name: formData.group,
        make: formData.make,
        capacity: formData.capacity,
        mfG_YEAR: formData.mfgYear,
        power: Number(formData.powerReq) || 0,
        power_uom: formData.powerUOM?.slice(0, 3),
        in_Use: formData.inUse ? "Y" : "N",
        remark: formData.remark,
        division: formData.division?.slice(0, 3),
        groupCode: 0,
        prodFlag: formData.productionMachine ? "Y" : "N",
        cutTime_appl: "N",
        alt_machine: formData.alternateMachine?.slice(0, 2),
      };

      const response = await addMachineAssetDetails(payload);

      alert(response?.message || "Machine/Asset Details Added Successfully");

      console.log("Save Response:", response);

      // ================= RESET =================
      setFormData({
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
    } catch (error) {
      console.error("Save Error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Machine/Asset Details" },
          ]}
        />
      </Box>

      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2>Machine/Asset Details</h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
              disabled={loading}
            >
              <Span>{loading ? "Saving..." : "Save"}</Span>
            </Button>

            <Button variant="outlined" startIcon={<Icon>print</Icon>}>
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        {/* Form */}
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
            "Group",
            "MachineNo",
            "MachineName",
            "MachineSrNo",
            "ModelNo",
            "Make",
            "Capacity",
            "PowerReq",
            "PowerUOM",
            "MfgYear",
            "Location",
            "SectionCode",
            "Remark",
            "ItemCode",
            "Division",
            "AlternateMachine",
          ].map((field) => (
            <Grid item xs={12} md={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1")}
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
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

import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const SectionWiseProductionDetailForm = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState({
    section: "PRODUCTION",
    reportNo: "",
    reportDate: "",
    shiftFrom: "",
    shiftTo: "",
    shiftIncharge: "",
    machineNo: "",
    cutTime: "",
    // Production Details
    productCode: "",
    operation: "",
    productionType: "",
    fromTime: "",
    toTime: "",
    totalTime: "",
    produceQty: "",
    rejectionQty: "",
    okQty: "",
    wipQty: "",
    remark: "",
    // Breakdown Details
    breakdownReason: "",
    breakdownFrom: "",
    breakdownTo: "",
    totalBreakdownTime: "",
    // Other Workmen Details
    directEmployee: "",
    indirectEmployee: "",
    // Workmen Details
    employee: "",
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
    alert("Section Wise Production detail saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Section Wise Production Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Section Wise Production Details</h2>

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

        {/* Common Fields */}
        <Grid container spacing={2} mb={2}>
          {["section","reportNo","reportDate","shiftFrom","shiftTo","shiftIncharge","machineNo","cutTime"].map((field) => (
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

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} sx={{ mb: 2 }}>
          <Tab label="Production Details" />
          <Tab label="Break Down Details" />
          <Tab label="Other Workmen Details" />
          <Tab label="Workmen Details" />
        </Tabs>

        {/* Tab Panels */}
        {activeTab === 0 && (
          <Grid container spacing={2}>
            {["productCode","operation","productionType","fromTime","toTime","totalTime","produceQty","rejectionQty","okQty","wipQty","remark"].map((field) => (
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
        )}

        {activeTab === 1 && (
          <Grid container spacing={2}>
            {["breakdownReason","breakdownFrom","breakdownTo","totalBreakdownTime"].map((field) => (
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
        )}

        {activeTab === 2 && (
          <Grid container spacing={2}>
            {["directEmployee","indirectEmployee"].map((field) => (
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
        )}

        {activeTab === 3 && (
          <Grid container spacing={2}>
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
        )}
      </Box>
    </Container>
  );
};

export default SectionWiseProductionDetailForm;
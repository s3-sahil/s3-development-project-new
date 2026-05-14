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
import { addSectionWiseProcessDetails } from "app/utils/materialTransactionServices";

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
        desc: formData.productionType || formData.remark,
        oP_CODE: formData.operation?.slice(0, 5),
        shop_Code: formData.section?.slice(0, 2),
        division: formData.machineNo?.slice(0, 3),
      };

      const response = await addSectionWiseProcessDetails(payload);

      alert(
        response?.message || "Section Wise Process Details Added Successfully",
      );

      console.log("Save Response:", response);

      // ================= RESET =================
      setFormData({
        section: "PRODUCTION",
        reportNo: "",
        reportDate: "",
        shiftFrom: "",
        shiftTo: "",
        shiftIncharge: "",
        machineNo: "",
        cutTime: "",
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
        breakdownReason: "",
        breakdownFrom: "",
        breakdownTo: "",
        totalBreakdownTime: "",
        directEmployee: "",
        indirectEmployee: "",
        employee: "",
      });
    } catch (error) {
      console.error("Save Error:", error);

      alert(error?.message || error?.Errormessage || "Something went wrong");
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
            { name: "Section Wise Production Details" },
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
          <h2>Section Wise Production Details</h2>

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

        {/* Common Fields */}
        <Grid container spacing={2} mb={2}>
          {[
            "section",
            "reportNo",
            "reportDate",
            "shiftFrom",
            "shiftTo",
            "shiftIncharge",
            "machineNo",
            "cutTime",
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

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          sx={{ mb: 2 }}
        >
          <Tab label="Production Details" />
          <Tab label="Break Down Details" />
          <Tab label="Other Workmen Details" />
          <Tab label="Workmen Details" />
        </Tabs>

        {/* Production Details */}
        {activeTab === 0 && (
          <Grid container spacing={2}>
            {[
              "productCode",
              "operation",
              "productionType",
              "fromTime",
              "toTime",
              "totalTime",
              "produceQty",
              "rejectionQty",
              "okQty",
              "wipQty",
              "remark",
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
        )}

        {/* Breakdown Details */}
        {activeTab === 1 && (
          <Grid container spacing={2}>
            {[
              "breakdownReason",
              "breakdownFrom",
              "breakdownTo",
              "totalBreakdownTime",
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
        )}

        {/* Other Workmen Details */}
        {activeTab === 2 && (
          <Grid container spacing={2}>
            {["directEmployee", "indirectEmployee"].map((field) => (
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
        )}

        {/* Workmen Details */}
        {activeTab === 3 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Employee"
                placeholder="Employee"
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

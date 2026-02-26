import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const ActivityFormRightsForm = () => {
  const [formData, setFormData] = useState({
    activityName: "",
    functionName: "",
    menuType: "",
    newRight: false,
    editRight: false,
    deleteRight: false,
    viewRight: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Activity Form Rights Save:", formData);
    alert("Activity Form Rights Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "System Admin" },
            { name: "Activity Form Rights" },
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
          <h2>Activity Form Rights</h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Activity Name */}
          <Grid item xs={4}>
            <TextField
              label="Activity Name"
              name="activityName"
              value={formData.activityName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Function */}
          <Grid item xs={4}>
            <TextField
              select
              label="Function"
              name="functionName"
              value={formData.functionName}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="PAYROLL">PAYROLL</MenuItem>
              <MenuItem value="SALES">SALES</MenuItem>
              <MenuItem value="FINANCE">FINANCE</MenuItem>
            </TextField>
          </Grid>

          {/* Menu Type */}
          <Grid item xs={4}>
            <TextField
              select
              label="Menu Type"
              name="menuType"
              value={formData.menuType}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="ALL">ALL</MenuItem>
              <MenuItem value="MAIN">MAIN</MenuItem>
              <MenuItem value="SUB">SUB</MenuItem>
            </TextField>
          </Grid>

          {/* Rights Section */}
          <Grid item xs={12}>
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="newRight"
                    checked={formData.newRight}
                    onChange={handleChange}
                  />
                }
                label="New"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="editRight"
                    checked={formData.editRight}
                    onChange={handleChange}
                  />
                }
                label="Edit"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="deleteRight"
                    checked={formData.deleteRight}
                    onChange={handleChange}
                  />
                }
                label="Delete"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="viewRight"
                    checked={formData.viewRight}
                    onChange={handleChange}
                  />
                }
                label="View"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ActivityFormRightsForm;

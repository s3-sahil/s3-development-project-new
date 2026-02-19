import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function GroupDetailsForm() {
  const [formData, setFormData] = useState({
    groupCode: "",
    groupBelongsTo: "",
    subGroupApplicable: false,
    groupDesc: "",
    groupCategory: "",
    schedule: "",
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
    alert("Group Details Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Group Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={3}>
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
              select
              label="Group Belongs To"
              name="groupBelongsTo"
              value={formData.groupBelongsTo}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Production">Production</MenuItem>
              <MenuItem value="Material">Material</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.subGroupApplicable}
                  onChange={handleChange}
                  name="subGroupApplicable"
                />
              }
              label="Sub Group Applicable"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Group Description"
              name="groupDesc"
              value={formData.groupDesc}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Group Category"
              name="groupCategory"
              value={formData.groupCategory}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Operational">Operational</MenuItem>
              <MenuItem value="Financial">Financial</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Quarterly">Quarterly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
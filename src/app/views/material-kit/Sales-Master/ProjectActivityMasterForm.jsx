import { Box, Container, TextField, Button, Icon, Grid, Paper } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const ProjectActivityMasterForm = () => {
  const [formData, setFormData] = useState({
    activityCode: "",
    activityDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Project Activity Master Save:", formData);
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Project Activity Master" }]} />
      </Box>
<Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={1}> <h2>Project Activity Master</h2></Box>

          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Activity Code"
                name="activityCode"
                value={formData.activityCode}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Activity Description"
                name="activityDescription"
                value={formData.activityDescription}
                onChange={handleChange}
                size="small"
                fullWidth
                multiline
                minRows={4}
              />
            </Grid>
          </Grid>
      </Box>
    </Container>
  );
};

export default ProjectActivityMasterForm;

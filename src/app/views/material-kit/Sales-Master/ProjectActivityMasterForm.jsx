import { Box, Container, TextField, Button, Icon, Grid, Paper } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";
import {  ProjectActivityAdd} from "app/utils/authServices";
import { useLocation, useNavigate } from "react-router-dom";


const ProjectActivityMasterForm = () => {

  const [actionMode, setActionMode] = useState("new"); // new | edit
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    activityCode: "",
    activityDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   // 🔹 Save (Add / Update)
    const handleSave = async () => {
      if (
        !formData.activityCode ||
        !formData.activityDescription 
      ) {
        alert("Please fill all required fields");
        return;
      }
  
      const nameParts = formData.activityDescription.trim().split(" ");
  
      const payload = {
        activity_code: formData.activityCode,
        description: formData.activityDescription
      };
  
      try {
        setLoading(true);
  
        const result =  await ProjectActivityAdd(payload); // same API for add/update

            if (result) {
              alert(result.message || "Project Activity Saved Successfully");
              navigate("/material/sales-project-activity-master-table"); // go back to table
            }

            // alert(
            // actionMode === "edit"
            //   ? "Project Activity updated successfully!"
            //   : "Project Activity added successfully!"
            // );  
  
      } catch (error) {
        console.error("Save Error:", error);
        alert("Failed to save Project Activity");
      } finally {
        setLoading(false);
      }
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
            disabled={loading}
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

import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const ContractReviewChecklistForm = () => {
  const [formData, setFormData] = useState({
    checklistCode: "",
    checklistDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Checklist Save:", formData);
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sales" }, { name: "Contract Review Checklist" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Contract Review Checklist</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Checklist Code"
              name="checklistCode"
              value={formData.checklistCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Checklist Description"
              name="checklistDescription"
              value={formData.checklistDescription}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContractReviewChecklistForm;

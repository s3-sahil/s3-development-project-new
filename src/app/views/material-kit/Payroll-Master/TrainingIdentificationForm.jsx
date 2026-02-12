import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

export default function TrainingIdentificationForm() {
  const [formData, setFormData] = useState({
    trainingCode: "",
    description: "",
    internalExternalFlag: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "HR" }, { name: "Training Identification" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <h2>Training Identification</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Training Code" name="trainingCode" onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={8}>
            <TextField label="Description" name="description" onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Internal / External Flag" name="internalExternalFlag" onChange={handleChange} size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
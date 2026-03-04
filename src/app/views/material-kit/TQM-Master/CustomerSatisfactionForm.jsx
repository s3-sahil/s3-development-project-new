import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function CustomerSatisfactionForm() {
  const [formData, setFormData] = useState({
    elementNo: "",
    desc: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    optionE: "",
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "Customer Satisfaction Survey" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Customer Satisfaction Survey
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Element No"
              size="small"
              fullWidth
              value={formData.elementNo}
              onChange={handleChange("elementNo")}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Description"
              size="small"
              fullWidth
              value={formData.desc}
              onChange={handleChange("desc")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Option A"
              size="small"
              fullWidth
              value={formData.optionA}
              onChange={handleChange("optionA")}
            >
              <MenuItem value="Excellent">Excellent</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="Poor">Poor</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Option B"
              size="small"
              fullWidth
              value={formData.optionB}
              onChange={handleChange("optionB")}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Option C"
              size="small"
              fullWidth
              value={formData.optionC}
              onChange={handleChange("optionC")}
            >
              <MenuItem value="Satisfied">Satisfied</MenuItem>
              <MenuItem value="Not Satisfied">Not Satisfied</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Option D"
              size="small"
              fullWidth
              value={formData.optionD}
              onChange={handleChange("optionD")}
            >
              <MenuItem value="Timely">Timely</MenuItem>
              <MenuItem value="Delayed">Delayed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Option E"
              size="small"
              fullWidth
              value={formData.optionE}
              onChange={handleChange("optionE")}
            >
              <MenuItem value="Recommend">Recommend</MenuItem>
              <MenuItem value="Not Recommend">Not Recommend</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
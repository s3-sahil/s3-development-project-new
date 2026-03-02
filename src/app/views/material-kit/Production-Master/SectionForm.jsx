import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const SectionForm = () => {
  const [formData, setFormData] = useState({
    sectionCode: "",
    sectionName: "",
    department: "",
  });

  const departments = ["Production", "Maintenance", "Quality", "Finance"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Section Details" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2></h2>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
            >
              <Span>Save</Span>
            </Button>

            <Button
              variant="outlined"
              startIcon={<Icon>print</Icon>}
            >
              <Span>Print</Span>
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Section Code"
              name="sectionCode"
              value={formData.sectionCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Section Name"
              name="sectionName"
              value={formData.sectionName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SectionForm;
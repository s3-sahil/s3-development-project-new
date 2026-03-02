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

const SectionWiseProcessForm = () => {
  const [formData, setFormData] = useState({
    sectionCode: "",
    process: "",
  });

  const sections = ["SEC001 - Assembly", "SEC002 - Welding", "SEC003 - Testing"];
  const processes = ["Cutting", "Welding", "Inspection", "Packaging"];

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
            { name: "Section-wise Process Details" },
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
          <Grid item xs={6}>
            <TextField
              select
              label="Section Code"
              name="sectionCode"
              value={formData.sectionCode}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              {sections.map((sec) => (
                <MenuItem key={sec} value={sec}>
                  {sec}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Process"
              name="process"
              value={formData.process}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              {processes.map((proc) => (
                <MenuItem key={proc} value={proc}>
                  {proc}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SectionWiseProcessForm;
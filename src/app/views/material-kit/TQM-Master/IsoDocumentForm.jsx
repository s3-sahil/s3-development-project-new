import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function IsoDocumentForm() {
  const [formData, setFormData] = useState({
    docNo: "",
    desc: "",
    revisionNo: "",
    revisionDate: "",
    indexing: "",
    retentionPeriod: "",
    unit: "UNIT-1",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "ISO/TS/QS Document Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            ISO/TS/QS Document Details
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Doc No"
              size="small"
              fullWidth
              value={formData.docNo}
              onChange={handleChange("docNo")}
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
              label="Revision No"
              size="small"
              fullWidth
              value={formData.revisionNo}
              onChange={handleChange("revisionNo")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Revision Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.revisionDate}
              onChange={handleChange("revisionDate")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Indexing"
              size="small"
              fullWidth
              value={formData.indexing}
              onChange={handleChange("indexing")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Retention Period"
              size="small"
              fullWidth
              value={formData.retentionPeriod}
              onChange={handleChange("retentionPeriod")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
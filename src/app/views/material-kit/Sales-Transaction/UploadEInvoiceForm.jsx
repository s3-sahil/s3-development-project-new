import { Box, Container, TextField, Button, Icon, Grid, Checkbox, FormControlLabel } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

const UploadEInvoiceForm = () => {
  const [formData, setFormData] = useState({
    fromNo: "",
    toNo: "",
    createJsonWithEwaybill: true,
    createJsonFile: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePreview = () => {
    console.log("Preview Payload:", formData);
  };

  const handleClose = () => {
    console.log("Close clicked");
  };

  return (
    <Container maxWidth="lg">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "GST" }, { name: "Upload E-Invoice" }]} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button variant="contained" startIcon={<Icon>save</Icon>}>
          Save
        </Button>
      </Box>

      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="From No"
              name="fromNo"
              value={formData.fromNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="To No"
              name="toNo"
              value={formData.toNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.createJsonWithEwaybill}
                  name="createJsonWithEwaybill"
                  onChange={handleChange}
                />
              }
              label="Create Json with Ewaybill"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.createJsonFile}
                  name="createJsonFile"
                  onChange={handleChange}
                />
              }
              label="Create Json File"
            />
          </Grid>

          <Grid item xs={12} display="flex" gap={2}>
            <Button variant="contained" onClick={handlePreview}>
              Preview
            </Button>

            <Button variant="contained" color="secondary" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UploadEInvoiceForm;
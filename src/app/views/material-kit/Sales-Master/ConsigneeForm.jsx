import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const ConsigneeForm = () => {
  const [formData, setFormData] = useState({
    customerCode: "",
    customerName: "",
    consigneeCode: "",
    name: "",
    address: "",
    city: "",
    pin: "",
    country: "",
    state: "",
    panNo: "",
    eccCode: "",
    stateNo: "",
    centralNo: "",
    contactPerson: "",
    mobile: "",
    fax: "",
    gstNo: "",
    distanceKm: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Consignee Save Payload:", formData);
    alert("Consignee Saved (UI Only)");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Master" }, { name: "Consignee" }]}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          {/* <h2>Consignee Details</h2> */}
        </Box>

        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            label="Customer Code"
            name="customerCode"
            value={formData.customerCode}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={9}>
          <TextField
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Consignee Code"
            name="consigneeCode"
            value={formData.consigneeCode}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Pin"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="PAN No"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="ECC Code"
            name="eccCode"
            value={formData.eccCode}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="State No"
            name="stateNo"
            value={formData.stateNo}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Central No"
            name="centralNo"
            value={formData.centralNo}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Fax"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="GST No / Tax ID"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Distance in km"
            name="distanceKm"
            value={formData.distanceKm}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConsigneeForm;

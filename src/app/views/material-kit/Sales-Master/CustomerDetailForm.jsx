import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";

const CustomerDetailForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    type: "Domestic",
    category: "",
    zone: "",
    merchantExporter: false,
    insurance: "",
    nda: false,
    startDate: "",
    expiryDate: "",
    name: "",
    short: "",
    city: "",
    pin: "",
    country: "",
    district: "",
    panNo: "",
    customerType: "",
    state: "",
    gstNo: "",
    fax: "",
    phone: "",
    mobile: "",
    interest: "",
    agingLimit: "",
    cashDisc: "",
    email: "",
    supplierCode: "",
    contactPerson: "",
    designation: "",
    industryType: "",
    bankName: "",
    bankAdd: "",
    bankAdd1: "",
    bankAccNo: "",
    website: "",
    discountApplicable: false,
  });

  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setOpen(true); // open modal when tab is clicked
  };

  const handleSave = () => {
    console.log("Customer Item:", formData);
    alert("Saved (UI Only)");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Customer Data:", formData);
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Sales" }, { name: "Customer Detail" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2> Customer Detail</h2>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              {/* Row 1 */}
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="code"
                  label="Code"
                  fullWidth
                  value={formData.code}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <RadioGroup
                  row
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value="Domestic"
                    control={<Radio />}
                    label="Domestic"
                  />
                  <FormControlLabel
                    value="Export"
                    control={<Radio />}
                    label="Export"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  select
                  name="category"
                  label="Category"
                  fullWidth
                  value={formData.category}
                  onChange={handleChange}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                </TextField>
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="zone"
                  label="Zone"
                  fullWidth
                  value={formData.zone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="merchantExporter"
                      checked={formData.merchantExporter}
                      onChange={handleChange}
                    />
                  }
                  label="In Use"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="merchantExporter"
                      checked={formData.merchantExporter}
                      onChange={handleChange}
                    />
                  }
                  label="Merchant Exporter"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="insurance"
                  label="Insurance"
                  fullWidth
                  value={formData.insurance}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="nda"
                      checked={formData.nda}
                      onChange={handleChange}
                    />
                  }
                  label="NDA"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="startDate"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="expiryDate"
                  label="Expiry Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 4 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="name"
                  label="Name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="short"
                  label="Short"
                  fullWidth
                  value={formData.short}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="city"
                  label="Type"
                  fullWidth
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="city"
                  label="City"
                  fullWidth
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 5 */}
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="pin"
                  label="Pin"
                  fullWidth
                  value={formData.pin}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="country"
                  label="Country"
                  fullWidth
                  value={formData.country}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  name="district"
                  label="District"
                  fullWidth
                  value={formData.district}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 6 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="panNo"
                  label="PAN No"
                  fullWidth
                  value={formData.panNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="customerType"
                  label="Type"
                  fullWidth
                  value={formData.customerType}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="state"
                  label="State"
                  fullWidth
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 7 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="gstNo"
                  label="GST No"
                  fullWidth
                  value={formData.gstNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="fax"
                  label="Fax"
                  fullWidth
                  value={formData.fax}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="phone"
                  label="Phone"
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 8 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="mobile"
                  label="Mobile"
                  fullWidth
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="interest"
                  label="Interest %"
                  fullWidth
                  value={formData.interest}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="agingLimit"
                  label="Outstanding & Aging Limit"
                  fullWidth
                  value={formData.agingLimit}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 9 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="cashDisc"
                  label="Cash Disc %"
                  fullWidth
                  value={formData.cashDisc}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="email"
                  label="Email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="supplierCode"
                  label="Our Supplier Code"
                  fullWidth
                  value={formData.supplierCode}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 10 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="contactPerson"
                  label="Contact Person"
                  fullWidth
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="designation"
                  label="Designation"
                  fullWidth
                  value={formData.designation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="industryType"
                  label="Industry Type"
                  fullWidth
                  value={formData.industryType}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 11 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="bankName"
                  label="Bank Name"
                  fullWidth
                  value={formData.bankName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="bankAdd"
                  label="Bank Add"
                  fullWidth
                  value={formData.bankAdd}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="bankAdd1"
                  label="Bank Add.1"
                  fullWidth
                  value={formData.bankAdd1}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 12 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="bankAccNo"
                  label="Bank Acc. No"
                  fullWidth
                  value={formData.bankAccNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="website"
                  label="Web Site"
                  fullWidth
                  value={formData.website}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="discountApplicable"
                      checked={formData.discountApplicable}
                      onChange={handleChange}
                    />
                  }
                  label="Discount Applicable"
                />
              </Grid>
            </Grid>

            <Box>
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Customer Info" />
                <Tab label="Contact Details" />
                <Tab label="Bank Details" />
                <Tab label="Other Settings" />
              </Tabs>

              {/* Modal */}
              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                  {tabIndex === 0 && "Customer Info"}
                  {tabIndex === 1 && "Contact Details"}
                  {tabIndex === 2 && "Bank Details"}
                  {tabIndex === 3 && "Other Settings"}
                </DialogTitle>

                <DialogContent dividers>
                  {tabIndex === 0 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          label="Customer Code"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Customer Name" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Category" fullWidth />
                      </Grid>
                    </Grid>
                  )}

                  {tabIndex === 1 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Email" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Phone" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Mobile" fullWidth />
                      </Grid>
                    </Grid>
                  )}

                  {tabIndex === 2 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Bank Name" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Account No" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="IFSC Code" fullWidth />
                      </Grid>
                    </Grid>
                  )}

                  {tabIndex === 3 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Discount %" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Interest %" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField size="small" label="Notes" fullWidth />
                      </Grid>
                    </Grid>
                  )}
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>

            {/* Save button */}
            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
              >
                Save
              </Button>
            </Box>
          </form>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerDetailForm;

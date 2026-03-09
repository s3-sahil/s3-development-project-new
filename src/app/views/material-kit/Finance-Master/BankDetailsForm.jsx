import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function BankDetailsForm() {
  const [formData, setFormData] = useState({
    bankCode: "",
    bankName: "",
    shortName: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
    fax: "",
    email: "",
    pincode: "",
    overdraftFlag: false,
    odAmount: "",
    activeFlag: true,
    nonOperational: false,
    eefcBank: false,
    clientId: "",
    branch: "",
    branchCd: "",
    gstNo: "",
    ifscCode: "",
    unit: "UNIT-1",
  });

  const [banks, setBanks] = useState([]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleAdd = () => {
    if (formData.bankCode && formData.bankName) {
      setBanks([...banks, { ...formData, id: banks.length + 1 }]);
      setFormData({
        bankCode: "",
        bankName: "",
        shortName: "",
        address1: "",
        address2: "",
        address3: "",
        phone: "",
        fax: "",
        email: "",
        pincode: "",
        overdraftFlag: false,
        odAmount: "",
        activeFlag: true,
        nonOperational: false,
        eefcBank: false,
        clientId: "",
        branch: "",
        branchCd: "",
        gstNo: "",
        ifscCode: "",
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Bank Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Bank Details
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Bank Code" size="small" fullWidth value={formData.bankCode} onChange={handleChange("bankCode")} /></Grid>
          <Grid item xs={4}><TextField label="Bank Name" size="small" fullWidth value={formData.bankName} onChange={handleChange("bankName")} /></Grid>
          <Grid item xs={4}><TextField label="Short Name" size="small" fullWidth value={formData.shortName} onChange={handleChange("shortName")} /></Grid>
          <Grid item xs={4}><TextField label="Address 1" size="small" fullWidth value={formData.address1} onChange={handleChange("address1")} /></Grid>
          <Grid item xs={4}><TextField label="Address 2" size="small" fullWidth value={formData.address2} onChange={handleChange("address2")} /></Grid>
          <Grid item xs={4}><TextField label="Address 3" size="small" fullWidth value={formData.address3} onChange={handleChange("address3")} /></Grid>
          <Grid item xs={4}><TextField label="Phone" size="small" fullWidth value={formData.phone} onChange={handleChange("phone")} /></Grid>
          <Grid item xs={4}><TextField label="Fax" size="small" fullWidth value={formData.fax} onChange={handleChange("fax")} /></Grid>
          <Grid item xs={4}><TextField label="Email" size="small" fullWidth value={formData.email} onChange={handleChange("email")} /></Grid>
          <Grid item xs={4}><TextField label="Pincode" size="small" fullWidth value={formData.pincode} onChange={handleChange("pincode")} /></Grid>
          <Grid item xs={4}><TextField label="Branch" size="small" fullWidth value={formData.branch} onChange={handleChange("branch")} /></Grid>
          <Grid item xs={4}><TextField label="Branch Cd" size="small" fullWidth value={formData.branchCd} onChange={handleChange("branchCd")} /></Grid>
          <Grid item xs={4}><TextField label="Client ID" size="small" fullWidth value={formData.clientId} onChange={handleChange("clientId")} /></Grid>
          <Grid item xs={4}><TextField label="GST No" size="small" fullWidth value={formData.gstNo} onChange={handleChange("gstNo")} /></Grid>
          <Grid item xs={4}><TextField label="IFSC Code" size="small" fullWidth value={formData.ifscCode} onChange={handleChange("ifscCode")} /></Grid>
          <Grid item xs={4}><TextField label="O.D. Amount" size="small" fullWidth value={formData.odAmount} onChange={handleChange("odAmount")} /></Grid>
        </Grid>

        {/* Flags */}
        <Box mt={2}>
          <FormControlLabel control={<Checkbox checked={formData.overdraftFlag} onChange={handleChange("overdraftFlag")} />} label="Overdraft Flag" />
          <FormControlLabel control={<Checkbox checked={formData.activeFlag} onChange={handleChange("activeFlag")} />} label="Active Flag" />
          <FormControlLabel control={<Checkbox checked={formData.nonOperational} onChange={handleChange("nonOperational")} />} label="Non Operational Bank" />
          <FormControlLabel control={<Checkbox checked={formData.eefcBank} onChange={handleChange("eefcBank")} />} label="EEFC Bank" />
        </Box>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>
            Add
          </Button>
        </Box>

        {/* Added Banks Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Banks</Typography>
          {banks.map((bank) => (
            <Box key={bank.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${bank.bankCode} - ${bank.bankName} - ${bank.branch} (${bank.ifscCode})`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
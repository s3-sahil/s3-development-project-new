import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  IconButton,
  Icon,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";

export default function OtherDetailsModal({ open, onClose, onSave }) {
  const [formData, setFormData] = useState({
    eccNo: "",
    range: "",
    group: "",
    commissionerate: "",
    division: "",
    vatNo: "",
    cstNo: "",
    serviceTaxNo: "",
    adharNo: "",
    accessingOfficer: "",
    distanceKm: "",
    bankName: "",
    bankAccNo: "",
    ifscCode: "",
    branch: "",
    interest: "",
    wardNo: "",
    companyIdentification: "",
    contacts: [
      { name: "", designation: "", mobile: "", email: "" },
      { name: "", designation: "", mobile: "", email: "" },
      { name: "", designation: "", mobile: "", email: "" },
      { name: "", designation: "", mobile: "", email: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (index, field, val) => {
    setFormData((prev) => {
      const updatedContacts = [...prev.contacts];
      updatedContacts[index][field] = val;

      return {
        ...prev,
        contacts: updatedContacts,
      };
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: { width: 800, maxWidth: 800 },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Other Details
        <IconButton onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* ===== BASIC DETAILS ===== */}
          <Grid item xs={4}>
            <TextField
              label="ECC No"
              name="eccNo"
              value={formData.eccNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Range"
              name="range"
              value={formData.range}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Group"
              name="group"
              value={formData.group}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Commissionerate"
              name="commissionerate"
              value={formData.commissionerate}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Division"
              name="division"
              value={formData.division}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="VAT No"
              name="vatNo"
              value={formData.vatNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="CST No"
              name="cstNo"
              value={formData.cstNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Service Tax No"
              name="serviceTaxNo"
              value={formData.serviceTaxNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Adhar No"
              name="adharNo"
              value={formData.adharNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Accessing Officer"
              name="accessingOfficer"
              value={formData.accessingOfficer}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Distance in KM"
              name="distanceKm"
              value={formData.distanceKm}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          {/* ===== BANK DETAILS ===== */}
          <Grid item xs={12}>
            <Typography fontWeight={600}>Bank Details</Typography>
            <Divider sx={{ mt: 1 }} />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Bank Acc No"
              name="bankAccNo"
              value={formData.bankAccNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Interest %"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          {/* ===== EXTRA ===== */}
          <Grid item xs={6}>
            <TextField
              label="Ward No"
              name="wardNo"
              value={formData.wardNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Company Identification"
              name="companyIdentification"
              value={formData.companyIdentification}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          {/* ===== CONTACT TABLE ===== */}
          <Grid item xs={12}>
            <Typography fontWeight={600}>Contact Persons</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
          </Grid>

          {formData.contacts.map((row, i) => (
            <Grid container spacing={2} key={i}>
              <Grid item xs={1}>
                <Typography>{i + 1} &gt;</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Contact Person"
                  value={row.name}
                  onChange={(e) =>
                    handleContactChange(i, "name", e.target.value)
                  }
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Designation"
                  value={row.designation}
                  onChange={(e) =>
                    handleContactChange(i, "designation", e.target.value)
                  }
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  placeholder="Mobile"
                  value={row.mobile}
                  onChange={(e) =>
                    handleContactChange(i, "mobile", e.target.value)
                  }
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Email"
                  value={row.email}
                  onChange={(e) =>
                    handleContactChange(i, "email", e.target.value)
                  }
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const ManufacturingLocationModal = ({ open, onClose, onSave, defaultData }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    address1: "",
    city: "",
    pinCode: "",
    state: "",
    fax: "",
    phone: "",
    email: "",
    mobile: "",
    contact: "",
    designation: "",
    gstNo: "",
  });

  // ================= LOAD DEFAULT =================
  useEffect(() => {
    if (open) {
      setForm({
        state: defaultData?.state || "",
        fax: defaultData?.fax || "",
        phone: defaultData?.phone || "",
        email: defaultData?.email || "",
        mobile: defaultData?.mobile || "",
        contact: defaultData?.contact || "",
        designation: defaultData?.designation || "",
        gstNo: defaultData?.gstNo || "",
      });
    }
  }, [open, defaultData]);

  // ================= HANDLE CHANGE =================
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: 900,
          maxHeight: "80vh", // scroll like your UI
        },
      }}
    >
      <DialogTitle>
        Manufacturing Location Details
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address1"
              fullWidth
              value={form.address1}
              onChange={(e) => handleChange("address1", e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="City"
              fullWidth
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Pin Code"
              fullWidth
              value={form.pinCode}
              onChange={(e) => handleChange("pinCode", e.target.value)}
            />
          </Grid>
          {/* STATE */}
          <Grid item xs={12}>
            <TextField
              label="State"
              fullWidth
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </Grid>

          {/* FAX & PHONE */}
          <Grid item xs={6}>
            <TextField
              label="Fax"
              fullWidth
              value={form.fax}
              onChange={(e) => handleChange("fax", e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Phone"
              fullWidth
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Grid>

          {/* EMAIL & MOBILE */}
          <Grid item xs={6}>
            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Mobile"
              fullWidth
              value={form.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
            />
          </Grid>

          {/* CONTACT & DESIGNATION */}
          <Grid item xs={6}>
            <TextField
              label="Contact"
              fullWidth
              value={form.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Designation"
              fullWidth
              value={form.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
            />
          </Grid>

          {/* GST */}
          <Grid item xs={6}>
            <TextField
              label="GST No"
              fullWidth
              value={form.gstNo}
              onChange={(e) => handleChange("gstNo", e.target.value)}
            />
          </Grid>
        </Grid>

        {/* ================= FOOTER ================= */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" onClick={() => onSave(form)}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ManufacturingLocationModal;

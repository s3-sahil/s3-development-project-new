import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { saveCustomerDetail } from "app/utils/authServices";
const SAMPLE_TAXES = [
  { code: "T01", desc: "Standard Tax", percent: 5 },
  { code: "T02", desc: "Luxury Tax", percent: 12 },
  { code: "T03", desc: "Service Tax", percent: 18 },
];

const CustomerDetailForm = () => {
  const initialData = {};
  const baseAmount = 1000;
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

  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [taxType, setTaxType] = useState("SGST");
  const [selectedTaxCode, setSelectedTaxCode] = useState("");
  const [availableTaxes, setAvailableTaxes] = useState(() =>
    Array.isArray(initialData.availableTaxes)
      ? initialData.availableTaxes
      : SAMPLE_TAXES,
  );
  const [addedTaxes, setAddedTaxes] = useState(() =>
    Array.isArray(initialData.taxes) ? initialData.taxes : [],
  );

  // load initialData into formData when dialog opens or initialData changes
  useEffect(() => {
    if (open) {
      setFormData((prev) => ({ ...prev, ...(initialData.formData || {}) }));
      setAvailableTaxes(
        Array.isArray(initialData.availableTaxes)
          ? initialData.availableTaxes
          : SAMPLE_TAXES,
      );
      setAddedTaxes(Array.isArray(initialData.taxes) ? initialData.taxes : []);
    }
  }, [open]);
  // helper to update formData fields
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  // small helper for nested setters used in other sections
  const update = (setter) => (field) => (e) =>
    setter((prev) => ({ ...prev, [field]: e.target.value }));

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setOpen(true);
  };

  const handleAddTax = () => {
    if (!selectedTaxCode) {
      alert("Please select tax");
      return;
    }

    const tax = availableTaxes.find((t) => t.code === selectedTaxCode);

    if (!tax) return;

    const amount = ((baseAmount * tax.percent) / 100).toFixed(2);

    const exists = addedTaxes.some(
      (t) => t.code === tax.code && t.type === taxType,
    );

    if (exists) {
      alert("Tax already added");
      return;
    }

    setAddedTaxes((prev) => [
      ...prev,
      {
        id: `${tax.code}_${taxType}`,
        type: taxType,
        code: tax.code,
        desc: tax.desc,
        percent: tax.percent,
        amount: Number(amount),
      },
    ]);

    setSelectedTaxCode("");
  };

  const handleRemoveTax = (id) => {
    setAddedTaxes((prev = []) => prev.filter((t) => t.id !== id));
  };

  const handleClearAll = () => setAddedTaxes([]);

  const handleSave = async () => {
    try {
      const payload = {
        cust_mst_ex: {
          cust_code: formData.code,
          cust_name: formData.name,
          cust_add1: formData.bankAdd,
          cust_add2: formData.bankAdd1,
          cust_city: formData.city,
          cust_Pin: formData.pin,
          cust_state: formData.state,
          cust_country: formData.country,
          fax: formData.fax,
          phone: formData.phone,
          email: formData.email,
          ecc_code: formData.eccCode,
          exci_range: formData.range,
          division: formData.division,
          commsrate: formData.commissionerate,
          our_vend_cd: formData.supplierCode,
          cust_Type: formData.customerType,
          state_no: formData.vatNo,
          central_no: formData.cstNo,
          category: formData.category,
          pancode: formData.panNo,
          contact_person: formData.contactPerson,
          person_desig: formData.designation,
          interest_per: Number(formData.interest || 0),
          outstanding_limit: Number(formData.agingLimit || 0),
          zone: formData.zone,
          service_tax_no: formData.serviceTaxNo,
          cash_disper: Number(formData.cashDisc || 0),
          banK_NAME: formData.bankName,
          banK_ADD1: formData.bankAdd,
          banK_ADD2: formData.bankAdd1,
          short_name: formData.short,
          mobile: formData.mobile,
          dealer_name: formData.dealerName,
          dealer_add: formData.dealerAdd,
          dealer_add1: formData.dealerAdd1,
          bank_acc_no: formData.bankAccNo,
          web_site: formData.website,
          woff: formData.weeklyOff,
          group_cust: formData.groupCustomer,
          ref_cust_Code: formData.refCustomer,
          gst_no: formData.gstNo,
          distance_km: Number(formData.distanceKm || 0),
          district_name: formData.district,
          industry_name: formData.industryType,
          start_dt: formData.startDate,
          expiry_dt: formData.expiryDate,
          nda: formData.nda ? "Y" : "N",
          disc_appl: formData.discountApplicable ? "Y" : "N",
          insurance: formData.insurance,
        },

        cust_tax_ex: addedTaxes.map((t) => ({
          cusT_CODE: formData.code,
          taX_CODE: t.code,
          taX_AMT: t.amount,
        })),

        cust_pay_ex: {
          cusT_CODE: formData.code,
          percent: Number(formData.cashDisc || 0),
          period: 0,
          mode: "C",
          dmflag: "D",
        },

        cust_factory_det_ex: {
          cust_code: formData.code,
          name: formData.name,
          add1: formData.bankAdd,
          add2: formData.bankAdd1,
          city: formData.city,
          state: formData.state,
          fax: formData.fax,
          phone: formData.phone,
          email: formData.email,
          mobile: formData.mobile,
          contact_person: formData.contactPerson,
          designation: formData.designation,
          pincode: formData.pin,
          web_site: formData.website,
          woff: formData.weeklyOff,
          gst_no: formData.gstNo,
          panNo: formData.panNo,
        },
      };

      console.log("Payload:", payload);

      const result = await saveCustomerDetail(payload);

      alert(result.message || "Customer Saved Successfully");

      handleClose();
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // keep for local submit usage if needed
    console.log("Customer Data (local):", formData);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [contactPersons, setContactPersons] = useState([
    { name: "", designation: "", mobile: "", email: "" },
  ]);

  // handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContactChange = (index, field, value) => {
    setContactPersons((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addContactRow = () => {
    setContactPersons((prev) => [
      ...prev,
      { name: "", designation: "", mobile: "", email: "" },
    ]);
  };

  const removeContactRow = (index) => {
    setContactPersons((prev) => prev.filter((_, i) => i !== index));
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
                <Tab label="Tax Term" />
                <Tab label="Payment Terms" />
                <Tab label="Other Details" />
                <Tab label="Office Details" />
              </Tabs>

              {/* Modal */}
              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                  {tabIndex === 0 && "Tax Term"}
                  {tabIndex === 1 && "Payment Terms"}
                  {tabIndex === 2 && "Other Details"}
                  {tabIndex === 3 && "Office Details"}
                </DialogTitle>

                <DialogContent dividers>
                  {tabIndex === 0 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Base Amount</strong>: {baseAmount}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            value={taxType}
                            onChange={(e) => setTaxType(e.target.value)}
                            aria-label="tax-type"
                            name="tax-type"
                          >
                            <FormControlLabel
                              value="SGST"
                              control={<Radio />}
                              label="SGST"
                            />
                            <FormControlLabel
                              value="CGST"
                              control={<Radio />}
                              label="CGST"
                            />
                            <FormControlLabel
                              value="IGST"
                              control={<Radio />}
                              label="IGST"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="tax-select-label">Tax</InputLabel>
                          <Select
                            labelId="tax-select-label"
                            value={selectedTaxCode}
                            label="Tax"
                            onChange={(e) => setSelectedTaxCode(e.target.value)}
                          >
                            <MenuItem value="">
                              <em>-- Select Tax --</em>
                            </MenuItem>
                            {(availableTaxes || []).map((t) => (
                              <MenuItem key={t.code} value={t.code}>
                                {t.code} - {t.desc} ({t.percent}%)
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddTax}
                        >
                          Add
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleClearAll}
                          sx={{ ml: 2 }}
                        >
                          Clear All
                        </Button>
                      </Grid>

                      <Grid item xs={12}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <strong>Tax Type</strong>
                              </TableCell>
                              <TableCell>
                                <strong>Tax Code</strong>
                              </TableCell>
                              <TableCell>
                                <strong>Description</strong>
                              </TableCell>
                              <TableCell align="right">
                                <strong>%</strong>
                              </TableCell>
                              <TableCell align="right">
                                <strong>Amount</strong>
                              </TableCell>
                              <TableCell align="center">
                                <strong>Action</strong>
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {!addedTaxes || addedTaxes.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} align="center">
                                  No tax added
                                </TableCell>
                              </TableRow>
                            ) : (
                              (addedTaxes || []).map((t) => (
                                <TableRow key={t.id}>
                                  <TableCell>{t.type}</TableCell>
                                  <TableCell>{t.code}</TableCell>
                                  <TableCell>{t.desc}</TableCell>
                                  <TableCell align="right">
                                    {t.percent}
                                  </TableCell>
                                  <TableCell align="right">
                                    {Number(t.amount).toFixed(2)}
                                  </TableCell>
                                  <TableCell align="center">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleRemoveTax(t.id)}
                                    >
                                      Delete
                                      {/* <DeleteIcon fontSize="small" /> */}
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  )}

                  {tabIndex === 1 && (
                    <Grid container spacing={2} mt={1}>
                      <Grid item md={3}>
                        <TextField label="Percentage" size="small" fullWidth />
                      </Grid>

                      <Grid item md={3}>
                        <TextField label="Description" size="small" fullWidth />
                      </Grid>

                      <Grid item md={3}>
                        <TextField
                          label="Payment Mode"
                          size="small"
                          fullWidth
                        />
                      </Grid>

                      <Grid item md={3}>
                        <TextField label="Period" size="small" fullWidth />
                      </Grid>

                      <Grid item md={12}>
                        <Button variant="contained" sx={{ mr: 2 }}>
                          ADD
                        </Button>

                        <Button variant="contained" color="error">
                          REMOVE
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  {tabIndex === 2 && (
                    <Grid container spacing={2} mt={1}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="ECC Code"
                          name="eccCode"
                          size="small"
                          fullWidth
                          value={formData.eccCode || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Range"
                          name="range"
                          size="small"
                          fullWidth
                          value={formData.range || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Commissionerate"
                          name="commissionerate"
                          size="small"
                          fullWidth
                          value={formData.commissionerate || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Division"
                          name="division"
                          size="small"
                          fullWidth
                          value={formData.division || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="category-other-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="category-other-label"
                            label="Category"
                            name="categoryOther"
                            value={formData.categoryOther || ""}
                            onChange={handleChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="A">Category A</MenuItem>
                            <MenuItem value="B">Category B</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Ref Customer"
                          name="refCustomer"
                          size="small"
                          fullWidth
                          value={formData.refCustomer || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="VAT No"
                          name="vatNo"
                          size="small"
                          fullWidth
                          value={formData.vatNo || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="CST No"
                          name="cstNo"
                          size="small"
                          fullWidth
                          value={formData.cstNo || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Service Tax No"
                          name="serviceTaxNo"
                          size="small"
                          fullWidth
                          value={formData.serviceTaxNo || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Dealer Name"
                          name="dealerName"
                          size="small"
                          fullWidth
                          value={formData.dealerName || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Dealer Add"
                          name="dealerAdd"
                          size="small"
                          fullWidth
                          value={formData.dealerAdd || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Dealer Add1"
                          name="dealerAdd1"
                          size="small"
                          fullWidth
                          value={formData.dealerAdd1 || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="weekly-off-label">
                            Weekly Off
                          </InputLabel>
                          <Select
                            labelId="weekly-off-label"
                            label="Weekly Off"
                            name="weeklyOff"
                            value={formData.weeklyOff || ""}
                            onChange={handleChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Sunday">Sunday</MenuItem>
                            <MenuItem value="Saturday">Saturday</MenuItem>
                            <MenuItem value="Friday">Friday</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Group Customer"
                          name="groupCustomer"
                          size="small"
                          fullWidth
                          value={formData.groupCustomer || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Distance in Km"
                          name="distanceKm"
                          size="small"
                          fullWidth
                          value={formData.distanceKm || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Marketing By"
                          name="marketingBy"
                          size="small"
                          fullWidth
                          value={formData.marketingBy || ""}
                          onChange={handleChange}
                        />
                      </Grid>

                      {/* Contact Persons section */}
                      <Grid item xs={12} mt={2}>
                        <Typography variant="subtitle1">
                          <strong>Contact Persons</strong>
                        </Typography>

                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <strong>#</strong>
                              </TableCell>
                              <TableCell>
                                <strong>Contact Person</strong>
                              </TableCell>
                              <TableCell>
                                <strong>Designation</strong>
                              </TableCell>
                              <TableCell>
                                <strong>Mobile</strong>
                              </TableCell>
                              <TableCell>
                                <strong>Email</strong>
                              </TableCell>
                              <TableCell align="center">
                                <strong>Action</strong>
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {contactPersons.map((c, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>
                                  <TextField
                                    size="small"
                                    name={`contact_name_${idx}`}
                                    value={c.name}
                                    onChange={(e) =>
                                      handleContactChange(
                                        idx,
                                        "name",
                                        e.target.value,
                                      )
                                    }
                                    fullWidth
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    size="small"
                                    value={c.designation}
                                    onChange={(e) =>
                                      handleContactChange(
                                        idx,
                                        "designation",
                                        e.target.value,
                                      )
                                    }
                                    fullWidth
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    size="small"
                                    value={c.mobile}
                                    onChange={(e) =>
                                      handleContactChange(
                                        idx,
                                        "mobile",
                                        e.target.value,
                                      )
                                    }
                                    fullWidth
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    size="small"
                                    value={c.email}
                                    onChange={(e) =>
                                      handleContactChange(
                                        idx,
                                        "email",
                                        e.target.value,
                                      )
                                    }
                                    fullWidth
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <IconButton
                                    size="small"
                                    onClick={() => removeContactRow(idx)}
                                  >
                                    Delete
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        <Button
                          variant="outlined"
                          size="small"
                          // startIcon={<AddIcon />}
                          onClick={addContactRow}
                          sx={{ mt: 1 }}
                        >
                          Add Contact
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  {tabIndex === 3 && (
                    <Grid container spacing={2} mt={1}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="name"
                          label="Name"
                          fullWidth
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="bankAdd"
                          label="Address"
                          fullWidth
                          value={formData.bankAdd}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="bankAdd1"
                          label="Address 1"
                          fullWidth
                          value={formData.bankAdd1}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="city"
                          label="City"
                          fullWidth
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="pin"
                          label="Pin Code"
                          fullWidth
                          value={formData.pin}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="state"
                          label="State"
                          fullWidth
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fax"
                          label="Fax"
                          fullWidth
                          value={formData.fax}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="phone"
                          label="Phone"
                          fullWidth
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="email"
                          label="Email"
                          fullWidth
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="mobile"
                          label="Mobile"
                          fullWidth
                          value={formData.mobile}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="contactPerson"
                          label="Contact Person"
                          fullWidth
                          value={formData.contactPerson}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="designation"
                          label="Designation"
                          fullWidth
                          value={formData.designation}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="website"
                          label="Web Site"
                          fullWidth
                          value={formData.website}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Weekly Off</InputLabel>
                          <Select
                            name="weeklyOff"
                            label="Weekly Off"
                            value={formData.weeklyOff || ""}
                            onChange={handleChange}
                          >
                            <MenuItem value="Sunday">Sunday</MenuItem>
                            <MenuItem value="Saturday">Saturday</MenuItem>
                            <MenuItem value="Friday">Friday</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="panNo"
                          label="PAN No"
                          fullWidth
                          value={formData.panNo}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="gstNo"
                          label="GST No"
                          fullWidth
                          value={formData.gstNo}
                          onChange={handleChange}
                        />
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

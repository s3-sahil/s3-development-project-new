import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addSupplierDetails, fetchMaxSupplierCode } from "app/utils/materialMaterialServices";
import { useEffect, useState } from "react";
import OtherDetailsModal from "./OtherDetailsModal";
import PaymentTermsModal from "./PaymentTermsModal";
import MaterialCategoryModal from "./MaterialCategoryModal";
import ManufacturingLocationModal from "./ManufacturingLocationModal";

export default function SupplierForm() {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    category: "",
    type: "",
    address: "",
    address1: "",
    city: "",
    pinCode: "",
    country: "",
    state: "",
    phone: "",
    fax: "",
    email: "",
    panNo: "",
    gstNo: "",
    tanNo: "",
    uamNo: "",
    contactPerson: "",
    mobile: "",
    designation: "",
    approved: false,
    useFlag: false,
    qualityCertificate: "",
    noTransportGST: false,
  });
  const [otherDetails, setOtherDetails] = useState({
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
  const [openOtherDetails, setOpenOtherDetails] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);

  const [locationData, setLocationData] = useState({});
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const [categoryList, setCategoryList] = useState([
    { id: 1, name: "BOM CONSUMABLES (HOSUR)" },
    { id: 2, name: "BOM CONSUMABLES (CHAKAN)" },
    { id: 3, name: "BOUGHT OUT PARTS (CHAKAN)" },
    { id: 4, name: "SCRAP" },
  ]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (formData.name && formData.name.length >= 3) {
        try {
          const code = await fetchMaxSupplierCode(formData.name);

          if (code) {
            setFormData((prev) => ({
              ...prev,
              code: code,
            }));
          }
        } catch (err) {
          console.error("Code fetch failed", err);
        }
      }
    }, 500); // debounce time

    return () => clearTimeout(delayDebounce);
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        vendor_ex: {
          vend_code: formData.code,
          name: formData.name,
          add1: formData.address,
          add2: formData.address1,
          city: formData.city,
          state: formData.state,
          country: formData.country,

          vtype: formData.category === "Import" ? "I" : "D",

          phone: formData.phone,
          fax: formData.fax,
          email: formData.email,
          pincode: formData.pinCode,

          // ✅ CONTACT MAIN
          contacT_PERSON: formData.contactPerson,
          persoN_DESIG: formData.designation,
          mobile: formData.mobile,

          // ✅ TAX
          paN_NO: formData.panNo,
          gst_no: formData.gstNo,
          tan_no: formData.tanNo,
          uaM_no: formData.uamNo,

          // ✅ FLAGS
          apP_FLAG: formData.approved ? "Y" : "N",
          iN_USE: formData.useFlag ? "Y" : "N",
          iso_flag: formData.qualityCertificate,
          noTransport_inGST: formData.noTransportGST ? "Y" : "N",

          // =========================
          // ✅ OTHER DETAILS FROM MODAL
          // =========================

          ecc_code: otherDetails?.eccNo || "",
          range: otherDetails?.range || "",
          division: otherDetails?.division || "",
          collectorate: otherDetails?.commissionerate || "",

          service_tax_no: otherDetails?.serviceTaxNo || "",
          adhar_no: otherDetails?.adharNo || "",

          ward_no: otherDetails?.wardNo || "",
          accessing_off: otherDetails?.accessingOfficer || "",

          distance_km: Number(otherDetails?.distanceKm || 0),

          // ✅ BANK
          banK_NAME: otherDetails?.bankName || "",
          banK_ACC_no: otherDetails?.bankAccNo || "",
          ifsC_code: otherDetails?.ifscCode || "",
          branch: otherDetails?.branch || "",
          interest_per: Number(otherDetails?.interest || 0),

          // =========================
          // ✅ MULTIPLE CONTACTS
          // =========================
          contact_person1: otherDetails?.contacts?.[0]?.name || "",
          contact_person2: otherDetails?.contacts?.[1]?.name || "",
          contact_person3: otherDetails?.contacts?.[2]?.name || "",
          contact_person4: otherDetails?.contacts?.[3]?.name || "",

          person_desig1: otherDetails?.contacts?.[0]?.designation || "",
          person_desig2: otherDetails?.contacts?.[1]?.designation || "",
          person_desig3: otherDetails?.contacts?.[2]?.designation || "",
          person_desig4: otherDetails?.contacts?.[3]?.designation || "",

          mobile1: otherDetails?.contacts?.[0]?.mobile || "",
          mobile2: otherDetails?.contacts?.[1]?.mobile || "",
          mobile3: otherDetails?.contacts?.[2]?.mobile || "",
          mobile4: otherDetails?.contacts?.[3]?.mobile || "",

          email1: otherDetails?.contacts?.[0]?.email || "",
          email2: otherDetails?.contacts?.[1]?.email || "",
          email3: otherDetails?.contacts?.[2]?.email || "",
          email4: otherDetails?.contacts?.[3]?.email || "",
        },

        // keep empty for now
        list_Vendor_Catagory_Detail_ex: [],
        list_Vendor_Tax_ex: [],
        list_Vend_pay_ex: [],
        list_vendor_factory_details_ex: [],
      };

      const res = await addSupplierDetails(payload);

      alert(res.message || "Saved Successfully");
    } catch (error) {
      console.error("Save Error:", error);
      alert(error?.error || "Something went wrong");
    }
  };

  const handleSaveLocation = (data) => {
    console.log("Saved Location:", data);

    setLocationData(data); // store in parent
    setOpenLocationModal(false);
  };

  const handleSavePaymentTerms = (data) => {
    console.log("Payment Terms Data:", data);

    setPaymentTerms(data); // ✅ store in parent
    setOpenPaymentModal(false); // close modal
  };

  const handleSaveCategory = (data) => {
    console.log("Selected Categories:", data);

    setSelectedCategories(data);
    setOpenCategoryModal(false);
  };
  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Supplier Details" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}></Typography>

          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* TOP SECTION */}
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={4} display="flex" alignItems="center" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="useFlag"
                  checked={formData.useFlag}
                  onChange={handleCheck}
                />
              }
              label="Use Flag"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="approved"
                  checked={formData.approved}
                  onChange={handleCheck}
                />
              }
              label="Approved"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Vendor">Vendor</MenuItem>
              <MenuItem value="Job Work">Job Work</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Domestic">Domestic</MenuItem>
              <MenuItem value="Import">Import</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Supplier Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* ADDRESS SECTION */}
        <Typography variant="subtitle1" mt={4} mb={1} fontWeight={600}>
          Address Details
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
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
              label="Address 1"
              name="address1"
              value={formData.address1}
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
              label="Pin Code"
              name="pinCode"
              value={formData.pinCode}
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
        </Grid>

        {/* CONTACT SECTION */}
        <Typography variant="subtitle1" mt={4} mb={1} fontWeight={600}>
          Contact Details
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
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
              label="Email"
              name="email"
              value={formData.email}
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
              label="GST No"
              name="gstNo"
              value={formData.gstNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="UAM No."
              name="uamNo"
              value={formData.uamNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="TAN No"
              name="tanNo"
              value={formData.tanNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* CONTACT PERSON */}
        <Typography variant="subtitle1" mt={4} mb={1} fontWeight={600}>
          Contact Person
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
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
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Quality Certificate"
              name="qualityCertificate"
              value={formData.qualityCertificate}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="ISO9001">ISO 9001</MenuItem>
              <MenuItem value="ISO14001">ISO 14001</MenuItem>
              <MenuItem value="OHSAS">OHSAS</MenuItem>
            </TextField>
          </Grid>

          {/* Checkbox Right Side */}
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="noTransportGST"
                  checked={formData.noTransportGST}
                  onChange={handleCheck}
                />
              }
              label="No Transport/Insurance in GST Calculation"
            />
          </Grid>
        </Grid>

        {/* BOTTOM BUTTONS */}
        <Box mt={4} display="flex" gap={2} justifyContent="center">
          <Button variant="contained" onClick={() => setOpenOtherDetails(true)}>
            Other Details
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenCategoryModal(true)}
          >
            Material Category
          </Button>

          <Button variant="contained" onClick={() => setOpenPaymentModal(true)}>
            Payment Terms
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenLocationModal(true)}
          >
            Manufacturing Location
          </Button>
          <Button variant="contained" onClick={() => setOpenTaxModal(true)}>
            Tax Term
          </Button>
        </Box>
      </Box>

      <OtherDetailsModal
        open={openOtherDetails}
        onClose={() => setOpenOtherDetails(false)}
        onSave={(data) => setOtherDetails(data)}
      />

      <ManufacturingLocationModal
        open={openLocationModal}
        onClose={() => setOpenLocationModal(false)}
        onSave={handleSaveLocation}
        defaultData={locationData} // 👈 PASS DATA HERE
      />

      <PaymentTermsModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
        onSave={handleSavePaymentTerms}
        defaultData={paymentTerms} // ✅ important
      />

      <MaterialCategoryModal
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        onSave={handleSaveCategory}
        categoryList={categoryList}
        defaultData={selectedCategories}
      />
    </Container>
  );
}

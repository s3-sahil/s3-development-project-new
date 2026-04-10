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
  Tooltip,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  checkPanExists,
  CustomerDetailsEdit,
  fetchCategoryCustomerDetails,
  getCustomerMaxCode,
  saveCustomerDetail,
  fetchIndustry_typeCustomer,
  UpdatedCustomerDetail,
  fetchSGST,
  fetchCGST,
  fetchIGST,
  fetch_state,
  checkGSTExists,
  Fetch_District,
  Fetch_Country,
  Fetch_PAYCOND
} from "app/utils/authServices";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Span } from "app/components/Typography";


const SAMPLE_TAXES = [
  { code: "T01", desc: "Standard Tax", percent: 5 },
  { code: "T02", desc: "Luxury Tax", percent: 12 },
  { code: "T03", desc: "Service Tax", percent: 18 },
];

const CustomerDetailForm = () => {
  const initialData = {};
  const baseAmount = 1000;
  const location = useLocation(); // for edit data


  const [categoryDropdownValue, setCategoryDropdownValue] = useState([]);
  const [industrytypeDropdownValue, setindustrytypeDropdownValue] = useState([]);
  const [stateDropdownValue, setstateDropdownValue] = useState([]);
  const [districtDropdownValue, setdistrictDropdownValue] = useState([]);
  const [countryDropdownValue, setcountryDropdownValue] = useState([]);
  const [paycondDropdownValue, setpaycondDropdownValue] = useState([]);

  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [taxType, setTaxType] = useState("SGST");
  const [selectedTaxCode, setSelectedTaxCode] = useState("");

  //pay //////////////////////
  const [payPercent, setPayPercent] = useState("");
  const [payperioda, setPayperioda] = useState("");
  const [payDesc, setPayDesc] = useState("");
  const [payMode, setPayMode] = useState("");
  const [payPeriod, setPayPeriod] = useState("");
  const [addedPays, setAddedPays] = useState([]);

  //const [payDesc, setPayDesc] = useState("");   // Description text
  const [payCode, setPayCode] = useState("");   // PC_CODE
  //Edit
  const [actionMode, setActionMode] = useState("new"); // new | edit

  const [formData, setFormData] = useState({
    code: "",
    trng_flg: "",
    type: "",
    category: "",
    zone: "",
    CtForm: false,
    inuse_flag: false,
    insurance: "",
    nda: false,
    startDate: "",
    expiryDate: "",
    name: "",
    short: "",
    city: "",
    pin: "",
    country: "",
    comp_nonComp: "",
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
    //doc_thru:"",
    odoc_thru: "",
    sman_code: "",
    ctForm: "",
    website: "",
    fname: "",
    fbankAdd: "",
    fbankAdd1: "",
    fcity: "",
    fpin: "",
    ffax: "",
    fphone: "",
    femail: "",
    fmobile: "",
    fcontactPerson: "",
    fdesignation: "",
    fwebsite: "",
    fweeklyOff: "",
    fpanNo: "",
    fgstNo: "",
    fstate: "",
    discountApplicable: false,
  });
  const handleAddPay = () => {
    if (!payPercent || !payCode || !payDesc || !payMode || !payPeriod || !payperioda) {
      alert("Please fill all fields");
      return;
    }

    const exists = addedPays.some(
      (p) =>
        p.percent === payPercent &&
        p.code === payCode &&
        p.desc === payDesc &&
        p.mode === payMode &&
        p.perioda === payperioda &&
        p.period === payPeriod
    );

    if (exists) {
      alert("Payment already added");
      return;
    }

    setAddedPays((prev) => [
      ...prev,
      {
        id: Date.now(),
        percent: payPercent,
        code: payCode,
        desc: payDesc,
        mode: payMode,
        period: payPeriod,
        perioda: payperioda,
      },
    ]);

    // ✅ Reset ALL fields (you missed payCode)
    setPayPercent("");
    setPayDesc("");
    setPayCode("");   // ⭐ IMPORTANT
    setPayMode("");
    setPayPeriod("");
    setPayperioda("");
  };

  // Category dropdown
  const fetchCategoryDropdown = async () => {
    try {
      const res = await fetchCategoryCustomerDetails();

      const filteredData =
        res?.filter((item) => item.flag === "C") || [];

      setCategoryDropdownValue(filteredData);
      //setCategoryDropdownValue(res || []);
    } catch (error) {
      console.error("Category fetch error:", error);
      setCategoryDropdownValue([]);
    }
  };

  // Industry dropdown
  const fetchindustrytypeDropdown = async () => {
    try {
      const res = await fetchIndustry_typeCustomer();

      setindustrytypeDropdownValue(res || []);
    } catch (error) {
      console.error("Industry Type fetch error:", error);
      setindustrytypeDropdownValue([]);
    }
  };

  //state
  const fetchstateDropdown = async () => {
    try {
      const res = await fetch_state();

      setstateDropdownValue(res || []);
    } catch (error) {
      console.error("State Type fetch error:", error);
      setindustrytypeDropdownValue([]);
    }
  };

  //District
  const fetchdistrictDropdown = async () => {
    try {
      const res = await Fetch_District();

      setdistrictDropdownValue(res || []);
    } catch (error) {
      console.error("District Type fetch error:", error);
      setdistrictDropdownValue([]);
    }
  };

  //Country
  const fetchcountryDropdown = async () => {
    try {
      const res = await Fetch_Country();

      setcountryDropdownValue(res || []);
    } catch (error) {
      console.error("Country Type fetch error:", error);
      setcountryDropdownValue([]);
    }
  };

  //Fetch_PAYCOND
  const fetchpaycondDropdown = async () => {
    try {
      const res = await Fetch_PAYCOND();

      setpaycondDropdownValue(res || []);
    } catch (error) {
      console.error("Paycond Type fetch error:", error);
      setpaycondDropdownValue([]);
    }
  };

  //edit

  const fetchEditData = async (cust_code) => {
    try {
      const res = await CustomerDetailsEdit(cust_code);

      if (res?.data) {
        const data = res.data;

        const cust = data.cust_mst_ex || {};
        const factory = data.cust_factory_det_ex || {};

        setFormData({
          code: cust.Cust_code ?? "",
          name: cust.Cust_name ?? "",
          bankAdd: cust.Cust_add1 ?? "",
          bankAdd1: cust.Cust_add2 ?? "",
          city: cust.Cust_city ?? "",
          inuse_flag: cust.Inuse_flag === "Y",
          trng_flg: cust.trng_flg ?? "",
          pin: cust.Cust_Pin ?? "",
          state: cust.Cust_state ?? "",
          country: cust.Cust_country ?? "",
          comp_nonComp: cust.comp_nonComp ?? "",
          fax: cust.Fax ?? "",
          phone: cust.Phone ?? "",
          email: cust.Email ?? "",
          eccCode: cust.Ecc_code ?? "",
          range: cust.Exci_range ?? "",
          division: cust.Division ?? "",
          commissionerate: cust.Commsrate ?? "",
          supplierCode: cust.Our_vend_cd ?? "",
          customerType: cust.Cust_Type ?? "",
          vatNo: cust.State_no ?? "",
          cstNo: cust.Central_no ?? "",
          category: cust.CATEGORY ?? "",
          panNo: cust.PANCODE ?? "",
          contactPerson: cust.contact_person ?? "",
          designation: cust.person_desig ?? "",
          interest: cust.interest_per ?? "",
          agingLimit: cust.outstanding_limit ?? "",
          zone: cust.zone ?? "",
          serviceTaxNo: cust.Service_tax_no ?? "",
          cashDisc: cust.cash_disper ?? "",
          bankName: cust.BANK_NAME ?? "",
          short: cust.Short_name ?? "",
          mobile: cust.Mobile ?? "",
          dealerName: cust.Dealer_name ?? "",
          dealerAdd: cust.dealer_add ?? "",
          dealerAdd1: cust.dealer_add1 ?? "",
          bankAccNo: cust.Bank_acc_no ?? "",
          website: cust.web_site ?? "",
          weeklyOff: cust.Woff ?? "",
          odoc_thru: cust.Doc_thru ?? "",
          groupCustomer: cust.group_cust ?? "",
          refCustomer: cust.Ref_cust_Code ?? "",
          gstNo: cust.gst_no ?? "",
          distanceKm: cust.distance_km ?? "",
          district: cust.District_name ?? "",
          industryType: cust.Industry_name ?? "",
          sman_code: cust.sman_code ?? "",
          CtForm: cust.CtForm === "Y",
          startDate: cust.start_dt
            ? new Date(cust.start_dt).toISOString().split("T")[0]
            : "",
          expiryDate: cust.expiry_dt
            ? new Date(cust.expiry_dt).toISOString().split("T")[0]
            : "",
          nda: cust.NDA === "Y",
          discountApplicable: cust.disc_appl === "Y",
          insurance: cust.insurance ?? "",

          //factory
          fname: factory.name ?? "",
          fbankAdd: factory.add1 ?? "",
          fbankAdd1: factory.add2 ?? "",
          fcity: factory.city ?? "",
          fpin: factory.pincode ?? "",
          ffax: factory.fax ?? "",
          fphone: factory.phone ?? "",
          femail: factory.email ?? "",
          fmobile: factory.mobile ?? "",
          fcontactPerson: factory.contact_person ?? "",
          fdesignation: factory.designation ?? "",
          fwebsite: factory.web_site ?? "",
          fweeklyOff: factory.WOFF ?? "",
          fpanNo: factory.PanNo ?? "",
          fgstNo: factory.gst_no ?? "",
          fstate: factory.state ?? "",
        });

        // ✅ Taxes
        setAddedTaxes(
          (data.list_cust_tax_ex || []).map((t) => ({
            code: t.TAX_CODE ?? "",
            amount: t.TAX_AMT ?? "",
            cust: t.CUST_CODE ?? ""
          }))
        );

        // ✅ Payment Terms
        setAddedPays(
          (data.list_cust_pay_ex || []).map((p) => ({
            percent: p.PERCENT ?? "",
            period: p.DMFLAG ?? "",
            perioda: p.PERIOD ?? "",
            mode: p.MODE ?? "",
            code: p.PC_CODE ?? ""
          }))
        );
      }
    } catch (error) {
      console.error("Edit fetch error:", error);
    }
  };

  //edit

  //// TAX

  const [availableTaxes, setAvailableTaxes] = useState([]);
  const [addedTaxes, setAddedTaxes] = useState([]);
  const [taxLoaded, setTaxLoaded] = useState(false);


  // useEffect(() => {
  //   if (open && !taxLoaded) {
  //     setAvailableTaxes(initialData.availableTaxes || SAMPLE_TAXES);
  //     //setAddedTaxes(initialData.taxes || []);
  //     setTaxLoaded(true);
  //   }
  // }, [open, taxLoaded]);

  useEffect(() => {
    if (taxType) {
      loadTaxData();
    }
  }, [taxType]);
  //RESET taxLoaded WHEN MODAL CLOSES

  useEffect(() => {
    fetchCategoryDropdown();
    fetchindustrytypeDropdown();
    fetchstateDropdown();
    fetchdistrictDropdown();
    fetchcountryDropdown();
    fetchpaycondDropdown();
    if (!open) {
      setTaxLoaded(false);
    }
  }, [open]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);

    if (!open) {
      setOpen(true);
    }
  };

  const loadTaxData = async () => {
    try {
      let apiResponse;

      if (taxType === "SGST") apiResponse = await fetchSGST();
      if (taxType === "CGST") apiResponse = await fetchCGST();
      if (taxType === "IGST") apiResponse = await fetchIGST();

      let list = [];

      if (Array.isArray(apiResponse)) {
        list = apiResponse;
      } else if (Array.isArray(apiResponse?.Data)) {
        list = apiResponse.Data;
      } else if (Array.isArray(apiResponse?.data)) {
        list = apiResponse.data;
      }

      const normalized = list.map((x) => ({
        code: String(x.TAX_CODE || x.TaxCode || x.Code || ""),
        desc: x.DESC || x.Description || "",
        percent: Number(x.PERCENT || x.Percent || x.Rate || 0),
      }));

      setAvailableTaxes(normalized);   // ✅ use same state as dropdown
      setSelectedTaxCode("");          // reset dropdown
    } catch (error) {
      console.error("Failed loading tax list:", error);
      setAvailableTaxes([]);
    }
  };

  const handleAddTax = () => {
    if (!selectedTaxCode) {
      alert("Please select tax");
      return;
    }

    const tax = availableTaxes.find((t) => t.code === selectedTaxCode);

    if (!tax) return;

    const amount = (baseAmount * tax.percent) / 100;
    //const amount = ((baseAmount * tax.percent) / 100).toFixed(2);

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
        amount: amount
      },
    ]);

    setSelectedTaxCode("");
  };

  const handleRemoveTax = (id) => {
    //setAddedTaxes((prev = []) => prev.filter((t) => t.id !== id));
    setAddedTaxes((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRemovePay = (id) => {
    setAddedPays((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAll = () => setAddedTaxes([]);

  
  const handleSave = async () => {

    try {
      const payload = {
        cust_mst_ex: {
          cust_code: formData.code,
          cust_name: formData.name,
          inuse_flag: formData.inuse_flag ? "Y" : "N",
          cust_add1: formData.bankAdd,
          cust_add2: formData.bankAdd1,
          cust_city: formData.city,
          cust_Pin: formData.pin,
          cust_state: formData.state,
          cust_country: formData.country,
          comp_nonComp: formData.comp_nonComp,
          fax: formData.fax,
          phone: formData.phone,
          email: formData.email,
          ecc_code: formData.eccCode,
          category: formData.category,
          exci_range: formData.range,
          division: formData.division,
          commsrate: formData.commissionerate,
          our_vend_cd: formData.supplierCode,
          cust_Type: formData.customerType,
          state_no: formData.vatNo,
          central_no: formData.cstNo,
          trng_flg: formData.trng_flg,
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
          doc_thru: formData.odoc_thru,
          start_dt: formData.startDate,
          expiry_dt: formData.expiryDate,
          nda: formData.nda ? "Y" : "N",
          sman_code: formData.sman_code,
          disc_appl: formData.discountApplicable ? "Y" : "N",
          ctForm: formData.CtForm ? "Y" : "N",
          insurance: formData.insurance,
          ...contactData,
        },

        list_cust_tax_ex: addedTaxes.map((t) => ({
          cusT_CODE: formData.code,
          taX_CODE: t.code,
          taX_AMT: Number(t.amount || 0)
        })),

        list_cust_pay_ex: addedPays.map((p, index) => ({
          cusT_CODE: formData.code,
          pC_CODE: p.code,//Number(p.code || 0),//index + 1,
          percent: p.percent, //Number(p.percent || 0),
          period: p.perioda,
          mode: p.mode,
          dmflag: p.period,
        })),

        cust_factory_det_ex: {
          cust_code: formData.code,
          name: formData.fname,
          add1: formData.fbankAdd,
          add2: formData.fbankAdd1,
          city: formData.fcity,
          state: formData.fstate,
          fax: formData.ffax,
          phone: formData.fphone,
          email: formData.femail,
          mobile: formData.fmobile,
          contact_person: formData.fcontactPerson,
          designation: formData.fdesignation,
          pincode: formData.fpin,
          web_site: formData.fwebsite,
          woff: formData.fweeklyOff,
          gst_no: formData.fgstNo,
          panNo: formData.fpanNo
        }
      };

      console.log("Payload:", payload);

      let result;

      result =
        actionMode === "edit"
          ? await UpdatedCustomerDetail(payload)
          : await saveCustomerDetail(payload);

      alert(result.message || (actionMode === "edit" ? "Customer Updated Successfully*" : "Customer Saved Successfully*"));

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

  const contactData = {};

  contactPersons.forEach((person, index) => {
    const i = index + 1;

    contactData[`contact_person${i}`] = person.name || "";
    contactData[`person_desig${i}`] = person.designation || "";
    contactData[`mobile${i}`] = person.mobile || "";
    contactData[`email${i}`] = person.email || "";
  });
  // handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (actionMode === "new") {
      if (name === "name" && value.length === 1) {
        handleFetchMaxCode(value); // pass value directly
      }
    }
  };

  //checkGSTExists

  let panTimeout;
  let GSTTimeout;

  const [panError, setPanError] = useState("");
  const [GSTError, setGSTError] = useState("");

  const handleChangePan = async (e) => {
    let { name, value } = e.target;

    value = value.toUpperCase();

    if (value.length > 10) return;

    let comp_nonComp = "";
    if (value.length >= 4) {
      const fourthChar = value.charAt(3);
      comp_nonComp =
        fourthChar === "C" || fourthChar === "F"
          ? "COMPANY"
          : "NON-COMPANY";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      comp_nonComp,
    }));

    // Validate only when length reaches 10
    if (value.length === 11) {
      try {
        const res = await checkPanExists(value);
        console.log("PAN API:", res);

        if (
          res?.Message ===
          "Approved, PAN CARD Number NOT EXISTS in database."
        ) {
          setPanError("PAN not exists");
          alert("Please check Pan Card No");
          setFormData((prev) => ({
            ...prev,
            panNo: "",
            comp_nonComp: "",
          }));
        } else {
          setPanError("PAN already exists");
          alert("PanNo exist in database");
        }
      } catch (error) {
        console.error(error);
        setPanError("Error checking PAN");
      }
    } else if (value.length > 0 && value.length < 10) {
      setPanError("PAN must be exactly 10 characters");
    } else {
      setPanError("");
    }
  };

  //GST
  const handleChangeGST = async (e) => {
    let { name, value } = e.target;

    value = value.toUpperCase();

    if (value.length > 15) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    // Validate only when length reaches 10
    if (value.length === 15) {
      try {
        const res = await checkGSTExists(value);
        console.log("GST API:", res);

        if (
          res?.Message ===
          "Approved, GST Number NOT EXISTS in database."
        ) {
          setGSTError("GST not exists");
          alert("Please check GST Card No");
          setFormData((prev) => ({
            ...prev,
            //panNo: "",
            comp_nonComp: "",
          }));
        } else {
          setGSTError("GST");
          alert("GST exist in database");
        }
      } catch (error) {
        console.error(error);
        setGSTError("Error checking GST");
      }
    } else if (value.length > 0 && value.length <= 15) {
      setGSTError("GST must be exactly 15 characters");
    } else {
      setGSTError("");
    }
  };



  const handleContactChange = (index, field, value) => {
    setContactPersons((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addContactRow = () => {
    if (contactPersons.length >= 4) {
      alert("Only 4 contact persons allowed");
      return;
    }

    setContactPersons((prev) => [
      ...prev,
      { name: "", designation: "", mobile: "", email: "" },
    ]);
  };

  const removeContactRow = (index) => {
    setContactPersons((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFetchMaxCode = async (nameValue) => {
    const firstLetter = nameValue.charAt(0).toUpperCase();

    try {
      const res = await getCustomerMaxCode(firstLetter);
      console.log("MaxCode API:", res);

      if (res?.MaxCode) {
        setFormData((prev) => ({
          ...prev,
          code: res.MaxCode,
        }));
      }
    } catch (error) {
      console.error("Error fetching code:", error);
    }
  };

  // 🔹 On load
  useEffect(() => {
    //fetchEmployeeCode();

    // If coming from Edit
    if (location.state?.Cust_code) {
      setActionMode("edit");
      fetchEditData(location.state.Cust_code);
    }
  }, []);


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
            <Span>{actionMode === "edit" ? "Update" : "Save"}</Span>
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
                  disabled={actionMode === "edit"}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <RadioGroup
                  row
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value="D"
                    control={<Radio />}
                    label="Domestic"
                  />
                  <FormControlLabel
                    value="E"
                    control={<Radio />}
                    label="Export"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  select
                  size="small"
                  name="trng_flg"
                  label="Category"
                  fullWidth
                  value={formData.trng_flg}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>

                  {categoryDropdownValue.map((item) => (
                    <MenuItem key={item.code} value={item.type_id}>
                      {item.type_desc} - {item.flag} - {item.type_id}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} md={2}>
                <TextField
                  select
                  size="small"
                  name="zone"
                  label="Zone"
                  fullWidth
                  value={formData.zone}
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>Select ZONE</em></MenuItem>
                  <MenuItem value="NORTH">NORTH</MenuItem>
                  <MenuItem value="EAST">EAST</MenuItem>
                  <MenuItem value="WEST">WEST</MenuItem>
                  <MenuItem value="SOUTH">SOUTH</MenuItem>
                  <MenuItem value="EXPORT">EXPORT</MenuItem>
                  <MenuItem value="CENTER">CENTER</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="inuse_flag"
                      checked={formData.inuse_flag}
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
                      name="CtForm"
                      checked={formData.CtForm}
                      onChange={handleChange}
                    />
                  }
                  label="Merchant Exporter"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  select
                  size="small"
                  name="insurance"
                  label="Insurance"
                  fullWidth
                  value={formData.insurance}
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>Select Insurance</em></MenuItem>
                  <MenuItem value="O">Our</MenuItem>
                  <MenuItem value="Y">Your</MenuItem>
                  <MenuItem value="N">Not Applicable</MenuItem>
                </TextField>
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
                  onFocus={handleFetchMaxCode}
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
                  select
                  size="small"
                  name="comp_nonComp"
                  label="Type"
                  fullWidth
                  value={formData.comp_nonComp}
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>Select Type</em></MenuItem>
                  <MenuItem value="COMPANY">COMPANY</MenuItem>
                  <MenuItem value="NON-COMPANY">NON-COMPANY</MenuItem>
                </TextField>
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
                {/* <TextField
                  size="small"
                  name="country"
                  label="Country"
                  fullWidth
                  value={formData.country}
                  onChange={handleChange}
                /> */}
                <TextField
                  select
                  size="small"
                  name="country"
                  label="Country"
                  fullWidth
                  value={formData.country}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select Country</em>
                  </MenuItem>

                  {countryDropdownValue.map((item) => (
                    <MenuItem key={item.country_code} value={item.country_code}>
                      {item.country_code} | {item.country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                {/* <TextField
                  size="small"
                  name="district"
                  label="District"
                  fullWidth
                  value={formData.district}
                  onChange={handleChange}
                /> */}
                <TextField
                  select
                  size="small"
                  name="district"
                  label="District"
                  fullWidth
                  value={formData.district}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select District</em>
                  </MenuItem>

                  {districtDropdownValue.map((item) => (
                    <MenuItem key={item.District_cd} value={item.District_cd}>
                      {item.District_cd} | {item.District_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Row 6 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="panNo"
                  label="PAN No"
                  fullWidth
                  value={formData.panNo}
                  onChange={handleChangePan}
                  inputProps={{ maxLength: 10 }} // 👈 restrict typing
                />
              </Grid>

              <Grid item xs={12} md={4}>

                <TextField
                  select
                  size="small"
                  name="state"
                  label="State"
                  fullWidth
                  value={formData.state}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select State</em>
                  </MenuItem>

                  {stateDropdownValue.map((item) => (
                    <MenuItem key={item.state_code} value={item.state_code}>
                      {item.state_code} | {item.State}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Row 7 */}
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  name="gstNo"
                  label="GST No"
                  fullWidth
                  value={formData.gstNo}
                  onChange={handleChangeGST}
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
                {/* <TextField
                  size="small"
                  name="industryType"
                  label="Industry Type"
                  fullWidth
                  value={formData.industryType}
                  onChange={handleChange}
                /> */}
                <TextField
                  select
                  size="small"
                  name="industryType"
                  label="Industry Type"
                  fullWidth
                  value={formData.industryType}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select industryType</em>
                  </MenuItem>

                  {industrytypeDropdownValue.map((item) => (
                    <MenuItem key={item.Industry_name} value={item.Industry_name}>
                      {item.Industry_name}
                    </MenuItem>
                  ))}
                </TextField>
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
                      <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                          {/* <RadioGroup
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
                          </RadioGroup> */}
                          <RadioGroup
                            value={taxType}
                            onChange={(e) => setTaxType(e.target.value)}
                          >
                            <FormControlLabel value="SGST" control={<Radio />} label="SGST" />
                            <FormControlLabel value="CGST" control={<Radio />} label="CGST" />
                            <FormControlLabel value="IGST" control={<Radio />} label="IGST" />
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
                        <Stack direction="row" spacing={2}>
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
                          >
                            Clear All
                          </Button>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">
                                <strong>Tax Code</strong>
                              </TableCell>
                              <TableCell align="center">
                                <strong>Tax Type</strong>
                              </TableCell>
                              <TableCell align="center">
                                <strong>Amount</strong>
                              </TableCell>
                              <TableCell align="center">
                                <strong>Action</strong>
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {addedTaxes.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} align="center">
                                  No tax added
                                </TableCell>
                              </TableRow>
                            ) : (
                              // (addedTaxes || []).map((t) => (
                              addedTaxes.map((t) => (
                                <TableRow key={t.id}>
                                  <TableCell align="center">{t.code}</TableCell>
                                  <TableCell align="center">{t.type}</TableCell>
                                  <TableCell align="right">{t.amount}</TableCell>
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
                        <TextField
                          label="Percentage"
                          size="small"
                          fullWidth
                          value={payPercent}
                          onChange={(e) => setPayPercent(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        {/* <TextField
                          label="Description"
                          size="small"
                          fullWidth
                          value={payDesc}
                          onChange={(e) => setPayDesc(e.target.value)}
                        /> */}
                        <TextField
                          select
                          size="small"
                          label="Description"
                          fullWidth
                          value={payCode}
                          onChange={(e) => {
                            const selected = paycondDropdownValue.find(
                              (item) => item.PC_CODE === e.target.value
                            );

                            setPayCode(selected?.PC_CODE || "");
                            setPayDesc(selected?.PCDESC || "");
                          }}
                        >
                          <MenuItem value="">
                            <em>Select Description</em>
                          </MenuItem>

                          {paycondDropdownValue.map((item) => (
                            <MenuItem key={item.PC_CODE} value={item.PC_CODE}>
                              {item.PC_CODE} | {item.PCDESC}
                            </MenuItem>
                          ))}
                        </TextField>

                      </Grid>

                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="pay-mode-label">Payment Mode</InputLabel>

                          <Select
                            id="pay-mode"
                            labelId="pay-mode-label"
                            value={payMode}
                            label="Payment Mode"
                            onChange={(e) => setPayMode(e.target.value)}
                          >
                            <MenuItem value="">
                              <em>Select Mode</em>
                            </MenuItem>

                            <MenuItem value="I">Immediate</MenuItem>
                            <MenuItem value="W">Within</MenuItem>
                            <MenuItem value="A">After</MenuItem>
                            <MenuItem value="B">Before</MenuItem>
                          </Select>

                        </FormControl>
                      </Grid>

                      <Grid item md={3}>
                        <TextField
                          Number
                          label="Period"
                          size="small"
                          fullWidth
                          value={payperioda}
                          onChange={(e) => setPayperioda(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <TextField
                          select
                          label="dmflag"
                          size="small"
                          fullWidth
                          value={payPeriod}
                          onChange={(e) => setPayPeriod(e.target.value)}
                        >
                          <MenuItem value="D">Days</MenuItem>
                          <MenuItem value="M">Months</MenuItem>
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddPay}
                          sx={{ mr: 2 }}
                        >
                          ADD
                        </Button>

                        <Button variant="contained" color="error">
                          REMOVE
                        </Button>
                      </Grid>

                      <Grid item xs={12}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Percentage</TableCell>
                              <TableCell>PC Code</TableCell>
                              <TableCell>Mode</TableCell>
                              <TableCell>Period</TableCell>
                              <TableCell>Dm Flag</TableCell>
                              <TableCell align="center">Action</TableCell>

                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {addedPays.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={5} align="center">
                                  No payment added
                                </TableCell>
                              </TableRow>
                            ) : (
                              addedPays.map((p) => (
                                <TableRow key={p.id}>
                                  <TableCell>{p.percent}</TableCell>
                                  <TableCell>{p.code}</TableCell>
                                  <TableCell>{p.mode}</TableCell>
                                  <TableCell>{p.perioda}</TableCell>
                                  <TableCell>{p.period}</TableCell>

                                  <TableCell align="center">
                                    <Button
                                      size="small"
                                      color="error"
                                      onClick={() => handleRemovePay(p.id)}
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
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
                            id="category-other"
                            labelId="category-other-label"
                            label="Category"
                            name="category"
                            value={formData.category ?? ""}
                            onChange={handleChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Wholesale Dealer">Wholesale Dealer</MenuItem>
                            <MenuItem value="Industrial Consumer">Industrial Consumer</MenuItem>
                            <MenuItem value="Government">Government</MenuItem>
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
                        <FormControl fullWidth size="small">
                          <InputLabel id="doc-label">
                            Document Through
                          </InputLabel>
                          <Select
                            labelId="doc-label"
                            label="Document Through"
                            name="odoc_thru"
                            value={formData.odoc_thru}
                            onChange={handleChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Bank">Bank</MenuItem>
                            <MenuItem value="Direct">Direct</MenuItem>
                            <MenuItem value="Dealer">Dealer</MenuItem>
                            <MenuItem value="Office">Office</MenuItem>
                          </Select>
                        </FormControl>
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
                            <MenuItem value="MONDAY">MONDAY</MenuItem>
                            <MenuItem value="TUESDAY">TUESDAY</MenuItem>
                            <MenuItem value="WEDNESDAY">WEDNESDAY</MenuItem>
                            <MenuItem value="THURSDAY">THURSDAY</MenuItem>
                            <MenuItem value="FRIDAY">FRIDAY</MenuItem>
                            <MenuItem value="SATURDAY">SATURDAY</MenuItem>
                            <MenuItem value="SUNDAY">SUNDAY</MenuItem>
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
                          name="sman_code"
                          size="small"
                          fullWidth
                          value={formData.sman_code || ""}
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
                                <strong>Cont Person</strong>
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
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={() =>
                                        removeContactRow(idx)
                                      }
                                    >
                                      <Icon color="error">delete</Icon>
                                    </IconButton>
                                  </Tooltip>
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
                          name="fname"
                          label="Name"
                          fullWidth
                          value={formData.fname}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fbankAdd"
                          label="Address"
                          fullWidth
                          value={formData.fbankAdd}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fbankAdd1"
                          label="Address 1"
                          fullWidth
                          value={formData.fbankAdd1}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fcity"
                          label="City"
                          fullWidth
                          value={formData.fcity}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fpin"
                          label="Pin Code"
                          fullWidth
                          value={formData.fpin}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        {/* <TextField
                          size="small"
                          name="state"
                          label="State"
                          fullWidth
                          value={formData.state}
                          onChange={handleChange}
                        /> */}
                        <TextField
                          select
                          size="small"
                          name="fstate"
                          label="State"
                          fullWidth
                          value={formData.fstate}
                          onChange={handleChange}
                        >
                          <MenuItem value="">
                            <em>Select State</em>
                          </MenuItem>

                          {stateDropdownValue.map((item) => (
                            <MenuItem key={item.state_code} value={item.state_code}>
                              {item.state_code} | {item.State}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="ffax"
                          label="Fax"
                          fullWidth
                          value={formData.ffax}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fphone"
                          label="Phone"
                          fullWidth
                          value={formData.fphone}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="femail"
                          label="Email"
                          fullWidth
                          value={formData.femail}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fmobile"
                          label="Mobile"
                          fullWidth
                          value={formData.fmobile}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fcontactPerson"
                          label="Contact Person"
                          fullWidth
                          value={formData.fcontactPerson}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fdesignation"
                          label="Designation"
                          fullWidth
                          value={formData.fdesignation}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fwebsite"
                          label="Web Site"
                          fullWidth
                          value={formData.fwebsite}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Weekly Off</InputLabel>
                          <Select
                            name="fweeklyOff"
                            label="Weekly Off"
                            value={formData.fweeklyOff || ""}
                            onChange={handleChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="MONDAY">MONDAY</MenuItem>
                            <MenuItem value="TUESDAY">TUESDAY</MenuItem>
                            <MenuItem value="WEDNESDAY">WEDNESDAY</MenuItem>
                            <MenuItem value="THURSDAY">THURSDAY</MenuItem>
                            <MenuItem value="FRIDAY">FRIDAY</MenuItem>
                            <MenuItem value="SATURDAY">SATURDAY</MenuItem>
                            <MenuItem value="SUNDAY">SUNDAY</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fpanNo"
                          label="PAN No"
                          fullWidth
                          value={formData.fpanNo}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          size="small"
                          name="fgstNo"
                          label="GST No"
                          fullWidth
                          value={formData.fgstNo}
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
          </form>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerDetailForm;

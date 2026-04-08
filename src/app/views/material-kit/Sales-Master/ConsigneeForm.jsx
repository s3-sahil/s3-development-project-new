import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
//import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
//import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import {
  ConsigneeDetailsEdit,
  ConsigneeFormSAVE,
  fetch_state,
  fetchCustomerList
} from "app/utils/authServices";
import { number } from "echarts";
import { useParams, useLocation } from "react-router-dom";


const ConsigneeForm = () => {
  const [formData, setFormData] = useState({
    cust_code: "",
    cname: "",
     con_code: "",   // ✅ FIX
    name: "",
    cadd1: "",
    ccity: "",
    cpin: "",
    ccountry: "",
    cstate: "",
    cPan_no: "",
    cEcc_code: "",
    cState_no: "",
    cCentral_no: "",
    contact_person: "",
    phone: "",
    Nfax: "",
    gst_no: "",
    distance_km: "",
    cEmail: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "cust_code") {
    const selectedCustomer = customerDropdownValue.find(
      (item) => item.Cust_code === value
    );

    setFormData((prev) => ({
      ...prev,
      cust_code: value,
      name: selectedCustomer ? selectedCustomer.Cust_name : "",
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const { cust_code, con_code } = useParams();


  const navigate = useNavigate();
  const location = useLocation(); // for edit data
  //const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [actionMode, setActionMode] = useState("new"); // new | edit
  const [loading, setLoading] = useState(false);
  const [customerDropdownValue, setCustomerDropdownValue] = useState([]);
  const [stateDropdownValue, setstateDropdownValue] = useState([]);
  
  // 🔹 Save (Add / Update)
  const handleSave = async () => {
    if (
      !formData.cust_code ||
      !formData.con_code
    ) {
      alert("Please fill all required fields");
      return;
    }

    //const nameParts = formData.consigneeCode.trim().split(" ");

    // const payload = {
    //   formData
    // };

    try {
      setLoading(true);

      await ConsigneeFormSAVE(formData); // same API for add/update

      alert(
        actionMode === "edit"
          ? "consignee updated successfully!"
          : "consignee added successfully!"
      );

      navigate("/material/sales-consignee-table"); // go back to table
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save Consignee Form");
    } finally {
      setLoading(false);
    }
  };

    // 🔹 If Edit mode, fetch full record
    const fetchEditData = async (cust_code, Con_code) => {
      try {
        const res = await ConsigneeDetailsEdit(cust_code, Con_code);
  
        if (res?.data) {
          const data = res.data; 
          debugger 
          setFormData({
                        cust_code: data.cust_code,
                        name: "-",//data.cname,               
                        con_code: data.con_code,       
                        cname: data.cname,
                        cadd1: data.cadd1,
                        ccity: data.ccity,
                        cpin: data.cpin,
                        ccountry: data.ccountry,
                        cstate: data.cstate,
                        cPan_no: data.cpan_no,
                        cEcc_code: data.cecc_code,
                        cState_no: data.cstate_no,
                        cCentral_no: data.ccentral_no,
                        contact_person: data.contact_person,
                        phone: data.phone,
                        fax: data.nfax,
                        gst_no: data.gst_no,
                        distance_km: data.distance_km,
                        cEmail: data.cemail,
                        pre_carrier: data.pre_carrier,
                        portofloading: data.portofloading,
                        portofdischarge: data.portofdischarge,
                        placeofdelivery: data.placeofdelivery,
                        placeofrec: data.placeofrec,
                        cadd2: data.cadd2,
                        cPhone: data.cphone,
                        cExci_range: data.cexci_range,
                        cDivision: data.cdivision,
                        cCommsrate: data.ccommsrate,
                        NName: data.nname,
                        Nadd1: data.nadd1,
                        Nadd2: data.nadd2,
                        Ncity: data.ncity,
                        Npin: data.npin,
                        Ncountry: data.ncountry,
                        Ncontact_person: data.ncontact_person,
                        Nphone: data.nphone,
                        cfax: data.cfax
                      });
        }
      } catch (error) {
        console.error("Edit fetch error:", error);
      }
    };

  // Customer dropdown
  const fetchCustomerDropdown = async () => {
    try {
      const res = await fetchCustomerList();

      setCustomerDropdownValue(res || []);
    } catch (error) {
      console.error("Customer fetch error:", error);
      setCustomerDropdownValue([]);
    }
  };

  
  // Customer dropdown
  const fetchstateDropdown = async () => {
    try {
      const res = await fetch_state();

      setstateDropdownValue(res || []);
    } catch (error) {
      console.error("State fetch error:", error);
      setstateDropdownValue([]);
    }
  };
  //   // 🔹 On load
  // useEffect(() => {

  //   // If coming from Edit
  //   if (location.state?.cust_code && location.state?.Con_code) {
  //     setActionMode("edit");
  //     fetchEditData(location.state.cust_code,location.state.Con_code);
  //   }
  // }, []);

    useEffect(() => {
      const finalCustCode = cust_code || location.state?.cust_code;
      const finalConCode = con_code || location.state?.con_code;
    fetchCustomerDropdown();
    fetchstateDropdown();


      if (finalCustCode && finalConCode) {
        setActionMode("edit");
        fetchEditData(finalCustCode, finalConCode);
      }
    }, [cust_code, con_code, location.state]);



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
           <Span>{actionMode === "edit" ? "Update" : "Save"}</Span>
        </Button>
      </Box>

      <Grid container spacing={2}>
        {/* <Grid item xs={3}>
          <TextField
            label="Customer Code"
            name="cust_code"
            //value={formData.cust_code}
            value={formData.category}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid> */}


              <Grid item xs={12} md={2}>
                <TextField
                  select
                  size="small"
                  name="cust_code"
                   label="Customer Code"
            value={formData.cust_code}
                  fullWidth
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select Customer</em>
                  </MenuItem>

                  {customerDropdownValue.map((item) => (
                    <MenuItem key={item.Cust_code} value={item.Cust_code}>
                      {item.Cust_code} | {item.Cust_name} 
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>


        <Grid item xs={9}>
          <TextField
            label="Customer Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Consignee Code"
            name="con_code"
             value={formData.con_code || ""}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Name"
            name="cname"
            value={formData.cname}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            name="cadd1"
            value={formData.cadd1}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="City"
            name="ccity"
            value={formData.ccity}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Pin"
            name="cpin"
            value={formData.cpin}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Country"
            name="ccountry"
            value={formData.ccountry}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        {/* <Grid item xs={6}>
          <TextField
            label="State"
            name="cstate"
            value={formData.cstate}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid> */}

               <Grid item xs={12} md={2}>
                <TextField
                  select
                  size="small"
                  name="cstate"
                   label="State"
            value={formData.cstate}
                  fullWidth
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



        <Grid item xs={6}>
          <TextField
            label="PAN No"
            name="cPan_no"
            value={formData.cPan_no}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="ECC Code"
            name="cEcc_code"
            value={formData.cEcc_code}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="State No"
            name="cState_no"
            value={formData.cState_no}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Central No"
            name="cCentral_no"
            value={formData.cCentral_no}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Contact Person"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Mobile"
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
            name="Nfax"
            value={formData.fax}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="GST No / Tax ID"
            name="gst_no"
            value={formData.gst_no}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Distance in km"
            name="distance_km"
            value={formData.distance_km}
            onChange={handleChange}
            type="number"
            size="small"
            fullWidth
            slotProps={{ htmlInput: { min: 1 } }}
            onKeyDown={(e) => {
                                if (e.key === "-" || e.key === "e") {
                                  e.preventDefault();
                                }
                              }
                      }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            name="cEmail"
            value={formData.cEmail}
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

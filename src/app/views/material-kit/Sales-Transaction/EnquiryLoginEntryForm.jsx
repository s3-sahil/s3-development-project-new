import {
  Box,
  Container,
  TextField,
  MenuItem,
  Button,
  Icon,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { addEnquiry } from "app/utils/salesTransactionServices";
import { useLocation } from "react-router-dom";

const EnquiryLoginEntryForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    enq_no: "",
    cust_code: "",
    cust_name: "",
    cust_add1: "",
    cust_add2: "",
    cust_city: "",
    cust_state: "",
    cust_country: "",
    cust_pin: "",
    phone: "",
    fax: "",
    email: "",
    emp_name: "",
    enq_type: "",
    source_name: "",
    cont_per: "",
    cont_des: "",
    industry_name: "",
  });

  // 🔹 Item State
  const [itemData, setItemData] = useState({
    item_Code: "",
    item_name: "",
    quantity: 0,
    enq_uom: "",
    cust_item_code: "",
    drg_no: "",
    drg_Rev_no: "",
    application: "",
    physibility: "",
    additoinal_rem: "",
  });

  useEffect(() => {
  const fetchEditData = async () => {
    try {
      if (location.state) {
        const { Enq_no, Enq_dt, profcen_cd } = location.state;

        const res = await getEnquiryById(
          Enq_no,
          Enq_dt,
          profcen_cd
        );

        console.log("Edit API Data 👉", res);

        if (res?.Data) {
          const hed = res.Data.Enquiry_hed_ex;
          const det = res.Data.List_Enquiry_det_ex?.[0];

          // ✅ Set Header Data
          setFormData({
            enq_no: hed.Enq_no || "",
            cust_code: hed.Cust_code || "",
            cust_name: hed.Cust_name || "",
            cust_add1: hed.Cust_add1 || "",
            cust_city: hed.Cust_city || "",
            cust_state: hed.Cust_state || "",
            cust_country: hed.Cust_country || "",
            cust_pin: hed.Cust_pin || "",
            phone: hed.Phone || "",
            email: hed.Email || "",
            emp_name: hed.Emp_name || "",
            enq_type: hed.Enq_type || "",
            source_name: hed.Source_name || "",
            cont_per: hed.cont_per || "",
            cont_des: hed.cont_des || "",
            industry_name: hed.Industry_name || "",
          });

          // ✅ Set Item Data
          setItemData({
            item_Code: det?.Item_Code || "",
            item_name: det?.Item_name || "",
            quantity: det?.Quantity || 0,
            enq_uom: det?.enq_uom || "",
            cust_item_code: det?.Cust_item_code || "",
            drg_no: det?.Drg_no || "",
            drg_Rev_no: det?.Drg_Rev_no || "",
            application: det?.Application || "",
            additoinal_rem: det?.Additoinal_rem || "",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchEditData();
}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

 const handleSave = async () => {
  try {
    const currentDate = new Date().toISOString();

    const payload = {
      enquiry_hed_ex: {
        enq_no: formData.enq_no || "AUTO",
        enq_dt: currentDate,
        cust_code: formData.cust_code || "",
        cust_name: formData.cust_name || "",
        cust_add1: formData.cust_add1 || "",
        cust_add2: formData.cust_add2 || "",
        cust_city: formData.cust_city || "",
        cust_state: formData.cust_state || "",
        cust_country: formData.cust_country || "",
        cust_pin: formData.cust_pin || "",
        fax: formData.fax || "",
        phone: formData.phone || "",
        email: formData.email || "",
        ref_no: "",
        ref_dt: currentDate,
        emp_name: formData.emp_name || "",
        enq_type: formData.enq_type || "",
        cont_per: formData.cont_per || "",
        cont_des: formData.cont_des || "",
        enq_close: "N",
        product_position: "",
        business_type: "",
        cust_spec: "",
        pack_dtl: "",
        agency_certi: "N",
        tooling_costby: "",
        remarks: "",
        std: "",
        prod_spec: "",
        profcen_cd: "01",
        user_name: "admin",
        userdate: currentDate,
        trng_flg: "N",
        source_name: formData.source_name || "",
        industry_name: formData.industry_name || "",
      },

      list_Enquiry_det_ex: [
        {
          enq_no: formData.enq_no || "AUTO",
          enq_dt: currentDate,
          item_name: itemData.item_name || "",
          item_Code: itemData.item_Code || "",
          cust_item_code: itemData.cust_item_code || "",
          drg_no: itemData.drg_no || "",
          drg_Rev_no: itemData.drg_Rev_no || "",
          final_process: "",
          quantity: Number(itemData.quantity) || 0,
          physibility: "Y",
          costing_dt: currentDate,
          costing_no: "",
          quot_dt: currentDate,
          quot_no: "",
          po_dt: currentDate,
          po_no: "",
          sample_dt: currentDate,
          first_disp: currentDate,
          ap_status: "N",
          status: "N",
          cust_draw: "",
          revision_no: "",
          revision_date: currentDate,
          sample_size: "",
          consignment_size: "",
          annu_req: 0,
          surface_treat: "",
          mat_spec: "",
          sr_no: 1,
          drg_rev_dt: currentDate,
          profcen_cd: "01",
          physibility_res: "",
          mcAllowSurface: "",
          forg_method: "",
          gross_wt: 0,
          input_wt: 0,
          net_wt: 0,
          wt_uom: "",
          complex_factor: "",
          forg_unit: "",
          alt_forg_unit: "",
          parting_line: "",
          dia_bl_size: "",
          op_seq: "",
          prod_rate: "",
          post_opns: "",
          coining_det: "",
          prod_rate_coining: "",
          machine_Det: "",
          stamp_logo_Det: "",
          drawing_app: "",
          forg_samp_req: "",
          additoinal_rem: itemData.additoinal_rem || "",
          apprx_lead_time: "",
          disc_resolved: "",
          parT_B_DT: currentDate,
          parT_C_DT: currentDate,
          disc_Partc: "",
          disc_resolved_C: "",
          avl_raw_mat: "",
          part_no: "",
          od: 0,
          id: 0,
          length: 0,
          density: 0,
          tollerence: 0,
          item_Catg: "",
          iTemcatg_uom: "",
          prodpo_no: "",
          prodpo_dt: currentDate,
          enq_uom: itemData.enq_uom || "",
          fG_Catg: "",
          application: itemData.application || "",
        },
      ],

      list_Enquiry_det_Operation_ex: [
        {
          enq_no: formData.enq_no || "AUTO",
          enq_dt: currentDate,
          item_name: itemData.item_name || "",
          item_Code: itemData.item_Code || "",
          profcen_cd: "01",
          op_code: "",
        },
      ],
    };

    console.log("FINAL PAYLOAD 👉", payload);

    const res = await addEnquiry(payload);

    alert(res?.Message || "Saved Successfully ✅");
  } catch (error) {
    console.error(error);
    alert(error.message || "Error ❌");
  }
};

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Sales" }, { name: "Enquiry Login Entry" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Top Row */}
        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
          <TextField
            label="Marketing By"
            name="emp_name"
            onChange={handleChange}
          />

          <TextField label="Type" name="enq_type" onChange={handleChange} />

          <TextField
            label="Source"
            name="source_name"
            onChange={handleChange}
          />

          <TextField label="Enquiry No" name="enq_no" onChange={handleChange} />

          <TextField type="date" name="enq_dt" onChange={handleChange} />
        </Box>

        {/* Customer Info */}
        <Box mt={2} display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
          <TextField
            label="Customer Code"
            name="cust_code"
            onChange={handleChange}
          />
          <TextField
            label="Customer Name"
            name="cust_name"
            onChange={handleChange}
          />
          <TextField label="Address" name="cust_add1" onChange={handleChange} />
          <TextField label="City" name="cust_city" onChange={handleChange} />
          <TextField label="Pincode" name="cust_pin" onChange={handleChange} />
          <TextField label="State" name="cust_state" onChange={handleChange} />
          <TextField
            label="Country"
            name="cust_country"
            onChange={handleChange}
          />
          <TextField label="Phone" name="phone" onChange={handleChange} />
          <TextField label="Email" name="email" onChange={handleChange} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Item Section */}
        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
          <TextField
            label="Item Code"
            name="item_Code"
            onChange={handleItemChange}
          />
          <TextField
            label="Item Name"
            name="item_name"
            onChange={handleItemChange}
          />
          <TextField
            label="Quantity"
            name="quantity"
            onChange={handleItemChange}
          />
          <TextField label="UOM" name="enq_uom" onChange={handleItemChange} />
          <TextField
            label="Drawing No"
            name="drg_no"
            onChange={handleItemChange}
          />
          <TextField
            label="Application"
            name="application"
            onChange={handleItemChange}
          />
          <TextField
            label="Remark"
            name="additoinal_rem"
            onChange={handleItemChange}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="contained" color="secondary">
            Add Item
          </Button>
          <Button variant="contained" color="secondary">
            Remove Item
          </Button>
          <Button variant="contained" color="secondary">
            Other Detail
          </Button>
        </Box>
        {/* Save */}
        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EnquiryLoginEntryForm;

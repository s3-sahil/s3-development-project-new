import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Divider,
  Grid,
  Card,
  Stack,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";

import InvoiceTaxDetailsModal from "./InvoiceTaxDetailsModal";
import InvoicePaymentModal from "./InvoicePaymentModal";
import InvoiceOtherDetailsModal from "./InvoiceOtherDetailsModal";
import InvoiceGSTDetailsModal from "./InvoiceGSTDetailsModal";
import { addInvoice } from "app/utils/authServices";
import { DataGrid } from "@mui/x-data-grid";
import InvoiceTransporterModal from "./InvoiceTransporterModal";
import InvoiceGSTModal from "./InvoiceGSTModal";
import { fetchPackingAndSubType } from "app/utils/salesTransactionServices";

const InvoiceForm = () => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openTax, setOpenTax] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const [openGST, setOpenGST] = useState(false);
  const [openTransport, setOpenTransport] = useState(false);
  const [transportDetails, setTransportDetails] = useState({});
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [taxDetails, setTaxDetails] = useState([]);
  const [otherDetails, setOtherDetails] = useState({});
  const [gstDetails, setGstDetails] = useState({});
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [gstData, setGstData] = useState({});

  const [packingList, setPackingList] = useState([]);
  const [invoiceTypeList, setInvoiceTypeList] = useState([]);
  const [filteredSubTypes, setFilteredSubTypes] = useState([]);

  const [formData, setFormData] = useState({
    invoiceType: "",
    invoiceSubType: "",
    packingNo: "",
    invoiceDate: "",
    customerCode: "",
    invoiceNo: "",
    customerName: "",
    poLogin: "",
    poNo: "",
    remark: "",

    itemCode: "",
    quantity: "",
    uom: "",
    customerItemCode: "",
    rate: "",
    amount: "",
    currency: "",
    weight: "",
    discountPer: "",
    discountAmt: "",
    netAmt: "",

    basicAmt: "",
    cashDiscount: "",
    traderDiscount: "",
    dealerDiscount: "",
    totalAmt: "",
    packingAmt: "",
    netTotal: "",

    ewayBillNo: "",
    ewayBillDate: "",
    irnNo: "",
    ackNo: "",
    ackDate: "",
    transporterGST: "",
    vehicleNo: "",
    transportMode: "",
  });

  useEffect(() => {
    loadPackingData();
  }, []);

  useEffect(() => {
    if (!formData.invoiceType) {
      setFilteredSubTypes([]);
      return;
    }

    const filtered = packingList.filter(
      (item) =>
        item.INV_TYPE?.toUpperCase() === formData.invoiceType?.toUpperCase(),
    );

    setFilteredSubTypes(filtered);

    // reset subtype
    setFormData((prev) => ({
      ...prev,
      invoiceSubType: "",
    }));
  }, [formData.invoiceType, packingList]);

  const loadPackingData = async () => {
    try {
      const res = await fetchPackingAndSubType(
        localStorage.getItem("login_name"),
      );

      const list = res?.Data || [];

      setPackingList(list);

      // UNIQUE invoice types
      const uniqueTypes = [...new Set(list.map((item) => item.INV_TYPE))];

      setInvoiceTypeList(uniqueTypes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    // if (!formData.itemCode || !formData.quantity) {
    //   alert("Item Code and Quantity required");
    //   return;
    // }

    const newItem = {
      itemCode: formData.itemCode,
      quantity: Number(formData.quantity || 0),
      uom: formData.uom,
      customerItemCode: formData.customerItemCode,
      rate: Number(formData.rate || 0),
      amount: Number(formData.amount || 0),
      discountPer: Number(formData.discountPer || 0),
      discountAmt: Number(formData.discountAmt || 0),
      netAmount: Number(formData.netAmt || 0),
    };

    setInvoiceItems((prev) => [...prev, newItem]);

    setFormData((prev) => ({
      ...prev,
      itemCode: "",
      quantity: "",
      uom: "",
      customerItemCode: "",
      rate: "",
      amount: "",
      discountPer: "",
      discountAmt: "",
      netAmt: "",
    }));
  };

  const handleSaveInvoice = async () => {
    try {
      // if (!formData.invoiceNo) {
      //   alert("Invoice Number required");
      //   return;
      // }

      // if (invoiceItems.length === 0) {
      //   alert("Add at least one item");
      //   return;
      // }

      const invoiceNo = formData.invoiceNo;
      const invoiceDate = formData.invoiceDate
        ? new Date(formData.invoiceDate).toISOString()
        : new Date().toISOString();

      const userName = "ADMIN";

      const payload = {
        invoicE_HED_ex: {
          inV_TYPE: formData.invoiceType || "",
          saleS_TYPE: formData.invoiceSubType || "",
          inV_NO: invoiceNo,
          inV_DT: invoiceDate,
          pO_DT: invoiceDate,
          cusT_CODE: formData.customerCode || "",
          consiN_NAME: formData.customerName || "",
          consiN_ADD1: "",
          consiN_ADD2: "",
          consiN_CITY: "",
          consiN_PIN: "",
          consiN_COUNTRY: "",
          consiN_STATE: "",
          consiN_TEL: "",
          transporteR_CODE: "",
          transporT_AMT: 0,
          vehiclE_NO: formData.vehicleNo || "",
          deleverY_BY: formData.transportMode || "",
          tarifF_CODE: "",
          transport: "",
          f357_NO: "",
          f357_DT: invoiceDate,
          d3_NO: "",
          d3_DT: invoiceDate,
          octroi: "",
          disC_PER: Number(formData.discountPer || 0),
          disC_AMT: Number(formData.discountAmt || 0),
          totaL_AMT: Number(formData.totalAmt || 0),
          neT_AMT: Number(formData.netTotal || 0),
          plA_NO: 0,
          plA_AMT: 0,
          removaL_DT: invoiceDate,
          removaL_TIME: invoiceDate,
          emP_NO: "",
          remark: formData.remark || "",
          interesT_AMT: 0,
          packinG_WT: Number(formData.weight || 0),
          tranS_MODE: formData.transportMode || "",
          pacK_AMT: Number(formData.packingAmt || 0),
          issuE_DATE: invoiceDate,
          issuE_TIME: invoiceDate,
          naturE_REMOVAL: "",
          gC_NO: "",
          gC_DATE: invoiceDate,
          packinG_DETAILS: "",
          inspectioN_NO: "",
          laB_NO: otherDetails?.labReport || "",
          olD_INV: "",
          olD_INVDT: invoiceDate,
          authorised: 0,
          prinT_FLG: "",
          pO_ID: formData.poLogin || "",
          insurance: otherDetails?.insurance || "",
          profcen_cd: profcen_cd,
          user_name: userName,
          po_no: formData.poNo || "",
          po_no_dt: invoiceDate,
          po_amd_no: "",
          po_amd_date: invoiceDate,
          trip_no: 0,
          ratE_UOM: "",
          other_charges: 0,
          addExc_amt: 0,
          addCess_Amt: 0,
          addHCess_Amt: 0,
          stax_Amt: 0,
          warrantyFlg: "",
          warr_Period: 0,
          warr_DMY: "",
          warr_clause: "",
          conv_rate: 0,
          trader_disc: Number(formData.traderDiscount || 0),
          abatment: 0,
          lr_no: "",
          lr_dt: invoiceDate,
          reF_NO: "",
          reF_dt: invoiceDate,
          trans_name: "",
          depo_Cd: "",
          uT1_no: "",
          uT1_date: invoiceDate,
          valid_date: invoiceDate,
          epcg: "",
          advance: "",
          annex_45: "",
          dbk: "",
          licence_not_appl: "",
          bE_no: "",
          bE_date: invoiceDate,
          shipping_no: "",
          shipping_date: invoiceDate,
          arE1_no: "",
          cust_approval: "",
          are_type: "",
          invREcd: "",
          pslipREcd: "",
          sdfrEcd: "",
          excInvREcd: "",
          are1REcd: "",
          airBillREcd: "",
          seaBillREcd: "",
          exchangecopyREcd: "",
          epCopyREcd: "",
          matREcd: "",
          bankRefNo: "",
          bankDt: invoiceDate,
          exp_remark: "",
          remDt: invoiceDate,
          cha_code: "",
          e_inv_dt: invoiceDate,
          e_inv_no: "",
          asnDone: "",
          letDate: invoiceDate,
          custClear: invoiceDate,
          mateRecd: "",
          billOfLad: "",
          airBill: "",
          net_amtW: "",
          excise_amtW: "",
          cess_amtW: "",
          hcess_amtW: "",
          net_amtw_InCurrency: "",
          discAmount: Number(formData.cashDiscount || 0),
          airBillDt: invoiceDate,
          billLadDt: invoiceDate,
          dbkjV_no: "",
          proof_of_exp: invoiceDate,
          meis: "",
          rbi_curr_rate: 0,
          rbi_curr_diff: 0,
          invAmt: 0,
          rabate_no: "",
          nform_no: "",
          nform_dt: invoiceDate,
          excise_submission_no: "",
          consignee_cd: "",
          ewayBill_no: formData.ewayBillNo || "",
          cgst_amt: Number(gstDetails?.cgstAmt || 0),
          sgst_amt: Number(gstDetails?.sgstAmt || 0),
          igst_amt: Number(gstDetails?.igstAmt || 0),
          sgstper: Number(gstDetails?.gstRate || 0) / 2,
          cgstper: Number(gstDetails?.gstRate || 0) / 2,
          igstper: Number(gstDetails?.gstRate || 0),
          gstno: gstDetails?.gstNo || "",
          porT_CODE: "",
          con_name: "",
          con_add1: "",
          con_add2: "",
          con_city: "",
          con_pin: "",
          con_country: "",
          con_state: "",
          packing_CIF: 0,
          insurance_CIF: 0,
          name_of_signatory: "",
          warr_Period1: 0,
          warrCondt1: "",
          warrCondt2: "",
          warr_DMY1: "",
          brc_no: "",
          brc_dt: invoiceDate,
          con_gstno: "",
          con_contactPer: "",
          con_email: "",
          coN_PHONE: "",
          ewayBill_Date: formData.ewayBillDate
            ? new Date(formData.ewayBillDate).toISOString()
            : invoiceDate,
          brc_no1: "",
          brc_dt1: invoiceDate,
          brc_no2: "",
          brc_dt2: invoiceDate,
          con_Pan_no: "",
          con_fax: "",
          approval_flag: "",
          app_date: invoiceDate,
          app_by: "",
          irN_NO: formData.irnNo || "",
          ack_no: formData.ackNo || "",
          ack_date: formData.ackDate
            ? new Date(formData.ackDate).toISOString()
            : invoiceDate,
          signed_qr_Code_text: "",
          distance: 0,
          transporter_gstNo: formData.transporterGST || "",
        },

        list_INVOICE_DET_ex: invoiceItems.map((item) => ({
          inV_NO: invoiceNo,
          inV_DT: invoiceDate,
          iteM_CODE: item.itemCode || "",
          quantity: Number(item.quantity) || 0,
          uom: item.uom || "",
          rate: Number(item.rate) || 0,
          curR_CODE: formData.currency || "",
          amount: Number(item.amount) || 0,
          disC_PER: Number(item.discountPer) || 0,
          disC_AMT: Number(item.discountAmt) || 0,
          neT_AMT: Number(item.netAmount) || 0,
          desc: "",
          cusT_ITEM_CODE: item.customerItemCode || "",
          net_wt: 0,
          profcen_cd: profcen_cd,
          tarifF_CODE: "",
          pO_AMD_NO: "",
          pO_AMD_DATE: invoiceDate,
          uL_LOCATION: "",
          inV_TYPE: formData.invoiceType || "",
          saleS_TYPE: formData.invoiceSubType || "",
          rej_qty: 0,
          heat_code: "",
          pO_ID: formData.poLogin || "",
          pO_ID_DT: invoiceDate,
          remark: "",
          reT_QTY: 0,
          amor_rate: 0,
          mrp: 0,
          box_no: "",
          exC_AMT: 0,
          cesS_AMT: 0,
          hcesS_AMT: 0,
          saleS_AMT: 0,
          addExc_damt: 0,
          addCess_dAmt: 0,
          addHCess_dAmt: 0,
          hdisc_amt: 0,
          man_Dt: invoiceDate,
          exp_Dt: invoiceDate,
          disc_amt1: 0,
          disc_amt2: 0,
          batchqty: 0,
          batch_no: "",
          burnt_per: 0,
          wo_no: "",
          wo_date: invoiceDate,
          cust_Ul_Location: "",
          act_batchqty: 0,
          cust_tariff_cd: "",
          cust_tariff_desc: "",
          mrP_PER_Piece: 0,
          exc_Per_Piece: 0,
          box_wt: 0,
          poNo: formData.poNo || "",
          poDate: invoiceDate,
          box_uom: "",
          layout_len: 0,
          shipping_Cost: 0,
          stk_idnt: "",
          cust_item_desc: "",
          icust_code: "",
          cgstdet_amt: 0,
          sgstdet_amt: 0,
          igstdet_amt: 0,
          saC_Code: "",
          otheramt: 0,
          sW_flag: "",
          sgst_cd: "",
          cgst_cd: "",
          igst_cd: "",
          part_full: "",
          mfG_rate: 0,
          tcs_cd: "",
        })),

        list_Inv_tax_ex: taxDetails.map((tax) => ({
          inV_NO: invoiceNo,
          inV_DT: invoiceDate,
          taX_CODE: tax.taxCode || "",
          taX_AMT: Number(tax.amount || 0),
          profcen_cd: profcen_cd,
          inV_TYPE: formData.invoiceType || "",
          saleS_TYPE: formData.invoiceSubType || "",
        })),

        list_Inv_pay_ex: paymentTerms.map((pay, index) => ({
          inV_NO: invoiceNo,
          inV_DT: invoiceDate,
          percentage: Number(pay.percentage || 0),
          mode: pay.paymentMode || "",
          period: Number(pay.period || 0),
          dmflag: "",
          pay_cond: 0,
          duE_DATE: invoiceDate,
          duE_AMT: 0,
          po_id: formData.poLogin || "",
          received_amt: 0,
          dn_amt: 0,
          cn_amt: 0,
          jv_amt: 0,
          profcen_cd: profcen_cd,
          inV_TYPE: formData.invoiceType || "",
          saleS_TYPE: formData.invoiceSubType || "",
          cust_code: formData.customerCode || "",
          sR_NO: index + 1,
          diff_amt: 0,
          curr_rec: 0,
          curr_cn: 0,
          curr_jv: 0,
          rbi_curr_rate: 0,
          rbi_curr_diff: 0,
          currRate: 0,
          curr_Due_Amt: 0,
          received_Dt: invoiceDate,
          pdc_amt: 0,
          pdc_amt_jv: 0,
          tdSamt: 0,
          otherAmt: 0,
          rounDamt: 0,
        })),

        packingSlip_ex_upd: {
          slip_No: formData.packingNo || "",
          slip_dt: invoiceDate,
          cust_Code: formData.customerCode || "",
          po_Id: formData.poLogin || "",
          po_id_dt: invoiceDate,
          emp_no: "",
          remark: "",
          slip_type: "",
          profcen_cd: profcen_cd,
          saleS_TYPE: "",
          iS_REFERGIN: "",
          curR_CODE: "",
          form_type: "",
          form_no: "",
          form_date: invoiceDate,
          transporteR_CODE: "",
          vehiclE_NO: "",
          deleverY_BY: "",
          transport: "",
          packFWD_amt: 0,
          custMatAmt: 0,
          trans_name: "",
          uT1_no: "",
          uT1_date: invoiceDate,
          valid_date: invoiceDate,
          discAmount: 0,
          ewayBill_no: "",
          app_by2: "",
          app_date2: invoiceDate,
          user_name: userName,
          user_date: invoiceDate,
          app_flag: "",
          app_by: "",
          app_date: invoiceDate,
          app_by1: "",
          app_date1: invoiceDate,
        },

        paytype_sales_inv: "",
        period: new Date(localStorage.getItem("toDate")).toISOString().slice(0, 7),
        mM_DOC_DOCUMNET: "",
        mM_DOC_TYPE: "",
        profceN_CD: localStorage.getItem("PROFCEN_CD") ,
      };

      console.log("FINAL PAYLOAD:", payload);

      const response = await addInvoice(payload);

      alert("Invoice Saved Successfully");

      console.log("API RESPONSE:", response);
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sales" }, { name: "Invoice" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* MAIN LAYOUT */}
        <Grid container spacing={2}>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={9}>
            <Card variant="outlined" sx={{ p: 2 }}>
              {/* HEADER SECTION */}
              <Grid container spacing={2}>
                {/* <Grid item xs={3}>
                  <TextField label="Invoice Type" fullWidth size="small" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Invoice Sub Type" fullWidth size="small" />
                </Grid> */}
                <Grid item xs={3}>
                  <TextField
                    label="Invoice Type"
                    name="invoiceType"
                    value={formData.invoiceType}
                    onChange={handleChange}
                    select
                    size="small"
                    fullWidth
                  >
                    <MenuItem value="">-- Select Invoice Type --</MenuItem>

                    {invoiceTypeList.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Invoice Sub Type"
                    name="invoiceSubType"
                    value={formData.invoiceSubType}
                    onChange={handleChange}
                    select
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="">-- Select Sub Type --</MenuItem>

                    {filteredSubTypes.map((item, index) => (
                      <MenuItem key={index} value={item.SALES_TYPE}>
                        {item.SALES_TYPE}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Packing No." fullWidth size="small" />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="date"
                    label="Date"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField label="Customer Code" fullWidth size="small" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Invoice No" fullWidth size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Customer Name" fullWidth size="small" />
                </Grid>

                <Grid item xs={3}>
                  <TextField label="PO Login" fullWidth size="small" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="PO No" fullWidth size="small" />
                </Grid>

                <Grid item xs={6}>
                  <TextField label="Remark" fullWidth size="small" />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* ITEM ENTRY SECTION */}
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField label="Item Code" fullWidth size="small" />
                </Grid>
                <Grid item xs={2}>
                  <TextField label="Quantity" fullWidth size="small" />
                </Grid>
                <Grid item xs={2}>
                  <TextField label="UOM" fullWidth size="small" />
                </Grid>
                <Grid item xs={2}>
                  <TextField label="Rate" fullWidth size="small" />
                </Grid>
                <Grid item xs={2}>
                  <TextField label="Discount %" fullWidth size="small" />
                </Grid>
                <Grid item xs={2}>
                  <TextField label="Weight" fullWidth size="small" />
                </Grid>

                <Grid item xs={2}>
                  <TextField label="Amount" fullWidth size="small" />
                </Grid>
                <Grid item xs={2}>
                  <TextField label="Discount Amt" fullWidth size="small" />
                </Grid>
                <Grid item xs={2}>
                  <TextField label="Net Amt" fullWidth size="small" />
                </Grid>

                <Grid item xs={3}>
                  <TextField label="Currency" fullWidth size="small" />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    label="Customer Item Code"
                    fullWidth
                    size="small"
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField label="Transport Mode" fullWidth size="small" />
                </Grid>

                <Grid item xs={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleAddItem}
                  >
                    Add Item
                  </Button>
                </Grid>
              </Grid>

              {/* TABLE */}
              <Box mt={3}>
                <DataGrid
                  rows={invoiceItems.map((item, index) => ({
                    id: index + 1,
                    ...item,
                  }))}
                  columns={[
                    { field: "itemCode", headerName: "Item Code", flex: 1 },
                    { field: "quantity", headerName: "Qty", flex: 1 },
                    { field: "rate", headerName: "Rate", flex: 1 },
                    { field: "amount", headerName: "Amount", flex: 1 },
                    { field: "netAmount", headerName: "Net", flex: 1 },
                  ]}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Box>
            </Card>
          </Grid>

          {/* RIGHT SIDE SUMMARY PANEL */}
          <Grid item xs={12} md={3}>
            <Card variant="outlined" sx={{ p: 2, background: "#f9f9f9" }}>
              <TextField
                label="Basic Amount"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Cash Discount"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Trader Discount"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Dealer Discount"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Total Amount"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Packing & Forward"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Net Total"
                fullWidth
                size="small"
                sx={{ mb: 3 }}
              />

              <Stack spacing={1}>
                <Button
                  variant="contained"
                  onClick={() => setOpenPaymentModal(true)}
                >
                  Payment Terms
                </Button>
                <Button variant="contained" onClick={() => setOpenTax(true)}>
                  Tax Details
                </Button>
                <Button variant="contained" onClick={() => setOpenOther(true)}>
                  Other Details
                </Button>
                <Button variant="contained" onClick={() => setOpenGST(true)}>
                  GST Details
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setOpenTransport(true)}
                >
                  Transport Details
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* SAVE BUTTON */}
        <Box textAlign="right" mt={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon>save</Icon>}
            onClick={handleSaveInvoice}
          >
            Save Invoice
          </Button>
        </Box>
      </Box>

      <InvoiceGSTModal
        open={openGST}
        onClose={() => setOpenGST(false)}
        onSave={(data) => {
          setGstData(data);
          console.log("GST DATA:", data);
        }}
      />

      <InvoiceTransporterModal
        open={openTransport}
        onClose={() => setOpenTransport(false)}
        onSave={(data) => {
          setTransportDetails(data);
          setOpenTransport(false);

          console.log("Transport Data:", data);

          // OPTIONAL: bind to formData
          setFormData((prev) => ({
            ...prev,
            vehicleNo: data.vehicleNo,
            transportMode: data.transportMode,
            ewayBillNo: data.ewayBillNo,
            ewayBillDate: data.ewayBillDate,
          }));
        }}
      />
      <InvoiceOtherDetailsModal
        open={openOther}
        onClose={() => setOpenOther(false)}
        onSave={(data) => {
          setOtherDetails(data);
          setOpenOther(false);

          console.log("Other Details:", data);

          // OPTIONAL → bind to formData if needed
          setFormData((prev) => ({
            ...prev,
            packingDetails: data.packingDetails,
            packingWeight: data.packingWeight,
            customerMatAmt: data.customerMatAmt,
            natureOfRemoval: data.natureOfRemoval,
          }));
        }}
      />
    </Container>
  );
};

export default InvoiceForm;

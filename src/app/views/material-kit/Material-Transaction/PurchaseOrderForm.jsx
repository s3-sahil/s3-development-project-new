import {
  Container,
  Button,
  TextField,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Icon,
} from "@mui/material";
import PaymentTermsPurchaseOrderModal from "./PaymentTermsPurchaseOrderModal";
import TaxTermPurchaseOrderModal from "./TaxTermPurchaseOrderModal";
import { useState } from "react";
import { addCustomerPO } from "app/utils/materialTransactionServices";

export default function PurchaseOrderForm() {
  const [openPayment, setOpenPayment] = useState(false);
  const [openTaxModal, setOpenTaxModal] = useState(false);
  const [taxRows, setTaxRows] = useState([]); // store saved tax data

  const initialPayload = {
    po_head_ex: {
      pO_DATE: "",
      pO_NO: "",
      povaliD_DATE: "",
      venD_CODE: "",
      quoT_NO: "",
      quoT_DATE: "",
      proJ_CODE: "",
      basiC_AMT: 0,
      disC_PERCENT: 0,
      pacK_FWD_AMT: 0,
      pacK_FWD_PERCENT: 0,
      transporT_AMT: 0,
      octroI_FLAG: "N",
      currency: "INR",
      pO_CATG: "",
      prinT_FLAG: "N",
      advancE_AMT: 0,
      modvaT_FLAG: "N",
      openpO_FLAG: "N",
      toT_DISCAMT: 0,
      amenD_NO: "",
      transporT_FLAG: "N",
      toT_STAX: 0,
      toT_EXCISE: 0,
      toT_OTAX: 0,
      profceN_CD: "1",
      depT_CODE: "",
      bal_amt: 0,
      remark: "",
      advancE_AMT_PAID: 0,
      trans_unit: "",
      delv_days: 0,
      delv_period: "",
      po_type: "",
      delivery_location: "",
      transportername: "",
      user_name: "",
      amend_date: "",
      pack_fwd_flag: "N",
      schedule_flag: "N",
      approved_by: "",
      approval_date: "",
      approval_flag: "N",
      inS_flag: "N",
      inS_per: 0,
      inS_amt: 0,
      buyer: "",
      trans_remark: "",
      other_PayCond: "",
      int_remark: "",
      conv_rate: 1,
      mode_of_Dispatch: "",
      other_Charges: 0,
      delv_term: "",
      delivery_date: "",
      delivery_remark: "",
      load_amt: 0,
      load_unit: "",
      netVal: 0,
      service_Amt: 0,
      pack_unit: "",
      schemeName: "",
      user_date: "",
      postart_letter: "N",
      holdLevel: "",
      app_date1: "",
      app_by1: "",
      app_date2: "",
      app_by2: "",
      org_disc_Percent: 0,
      obasic_amt: 0,
      sgstAmt: 0,
      cgstAmt: 0,
      igstAmt: 0,
      grn_Trans_Amt: 0,
      project_val: 0,
      po_subcatg: "",
      grn_load_amt: 0,
    },

    list_Po_det_ex: [],

    list_Po_tax_ex: [],

    list_Po_paycond_ex: [],

    list_Po_indent_ex: [],

    list_po_operation_Det_ex: [],

    period: "",
    mM_DOC_DOCUMNET: "",
    mM_DOC_TYPE: "",
    profceN_CD: "1",
  };

  const toISO = (date) =>
    date ? new Date(date).toISOString() : new Date().toISOString();

  const buildPayload = () => {
    return {
      custpo_hed_ex: {
        cusT_CODE: payload.po_head_ex.venD_CODE || "",
        pO_ID: payload.po_head_ex.pO_NO || "",
        pO_ID_DT: toISO(payload.po_head_ex.pO_DATE),
        pO_NO: payload.po_head_ex.pO_NO || "",
        pO_DT: toISO(payload.po_head_ex.pO_DATE),
        pO_VALID: toISO(payload.po_head_ex.povaliD_DATE),
        oa_type: payload.po_head_ex.po_type || "O",

        transport: payload.po_head_ex.transporT_FLAG || "N",
        octroi: payload.po_head_ex.octroI_FLAG || "N",

        disC_PER: Number(payload.po_head_ex.disC_PERCENT) || 0,
        remark: payload.po_head_ex.remark || "",
        emP_NO: payload.po_head_ex.user_name || "",

        profceN_CD: payload.po_head_ex.profceN_CD || "1",
        curR_CODE: payload.po_head_ex.currency || "INR",
        form_type: payload.po_head_ex.po_type || "",

        adv_amt: Number(payload.po_head_ex.advancE_AMT) || 0,
        packing_amt: Number(payload.po_head_ex.pacK_FWD_AMT) || 0,
        packing_per: Number(payload.po_head_ex.pacK_FWD_PERCENT) || 0,

        buyer: payload.po_head_ex.buyer || "",
        delivery_remark: payload.po_head_ex.delivery_location || "",

        trans_name: payload.po_head_ex.transportername || "",
        oA_DELEVERY_BY: payload.po_head_ex.mode_of_Dispatch || "",

        conv_rate: Number(payload.po_head_ex.conv_rate) || 1,
        other_PayCond: payload.po_head_ex.other_PayCond || "",

        useR_NAME: "ADMIN",
      },

      list_Custpo_det_ex: payload.list_Po_det_ex.map((item) => ({
        pO_ID: payload.po_head_ex.pO_NO || "",
        pO_ID_DT: toISO(payload.po_head_ex.pO_DATE),

        iteM_CODE: item.iteM_CODE || "",
        iteM_NAME: item.iteM_NAME || "",
        quantity: Number(item.qty) || 0,
        rate: Number(item.rate) || 0,

        disC_PER: Number(item.disC_PERCENT) || 0,
        uom: item.uom || "",

        delivery_dt: toISO(item.delivery_dt),
        remark: item.remark || "",

        profceN_CD: payload.profceN_CD || "1",
      })),

      list_Custpo_pay_ex: [],

      list_Custpo_tax_ex: taxRows.map((tax) => ({
        pO_ID: payload.po_head_ex.pO_NO || "",
        pO_ID_DT: toISO(payload.po_head_ex.pO_DATE),
        oa_type: payload.po_head_ex.po_type || "O",
        TAX_CODE: tax.taxCode || "",

        taX_CODE: tax.taxCode,
        taX_AMT: Number(tax.taxAmount) || 0,
        profceN_CD: payload.profceN_CD || "1",
      })),

      list_Schedule_ex: [],

      period: payload.period || "",
      mM_DOC_DOCUMNET: payload.mM_DOC_DOCUMNET || "",
      mM_DOC_TYPE: payload.mM_DOC_TYPE || "",
      profceN_CD: payload.profceN_CD || "1",
    };
  };
  const [payload, setPayload] = useState(initialPayload);
  const handleOpenTax = () => setOpenTaxModal(true);
  const handleCloseTax = () => setOpenTaxModal(false);

  const handleSaveTax = (rows) => {
    setTaxRows(rows); // store in parent
    setOpenTaxModal(false);
  };

  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => setOpenPayment(false);

  const handleChange = (field) => (e) => {
    setPayload((prev) => ({
      ...prev,
      po_head_ex: {
        ...prev.po_head_ex,
        [field]: e.target.value,
      },
    }));
  };

  const addItem = () => {
    const itemTemplate = {
      pO_DATE: payload.po_head_ex.pO_DATE,
      iteM_CODE: "",
      rate: "",
      qty: 0,
      disC_PERCENT: 0,
      accepT_QTY: 0,
      reJ_QTY: 0,
      schedulE_FLAG: "N",
      modvaT_FLAG: "N",
      pO_NO: payload.po_head_ex.pO_NO,
      uom: "",
      cP_FLAG: "N",
      indenT_FLAG: "N",
      remark: "",
      op_code: "",
      packing_details: "",
      profceN_CD: payload.profceN_CD,
      weF_DATE: "",
      amend_reason: "",
      amend_nos: "",
      send_date: "",
      head_amend_nos: "",
      temp_receipt: "",
      org_amt: "0",
      org_rate: "0",
      org_Qty: "0",
      org_disc: "0",
      delivery_dt: "",
      exc_rate: 0,
      amort_rate: 0,
      scheme_name: "",
      licence_no: "",
      file_no: "",
      licence_date: "",
      bond_date: "",
      sr_no: payload.list_Po_det_ex.length + 1,
      scheme_qty: 0,
      amend_Res: "",
      child_code: "",
      tariff_Cd: "",
      wono: "",
      sgsTdetAmt: 0,
      cgsTdetAmt: 0,
      igsTdetAmt: 0,
      sgsT_Cd: "",
      cgsT_Cd: "",
      igsT_Cd: "",
      tcs_cd: "",
      tcsAmt: 0,
    };

    setPayload((prev) => ({
      ...prev,
      list_Po_det_ex: [...prev.list_Po_det_ex, itemTemplate],
    }));
  };

  const handleSave = async () => {
    try {
      const finalPayload = buildPayload();

      console.log("FINAL API PAYLOAD:", finalPayload);

      const res = await addCustomerPO(finalPayload);

      alert(res.Message || "Saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving Purchase Order");
    }
  };
  return (
    <Container maxWidth="lg">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <h2 style={{ color: "#6C2BD9" }}></h2>
        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      {/* MAIN CARD */}
      <Box p={3} boxShadow={2} borderRadius={2} bgcolor="#fff">
        <Grid container spacing={2}>
          {/* ROW 1 */}
          <Grid item xs={4}>
            <TextField
              label="Order No."
              fullWidth
              size="small"
              value={payload.po_head_ex.pO_NO}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: { ...prev.po_head_ex, pO_NO: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={payload.po_head_ex.pO_DATE?.slice(0, 10) || ""}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: {
                    ...prev.po_head_ex,
                    pO_DATE: new Date(e.target.value).toISOString(),
                  },
                }))
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="date"
              label="Valid Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={payload.po_head_ex.povaliD_DATE?.slice(0, 10) || ""}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: {
                    ...prev.po_head_ex,
                    povaliD_DATE: new Date(e.target.value).toISOString(),
                  },
                }))
              }
            />
          </Grid>

          {/* ROW 2 */}
          <Grid item xs={4}>
            <TextField
              label="Project Code"
              fullWidth
              size="small"
              value={payload.po_head_ex.proJ_CODE}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: { ...prev.po_head_ex, proJ_CODE: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Buyer"
              fullWidth
              size="small"
              value={payload.po_head_ex.buyer}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: { ...prev.po_head_ex, buyer: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Department"
              fullWidth
              size="small"
              value={payload.po_head_ex.depT_CODE}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: { ...prev.po_head_ex, depT_CODE: e.target.value },
                }))
              }
            />
          </Grid>

          {/* ROW 3 */}
          <Grid item xs={4}>
            <TextField
              label="PO Type"
              fullWidth
              size="small"
              value={payload.po_head_ex.po_type}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: { ...prev.po_head_ex, po_type: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="PO Category"
              fullWidth
              size="small"
              value={payload.po_head_ex.pO_CATG}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: { ...prev.po_head_ex, pO_CATG: e.target.value },
                }))
              }
            />
          </Grid>

          {/* ROW 4 */}
          <Grid item xs={4}>
            <TextField
              label="Supplier"
              fullWidth
              size="small"
              value={payload.po_head_ex.venD_CODE}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: { ...prev.po_head_ex, venD_CODE: e.target.value },
                }))
              }
            />
          </Grid>

          {/* CHECKBOXES */}
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox />} label="All Supplier" />

            <FormControlLabel
              control={
                <Checkbox
                  checked={payload.po_head_ex.openpO_FLAG === "Y"}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      po_head_ex: {
                        ...prev.po_head_ex,
                        openpO_FLAG: e.target.checked ? "Y" : "N",
                      },
                    }))
                  }
                />
              }
              label="Open Order"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={payload.po_head_ex.schedule_flag === "Y"}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      po_head_ex: {
                        ...prev.po_head_ex,
                        schedule_flag: e.target.checked ? "Y" : "N",
                      },
                    }))
                  }
                />
              }
              label="Schedule Order"
            />

            <FormControlLabel control={<Checkbox />} label="Internal Remark" />
          </Grid>

          {/* QUOTATION */}
          <Grid item xs={4}>
            <TextField
              label="Quotation No"
              fullWidth
              size="small"
              value={payload.po_head_ex.quoT_NO}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: { ...prev.po_head_ex, quoT_NO: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={payload.po_head_ex.quoT_DATE?.slice(0, 10) || ""}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: {
                    ...prev.po_head_ex,
                    quoT_DATE: new Date(e.target.value).toISOString(),
                  },
                }))
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              style={{ background: "#6C2BD9", height: "40px" }}
            >
              Browse
            </Button>
          </Grid>

          {/* DELIVERY */}
          <Grid item xs={6}>
            <TextField
              label="Delivery Location"
              fullWidth
              size="small"
              value={payload.po_head_ex.delivery_location}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  po_head_ex: {
                    ...prev.po_head_ex,
                    delivery_location: e.target.value,
                  },
                }))
              }
            />
          </Grid>

          {/* ACTION BUTTONS */}
          <Grid item xs={12} display="flex" gap={2}>
            <Button variant="contained" onClick={handleOpenTax}>
              Tax Term
            </Button>
            <Button variant="contained" onClick={handleOpenPayment}>
              Payment Terms
            </Button>
            <Button variant="contained" style={{ background: "#6C2BD9" }}>
              Other Details
            </Button>
          </Grid>

          {/* ITEM SECTION */}
          <Grid item xs={3}>
            <TextField label="Item Code" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="UOM" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Make" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Quantity" fullWidth size="small" />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Rate" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Disc (%)" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" label="W.E.F" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Amount" fullWidth size="small" />
          </Grid>

          {/* EXTRA */}
          <Grid item xs={3}>
            <Button variant="contained" style={{ background: "#6C2BD9" }}>
              View Drawing
            </Button>
          </Grid>

          <Grid item xs={3}>
            <TextField label="Reason" fullWidth size="small" />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Required By" fullWidth size="small" />
          </Grid>

          <Grid item xs={3}>
            <TextField
              type="date"
              label="Delivery Date"
              fullWidth
              size="small"
            />
          </Grid>

          {/* FOOTER BUTTONS */}
          <Grid item xs={12} display="flex" gap={2}>
            <Button variant="contained" style={{ background: "#6C2BD9" }}>
              Add Schedule
            </Button>
            <Button variant="contained" color="error">
              Remove
            </Button>
            <Button variant="contained" style={{ background: "#6C2BD9" }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>

      <PaymentTermsPurchaseOrderModal
        open={openPayment}
        onClose={handleClosePayment}
      />
      <TaxTermPurchaseOrderModal
        open={openTaxModal}
        onClose={handleCloseTax}
        onSave={handleSaveTax}
        defaultRows={taxRows}
      />
    </Container>
  );
}

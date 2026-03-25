import {
    Box,
    Container,
    TextField,
    Button,
    Icon,
    Divider,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

import InvoiceTaxDetailsModal from "./InvoiceTaxDetailsModal";
import InvoicePaymentModal from "./InvoicePaymentModal";
import InvoiceOtherDetailsModal from "./InvoiceOtherDetailsModal";
import InvoiceGSTDetailsModal from "./InvoiceGSTDetailsModal";
import { addInvoice } from "app/utils/authServices";

const InvoiceForm = () => {
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [openTax, setOpenTax] = useState(false);
    const [openOther, setOpenOther] = useState(false);
    const [openGST, setOpenGST] = useState(false);

    const [paymentTerms, setPaymentTerms] = useState([]);
    const [taxDetails, setTaxDetails] = useState([]);
    const [otherDetails, setOtherDetails] = useState({});
    const [gstDetails, setGstDetails] = useState({});
    const [invoiceItems, setInvoiceItems] = useState([]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddItem = () => {
        if (!formData.itemCode || !formData.quantity) {
            alert("Item Code and Quantity required");
            return;
        }

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
            if (!formData.invoiceNo) {
                alert("Invoice Number required");
                return;
            }

            if (invoiceItems.length === 0) {
                alert("Add at least one item");
                return;
            }

            const invoiceNo = formData.invoiceNo;
            const invoiceDate = formData.invoiceDate
                ? new Date(formData.invoiceDate).toISOString()
                : new Date().toISOString();
            
            const profcen_cd = localStorage.getItem("PROFCEN_CD") || "01";
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
                    ewayBill_Date: formData.ewayBillDate ? new Date(formData.ewayBillDate).toISOString() : invoiceDate,
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
                    ack_date: formData.ackDate ? new Date(formData.ackDate).toISOString() : invoiceDate,
                    signed_qr_Code_text: "",
                    distance: 0,
                    transporter_gstNo: formData.transporterGST || ""
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
                    tcs_cd: ""
                })),

                list_Inv_tax_ex: taxDetails.map((tax) => ({
                    inV_NO: invoiceNo,
                    inV_DT: invoiceDate,
                    taX_CODE: tax.taxCode || "",
                    taX_AMT: Number(tax.amount || 0),
                    profcen_cd: profcen_cd,
                    inV_TYPE: formData.invoiceType || "",
                    saleS_TYPE: formData.invoiceSubType || ""
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
                    rounDamt: 0
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
                    app_date1: invoiceDate
                },

                paytype_sales_inv: "",
                period: "",
                mM_DOC_DOCUMNET: "",
                mM_DOC_TYPE: "",
                profceN_CD: profcen_cd
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
        <Container maxWidth="xl">
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: "Sales" }, { name: "Invoice" }]}
                />
            </Box>

            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
                <Box display="grid" gridTemplateColumns="3fr 1fr" gap={3}>

                    <Box>
                        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                            <TextField
                                label="Invoice Type"
                                name="invoiceType"
                                value={formData.invoiceType}
                                onChange={handleChange}
                                size="small"
                            />
                            <TextField
                                label="Invoice Sub Type"
                                name="invoiceSubType"
                                value={formData.invoiceSubType}
                                onChange={handleChange}
                                size="small"
                            />
                            <TextField
                                label="Packing No."
                                name="packingNo"
                                value={formData.packingNo}
                                onChange={handleChange}
                                size="small"
                            />
                            <TextField
                                type="date"
                                label="Date"
                                name="invoiceDate"
                                value={formData.invoiceDate}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Customer"
                                name="customerCode"
                                value={formData.customerCode}
                                onChange={handleChange}
                                size="small"
                            />
                            <TextField
                                label="Inv. No"
                                name="invoiceNo"
                                value={formData.invoiceNo}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="Customer Name"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="PO Login"
                                name="poLogin"
                                value={formData.poLogin}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="PO No."
                                name="poNo"
                                value={formData.poNo}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="Remark"
                                name="remark"
                                value={formData.remark}
                                onChange={handleChange}
                                size="small"
                                multiline
                                rows={1}
                            />
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
                            <TextField
                                label="Item Code"
                                name="itemCode"
                                value={formData.itemCode}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="UOM"
                                name="uom"
                                value={formData.uom}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="Customer Item Code"
                                name="customerItemCode"
                                value={formData.customerItemCode}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="Rate"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                size="small"
                            />

                            <TextField
                                label="Amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                size="small"
                            />

                        </Box>

                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(6, 1fr)"
                            gap={2}
                            mt={2}
                        >
                            <TextField label="Currency" size="small" />
                            <TextField label="Weight" size="small" />
                            <TextField label="Discount (%)" size="small" />
                            <TextField label="Discount Amt" size="small" />
                            <TextField label="Net Amt" size="small" />
                        </Box>

                        <Box textAlign="center" mt={3}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleAddItem}
                            >
                                OK
                            </Button>

                        </Box>
                    </Box>

                    <Box
                        sx={{
                            border: "1px solid #eee",
                            borderRadius: 2,
                            p: 2,
                            background: "#fafafa",
                        }}
                    >
                        <TextField
                            label="Basic Amt."
                            name="basicAmt"
                            value={formData.basicAmt}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField label="Cash Discount" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Trader Discount" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Dealer Discount" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField
                            label="Total Amount"
                            name="totalAmt"
                            value={formData.totalAmt}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Packing & Fwd."
                            name="packingAmt"
                            value={formData.packingAmt}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Net Total"
                            name="netTotal"
                            value={formData.netTotal}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <Box display="flex" flexDirection="column" gap={1}>
                            <Button
                                variant="contained"
                                onClick={() => setOpenPaymentModal(true)}
                            >
                                Payment Terms
                            </Button>

                            <Button
                                variant="contained"
                                onClick={() => setOpenTax(true)}
                            >
                                Tax Details
                            </Button>

                            <Button
                                variant="contained"
                                onClick={() => setOpenOther(true)}
                            >
                                Other Details
                            </Button>

                            <Button
                                variant="contained"
                                onClick={() => setOpenGST(true)}
                            >
                                GST Details
                            </Button>

                            <Button variant="contained">
                                Transport Details
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box mt={4} textAlign="right">
                    <Button
                        variant="contained"
                        startIcon={<Icon>save</Icon>}
                        onClick={handleSaveInvoice}
                    >
                        <Span>Save</Span>
                    </Button>

                </Box>

                <InvoicePaymentModal
                    open={openPaymentModal}
                    onClose={() => setOpenPaymentModal(false)}
                    onSave={(rows) => {
                        setPaymentTerms(rows);
                        setOpenPaymentModal(false);
                        console.log("Saved Payment Terms:", rows);
                    }}
                />

                <InvoiceTaxDetailsModal
                    open={openTax}
                    onClose={() => setOpenTax(false)}
                    onSave={(data) => {
                        setTaxDetails(data);
                        setOpenTax(false);
                        console.log("Saved Tax Data:", data);
                    }}
                />

                <InvoiceOtherDetailsModal
                    open={openOther}
                    onClose={() => setOpenOther(false)}
                    onSave={(data) => {
                        setOtherDetails(data);
                        setOpenOther(false);
                        console.log("Saved Other Details:", data);
                    }}
                />

                <InvoiceGSTDetailsModal
                    open={openGST}
                    onClose={() => setOpenGST(false)}
                    onSave={(data) => {
                        setGstDetails(data);
                        setOpenGST(false);
                        console.log("Saved GST Details:", data);
                    }}
                />
            </Box>
        </Container>
    );
};

export default InvoiceForm;

// curl -X 'POST' \
//   'https://localhost:7189/ADD-INVOICE' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json-patch+json' \
//   -d '{
//   "invoicE_HED_ex": {
//     "inV_TYPE": "string",
//     "saleS_TYPE": "string",
//     "inV_NO": "string",
//     "inV_DT": "2026-03-25T14:10:10.832Z",
//     "pO_DT": "2026-03-25T14:10:10.832Z",
//     "cusT_CODE": "stri",
//     "consiN_NAME": "string",
//     "consiN_ADD1": "string",
//     "consiN_ADD2": "string",
//     "consiN_CITY": "string",
//     "consiN_PIN": "string",
//     "consiN_COUNTRY": "string",
//     "consiN_STATE": "string",
//     "consiN_TEL": "string",
//     "transporteR_CODE": "stri",
//     "transporT_AMT": 0,
//     "vehiclE_NO": "string",
//     "deleverY_BY": "string",
//     "tarifF_CODE": "string",
//     "transport": "s",
//     "f357_NO": "string",
//     "f357_DT": "2026-03-25T14:10:10.832Z",
//     "d3_NO": "string",
//     "d3_DT": "2026-03-25T14:10:10.832Z",
//     "octroi": "s",
//     "disC_PER": 0,
//     "disC_AMT": 0,
//     "totaL_AMT": 0,
//     "neT_AMT": 0,
//     "plA_NO": 0,
//     "plA_AMT": 0,
//     "removaL_DT": "2026-03-25T14:10:10.832Z",
//     "removaL_TIME": "2026-03-25T14:10:10.832Z",
//     "emP_NO": "strin",
//     "remark": "string",
//     "interesT_AMT": 0,
//     "packinG_WT": 0,
//     "tranS_MODE": "string",
//     "pacK_AMT": 0,
//     "issuE_DATE": "2026-03-25T14:10:10.832Z",
//     "issuE_TIME": "2026-03-25T14:10:10.832Z",
//     "naturE_REMOVAL": "string",
//     "gC_NO": "string",
//     "gC_DATE": "2026-03-25T14:10:10.832Z",
//     "packinG_DETAILS": "string",
//     "inspectioN_NO": "string",
//     "laB_NO": "string",
//     "olD_INV": "string",
//     "olD_INVDT": "2026-03-25T14:10:10.832Z",
//     "authorised": 0,
//     "prinT_FLG": "s",
//     "pO_ID": "string",
//     "insurance": "s",
//     "profcen_cd": "str",
//     "user_name": "string",
//     "po_no": "string",
//     "po_no_dt": "2026-03-25T14:10:10.832Z",
//     "po_amd_no": "string",
//     "po_amd_date": "2026-03-25T14:10:10.832Z",
//     "trip_no": 0,
//     "ratE_UOM": "string",
//     "other_charges": 0,
//     "addExc_amt": 0,
//     "addCess_Amt": 0,
//     "addHCess_Amt": 0,
//     "stax_Amt": 0,
//     "warrantyFlg": "s",
//     "warr_Period": 0,
//     "warr_DMY": "s",
//     "warr_clause": "string",
//     "conv_rate": 0,
//     "trader_disc": 0,
//     "abatment": 0,
//     "lr_no": "string",
//     "lr_dt": "2026-03-25T14:10:10.832Z",
//     "reF_NO": "string",
//     "reF_dt": "2026-03-25T14:10:10.832Z",
//     "trans_name": "string",
//     "depo_Cd": "stri",
//     "uT1_no": "string",
//     "uT1_date": "2026-03-25T14:10:10.832Z",
//     "valid_date": "2026-03-25T14:10:10.832Z",
//     "epcg": "s",
//     "advance": "s",
//     "annex_45": "s",
//     "dbk": "s",
//     "licence_not_appl": "s",
//     "bE_no": "string",
//     "bE_date": "2026-03-25T14:10:10.832Z",
//     "shipping_no": "string",
//     "shipping_date": "2026-03-25T14:10:10.832Z",
//     "arE1_no": "string",
//     "cust_approval": "s",
//     "are_type": "string",
//     "invREcd": "s",
//     "pslipREcd": "s",
//     "sdfrEcd": "s",
//     "excInvREcd": "s",
//     "are1REcd": "s",
//     "airBillREcd": "s",
//     "seaBillREcd": "s",
//     "exchangecopyREcd": "s",
//     "epCopyREcd": "s",
//     "matREcd": "s",
//     "bankRefNo": "string",
//     "bankDt": "2026-03-25T14:10:10.832Z",
//     "exp_remark": "string",
//     "remDt": "2026-03-25T14:10:10.832Z",
//     "cha_code": "stri",
//     "e_inv_dt": "2026-03-25T14:10:10.832Z",
//     "e_inv_no": "string",
//     "asnDone": "s",
//     "letDate": "2026-03-25T14:10:10.832Z",
//     "custClear": "2026-03-25T14:10:10.832Z",
//     "mateRecd": "string",
//     "billOfLad": "string",
//     "airBill": "string",
//     "net_amtW": "string",
//     "excise_amtW": "string",
//     "cess_amtW": "string",
//     "hcess_amtW": "string",
//     "net_amtw_InCurrency": "string",
//     "discAmount": 0,
//     "airBillDt": "2026-03-25T14:10:10.832Z",
//     "billLadDt": "2026-03-25T14:10:10.832Z",
//     "dbkjV_no": "string",
//     "proof_of_exp": "2026-03-25T14:10:10.832Z",
//     "meis": "s",
//     "rbi_curr_rate": 0,
//     "rbi_curr_diff": 0,
//     "invAmt": 0,
//     "rabate_no": "string",
//     "nform_no": "string",
//     "nform_dt": "2026-03-25T14:10:10.832Z",
//     "excise_submission_no": "string",
//     "consignee_cd": "stri",
//     "ewayBill_no": "string",
//     "cgst_amt": 0,
//     "sgst_amt": 0,
//     "igst_amt": 0,
//     "sgstper": 0,
//     "cgstper": 0,
//     "igstper": 0,
//     "gstno": "string",
//     "porT_CODE": "string",
//     "con_name": "string",
//     "con_add1": "string",
//     "con_add2": "string",
//     "con_city": "string",
//     "con_pin": "string",
//     "con_country": "string",
//     "con_state": "string",
//     "packing_CIF": 0,
//     "insurance_CIF": 0,
//     "name_of_signatory": "string",
//     "warr_Period1": 0,
//     "warrCondt1": "string",
//     "warrCondt2": "string",
//     "warr_DMY1": "s",
//     "brc_no": "string",
//     "brc_dt": "2026-03-25T14:10:10.832Z",
//     "con_gstno": "string",
//     "con_contactPer": "string",
//     "con_email": "string",
//     "coN_PHONE": "string",
//     "ewayBill_Date": "2026-03-25T14:10:10.832Z",
//     "brc_no1": "string",
//     "brc_dt1": "2026-03-25T14:10:10.832Z",
//     "brc_no2": "string",
//     "brc_dt2": "2026-03-25T14:10:10.832Z",
//     "con_Pan_no": "string",
//     "con_fax": "string",
//     "approval_flag": "s",
//     "app_date": "2026-03-25T14:10:10.832Z",
//     "app_by": "string",
//     "irN_NO": "string",
//     "ack_no": "string",
//     "ack_date": "2026-03-25T14:10:10.833Z",
//     "signed_qr_Code_text": "string",
//     "distance": 0,
//     "transporter_gstNo": "string"
//   },
//   "list_INVOICE_DET_ex": [
//     {
//       "inV_NO": "string",
//       "inV_DT": "2026-03-25T14:10:10.833Z",
//       "iteM_CODE": "string",
//       "quantity": 0,
//       "uom": "str",
//       "rate": 0,
//       "curR_CODE": "strin",
//       "amount": 0,
//       "disC_PER": 0,
//       "disC_AMT": 0,
//       "neT_AMT": 0,
//       "desc": "string",
//       "cusT_ITEM_CODE": "string",
//       "net_wt": 0,
//       "profcen_cd": "str",
//       "tarifF_CODE": "string",
//       "pO_AMD_NO": "string",
//       "pO_AMD_DATE": "2026-03-25T14:10:10.833Z",
//       "uL_LOCATION": "string",
//       "inV_TYPE": "string",
//       "saleS_TYPE": "string",
//       "rej_qty": 0,
//       "heat_code": "string",
//       "pO_ID": "string",
//       "pO_ID_DT": "2026-03-25T14:10:10.833Z",
//       "remark": "string",
//       "reT_QTY": 0,
//       "amor_rate": 0,
//       "mrp": 0,
//       "box_no": "string",
//       "exC_AMT": 0,
//       "cesS_AMT": 0,
//       "hcesS_AMT": 0,
//       "saleS_AMT": 0,
//       "addExc_damt": 0,
//       "addCess_dAmt": 0,
//       "addHCess_dAmt": 0,
//       "hdisc_amt": 0,
//       "man_Dt": "2026-03-25T14:10:10.833Z",
//       "exp_Dt": "2026-03-25T14:10:10.833Z",
//       "disc_amt1": 0,
//       "disc_amt2": 0,
//       "batchqty": 0,
//       "batch_no": "string",
//       "burnt_per": 0,
//       "wo_no": "string",
//       "wo_date": "2026-03-25T14:10:10.833Z",
//       "cust_Ul_Location": "string",
//       "act_batchqty": 0,
//       "cust_tariff_cd": "string",
//       "cust_tariff_desc": "string",
//       "mrP_PER_Piece": 0,
//       "exc_Per_Piece": 0,
//       "box_wt": 0,
//       "poNo": "string",
//       "poDate": "2026-03-25T14:10:10.833Z",
//       "box_uom": "string",
//       "layout_len": 0,
//       "shipping_Cost": 0,
//       "stk_idnt": "string",
//       "cust_item_desc": "string",
//       "icust_code": "stri",
//       "cgstdet_amt": 0,
//       "sgstdet_amt": 0,
//       "igstdet_amt": 0,
//       "saC_Code": "string",
//       "otheramt": 0,
//       "sW_flag": "s",
//       "sgst_cd": "str",
//       "cgst_cd": "str",
//       "igst_cd": "str",
//       "part_full": "s",
//       "mfG_rate": 0,
//       "tcs_cd": "str"
//     }
//   ],
//   "list_Inv_tax_ex": [
//     {
//       "inV_NO": "string",
//       "inV_DT": "2026-03-25T14:10:10.833Z",
//       "taX_CODE": "str",
//       "taX_AMT": 0,
//       "profcen_cd": "str",
//       "inV_TYPE": "string",
//       "saleS_TYPE": "string"
//     }
//   ],
//   "list_Inv_pay_ex": [
//     {
//       "inV_NO": "string",
//       "inV_DT": "2026-03-25T14:10:10.833Z",
//       "percentage": 0,
//       "mode": "s",
//       "period": 0,
//       "dmflag": "s",
//       "pay_cond": 0,
//       "duE_DATE": "2026-03-25T14:10:10.833Z",
//       "duE_AMT": 0,
//       "po_id": "string",
//       "received_amt": 0,
//       "dn_amt": 0,
//       "cn_amt": 0,
//       "jv_amt": 0,
//       "profcen_cd": "str",
//       "inV_TYPE": "string",
//       "saleS_TYPE": "string",
//       "cust_code": "stri",
//       "sR_NO": 0,
//       "diff_amt": 0,
//       "curr_rec": 0,
//       "curr_cn": 0,
//       "curr_jv": 0,
//       "rbi_curr_rate": 0,
//       "rbi_curr_diff": 0,
//       "currRate": 0,
//       "curr_Due_Amt": 0,
//       "received_Dt": "2026-03-25T14:10:10.833Z",
//       "pdc_amt": 0,
//       "pdc_amt_jv": 0,
//       "tdSamt": 0,
//       "otherAmt": 0,
//       "rounDamt": 0
//     }
//   ],
//   "packingSlip_ex_upd": {
//     "slip_No": "string",
//     "slip_dt": "2026-03-25T14:10:10.833Z",
//     "cust_Code": "strin",
//     "po_Id": "string",
//     "po_id_dt": "2026-03-25T14:10:10.833Z",
//     "emp_no": "strin",
//     "remark": "string",
//     "slip_type": "string",
//     "profcen_cd": "str",
//     "saleS_TYPE": "string",
//     "iS_REFERGIN": "s",
//     "curR_CODE": "strin",
//     "form_type": "strin",
//     "form_no": "string",
//     "form_date": "2026-03-25T14:10:10.833Z",
//     "transporteR_CODE": "stri",
//     "vehiclE_NO": "string",
//     "deleverY_BY": "string",
//     "transport": "s",
//     "packFWD_amt": 0,
//     "custMatAmt": 0,
//     "trans_name": "string",
//     "uT1_no": "string",
//     "uT1_date": "2026-03-25T14:10:10.833Z",
//     "valid_date": "2026-03-25T14:10:10.833Z",
//     "discAmount": 0,
//     "ewayBill_no": "string",
//     "app_by2": "string",
//     "app_date2": "2026-03-25T14:10:10.833Z",
//     "user_name": "string",
//     "user_date": "2026-03-25T14:10:10.833Z",
//     "app_flag": "s",
//     "app_by": "string",
//     "app_date": "2026-03-25T14:10:10.833Z",
//     "app_by1": "string",
//     "app_date1": "2026-03-25T14:10:10.833Z"
//   },
//   "paytype_sales_inv": "string",
//   "period": "string",
//   "mM_DOC_DOCUMNET": "string",
//   "mM_DOC_TYPE": "string",
//   "profceN_CD": "string"
// }'
// Request URL
// https://localhost:7189/ADD-INVOICE
// Server response
// Code	Details
// 200	
// Response body
// Download
// {
//   "StatusCode": 200,
//   "Message": "Invoice added successfully."
// }
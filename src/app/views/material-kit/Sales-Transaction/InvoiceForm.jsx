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

            const payload = {
                invoicE_HED_ex: {
                    inV_TYPE: formData.invoiceType,
                    saleS_TYPE: formData.invoiceSubType,
                    inV_NO: invoiceNo,
                    inV_DT: invoiceDate,

                    cusT_CODE: formData.customerCode,
                    consiN_NAME: formData.customerName,

                    remark: formData.remark || "",
                    user_name: "admin",

                    disC_PER: Number(formData.discountPer || 0),
                    disC_AMT: Number(formData.discountAmt || 0),

                    totaL_AMT: Number(formData.totalAmt || 0),
                    neT_AMT: Number(formData.netTotal || 0),

                    pacK_AMT: Number(formData.packingAmt || 0),

                    cgst_amt: Number(gstDetails?.cgst_amt || 0),
                    sgst_amt: Number(gstDetails?.sgst_amt || 0),
                    igst_amt: Number(gstDetails?.igst_amt || 0),

                    sgstper: Number(gstDetails?.sgstper || 0),
                    cgstper: Number(gstDetails?.cgstper || 0),
                    igstper: Number(gstDetails?.igstper || 0),
                },

                list_INVOICE_DET_ex: invoiceItems.map((item) => ({
                    inV_NO: invoiceNo,
                    inV_DT: invoiceDate,

                    iteM_CODE: item.itemCode,
                    quantity: Number(item.quantity),
                    uom: item.uom,
                    rate: Number(item.rate),
                    amount: Number(item.amount),
                    neT_AMT: Number(item.netAmount),

                    disC_PER: Number(item.discountPer || 0),
                    disC_AMT: Number(item.discountAmt || 0),

                    cusT_ITEM_CODE: item.customerItemCode || "",
                })),

                list_Inv_tax_ex: taxDetails.map((tax) => ({
                    inV_NO: invoiceNo,
                    inV_DT: invoiceDate,
                    taX_CODE: tax.taxCode,
                    taX_AMT: Number(tax.taxAmount || 0),
                })),

                list_Inv_pay_ex: paymentTerms.map((pay, index) => ({
                    inV_NO: invoiceNo,
                    inV_DT: invoiceDate,

                    percentage: Number(pay.percentage || 0),
                    mode: pay.paymentMode || "C",
                    period: Number(pay.period || 0),
                    sR_NO: index + 1,
                })),
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
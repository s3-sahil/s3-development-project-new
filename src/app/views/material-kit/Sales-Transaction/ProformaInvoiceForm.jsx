import {
    Box,
    Container,
    TextField,
    Button,
    Divider,
    Checkbox,
    FormControlLabel,
    IconButton,
    Icon,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InvoicePaymentModal from "./InvoicePaymentModal";
import InvoiceTaxDetailsModal from "./InvoiceTaxDetailsModal";
import InvoiceOtherDetailsModal from "./InvoiceOtherDetailsModal";
import TransporterModal from "./TransporterModal";
import { addProformaInvoice } from "app/utils/salesTransactionServices";

const ProformaInvoiceForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { slipNo } = useParams();
    const isEdit = !!location.state || !!slipNo;

    const [formData, setFormData] = useState({
        invoiceType: "",
        invoiceSubType: "",
        referGrn: false,
        invNo: "",
        invDate: new Date().toISOString().split('T')[0],
        customer: "",
        custName: "",
        poLogin: "",
        poDate: "",
        poNo: "",
        remark: "",
        
        // Item fields
        itemCode: "",
        qty: "",
        packingType: "",
        rate: "",
        discountPer: "",
        uom: "",
        amount: "",
        disAmt: "",
        netAmt: "",
        serialNo: "",
        mrp: "",
        customerItemCode: "",
        itemRemark: "",

        // Summary fields
        totalAmount: "",
        discountPerSummary: "",
        discountAmountSummary: "",
        packingFwd: "",
        freight: "",
        netTotal: "",
        advanceAmt: ""
    });

    const [items, setItems] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [openPayment, setOpenPayment] = useState(false);
    const [openTax, setOpenTax] = useState(false);
    const [openOther, setOpenOther] = useState(false);
    const [openTransport, setOpenTransport] = useState(false);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [taxDetails, setTaxDetails] = useState([]);
    const [otherDetails, setOtherDetails] = useState({});
    const [transporterData, setTransporterData] = useState({});

    useEffect(() => {
        if (isEdit && location.state) {
            const data = location.state;
            setFormData((prev) => ({
                ...prev,
                ...data,
                // Map table fields to form fields
                invNo: data.invoiceNo || data.invNo || prev.invNo,
                invDate: data.date ? data.date.split("T")[0] : (data.invDate ? data.invDate.split("T")[0] : prev.invDate),
                customer: data.customer || prev.customer,
                totalAmount: data.amount || data.totalAmount || prev.totalAmount,
            }));

            if (data.items && Array.isArray(data.items)) {
                setItems(data.items);
            }
        }
    }, [isEdit, location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let updatedFormData = {
            ...formData,
            [name]: type === "checkbox" ? checked : value
        };

        // Auto-calculate amounts
        if (name === "qty" || name === "rate" || name === "discountPer") {
            const qty = parseFloat(name === "qty" ? value : formData.qty) || 0;
            const rate = parseFloat(name === "rate" ? value : formData.rate) || 0;
            const discountPer = parseFloat(name === "discountPer" ? value : formData.discountPer) || 0;

            const amount = qty * rate;
            const disAmt = (amount * discountPer) / 100;
            const netAmt = amount - disAmt;

            updatedFormData = {
                ...updatedFormData,
                amount: amount.toFixed(2),
                disAmt: disAmt.toFixed(2),
                netAmt: netAmt.toFixed(2)
            };
        }

        setFormData(updatedFormData);
    };

    const handleAddItem = () => {
        if (!formData.itemCode || !formData.qty) {
            alert("Please enter Item Code and Quantity");
            return;
        }

        const newItem = {
            id: editItemId || Date.now(),
            itemCode: formData.itemCode,
            // Save as numbers for calculations, strings for display if needed
            qty: formData.qty,
            packingType: formData.packingType,
            rate: formData.rate,
            discountPer: formData.discountPer,
            uom: formData.uom,
            amount: formData.amount,
            disAmt: formData.disAmt,
            netAmt: formData.netAmt,
            serialNo: formData.serialNo,
            mrp: formData.mrp,
            customerItemCode: formData.customerItemCode,
            itemRemark: formData.itemRemark
        };

        if (editItemId) {
            setItems(items.map(item => item.id === editItemId ? newItem : item));
            setEditItemId(null);
        } else {
            setItems([...items, newItem]);
        }

        // Reset Item Fields
        setFormData(prev => ({
            ...prev,
            itemCode: "", qty: "", packingType: "", rate: "", discountPer: "",
            uom: "", amount: "", disAmt: "", netAmt: "", serialNo: "", mrp: "",
            customerItemCode: "", itemRemark: ""
        }));
    };

    const handleEditItem = (item) => {
        setFormData(prev => ({
            ...prev,
            itemCode: item.itemCode,
            qty: item.qty,
            packingType: item.packingType,
            rate: item.rate,
            discountPer: item.discountPer,
            uom: item.uom,
            amount: item.amount,
            disAmt: item.disAmt,
            netAmt: item.netAmt,
            serialNo: item.serialNo,
            mrp: item.mrp,
            customerItemCode: item.customerItemCode,
            itemRemark: item.itemRemark
        }));
        setEditItemId(item.id);
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleSave = async () => {
        if (!formData.invNo || !formData.customer) {
            alert("Please fill required fields (Invoice No, Customer)");
            return;
        }

        if (items.length === 0) {
            alert("Please add at least one item");
            return;
        }

        const profcen_cd = localStorage.getItem("PROFCEN_CD") || "";
        const user_name = localStorage.getItem("username") || "ADMIN";
        const isoDate = (date) => (date ? new Date(date).toISOString() : new Date().toISOString());

        const payload = {
            pinvoicE_HED_ex: {
                inV_TYPE: formData.invoiceType || "",
                saleS_TYPE: formData.invoiceSubType || "",
                inV_NO: formData.invNo,
                inV_DT: isoDate(formData.invDate),
                pO_DT: isoDate(formData.poDate),
                cusT_CODE: formData.customer,
                consiN_NAME: formData.custName || "",
                transporteR_CODE: transporterData?.transporterCode || "",
                vehiclE_NO: transporterData?.vehicleNo || "",
                deleverY_BY: transporterData?.transportMode || "",
                disC_PER: Number(formData.discountPerSummary || 0),
                disC_AMT: Number(formData.discountAmountSummary || 0),
                totaL_AMT: Number(formData.totalAmount || 0),
                neT_AMT: Number(formData.netTotal || 0),
                removaL_DT: isoDate(formData.invDate),
                removaL_TIME: isoDate(formData.invDate),
                remark: formData.remark || "",
                tranS_MODE: transporterData?.transportMode || "",
                pacK_AMT: Number(formData.packingFwd || 0),
                issuE_DATE: isoDate(formData.invDate),
                issuE_TIME: isoDate(formData.invDate),
                pO_ID: formData.poLogin || "",
                insurance: otherDetails?.insurance === "Our A/c" ? "O" : (otherDetails?.insurance === "Your A/c" ? "Y" : "N"),
                profcen_cd: profcen_cd,
                user_name: user_name,
                po_no: formData.poNo || "",
                po_no_dt: isoDate(formData.poDate),
                trader_disc: Number(formData.discountAmountSummary || 0),
                ewayBill_no: transporterData?.ewayBillNo || "",
                discAmount: Number(formData.discountAmountSummary || 0),
                plA_AMT: Number(formData.advanceAmt || 0),
                pinv: "Y"
            },
            list_PINVOICE_DET_ex: items.map((item) => ({
                inV_NO: formData.invNo,
                inV_DT: isoDate(formData.invDate),
                iteM_CODE: item.itemCode,
                quantity: Number(item.qty || 0),
                uom: item.uom || "",
                rate: Number(item.rate || 0),
                amount: Number(item.amount || 0),
                disC_PER: Number(item.discountPer || 0),
                disC_AMT: Number(item.disAmt || 0),
                neT_AMT: Number(item.netAmt || 0),
                cusT_ITEM_CODE: item.customerItemCode || "",
                profcen_cd: profcen_cd,
                inV_TYPE: formData.invoiceType || "",
                saleS_TYPE: formData.invoiceSubType || "",
                remark: item.itemRemark || "",
                pO_ID: formData.poLogin || "",
                poNo: formData.poNo || ""
            })),
            list_Pinv_tax_ex: taxDetails.map((tax) => ({
                inV_NO: formData.invNo,
                inV_DT: isoDate(formData.invDate),
                taX_CODE: tax.taxCode || tax.code || "",
                taX_AMT: Number(tax.amount || 0),
                profcen_cd: profcen_cd,
                inV_TYPE: formData.invoiceType || "",
                saleS_TYPE: formData.invoiceSubType || ""
            })),
            list_Pinv_pay_ex: paymentTerms.map((pay, index) => ({
                inV_NO: formData.invNo,
                inV_DT: isoDate(formData.invDate),
                percentage: Number(pay.percentage || 0),
                mode: pay.paymentMode || pay.mode || "",
                period: Number(pay.period || 0),
                profcen_cd: profcen_cd,
                inV_TYPE: formData.invoiceType || "",
                saleS_TYPE: formData.invoiceSubType || "",
                cust_code: formData.customer || "",
                sR_NO: index + 1
            }))
        };

        try {
            const res = await addProformaInvoice(payload);
            alert(res?.Message || "Proforma Invoice Saved Successfully");
            navigate("/material/sales-proforma-invoice-table");
        } catch (error) {
            console.error("Save Error:", error);
            alert("Failed to save Proforma Invoice");
        }
    };

    return (
        <Container maxWidth="xl">
            {/* ===== Breadcrumb ===== */}
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Proforma Invoice" },
                    ]}
                />
            </Box>

            {/* ===== Main Card ===== */}
            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
                <Box display="grid" gridTemplateColumns="3fr 1fr" gap={3}>

                    {/* ================= LEFT SECTION ================= */}
                    <Box>
                        {/* Header Section */}
                        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                            <TextField label="Invoice Type" size="small" name="invoiceType" value={formData.invoiceType} onChange={handleChange} />
                            <TextField label="Invoice Sub Type" size="small" name="invoiceSubType" value={formData.invoiceSubType} onChange={handleChange} />

                            <FormControlLabel
                                control={<Checkbox checked={formData.referGrn} name="referGrn" onChange={handleChange} />}
                                label="Refer GRN"
                            />

                            <Box />

                            <TextField label="Inv. No" size="small" name="invNo" value={formData.invNo} onChange={handleChange} />
                            <TextField
                                type="date"
                                label="Inv. Date"
                                size="small"
                                name="invDate" value={formData.invDate} onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField label="Customer" size="small" name="customer" value={formData.customer} onChange={handleChange} />
                            <TextField label="Cust. Name" size="small" name="custName" value={formData.custName} onChange={handleChange} />

                            <TextField label="PO Login" size="small" name="poLogin" value={formData.poLogin} onChange={handleChange} />
                            <TextField
                                type="date"
                                label="PO Date"
                                size="small"
                                name="poDate" value={formData.poDate} onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField label="PO No." size="small" name="poNo" value={formData.poNo} onChange={handleChange} />
                            <TextField label="Remark" size="small" name="remark" value={formData.remark} onChange={handleChange} />
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* ================= ITEM ENTRY ================= */}
                        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                            <TextField label="Item Code" size="small" name="itemCode" value={formData.itemCode} onChange={handleChange} />
                            <TextField label="Qty" size="small" name="qty" value={formData.qty} onChange={handleChange} />
                            <TextField label="Packing Type" size="small" name="packingType" value={formData.packingType} onChange={handleChange} />
                            <TextField label="Rate" size="small" name="rate" value={formData.rate} onChange={handleChange} />
                            <TextField label="Discount (%)" size="small" name="discountPer" value={formData.discountPer} onChange={handleChange} />
                        </Box>

                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(4, 1fr)"
                            gap={2}
                            mt={2}
                        >
                            <TextField label="UOM" size="small" name="uom" value={formData.uom} onChange={handleChange} />
                            <TextField label="Amount" size="small" name="amount" value={formData.amount} onChange={handleChange} />
                            <TextField label="Dis Amt" size="small" name="disAmt" value={formData.disAmt} onChange={handleChange} />
                            <TextField label="Net Amt" size="small" name="netAmt" value={formData.netAmt} onChange={handleChange} />
                        </Box>

                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(3, 1fr)"
                            gap={2}
                            mt={2}
                        >
                            <TextField label="Serial No" size="small" name="serialNo" value={formData.serialNo} onChange={handleChange} />
                            <TextField label="MRP" size="small" name="mrp" value={formData.mrp} onChange={handleChange} />
                            <TextField label="Customer Item Code" size="small" name="customerItemCode" value={formData.customerItemCode} onChange={handleChange} />
                        </Box>

                        <Box mt={2}>
                            <TextField
                                label="Item Remark"
                                size="small"
                                fullWidth
                                name="itemRemark" value={formData.itemRemark} onChange={handleChange}
                            />
                        </Box>

                        {/* Buttons */}
                        <Box display="flex" gap={2} mt={3}>
                            <Button variant="contained" color="secondary" onClick={handleAddItem}>
                                {editItemId ? "Update" : "OK"}
                            </Button>
                        </Box>

                        {/* Items Table */}
                        <Box mt={3}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item Code</TableCell>
                                            <TableCell>Qty</TableCell>
                                            <TableCell>Rate</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.itemCode}</TableCell>
                                                <TableCell>{row.qty}</TableCell>
                                                <TableCell>{row.rate}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleEditItem(row)} color="primary" size="small"><Icon>edit</Icon></IconButton>
                                                    <IconButton onClick={() => handleRemoveItem(row.id)} color="error" size="small"><Icon>delete</Icon></IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Box>
                    </Box>

                    {/* ================= RIGHT SUMMARY PANEL ================= */}
                    <Box
                        sx={{
                            border: "1px solid #eee",
                            borderRadius: 2,
                            p: 2,
                            background: "#fafafa",
                        }}
                    >
                        <TextField label="Total Amount" size="small" fullWidth sx={{ mb: 2 }} name="totalAmount" value={formData.totalAmount} onChange={handleChange} />
                        <TextField label="Discount (%)" size="small" fullWidth sx={{ mb: 2 }} name="discountPerSummary" value={formData.discountPerSummary} onChange={handleChange} />
                        <TextField label="Discount Amount" size="small" fullWidth sx={{ mb: 2 }} name="discountAmountSummary" value={formData.discountAmountSummary} onChange={handleChange} />
                        <TextField label="Packing & Fwd" size="small" fullWidth sx={{ mb: 2 }} name="packingFwd" value={formData.packingFwd} onChange={handleChange} />
                        <TextField label="Freight" size="small" fullWidth sx={{ mb: 2 }} name="freight" value={formData.freight} onChange={handleChange} />
                        <TextField label="Net Total" size="small" fullWidth sx={{ mb: 2 }} name="netTotal" value={formData.netTotal} onChange={handleChange} />
                        <TextField label="Advance Amt." size="small" fullWidth sx={{ mb: 3 }} name="advanceAmt" value={formData.advanceAmt} onChange={handleChange} />

                        <Box display="flex" flexDirection="column" gap={1}>
                            <Button variant="contained" onClick={() => setOpenPayment(true)} color={paymentTerms.length > 0 ? "success" : "primary"}>
                                Show Payment Terms
                            </Button>
                            <Button variant="contained" onClick={() => setOpenTax(true)} color={taxDetails.length > 0 ? "success" : "primary"}>
                                Show Tax Details
                            </Button>
                            <Button variant="contained" onClick={() => setOpenOther(true)}>
                                Other Details
                            </Button>
                            <Button variant="contained" onClick={() => setOpenTransport(true)}>
                                Transport Details
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* ===== Save Button ===== */}
                <Box mt={4} textAlign="right">
                    <Button
                        variant="contained"
                        startIcon={<Icon>save</Icon>}
                        onClick={handleSave}
                    >
                        <Span>Save</Span>
                    </Button>
                </Box>
            </Box>

            <InvoicePaymentModal 
                open={openPayment} 
                onClose={() => setOpenPayment(false)} 
                onSave={(data) => {
                    setPaymentTerms(data);
                    setOpenPayment(false);
                }} 
            />
            <InvoiceTaxDetailsModal 
                open={openTax} 
                onClose={() => setOpenTax(false)} 
                onSave={(data) => {
                    setTaxDetails(data);
                    setOpenTax(false);
                }} 
            />
            <InvoiceOtherDetailsModal 
                open={openOther} 
                handleClose={() => setOpenOther(false)} 
                onSave={(data) => {
                    setOtherDetails(data);
                    setOpenOther(false);
                }} 
            />
            <TransporterModal 
                open={openTransport} 
                onClose={() => setOpenTransport(false)} 
                onSave={(data) => {
                    setTransporterData(data);
                    setOpenTransport(false);
                }} 
            />
        </Container>
    );
};

export default ProformaInvoiceForm;
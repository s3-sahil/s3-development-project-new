import { Box, Button, Card, CardContent, Checkbox, Container, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Breadcrumb } from "app/components";
import { customerPurchaseOrderType, fetchCurrencyAPI, fetchCustomerAPI, fetchItemcodeAPI, fetchSalesmanAPI, saveCustomerPurchaseOrder } from "app/utils/authServices";
import { useEffect, useState } from "react";
import OtherDetailsModal from "./OtherDetailsModal";
import PaymentTermsModal from "./PaymentTermsModal";
import TaxTermModal from "./TaxTermModal";

const CustomersPurchaseOrderLogin = () => {
    const [form, setForm] = useState({
        orderType: "",
        customer: "",
        salesman: "",
        currency: "",
        loginDate: "",
        orderNo: "",
        orderDate: "",
        validDate: "",
        amendNo: "",
        amendDate: "",
        remark: "",
        dispatchLocation: "",
        itemCode: "",
        quantity: "",
        rate: "",
        discPer: "",
        wef: "",
        shippingCost: ""
    });
    const [openTaxModal, setOpenTaxModal] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [openOtherDetailsModal, setOpenOtherDetailsModal] = useState(false);
    const [orderTypes, setOrderTypes] = useState([]);
    const [itemCodes, setItemCodes] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [salesmen, setSalesmen] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [taxRows, setTaxRows] = useState([]);

    useEffect(() => {
        loadOrderTypes();
        loadItemCodes();
        loadCustomers();
        loadSalesmen();
        loadCurrencies();
    }, []);

    const loadOrderTypes = async () => {
        const data = await customerPurchaseOrderType();
        setOrderTypes(data);
    };

    const loadItemCodes = async () => {
        const data = await fetchItemcodeAPI();
        setItemCodes(data);
    };

    const loadCustomers = async () => {
        const data = await fetchCustomerAPI();
        setCustomers(data);
    };

    const loadSalesmen = async () => {
        const data = await fetchSalesmanAPI();
        setSalesmen(data);
    };

    const loadCurrencies = async () => {
        const data = await fetchCurrencyAPI();
        setCurrencies(data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                custpo_hed_ex: {
                    cusT_CODE: form.customer,
                    pO_NO: form.orderNo,
                    pO_ID: "string",
                    pO_DT: form.orderDate,
                    pO_VALID: form.validDate,
                    pO_AMD_NO: form.amendNo,
                    pO_AMD_DT: form.amendDate,
                    oa_type: form.orderType,
                    emP_NO: form.salesman,
                    curR_CODE: form.currency,
                    remark: form.remark,
                    deli_Terms: form.dispatchLocation,
                    useR_NAME: "ADMIN",
                    profceN_CD: 2
                },
                list_Custpo_det_ex: [
                    {
                        iteM_CODE: form.itemCode,
                        quantity: Number(form.quantity),
                        rate: Number(form.rate),
                        disC_PER: Number(form.discPer),
                        ratE_WEF: form.wef,
                        shipping_Cost: Number(form.shippingCost),
                        curR_CODE: form.currency,
                        tarifF_CD: "string",
                        pO_ID: "string",
                        oa_type: "string",
                        profceN_CD: "string",
                        pO_AMD_NO: "string",
                        UL_LOCATION: "string",
                        deg_issue_no: "string"
                    }
                ],
                list_Custpo_pay_ex: [],
                list_Custpo_tax_ex: taxRows.map((row) => ({
                    taX_CODE: row.code,
                    taX_AMT: Number(row.amount),
                    oa_type: row.type,
                    profceN_CD: ""
                })),
                list_Schedule_ex: []
            };

            const response = await saveCustomerPurchaseOrder(payload);
            console.log("PO Saved:", response.data);
            alert("Purchase Order Saved Successfully");

        } catch (error) {
            console.error("Error saving PO:", error);
            alert("Error saving Purchase Order");
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Transaction" }, { name: "Customer's Purchase Order Login" }]} />
            </Box>

            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Order Type"
                                select
                                name="orderType"
                                value={form.orderType || ""}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select</MenuItem>

                                {orderTypes.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        value={item.oa_type_desc}
                                    >
                                        {item.oa_type_desc}- {item.custpo_oa_type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                type="date"
                                fullWidth
                                label="Login Date"
                                name="loginDate"
                                value={form.loginDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                select
                                fullWidth
                                label="Customer"
                                name="customer"
                                value={form.customer}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select</MenuItem>
                                {customers.map((cust, index) => (
                                    <MenuItem key={index} value={cust.Cust_code}>
                                        {cust.Cust_code}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                fullWidth
                                label="P.O. Login No"
                                name="orderNo"
                                value={form.orderNo}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                select
                                fullWidth
                                label="Marketing By"
                                name="salesman"
                                value={form.salesman}
                                onChange={handleChange}
                            >
                                <MenuItem value="">-- Select Salesman --</MenuItem>
                                {salesmen.map((sales, index) => (
                                    <MenuItem key={index} value={sales.Emp_no}>
                                        {sales.Sman_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField size="small" fullWidth label="Order No" />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                fullWidth
                                type="date"
                                label="Order Date"
                                name="orderDate"
                                value={form.orderDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                fullWidth
                                type="date"
                                label="Valid Date"
                                name="validDate"
                                value={form.validDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Amend No"
                                name="amendNo"
                                value={form.amendNo}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                type="date"
                                fullWidth
                                label="Amend Date"
                                name="amendDate"
                                value={form.amendDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                size="small"
                                select
                                fullWidth
                                label="Currency"
                                name="currency"
                                value={form.currency}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select</MenuItem>
                                {currencies.map((cur, index) => (
                                    <MenuItem key={index} value={cur.currency}>
                                        {cur.currency} - {cur.CURR_FRACTION}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        mt={3}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setOpenTaxModal(true)}
                        >
                            Tax Term
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenPaymentModal(true)}
                        >
                            Payment Terms
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenOtherDetailsModal(true)}
                        >
                            Other Details
                        </Button>
                    </Stack>

                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Dispatch Location"
                                name="dispatchLocation"
                                value={form.dispatchLocation}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Remark"
                                name="remark"
                                value={form.remark}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Box mt={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    size="small"
                                    select
                                    fullWidth
                                    label="Item Code"
                                    name="itemCode"
                                    value={form.itemCode || ""}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Select</MenuItem>

                                    {itemCodes.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item.ITEM_CODE}
                                        >
                                            {item.ITEM_CODE} - {item.item_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField size="small" fullWidth label="Cust Item" />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box display="flex" gap={1} mt={2}>
                                    <Checkbox /> Open
                                    <Checkbox /> Close
                                    <Checkbox /> Show All
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <TextField size="small" fullWidth label="Item Serial No" />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <TextField size="small" fullWidth label="Item Name" />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Quantity"
                                    name="quantity"
                                    value={form.quantity}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Rate"
                                    name="rate"
                                    value={form.rate}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Disc. %"
                                    name="discPer"
                                    value={form.discPer}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <TextField
                                    size="small"
                                    type="date"
                                    fullWidth
                                    label="WEF"
                                    name="wef"
                                    value={form.wef}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Shipping Cost"
                                    name="shippingCost"
                                    value={form.shippingCost}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField size="small" fullWidth label="HSN Code" disabled />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField size="small" fullWidth label="Unloading Loc" />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField size="small" fullWidth label="Remark" />
                            </Grid>
                        </Grid>
                    </Box>

                    <Stack direction="row" spacing={2} mt={3}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Add Schedule
                        </Button>
                        <Button variant="contained" color="primary">
                            Add
                        </Button>
                        <Button variant="contained" color="primary">
                            Remove
                        </Button>
                    </Stack>

                    <Box mt={3}>
                        <Typography align="center" color="text.secondary">
                            No item data available
                        </Typography>
                    </Box>
                </CardContent>


                <TaxTermModal
                    open={openTaxModal}
                    onClose={() => setOpenTaxModal(false)}
                    onSave={(rows) => {
                        console.log("Saved Tax Data:", rows);
                        setTaxRows(rows);
                        setOpenTaxModal(false);
                    }}
                />
                <PaymentTermsModal
                    open={openPaymentModal}
                    onClose={() => setOpenPaymentModal(false)}
                    onSave={(data) => {
                        console.log("Saved Payment Terms:", data);
                        setOpenPaymentModal(false);
                    }}
                />
                <OtherDetailsModal
                    open={openOtherDetailsModal}
                    onClose={() => setOpenOtherDetailsModal(false)}
                    onSave={(data) => {
                        console.log("Other Details:", data);
                        setOpenOtherDetailsModal(false);
                    }}
                />

            </Card>
        </Container>
    );
};

export default CustomersPurchaseOrderLogin;

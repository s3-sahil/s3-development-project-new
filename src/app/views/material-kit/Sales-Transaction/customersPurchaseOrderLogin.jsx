import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  customerPurchaseOrderType,
  fetchCurrencyAPI,
  fetchCustomerAPI,
  fetchItemcodeAPI,
  fetchSalesmanAPI,
  saveCustomerPurchaseOrder,
} from "app/utils/authServices";
import { useEffect, useState } from "react";
import OtherDetailsModal from "./OtherDetailsModal";
import PaymentTermsModal from "./PaymentTermsModal";
import TaxTermModal from "./TaxTermModal";
import OtherDetailsManufacturingModal from "./OtherDetailsManufacturingModal";
import { DataGrid } from "@mui/x-data-grid";

const CustomersPurchaseOrderLogin = () => {
<<<<<<< HEAD
  const [leadObj, setLeadObj] = useState({
    List_Custpo_det_ex: [],
    list_Schedule_ex: [],
  });

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
    shippingCost: "",
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
  const [itemTable, setItemTable] = useState([]);
  const [openManufacturingModal, setOpenManufacturingModal] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "ITEM_CODE", headerName: "Item Code", flex: 1 },
    { field: "ITEM_NAME", headerName: "Item Name", flex: 1 },
    { field: "QUANTITY", headerName: "Quantity", type: "number", flex: 1 },
    { field: "RATE", headerName: "Rate", type: "number", flex: 1 },
    { field: "TARIFF_CD", headerName: "HSN", flex: 1 },
    { field: "DISC_PER", headerName: "Disc %", type: "number", flex: 1 },
    { field: "REMARK1", headerName: "Remark", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];
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

  const handleAdd = () => {
    // if (!form.itemCode || !form.quantity || !form.rate) {
    //   alert("Please fill Item Code, Quantity and Rate");
    //   return;
    // }

    const selectedItem = itemCodes.find(
      (item) => item.ITEM_CODE === form.itemCode,
    );

    const newItem = {
      id: itemTable.length + 1,
      ITEM_CODE: form.itemCode,
      ITEM_NAME: selectedItem?.item_name || "",
      QUANTITY: Number(form.quantity),
      RATE: Number(form.rate),
      TARIFF_CD: selectedItem?.HSN_CODE || "",
      DISC_PER: Number(form.discPer) || 0,
      REMARK1: form.remark || "",
    };

    setItemTable((prev) => [...prev, newItem]);

    // Clear fields
    setForm((prev) => ({
      ...prev,
      itemCode: "",
      quantity: "",
      rate: "",
      discPer: "",
      shippingCost: "",
    }));
  };

  const handleDelete = (id) => {
    setItemTable((prev) => prev.filter((item) => item.id !== id));
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
          profceN_CD: 2,
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
            deg_issue_no: "string",
          },
        ],
        list_Custpo_pay_ex: [],
        list_Custpo_tax_ex: taxRows.map((row) => ({
          taX_CODE: row.code,
          taX_AMT: Number(row.amount),
          oa_type: row.type,
          profceN_CD: "",
        })),
        list_Schedule_ex: [],
      };

      const response = await saveCustomerPurchaseOrder(payload);
      console.log("PO Saved:", response.data);
      alert("Purchase Order Saved Successfully");
    } catch (error) {
      console.error("Error saving PO:", error);
      alert("Error saving Purchase Order");
    }
  };
  const handleOpenSchedule = () => {
    if (!form.itemCode || !form.quantity) {
      alert("Item Code and Quantity required");
      return;
    }

    const tempLeadObj = {
      List_Custpo_det_ex: [
        {
          ITEM_CODE: form.itemCode,
          QUANTITY: form.quantity,
        },
      ],
      List_Schedule_ex: [],
    };

    setLeadObj(tempLeadObj);
    setOpenManufacturingModal(true);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Transaction" },
            { name: "Customer's Purchase Order Login" },
          ]}
        />
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

=======
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
    shippingCost: "",
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
  const [items, setItems] = useState([]);
  const [paymentRows, setPaymentRows] = useState([]);
  const [scheduleRows, setScheduleRows] = useState([]);

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

  const handleAddItem = () => {
    if (!form.itemCode || !form.quantity) {
      alert("Item Code and Quantity required");
      return;
    }

    const newItem = {
      itemCode: form.itemCode,
      itemName: "",
      quantity: form.quantity,
      rate: form.rate,
      discPer: form.discPer,
      wef: form.wef,
      shippingCost: form.shippingCost,
    };

    setItems([...items, newItem]);

    setForm({
      ...form,
      itemCode: "",
      quantity: "",
      rate: "",
      discPer: "",
      wef: "",
      shippingCost: "",
    });
  };

  const handleSubmit = async () => {
    const profcen_cd = localStorage.getItem("selectedDivision") || "1";
    const userName = localStorage.getItem("username") || "SYSTEM";

    // Helper to safely format dates
    const formatDate = (dateStr, fallbackToNow = false) => {
      if (!dateStr) return fallbackToNow ? new Date().toISOString() : null;
      const d = new Date(dateStr);
      return !isNaN(d.valueOf())
        ? d.toISOString()
        : fallbackToNow
          ? new Date().toISOString()
          : null;
    };

    if (!form.customer) {
      alert("Customer required");
      return;
    }

    if (!form.orderType) {
      alert("Order Type required");
      return;
    }

    if (items.length === 0) {
      alert("Add at least 1 item");
      return;
    }

    // HEADER
    const custpo_hed_ex = {
      cusT_CODE: form.customer,
      pO_ID: "",
      pO_ID_DT: formatDate(form.loginDate, true),
      pO_NO: form.orderNo || `PO-${Math.floor(Math.random() * 1000)}`,
      pO_DT: formatDate(form.orderDate, true),
      pO_AMD_NO: "string",
      pO_AMD_DT: formatDate(form.amendDate),
      pO_VALID: formatDate(form.validDate),
      transport: "N",
      octroi: "N",
      disC_PER: Number(form.discPer || 0),
      remark: form.remark || "",
      remarK1: "",
      emP_NO: form.salesman || "",
      suppl_cond: form.supplyCondition || "Standard Supply",
      insurance: "N",
      oa_type: form.orderType,
      profceN_CD: profcen_cd,
      useR_NAME: userName,
      deli_Terms: form.dispatchLocation || "",
      curR_CODE: form.currency || "",
      form_type: "NORMAL",
      adv_amt: 0,
      packing_flag: "N",
      packing_amt: 0,
      packing_per: 0,
      trader_disc: 0,
      trans_name: "",
      transport_amt: 0,
      buyer: "",
    };

    // DETAILS
    const list_Custpo_det_ex = items
      .map((item, index) => ({
        sr_no: index + 1,
        pO_ID: "",
        pO_ID_DT: formatDate(form.loginDate, true),
        iteM_CODE: item.itemCode?.trim(),
        iteM_NAME: item.itemName || "",
        quantity: Number(item.quantity || 0),
        rate: Number(item.rate || 0),
        ratE_WEF: formatDate(item.wef, true),
        disC_PER: Number(item.discPer || 0),
        tarifF_CD: item.tariffCode || "",
        profceN_CD: profcen_cd,
        remark: item.remark || "",
        uL_LOCATION: item.ulLocation || "",
        deg_issue_no: Number(item.deg_issue_no || 0),
      }))
      .filter((item) => item.iteM_CODE); // remove empty items

    // SCHEDULE
    const list_Schedule_ex = (scheduleRows.length ? scheduleRows : items)
      .map((r, index) => ({
        sr_No: index + 1,
        pO_ID: "",
        pO_ID_DT: formatDate(form.loginDate, true),
        iteM_CODE: r.itemCode?.trim(),
        scH_QTY: Number(r.quantity || 0),
        sDate: formatDate(r.custDeliveryDate, true),
        our_delv_dt: formatDate(r.ourDeliveryDate, true),
        user_name: userName,
        profcen_cd: profcen_cd,
        ul_location: r.ulLocation || "",
      }))
      .filter((r) => r.iteM_CODE && r.scH_QTY > 0);

    // PAYMENTS
    const list_Custpo_pay_ex = paymentRows.map((p, index) => ({
      sr_no: index + 1,
      pO_ID: "",
      pO_ID_DT: formatDate(form.loginDate, true),
      percentage: Number(p.percentage || 0),
      mode: p.mode || "CASH",
      period: Number(p.period || 0),
      pay_cond: p.pay_cond || 0,
      oa_type: form.orderType,
      profceN_CD: profcen_cd,
    }));

    // TAXES
    const list_Custpo_tax_ex = taxRows.map((t, index) => ({
      sr_no: index + 1,
      pO_ID: "",
      pO_ID_DT: formatDate(form.loginDate, true),
      taX_CODE: t.code,
      taX_AMT: Number(t.amount || 0),
      oa_type: form.orderType,
      profceN_CD: profcen_cd,
    }));

    const payload = {
      custpo_hed_ex,
      list_Custpo_det_ex,
      list_Custpo_pay_ex,
      list_Custpo_tax_ex,
      list_Schedule_ex,
    };

    console.log("💾 PAYLOAD:", JSON.stringify(payload, null, 2));

    try {
      const res = await saveCustomerPurchaseOrder(payload);

      // ✅ Use StatusCode from response directly
      if (res?.StatusCode === 200) {
        alert("✅ Customer Purchase Order added successfully");
        setItems([]);
        setPaymentRows([]);
        setTaxRows([]);
        setScheduleRows([]);
        setForm({});
      } else {
        console.error("BACKEND ERROR:", res);
        alert(res?.Message || "Failed to save Purchase Order");
      }
    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err.message);
      alert("Failed to save Purchase Order. Check console for details.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Transaction" },
            { name: "Customer's Purchase Order Login" },
          ]}
        />
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

>>>>>>> 77942c4251c47ea3e5ba97696b02d87c8770ce25
                {orderTypes.map((item, index) => (
                  <MenuItem key={index} value={item.oa_type_desc}>
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

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            <Button variant="outlined" onClick={() => setOpenTaxModal(true)}>
              Tax Term
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenPaymentModal(true)}
            >
<<<<<<< HEAD
              Payment Terms
=======
              Payment Terms ({paymentRows.length})
>>>>>>> 77942c4251c47ea3e5ba97696b02d87c8770ce25
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
<<<<<<< HEAD

=======
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <TextField size="small" fullWidth label="Supply Condition" />
            </Grid>

            <Grid item xs={3}>
              <TextField size="small" fullWidth label="Quot. No" />
            </Grid>

            <Grid item xs={3}>
              <TextField
                size="small"
                type="date"
                fullWidth
                label="Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
>>>>>>> 77942c4251c47ea3e5ba97696b02d87c8770ce25
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
                    <MenuItem key={index} value={item.ITEM_CODE}>
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
<<<<<<< HEAD

              <Grid item xs={12}>
=======
              <Grid item xs={12} md={4}>
                <TextField size="small" fullWidth label="HSN Description" />
              </Grid>
              <Grid item xs={12} md={4}>
>>>>>>> 77942c4251c47ea3e5ba97696b02d87c8770ce25
                <TextField size="small" fullWidth label="Remark" />
              </Grid>
            </Grid>
          </Box>

          <Stack direction="row" spacing={2} mt={3}>
<<<<<<< HEAD
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenSchedule}
            >
              Add Schedule
            </Button>
            <Button variant="contained" color="primary" onClick={handleAdd}>
=======
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Schedule
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddItem}>
>>>>>>> 77942c4251c47ea3e5ba97696b02d87c8770ce25
              Add
            </Button>
            <Button variant="contained" color="primary">
              Remove
            </Button>
          </Stack>

          <Box mt={3}>
            <Typography align="center" color="text.secondary">
<<<<<<< HEAD
              <Box mt={3} sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={itemTable}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  disableSelectionOnClick
                  sx={{
                    borderRadius: 2,
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>
=======
              No item data available
>>>>>>> 77942c4251c47ea3e5ba97696b02d87c8770ce25
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
<<<<<<< HEAD
=======
            setPaymentRows(data);
>>>>>>> 77942c4251c47ea3e5ba97696b02d87c8770ce25
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
<<<<<<< HEAD

        <OtherDetailsManufacturingModal
          isOpen={openOtherDetailsModal}
          onClose={() => setOpenOtherDetailsModal(false)}
          leadObj={leadObj}
          setLeadObj={setLeadObj}
        />
=======
>>>>>>> 77942c4251c47ea3e5ba97696b02d87c8770ce25
      </Card>
    </Container>
  );
};

export default CustomersPurchaseOrderLogin;

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

              <Grid item xs={12}>
                <TextField size="small" fullWidth label="Remark" />
              </Grid>
            </Grid>
          </Box>

          <Stack direction="row" spacing={2} mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenSchedule}
            >
              Add Schedule
            </Button>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="contained" color="primary">
              Remove
            </Button>
          </Stack>

          <Box mt={3}>
            <Typography align="center" color="text.secondary">
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

        <OtherDetailsManufacturingModal
          isOpen={openOtherDetailsModal}
          onClose={() => setOpenOtherDetailsModal(false)}
          leadObj={leadObj}
          setLeadObj={setLeadObj}
        />
      </Card>
    </Container>
  );
};

export default CustomersPurchaseOrderLogin;

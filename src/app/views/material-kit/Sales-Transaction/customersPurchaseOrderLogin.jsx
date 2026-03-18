import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  Icon,
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
    List_Schedule_ex: [], // Fixed casing to match Modal
  });
  const [allSchedules, setAllSchedules] = useState([]); // Store schedules for all items

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
  const [openScheduleModal, setOpenScheduleModal] = useState(false); // Separate state for Schedule Modal
  const [orderTypes, setOrderTypes] = useState([]);
  const [itemCodes, setItemCodes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [taxRows, setTaxRows] = useState([]);
  const [itemTable, setItemTable] = useState([]);
  // const [openManufacturingModal, setOpenManufacturingModal] = useState(false); // Unused
  const [paymentRows, setPaymentRows] = useState([]);

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
      shipping_Cost: Number(form.shippingCost) || 0,
    };

    setItemTable((prev) => [...prev, newItem]);

    // Save schedule to main list if exists
    if (leadObj.List_Schedule_ex && leadObj.List_Schedule_ex.length > 0) {
      setAllSchedules((prev) => [...prev, ...leadObj.List_Schedule_ex]);
    }

    // Clear fields
    setForm((prev) => ({
      ...prev,
      itemCode: "",
      quantity: "",
      rate: "",
      discPer: "",
      shippingCost: "",
    }));
    // Reset Lead Object for next item
    setLeadObj({ List_Custpo_det_ex: [], List_Schedule_ex: [] });
  };

  const handleDelete = (id) => {
    setItemTable((prev) => prev.filter((item) => item.id !== id));
    // Note: To delete associated schedules correctly, you would need to link them via an ID.
  };

  // Moved columns definition AFTER handleDelete to avoid ReferenceError
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

  const handleSubmit = async () => {
    // 1. Validation to prevent 500 Error due to missing keys
    if (!form.customer) { alert("Please select a Customer"); return; }
    if (!form.salesman) { alert("Please select Marketing By (Salesman)"); return; }
    if (!form.orderNo) { alert("Please enter P.O. Login No"); return; }
    if (!form.orderType) { alert("Please select Order Type"); return; }
    if (itemTable.length === 0) { alert("Please add at least one item"); return; }

    try {
      // Use a cleaner ID if possible, or keep Date.now()
      const poId = "PO" + Date.now(); 
      const poDate = new Date().toISOString();

      const formatDate = (date) => {
        return date ? new Date(date).toISOString() : null;
      };

      const payload = {
        custpo_hed_ex: {
          cusT_CODE: form.customer || "",
          pO_ID: poId,
          pO_ID_DT: poDate,
          pO_NO: form.orderNo || "",

          pO_DT: formatDate(form.orderDate),
          pO_AMD_NO: form.amendNo || "",
          pO_AMD_DT: formatDate(form.amendDate),
          pO_VALID: formatDate(form.validDate),
          
          transport: "",
          octroi: "",
          disC_PER: 0,

          remark: form.remark || "",
          remarK1: "",

          emP_NO: form.salesman || "",
          suppl_cond: "",
          insurance: "",

          oa_type: form.orderType || "",
          profceN_CD: "2",
          useR_NAME: "ADMIN",

          deli_Terms: form.dispatchLocation || "",
          curR_CODE: form.currency || "",
          form_type: "",

          adv_amt: 0,
          packing_flag: "",
          packing_amt: 0,
          packing_per: 0,

          warrantyFlg: "",
          warr_Period: 0,
          warr_DMY: "",
          warr_clause: "",

          conv_rate: 0,
          trader_disc: 0,

          trans_name: "",
          oA_DELEVERY_BY: "",
          oa_catg: "",

          other_PayCond: "",
          delivery_remark: "",

          transport_amt: 0,
          buyer: "",

          warr_Period1: 0,
          warr_DMY1: "",
          warrCondt1: "",
          warrCondt2: "", 

          qc_req: "",
          gauranty_cert: "",
          test_cert: "",
          manuals: "",
          penaulty: "",
          partial_disp: "",

          adv_bank_gauranty: "",
          adv_bank_valid_Dt: null,

          perf_bank_gauranty: "",
          perf_bank_valid_Dt: null,

          lc_no: "",
          lc_date: null,
          lc_valid_Dt: null,

          ref_oa_no: "",
          commissioning_dt: null,

          adv_bank_gauranty_doc_no: "",
          adv_bank_gauranty_doc_date: null,

          perf_bank_gauranty_doc_no: "",
          perf_bank_gauranty_doc_date: null,

          penalty_clause: "",

          oainvamt: 0,
          oainvamt_bal: 0,
          oainv_disp_amt: 0,
          adv_rec: 0,
        },

        // ✅ MATCHED EXACTLY
        list_Custpo_det_ex: itemTable.map((item, index) => ({
          pO_ID: poId,
          pO_ID_DT: poDate,

          quoT_NO: "",
          quoT_DT: poDate,

          iteM_NAME: item.ITEM_NAME || "Item",
          iteM_CODE: item.ITEM_CODE || "0",

          quantity: Number(item.QUANTITY) || 0,
          rate: Number(item.RATE) || 0,

          ratE_WEF: formatDate(form.wef) || poDate,

          disC_PER: Number(item.DISC_PER) || 0,
          pC_CODE: "",

          dispatcH_QTY: 0,
          cusT_ITEM_CODE: "",

          curR_CODE: form.currency || "",
          uom: "",

          tarifF_CD: item.TARIFF_CD || "",
          tarifF_DESC: "",

          enq_no: "",
          enq_dt: poDate,

          sr_no: String(index + 1),
          open_oa: "Y",

          oa_type: form.orderType || "",
          profceN_CD: "2",

          pO_AMD_NO: form.amendNo || "", 
          pO_AMD_DATE: formatDate(form.amendDate),

          uL_LOCATION: "",
          invoicE_NO: "",
          invoicE_DT: poDate,

          poentrY_DATE: poDate,
          prev_rate: 0,

          deg_issue_no: "",
          rate_diff_qty: 0,
          cumm_disp_qty: 0,

          approve_flag: "",
          approve_by: "",
          approve_date: null,

          oP_CODE: "",
          amend_res: "",

          amort_rate: 0,
          remark: "",

          delivery_dt: poDate,

          app_flag: "",
          app_by: "",
          app_date: null,

          wo_qty: 0,
          prod_head: "",

          tagged_OA_QTY: 0,
          tagged_OA_date: null,

          custItcdRev: "",
          logical_item: "",

          shipping_Cost: Number(item.shipping_Cost) || 0,
          cust_item_desc: "",

          indentQty: 0,
          tarifF_CD_NEW: "",

          tecH_SPEC: "",
          temp_dispatchqty: 0,

          sgsTdetAmt: 0,
          cgsTdetAmt: 0,
          igsTdetAmt: 0,

          sgsT_Cd: "",
          cgsT_Cd: "",
          igsT_Cd: "",
        })),

        // ✅ PAYMENT
        list_Custpo_pay_ex: paymentRows.map((row, index) => ({
          pO_ID: poId,
          pO_ID_DT: poDate,

          percentage: Number(row.percentage) || 0,
          mode: row.mode || "",
          period: Number(row.period) || 0,
          dmflag: row.dmflag || "",
          pay_cond: Number(row.pay_cond) || 0,

          oa_type: form.orderType || "",
          profceN_CD: "2",

          sr_no: index + 1,

          adv_tax: Number(row.adv_tax) || 0,
          adv_amt: Number(row.adv_amt) || 0,
          adv_amt_recd: 0,
          pro_inv: "",
        })),

        // ✅ TAX
        list_Custpo_tax_ex: taxRows.map((row) => ({
          pO_ID: poId,
          pO_ID_DT: poDate,
          taX_CODE: row.code || "",
          taX_AMT: Number(row.amount) || 0,
          oa_type: row.type || "",
          profceN_CD: "2",
        })),

        // ✅ SCHEDULE
        list_Schedule_ex:
          allSchedules.map((sch, index) => ({
            sr_No: index + 1,
            cusT_CODE: form.customer || "",
            iteM_CODE: sch.ITEM_CODE || "",

            pO_ID: poId,
            pO_ID_DT: poDate,

            pC_CODE: "",
            scH_QTY: Number(sch.QUANTITY) || 0,
            scH_VALUE: 0,

            moN_PL_QTY: 0,
            disP_QTY: 0,
            disP_VALUE: 0,
            backloG_QTY: 0,

            syear: "",
            smonth: "",

            po_rate: 0,
            o_qty: 0,

            type: "",
            week: "",

            sDate: poDate,
            profcen_cd: "2",

            amend_no: 0,
            user_name: "ADMIN",
            reason: "",

            sch_entry_date: poDate,
            cust_item_code: "",

            batchqty: "",
            prod_head: "",

            our_delv_dt: poDate,
            ul_location: "",

            wo_qty: 0,
            po_no: form.orderNo || "",
            po_Dt: poDate,

            prod_date: poDate,
            fps_qty: 0,
            dispatch_date: poDate,

            division: "",
            indentqty: 0,
            planDisp: 0,
            to_sdate: poDate,
          })) || [],
      };

      console.log("FINAL PAYLOAD:", payload);

      await saveCustomerPurchaseOrder(payload);

      alert("Purchase Order Saved Successfully");
      
      // Optional: Clear form or redirect here
      
    } catch (error) {
      console.error("ERROR:", error);
      // Show specific error message from backend if available
      alert(error.message || "Error saving Purchase Order");
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
      List_Schedule_ex: leadObj.List_Schedule_ex || [],
    };

    setLeadObj(tempLeadObj);
    setOpenScheduleModal(true);
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
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleSubmit}
        >
          Save
        </Button>
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

            {/* Duplicate Field Removed/Commented to avoid confusion */}
            {/* <Grid item xs={12} md={3}>
              <TextField size="small" fullWidth label="Order No" />
            </Grid> */}

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
            setPaymentRows(data);
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
          isOpen={openScheduleModal}
          onClose={() => setOpenScheduleModal(false)}
          leadObj={leadObj}
          setLeadObj={setLeadObj}
        />
      </Card>
    </Container>
  );
};

export default CustomersPurchaseOrderLogin;

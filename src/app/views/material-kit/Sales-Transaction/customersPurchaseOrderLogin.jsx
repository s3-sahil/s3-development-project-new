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
} from "app/utils/authServices";
import { useEffect, useState } from "react";
import OtherDetailsModal from "./OtherDetailsModal";
import PaymentTermsModal from "./PaymentTermsModal";
import TaxTermModal from "./TaxTermModal";
import OtherDetailsManufacturingModal from "./OtherDetailsManufacturingModal";
import { DataGrid } from "@mui/x-data-grid";
import { saveCustomerPurchaseOrder } from "app/utils/salesTransactionServices";

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
  const [otherDetails, setOtherDetails] = useState({});
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
      setAllSchedules((prev) => {
        const newSchedules = [...prev, ...leadObj.List_Schedule_ex];

        const unique = [];
        const seen = new Set();

        newSchedules.forEach((item) => {
          const key = `${item.ITEM_CODE}_${item.SDate}`;

          if (!seen.has(key)) {
            seen.add(key);
            unique.push(item);
          }
        });

        return unique;
      });
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
    if (!form.customer) {
      alert("Please select a Customer");
      return;
    }
    if (!form.salesman) {
      alert("Please select Marketing By (Salesman)");
      return;
    }
    if (!form.orderNo) {
      alert("Please enter P.O. Login No");
      return;
    }
    if (!form.orderType) {
      alert("Please select Order Type");
      return;
    }
    if (!form.orderDate) {
      alert("Please select Order Date");
      return;
    }
    if (!form.orderDate) {
      alert("Please select Order Date");
      return;
    }
    if (itemTable.length === 0) {
      alert("Please add at least one item");
      return;
    }

    try {
      const profcenCd = localStorage.getItem("PROFCEN_CD") || "";
      // Ensure ID isn't too long for database columns
      const poId = "PO" + Date.now().toString().substring(5);
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

          transport: otherDetails.transport || "",
          octroi: "",

          disC_PER: 0,

          remark: form.remark || "",
          remarK1: "",

          emP_NO: form.salesman || "",
          suppl_cond: "",
          insurance: otherDetails.insurance || "",

          oa_type: form.orderType || "",
          profceN_CD: profcenCd,
          useR_NAME: "ADMIN",

          deli_Terms: form.dispatchLocation || "",
          curR_CODE: form.currency || "",
          form_type: "",

          adv_amt: Number(otherDetails.advanceAmt) || 0,

          packing_flag: otherDetails.packingType || "",
          packing_amt: Number(otherDetails.packingAmt) || 0,
          packing_per: Number(otherDetails.packingPer) || 0,

          warrantyFlg: otherDetails.warrantyApplicable ? "Y" : "N",
          warr_Period: Number(otherDetails.warrantyPeriod) || 0,
          warr_DMY: otherDetails.warrantyUnit || "",
          warr_clause: otherDetails.warrantyClause || "",

          conv_rate: 0,
          trader_disc: Number(otherDetails.traderDisc) || 0,

          trans_name: otherDetails.transporterName || "",
          oA_DELEVERY_BY: "",
          oa_catg: "",

          other_PayCond: otherDetails.otherPaymentTerms || "",
          delivery_remark: otherDetails.deliveryRemark || "",

          transport_amt: Number(otherDetails.transportAmount) || 0,
          buyer: otherDetails.buyer || "",

          warr_Period1: Number(otherDetails.warrantyPeriod2) || 0,
          warr_DMY1: otherDetails.warrantyUnit2 || "",
          warrCondt1: otherDetails.warrantyCond1 || "",
          warrCondt2: otherDetails.warrantyCond2 || "",

          qc_req: "",
          gauranty_cert: "N",
          test_cert: "N",
          manuals: "N",
          penaulty: "N",
          partial_disp: "N",

          adv_bank_gauranty: "N",
          adv_bank_valid_Dt: null,

          perf_bank_gauranty: "N",
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

        // ================= ITEMS =================
        list_Custpo_det_ex: itemTable.map((item, index) => ({
          pO_ID: poId,
          pO_ID_DT: poDate,

          quoT_NO: "",
          quoT_DT: poDate,

          iteM_NAME: item.ITEM_NAME || "",
          iteM_CODE: item.ITEM_CODE || "",

          quantity: Number(item.QUANTITY) || 0,
          rate: Number(item.RATE) || 0,

          ratE_WEF: poDate,
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

          sr_no: index + 1,
          open_oa: "Y",

          oa_type: form.orderType || "",
          profceN_CD: profcenCd,

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
          remark: item.REMARK1 || "",

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

        // ================= PAYMENT =================
        list_Custpo_pay_ex: paymentRows.map((row, index) => ({
          pO_ID: poId,
          pO_ID_DT: poDate,

          percentage: Number(row.percentage) || 0,
          mode: row.mode || "",
          period: Number(row.period) || 0,

          dmflag: row.mode === "Immediate" ? "I" : "A", // ✅ FIX

          pay_cond: Number(row.pay_cond) || 0,

          oa_type: form.orderType || "",
          profceN_CD: profcenCd,

          sr_no: index + 1,

          adv_tax: 0,
          adv_amt: 0,
          adv_amt_recd: 0,
          pro_inv: "",
        })),

        // ================= TAX =================
        list_Custpo_tax_ex: taxRows.map((row) => ({
          pO_ID: poId,
          pO_ID_DT: poDate,

          taX_CODE: row.code || "",
          taX_AMT: Number(row.amount) || 0,

          oa_type: form.orderType || "",
          profceN_CD: profcenCd,
        })),

        // ================= SCHEDULE =================
        list_Schedule_ex: allSchedules.map((sch, index) => ({
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

          syear: new Date().getFullYear().toString(),
          smonth: (new Date().getMonth() + 1).toString().padStart(2, '0'),

          po_rate: 0,
          o_qty: 0,

          type: sch.type || "",
          week: String(index + 1),

          sDate: new Date().toISOString(),

          profcen_cd: profcenCd,

          amend_no: 0,
          user_name: "ADMIN",
          reason: "",

          sch_entry_date: poDate,
          cust_item_code: "",

          batchqty: "",
          prod_head: "",

          our_delv_dt: formatDate(sch.OurDeliveryDate || sch.our_delv_dt),

          remark: sch.Packing || sch.remark || "",

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
        })),

        // ================= EXTRA =================
        period: "",
        mM_DOC_DOCUMNET: "",
        mM_DOC_TYPE: "",
        profceN_CD: profcenCd,
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

                {orderTypes.map((item) => (
                  <MenuItem key={item.custpo_oa_type} value={item.custpo_oa_type}>
                    {item.oa_type_desc} - {item.custpo_oa_type}
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
            setOtherDetails(data);
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


// curl -X 'POST' \
//   'https://localhost:7189/ADD-CUSTOMER_PURCHASE_ORDER' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json-patch+json' \
//   -d '{
//   "custpo_hed_ex": {
//     "cusT_CODE": "stri",
//     "pO_ID": "string",
//     "pO_ID_DT": "2026-03-25T13:57:30.533Z",
//     "pO_NO": "string",
//     "pO_DT": "2026-03-25T13:57:30.533Z",
//     "pO_AMD_NO": "string",
//     "pO_AMD_DT": "2026-03-25T13:57:30.533Z",
//     "pO_VALID": "2026-03-25T13:57:30.533Z",
//     "transport": "s",
//     "octroi": "s",
//     "disC_PER": 0,
//     "remark": "string",
//     "remarK1": "string",
//     "emP_NO": "strin",
//     "suppl_cond": "string",
//     "insurance": "s",
//     "oa_type": "string",
//     "profceN_CD": "str",
//     "useR_NAME": "string",
//     "deli_Terms": "string",
//     "curR_CODE": "strin",
//     "form_type": "strin",
//     "adv_amt": 0,
//     "packing_flag": "s",
//     "packing_amt": 0,
//     "packing_per": 0,
//     "warrantyFlg": "s",
//     "warr_Period": 0,
//     "warr_DMY": "s",
//     "warr_clause": "string",
//     "conv_rate": 0,
//     "trader_disc": 0,
//     "trans_name": "string",
//     "oA_DELEVERY_BY": "string",
//     "oa_catg": "string",
//     "other_PayCond": "string",
//     "delivery_remark": "string",
//     "transport_amt": 0,
//     "buyer": "string",
//     "warr_Period1": 0,
//     "warr_DMY1": "s",
//     "warrCondt1": "string",
//     "warrCondt2": "string",
//     "qc_req": "string",
//     "gauranty_cert": "s",
//     "test_cert": "s",
//     "manuals": "s",
//     "penaulty": "s",
//     "partial_disp": "s",
//     "adv_bank_gauranty": "s",
//     "adv_bank_valid_Dt": "2026-03-25T13:57:30.533Z",
//     "perf_bank_gauranty": "s",
//     "perf_bank_valid_Dt": "2026-03-25T13:57:30.533Z",
//     "lc_no": "string",
//     "lc_date": "2026-03-25T13:57:30.533Z",
//     "lc_valid_Dt": "2026-03-25T13:57:30.533Z",
//     "ref_oa_no": "string",
//     "commissioning_dt": "2026-03-25T13:57:30.533Z",
//     "adv_bank_gauranty_doc_no": "string",
//     "adv_bank_gauranty_doc_date": "2026-03-25T13:57:30.533Z",
//     "perf_bank_gauranty_doc_no": "string",
//     "perf_bank_gauranty_doc_date": "2026-03-25T13:57:30.533Z",
//     "penalty_clause": "string",
//     "oainvamt": 0,
//     "oainvamt_bal": 0,
//     "oainv_disp_amt": 0,
//     "adv_rec": 0
//   },
//   "list_Custpo_det_ex": [
//     {
//       "pO_ID": "string",
//       "pO_ID_DT": "2026-03-25T13:57:30.533Z",
//       "quoT_NO": "string",
//       "quoT_DT": "2026-03-25T13:57:30.533Z",
//       "iteM_NAME": "string",
//       "iteM_CODE": "string",
//       "quantity": 0,
//       "rate": 0,
//       "ratE_WEF": "2026-03-25T13:57:30.533Z",
//       "disC_PER": 0,
//       "pC_CODE": "str",
//       "dispatcH_QTY": 0,
//       "cusT_ITEM_CODE": "string",
//       "curR_CODE": "strin",
//       "uom": "str",
//       "tarifF_CD": "string",
//       "tarifF_DESC": "string",
//       "enq_no": "string",
//       "enq_dt": "2026-03-25T13:57:30.533Z",
//       "sr_no": "stri",
//       "open_oa": "s",
//       "oa_type": "string",
//       "profceN_CD": "str",
//       "pO_AMD_NO": "string",
//       "pO_AMD_DATE": "2026-03-25T13:57:30.533Z",
//       "uL_LOCATION": "string",
//       "invoicE_NO": "string",
//       "invoicE_DT": "2026-03-25T13:57:30.533Z",
//       "poentrY_DATE": "2026-03-25T13:57:30.533Z",
//       "prev_rate": 0,
//       "deg_issue_no": "string",
//       "rate_diff_qty": 0,
//       "cumm_disp_qty": 0,
//       "approve_flag": "s",
//       "approve_by": "string",
//       "approve_date": "2026-03-25T13:57:30.533Z",
//       "oP_CODE": "strin",
//       "amend_res": "string",
//       "amort_rate": 0,
//       "remark": "string",
//       "delivery_dt": "2026-03-25T13:57:30.533Z",
//       "app_flag": "s",
//       "app_by": "string",
//       "app_date": "2026-03-25T13:57:30.533Z",
//       "wo_qty": 0,
//       "prod_head": "strin",
//       "tagged_OA_QTY": 0,
//       "tagged_OA_date": "2026-03-25T13:57:30.533Z",
//       "custItcdRev": "string",
//       "logical_item": "string",
//       "shipping_Cost": 0,
//       "cust_item_desc": "string",
//       "indentQty": 0,
//       "tarifF_CD_NEW": "string",
//       "tecH_SPEC": "string",
//       "temp_dispatchqty": 0,
//       "sgsTdetAmt": 0,
//       "cgsTdetAmt": 0,
//       "igsTdetAmt": 0,
//       "sgsT_Cd": "str",
//       "cgsT_Cd": "str",
//       "igsT_Cd": "str"
//     }
//   ],
//   "list_Custpo_pay_ex": [
//     {
//       "pO_ID": "string",
//       "pO_ID_DT": "2026-03-25T13:57:30.533Z",
//       "percentage": 0,
//       "mode": "s",
//       "period": 0,
//       "dmflag": "s",
//       "pay_cond": 0,
//       "oa_type": "string",
//       "profceN_CD": "str",
//       "sr_no": 0,
//       "adv_tax": 0,
//       "adv_amt": 0,
//       "adv_amt_recd": 0,
//       "pro_inv": "string"
//     }
//   ],
//   "list_Custpo_tax_ex": [
//     {
//       "pO_ID": "string",
//       "pO_ID_DT": "2026-03-25T13:57:30.533Z",
//       "taX_CODE": "str",
//       "taX_AMT": 0,
//       "oa_type": "string",
//       "profceN_CD": "str"
//     }
//   ],
//   "list_Schedule_ex": [
//     {
//       "sr_No": 0,
//       "cusT_CODE": "stri",
//       "iteM_CODE": "string",
//       "pO_ID": "string",
//       "pO_ID_DT": "2026-03-25T13:57:30.533Z",
//       "pC_CODE": "str",
//       "scH_QTY": 0,
//       "scH_VALUE": 0,
//       "moN_PL_QTY": 0,
//       "disP_QTY": 0,
//       "disP_VALUE": 0,
//       "backloG_QTY": 0,
//       "syear": "stri",
//       "smonth": "st",
//       "po_rate": 0,
//       "o_qty": 0,
//       "type": "string",
//       "week": "st",
//       "sDate": "2026-03-25T13:57:30.533Z",
//       "profcen_cd": "str",
//       "amend_no": 0,
//       "user_name": "string",
//       "reason": "string",
//       "sch_entry_date": "2026-03-25T13:57:30.533Z",
//       "cust_item_code": "string",
//       "batchqty": "string",
//       "prod_head": "strin",
//       "our_delv_dt": "2026-03-25T13:57:30.533Z",
//       "ul_location": "string",
//       "wo_qty": 0,
//       "po_no": "string",
//       "po_Dt": "2026-03-25T13:57:30.533Z",
//       "prod_date": "2026-03-25T13:57:30.533Z",
//       "fps_qty": 0,
//       "dispatch_date": "2026-03-25T13:57:30.533Z",
//       "division": "str",
//       "indentqty": 0,
//       "planDisp": 0,
//       "to_sdate": "2026-03-25T13:57:30.533Z"
//     }
//   ],
//   "period": "string",
//   "mM_DOC_DOCUMNET": "string",
//   "mM_DOC_TYPE": "string",
//   "profceN_CD": "string"
// }'
// Request URL
// https://localhost:7189/ADD-CUSTOMER_PURCHASE_ORDER
// Server response
// Code	Details
// 200	
// Response body
// Download
// {
//   "StatusCode": 200,
//   "Message": "CUSTOMER PURCHASE ORDER added successfully."
// }
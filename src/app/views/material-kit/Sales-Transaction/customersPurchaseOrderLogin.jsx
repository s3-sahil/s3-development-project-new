import {
  Autocomplete,
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
import {
  getTaxTermByHSNCode,
  saveCustomerPurchaseOrder,
} from "app/utils/salesTransactionServices";

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
    ulLocation: "",
    degIssueNo: "",
    hsnCode: "",
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

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If Order Date changes → auto calculate Valid Date
    if (name === "orderDate") {
      let validDate = "";

      if (value) {
        const date = new Date(value);
        date.setFullYear(date.getFullYear() + 1);

        // format to yyyy-MM-dd (required for input type="date")
        validDate = date.toISOString().split("T")[0];
      }

      setForm((prev) => ({
        ...prev,
        orderDate: value,
        validDate: validDate,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAdd = () => {
    if (!form.itemCode || !form.quantity || !form.rate) {
      alert("Please fill Item Code, Quantity and Rate");
      return;
    }

    const selectedItem = itemCodes.find(
      (item) => item.ITEM_CODE === form.itemCode,
    );

    const newItem = {
      id: itemTable.length + 1,
      ITEM_CODE: form.itemCode,
      ITEM_NAME: selectedItem?.item_name || "",
      QUANTITY: Number(form.quantity) || 1,
      RATE: Number(form.rate) || 0,
      TARIFF_CD: selectedItem?.HSN_CODE || "",
      UOM: selectedItem?.uom || "PCS",
      DISC_PER: Number(form.discPer) || 0,
      REMARK1: form.remark || "",
      UL_LOCATION: form.ulLocation?.trim() || "MAIN",
      deg_issue_no: form.degIssueNo
        ? String(form.degIssueNo)
        : String(itemTable.length + 1),
      shipping_Cost: Number(form.shippingCost) || 0,
    };

    setItemTable((prev) => [...prev, newItem]);

    // Move temporary schedules from leadObj to global allSchedules
    if (leadObj.List_Schedule_ex && leadObj.List_Schedule_ex.length > 0) {
      setAllSchedules((prev) => {
        const newSchedules = [...prev, ...leadObj.List_Schedule_ex];
        const unique = [];
        const seen = new Set();

        newSchedules.forEach((sch) => {
          const key = `${sch.ITEM_CODE}_${sch.OurDeliveryDate}`;
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(sch);
          }
        });
        return unique;
      });
    }

    // Reset Item inputs and temporary schedule object
    setForm((prev) => ({
      ...prev,
      itemCode: "",
      quantity: "",
      rate: "",
      discPer: "",
      shippingCost: "",
      degIssueNo: "",
      ulLocation: "",
    }));
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

  const fetchTaxByHSN = async (hsn) => {
    try {
      const res = await getTaxTermByHSNCode(hsn);

      const mappedTax = (res?.Data || []).map((t, index) => ({
        id: index + 1,
        code: t.TAX_CODE || t.TaxCode, // ✅ FIX
        desc: t.DESC, // ✅ FIX
        percent: Number(t.PERCENT), // ✅ FIX
        type: t.TaxType, // ✅ IMPORTANT
        amount: Number(t.PERCENT).toFixed(2),
      }));

      console.log("✅ mappedTax:", mappedTax);

      setTaxRows(mappedTax);
    } catch (err) {
      console.error("HSN TAX ERROR:", err);
    }
  };

  const handleSubmit = async () => {
    // Validation
    const { orderType, customer, orderNo, orderDate, currency, salesman } =
      form;

    if (!orderType) {
      alert("Order Type is required");
      return;
    }
    if (!customer) {
      alert("Customer Code is required");
      return;
    }
    if (!orderNo) {
      alert("P.O. No is required");
      return;
    }
    if (!orderDate) {
      alert("P.O. Date is required");
      return;
    }
    if (!currency) {
      alert("Currency is required");
      return;
    }
    if (!salesman) {
      alert("Marketing By (Salesman) is required");
      return;
    }

    if (itemTable.length === 0) {
      alert("Please add at least one item to the list.");
      return;
    }

    const profcen_cd = localStorage.getItem("PROFCEN_CD") || "1";
    const userName = localStorage.getItem("username") || "SYSTEM";
    const poDate = new Date().toISOString();
    const amdNo =
      form.amendNo && form.amendNo.trim() !== "" ? form.amendNo : "0";

    // Helpers
    const formatDate = (dateStr, fallback = new Date().toISOString()) => {
      if (!dateStr) return fallback;
      const d = new Date(dateStr);
      return !isNaN(d.valueOf()) ? d.toISOString() : fallback;
    };
    const getNumber = (val) =>
      val === "" || val === null || val === undefined ? 0 : Number(val);
    const getFlag = (val) =>
      val ? val.toString().charAt(0).toLowerCase() : "s";
    // Header
    const custpo_hed_ex = {
      cusT_CODE: form.customer,
      pO_ID: "string",
      pO_ID_DT: poDate,
      pO_NO: form.orderNo || "",
      pO_DT: formatDate(form.orderDate, true),
      pO_AMD_NO: amdNo,
      pO_AMD_DT: formatDate(form.amendDate, poDate),
      pO_VALID: formatDate(form.validDate, poDate),
      transport: getFlag(otherDetails.transport) || "s",
      octroi: "s",
      disC_PER: getNumber(otherDetails.globalDisc),
      remark: form.remark || "",
      remarK1: "",
      emP_NO: form.salesman || "",
      suppl_cond: otherDetails.otherTerms || "",
      insurance: getFlag(otherDetails.insurance) || "s",
      oa_type: form.orderType || "",
      profceN_CD: profcen_cd,
      useR_NAME: userName,
      deli_Terms: form.dispatchLocation || "",
      curR_CODE: form.currency || "",
      form_type: otherDetails.deliveryTerm || "",
      adv_amt: getNumber(otherDetails.advanceAmt),
      packing_flag: otherDetails.packingType
        ? otherDetails.packingType.charAt(0).toLowerCase()
        : "s",
      packing_amt: getNumber(otherDetails.packingAmt),
      packing_per: getNumber(otherDetails.packingPer),
      trader_disc: getNumber(otherDetails.traderDisc),
      trans_name: otherDetails.transporterName || "",
      transport_amt: getNumber(otherDetails.amount),
      buyer: otherDetails.buyer || "",
      conv_rate: 1,
      gauranty_cert: "N",
      test_cert: "N",
      manuals: "N",
      oainvamt: 0,
      oainvamt_bal: 0,
      oainv_disp_amt: 0,
      adv_rec: 0,
      adv_bank_gauranty: "N",
      adv_bank_gauranty_doc_date: poDate,
      adv_bank_gauranty_doc_no: "",
      adv_bank_valid_Dt: poDate,
      perf_bank_gauranty: "N",
      perf_bank_valid_Dt: poDate,
      perf_bank_gauranty_doc_no: "",
      perf_bank_gauranty_doc_date: poDate,
      lc_no: "",
      lc_date: poDate,
      lc_valid_Dt: poDate,
      ref_oa_no: "",
      commissioning_dt: poDate,
      penalty_clause: "",
      qc_req: "N",
      penaulty: "N",
      delivery_remark: "string",
    };

    // Detail rows
    const list_Custpo_det_ex = itemTable
      .map((item, index) => ({
        sr_no: String(index + 1),
        pO_ID: "string",
        pO_ID_DT: poDate,
        iteM_CODE: item.ITEM_CODE?.trim(),
        iteM_NAME: item.ITEM_NAME || "",
        quantity: Number(item.QUANTITY) || 0,
        rate: Number(item.RATE) || 0,
        ratE_WEF: poDate,
        uom: item.UOM || "PCS",
        curR_CODE: form.currency || "INR",
        disC_PER: Number(item.DISC_PER) || 0,
        tarifF_CD: item.TARIFF_CD || "",
        profceN_CD: profcen_cd,
        remark: item.REMARK1 || "",
        pO_AMD_NO: amdNo,
        pO_AMD_DATE: formatDate(form.amendDate, poDate),
        uL_LOCATION: item.UL_LOCATION || "MAIN",
        deg_issue_no: item.deg_issue_no
          ? String(item.deg_issue_no)
          : String(index + 1),
        pC_CODE: profcen_cd,
        shipping_Cost: Number(item.shipping_Cost) || 0,
        open_oa: "Y",
        oa_type: form.orderType,
      }))
      .filter((item) => item.iteM_CODE);

    // Schedule rows
    const list_Schedule_ex = (allSchedules || [])
      .map((r, index) => {
        const itemData = itemTable.find((it) => it.ITEM_CODE === r.ITEM_CODE);
        const itemRate = itemData ? itemData.RATE : 0;

        return {
          sr_No: index + 1,
          cusT_CODE: form.customer,
          pO_ID: "string",
          pO_ID_DT: poDate,
          iteM_CODE: r.ITEM_CODE?.trim(),
          scH_QTY: Number(r.QUANTITY) || 0,
          scH_VALUE: (Number(r.QUANTITY) || 0) * itemRate,
          mon_pl_qty: 0,
          disp_qty: 0,
          disp_value: 0,
          backlog_qty: 0,
          syear: new Date().getFullYear().toString(),
          smonth: (new Date().getMonth() + 1).toString(),
          po_rate: itemRate,
          o_qty: 0,
          type: "Regular",
          week: "1",
          sDate: poDate,
          our_delv_dt: formatDate(r.OurDeliveryDate, true),
          user_name: userName,
          profcen_cd: profcen_cd,
          pC_CODE: profcen_cd,
          ul_location: itemData?.UL_LOCATION || "MAIN",
          amend_no: Number(amdNo),
          reason: "",
          sch_entry_date: poDate,
          cust_item_code: itemData?.TARIFF_CD || "",
          batchqty: "0",
          prod_head: "",
          wo_qty: 0,
          po_no: form.orderNo,
          po_Dt: formatDate(form.orderDate, true),
        };
      })
      .filter((r) => r.iteM_CODE && r.scH_QTY > 0);

    // Payments & Taxes
    const list_Custpo_pay_ex = (paymentRows || []).map((p, index) => ({
      sr_no: index + 1,
      pO_ID: "string",
      pO_ID_DT: poDate,
      percentage: Number(p.percentage) || 0,
      mode: "s",
      period: Number(p.period) || 0,
      pay_cond: p.pay_cond || 0,
      oa_type: form.orderType || "",
      profceN_CD: profcen_cd,
      dmflag: p.mode === "Immediate" ? "I" : "A",
      adv_tax: 0,
      adv_amt: 0,
      adv_amt_recd: 0,
      pro_inv: "",
    }));

    const list_Custpo_tax_ex = (taxRows || []).map((t, index) => ({
      sr_no: index + 1,
      pO_ID: "string",
      pO_ID_DT: poDate,
      taX_CODE: t.code,
      taX_AMT: Number(t.amount) || 0,
      oa_type: form.orderType || "",
      profceN_CD: profcen_cd,
    }));

    const payload = {
      custpo_hed_ex,
      list_Custpo_det_ex,
      list_Custpo_pay_ex,
      list_Custpo_tax_ex,
      list_Schedule_ex,
      period: "",
      mM_DOC_DOCUMNET: "",
      mM_DOC_TYPE: "",
      profceN_CD: profcen_cd,
    };

    console.log("💾 PAYLOAD BEFORE SAVE:", payload);

    try {
      const res = await saveCustomerPurchaseOrder(payload);
      if (res?.StatusCode === 200) {
        alert("✅ Saved successfully");

        // Optional: Reset form or navigate back
      } else {
        alert(res?.Message || "Save failed");
      }
    } catch (err) {
      console.error(" SAVE ERROR:", err);
      alert(" Failed to save data. Check console for details.");
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
                  <MenuItem
                    key={item.custpo_oa_type}
                    value={item.custpo_oa_type}
                  >
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

            {/* <Grid item xs={12} md={3}>
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
            </Grid> */}
            <Grid item xs={12} md={3}>
              <Autocomplete
                size="small"
                fullWidth
                options={customers || []}
                getOptionLabel={(option) =>
                  `${option.Cust_code} - ${option.Cust_name || ""}`
                }
                // ✅ FIX: match value correctly
                isOptionEqualToValue={(option, value) =>
                  option.Cust_code === value.Cust_code
                }
                value={
                  customers.find((c) => c.Cust_code === form.customer) || null
                }
                onChange={(event, newValue) => {
                  setForm((prev) => ({
                    ...prev,
                    customer: newValue ? newValue.Cust_code : "",
                  }));
                }}
                filterOptions={(options, state) => {
                  const input = state.inputValue.toLowerCase();

                  return options.filter((cust) =>
                    `${cust.Cust_code} ${cust.Cust_name || ""}`
                      .toLowerCase()
                      .includes(input),
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Customer" />
                )}
              />
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
              {/* <Grid item xs={12} md={4}>
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
              </Grid> */}
              <Grid item xs={12} md={4}>
                <Autocomplete
                  size="small"
                  fullWidth
                  options={itemCodes || []}
                  getOptionLabel={(option) =>
                    `${option.ITEM_CODE} - ${option.DESC || ""} - ${option.UOM || ""}`
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.ITEM_CODE === value.ITEM_CODE
                  }
                  value={
                    itemCodes.find((i) => i.ITEM_CODE === form.itemCode) || null
                  }
                  onChange={(event, newValue) => {
                    const hsn = newValue?.HSN_Code || "";
                    setForm((prev) => ({
                      ...prev,
                      itemCode: newValue ? newValue.ITEM_CODE : "",

                      // ✅ AUTO FILL DATA
                      hsnCode: hsn,
                      itemName: newValue?.DESC || "",
                      uom: newValue?.UOM || "",
                    }));
                    if (hsn) {
                      fetchTaxByHSN(hsn);
                    }
                  }}
                  filterOptions={(options, state) => {
                    const input = state.inputValue.toLowerCase();

                    return options.filter((item) =>
                      `${item.ITEM_CODE} ${item.DESC || ""}`
                        .toLowerCase()
                        .includes(input),
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Item Code" />
                  )}
                />
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
                <TextField
                  size="small"
                  fullWidth
                  label="Drawing/Issue No"
                  name="degIssueNo"
                  value={form.degIssueNo}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField size="small" fullWidth label="Item Name" />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
                  label="Shipping Cost"
                  name="shippingCost"
                  value={form.shippingCost}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="HSN Code"
                  value={form.hsnCode || ""}
                  disabled
                  sx={{
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "#fff",
                      color: "#000",
                      cursor: "text !important",
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000",
                      cursor: "text !important",
                    },
                    "& .MuiInputBase-root.Mui-disabled *": {
                      cursor: "text !important", // ✅ force override all children
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc !important",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Unloading Loc"
                  name="ulLocation"
                  value={form.ulLocation}
                  onChange={handleChange}
                />
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

        {/* <TaxTermModal
          open={openTaxModal}
          onClose={() => setOpenTaxModal(false)}
          onSave={(rows) => {
            console.log("Saved Tax Data:", rows);
            setTaxRows(rows);
            setOpenTaxModal(false);
          }}
        /> */}
        <TaxTermModal
          open={openTaxModal}
          defaultRows={taxRows}
          onClose={() => setOpenTaxModal(false)}
          onSave={(rows) => {
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

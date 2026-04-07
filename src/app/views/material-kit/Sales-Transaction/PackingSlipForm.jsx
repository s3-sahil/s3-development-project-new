import {
  Box,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TransporterModal from "./TransporterModal";
import TagDetailsModal from "./TagDetailsModal";
import {
  addPackingSlip,
  fetchCustomerAPI,
  fetchItemcodeAPI,
} from "app/utils/authServices";
import {
  fetchItemCodesByCustomer,
  fetchPackingAndSubType,
} from "app/utils/salesTransactionServices";

const PackingSlipForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState({
    packingType: "",
    subType: "",
    slipNo: "",
    date: "",
    customer: "",
    orderNo: "",
    remark: "",
    poNo: "",
    poDate: "",
    referGrn: false,
    itemCode: "",
    operation: "",
    quantity: "",
    formNo: "",
    formDate: "",
    formType: "",
    currency: "",
  });

  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [openTransporter, setOpenTransporter] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [transporterData, setTransporterData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemCodes, setItemCodes] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [filteredSubTypes, setFilteredSubTypes] = useState([]);
  const isEditMode = !!location.state?.packingSlipDetails;
  const [customers, setCustomers] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    if (state.packingType) {
      loadPackingData();
    }
  }, [state.packingType]);

  const loadPackingData = async () => {
    try {
      const res = await fetchPackingAndSubType(
        localStorage.getItem("login_name"),
      );

      let list = res?.Data || [];

      setPackingList(list);

      // ✅ FILTER based on selected packingType
      const filtered = packingList.filter(
        (item) =>
          item.INV_TYPE?.toUpperCase() === state.packingType?.toUpperCase(),
      );

      setFilteredSubTypes(filtered);

      // reset subtype
      setState((prev) => ({
        ...prev,
        subType: "",
      }));
    } catch (error) {
      console.error(error);
      setFilteredSubTypes([]);
    }
  };
  useEffect(() => {
    loadItemCodes();
    loadCustomers();
    if (isEditMode) {
      const { packingSlipDetails } = location.state;
      const headerData = packingSlipDetails.Header_Data || {};
      const itemData = packingSlipDetails.Detail_Data || [];

      // Map API response to form state
      setState((prev) => ({
        ...prev,
        packingType: headerData.slip_type || "",
        subType: headerData.saleS_TYPE || "",
        slipNo: headerData.slip_No || "",
        date: headerData.slip_dt ? headerData.slip_dt.substring(0, 10) : "",
        customer: headerData.cust_Code || "",
        // orderNo might not be in header, adjust as needed
        remark: headerData.remark || "",
        poNo: headerData.po_Id || "",
        poDate: headerData.po_id_dt ? headerData.po_id_dt.substring(0, 10) : "",
        referGrn: headerData.iS_REFERGIN === "Y",
      }));

      // Populate the items table
      // Note: You may need to map fields from itemData to match your item structure
      setItems(itemData.map((item) => ({ ...item, itemCode: item.item_code })));
    }
  }, [location.state, isEditMode]);

  // Data Binding Logic for Edit Mode
  useEffect(() => {
    if (location.state) {
      const data = location.state;
      console.log("Edit Data Received:", data);

      setState((prev) => ({
        ...prev,
        slipNo: data.Slip_No || data.slip_No || "",
        date: data.Slip_dt
          ? data.Slip_dt.split("T")[0]
          : data.slip_dt
            ? data.slip_dt.split("T")[0]
            : "",
        customer: data.Cust_Code || data.cust_Code || "",
        orderNo: data.po_Id || "", // Assuming Order No is mapped here or needs separate field
        remark: data.remark || "",
        poNo: data.Po_Id || data.po_Id || "",
        poDate: data.po_id_dt ? data.po_id_dt.split("T")[0] : "",
        referGrn: data.IS_REFERGIN === "Y" || data.iS_REFERGIN === "Y",
        packingType: data.slip_type || "",
        subType: data.SALES_TYPE || data.saleS_TYPE || "",
        formNo: data.form_no || "",
        formDate: data.form_date ? data.form_date.split("T")[0] : "",
        formType: data.form_type || "",
        currency: data.CURR_CODE || "",
      }));

      // Set Transporter Data if available in row
      if (data.TRANSPORTER_CODE || data.VEHICLE_NO) {
        setTransporterData({
          transporterCode: data.TRANSPORTER_CODE || "",
          vehicleNo: data.VEHICLE_NO || "",
          transportMode: data.DELEVERY_BY || "",
          transporterOn: data.TRANSPORT === "Y" ? "Our A/c" : "N.A", // Logic might vary based on data
          packFwdAmt: data.PackFWD_amt || "",
          ewayBillNo: data.EwayBill_no || "",
          transporterName: data.trans_name || "",
        });
      }

      // Note: Items items (Table rows) might need a separate API call if they are not in the grid data.
    }
  }, [location.state]);

  // const loadItemCodes = async () => {
  //   const data = await fetchItemcodeAPI();
  //   setItemCodes(data);
  // };

  const loadCustomers = async () => {
    const data = await fetchCustomerAPI();
    setCustomers(data);
  };

  const loadItemCodes = async (custCode) => {
    try {
      setLoadingItems(true);

      const res = await fetchItemCodesByCustomer(custCode);

      let list = [];

      if (Array.isArray(res?.Data)) {
        list = res.Data;
      } else if (Array.isArray(res?.data)) {
        list = res.data;
      } else if (Array.isArray(res)) {
        list = res;
      }

      // optional normalization
      const normalized = list.map((x) => ({
        ITEM_CODE: x.ITEM_CODE || x.ItemCode || "",
        DESC: x.DESC || x.Description || "",
        UOM: x.UOM || "",
      }));

      setItemCodes(normalized);
    } catch (error) {
      console.error(error);
      setItemCodes([]);
    } finally {
      setLoadingItems(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddItem = () => {
    if (!state.itemCode || !state.quantity) return;

    const newItem = {
      itemCode: state.itemCode,
      operation: state.operation,
      quantity: state.quantity,
      formNo: state.formNo,
      formDate: state.formDate,
      formType: state.formType,
      currency: state.currency,
    };

    if (selectedItems.length === 1) {
      const index = selectedItems[0];
      const updatedItems = [...items];
      updatedItems[index] = newItem;
      setItems(updatedItems);
      setSelectedItems([]);
    } else {
      setItems([...items, newItem]);
    }

    // Clear only item-related fields
    setState({
      ...state,
      itemCode: "",
      operation: "",
      quantity: "",
      formNo: "",
      formDate: "",
      formType: "",
      currency: "",
    });
  };

  const handleRemoveItem = () => {
    const updatedItems = items.filter(
      (_, index) => !selectedItems.includes(index),
    );

    setItems(updatedItems);
    setSelectedItems([]);
  };

  const handleItemSelect = (index) => {
    const isSelected = selectedItems.includes(index);

    if (isSelected) {
      // uncheck
      setSelectedItems([]);
      setState((prev) => ({
        ...prev,
        itemCode: "",
        operation: "",
        quantity: "",
        formNo: "",
        formDate: "",
        formType: "",
        currency: "",
      }));
    } else {
      // check
      setSelectedItems([index]);
      const selectedItem = items[index];
      setState((prev) => ({
        ...prev,
        itemCode: selectedItem.itemCode,
        operation: selectedItem.operation,
        quantity: selectedItem.quantity,
        formNo: selectedItem.formNo,
        formDate: selectedItem.formDate,
        formType: selectedItem.formType,
        currency: selectedItem.currency,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = []; // Defined tags to avoid undefined error

    const toNumber = (val) =>
      val !== "" && val !== null && val !== undefined ? Number(val) : 0;

    const toISO = (date) =>
      date ? new Date(date).toISOString() : new Date().toISOString();

    const payload = {
      packingSlip_ex: {
        slip_No: state.slipNo || "",
        slip_dt: toISO(state.date),
        cust_Code: state.customer || "",
        po_Id: state.poNo || "",
        po_id_dt: toISO(state.poDate),
        emp_no: state.empNo || "",
        remark: state.remark || "",
        slip_type: state.packingType || "",
        profcen_cd: localStorage.getItem("PROFCEN_CD") || "",
        saleS_TYPE: state.subType || "",
        iS_REFERGIN: state.referGrn ? "Y" : "N",
        curR_CODE: state.currency || "INR",
        form_type: state.formType || "Invoice",
        form_no: state.formNo || "",
        form_date: toISO(state.formDate),

        transporteR_CODE: transporterData?.transporterCode || "",
        vehiclE_NO: transporterData?.vehicleNo || "",
        deleverY_BY: transporterData?.transportMode || "",
        transport: transporterData?.transporterOn || "",
        packFWD_amt: toNumber(transporterData?.packFwdAmt),
        custMatAmt: 0,
        trans_name: transporterData?.transporterName || "",
        ewayBill_no: transporterData?.ewayBillNo || "",

        uT1_no: state.ut1No || "",
        uT1_date: toISO(state.ut1Date),
        valid_date: toISO(state.validDate),
        discAmount: toNumber(state.discount),

        app_by2: state.appBy2 || "",
        app_date2: toISO(state.appDate2),
        user_name: "ADMIN",
        user_date: new Date().toISOString(),
        app_flag: state.appFlag || "Y",
        app_by: state.appBy || "",
        app_date: toISO(state.appDate),
        app_by1: state.appBy1 || "",
        app_date1: toISO(state.appDate1),
      },

      list_packingslip_detail_ex: items.map((item) => ({
        slip_No: state.slipNo || "",
        slip_dt: toISO(state.date),
        item_code: item.itemCode || "",
        quantity: toNumber(item.quantity),
        emp_no: state.empNo || "",
        heat_code: item.heatCode || "",
        inv_no: item.invNo || "",
        inv_dt: toISO(item.invDate),
        slip_type: state.packingType || "",
        profcen_cd: localStorage.getItem("PROFCEN_CD") || "",
        amend_no: item.amendNo || "",
        amend_dt: toISO(item.amendDate),
        po_Id: state.poNo || "",
        po_id_dt: toISO(state.poDate),
        uL_LOCATION: item.ulLocation || "",
        remark: state.remark || "",
        wt: toNumber(item.weight),
        box_no: item.boxNo || "",
        man_Dt: toISO(item.manDate),
        exp_Dt: toISO(item.expDate),
        batchQty: toNumber(item.batchQty),
        batch_no: item.batchNo || "",
        burnt_per: toNumber(item.burntPer),
        wo_no: item.woNo || "",
        wo_date: toISO(item.woDate),
        cust_Ul_Location: item.custUlLocation || "",
        act_batchqty: toNumber(item.actBatchQty),
        box_uom: item.boxUom || "",
        layout_len: toNumber(item.layoutLen),
        stk_idnt: item.stockIdent || "",
        cust_item_desc: item.custItemDesc || "",
        pcust_code: item.pcustCode || "",
        packingrate: toNumber(item.packingRate),
        sW_flag: item.swFlag || "",
        part_full: item.partFull || "",
        mfG_rate: toNumber(item.mfgRate),
        pack_uom: item.packUom || "",
        dept_Code: item.deptCode || "", // ✅ added
      })),

      list_tag_details_ex: tags.map((tag) => ({
        slip_no: state.slipNo || "",
        slip_date: toISO(state.date),
        inv_no: tag.invNo || "",
        inv_date: toISO(tag.invDate),
        profcen_cd: localStorage.getItem("PROFCEN_CD") || "",
        srno: toNumber(tag.srNo),
        packingtype: tag.packingType || "",
        qty_per_pack: toNumber(tag.qtyPerPack),
        packqty: toNumber(tag.packQty),
        inV_TYPE: tag.invType || "",
        saleS_TYPE: state.subType || "",
        item_code: tag.itemCode || "",
        wt_per_box: toNumber(tag.wtPerBox),
        sub_type: tag.subType || "",
        subpackqty: toNumber(tag.subPackQty),
        pack_remark: tag.packRemark || "",
        ul_Location: tag.ulLocation || "",
        cinv_no: tag.cinvNo || "",
        cinv_Dt: toISO(tag.cinvDate),
        po_id: state.poNo || "",
        tBox_no: tag.tBoxNo || "",
      })),

      // ✅ REQUIRED ROOT FIELDS (missing before)
      period: state.period || "",
      mM_DOC_DOCUMNET: state.doc || "",
      mM_DOC_TYPE: state.docType || "",
      profceN_CD: localStorage.getItem("PROFCEN_CD") || "",
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      const res = await addPackingSlip(payload);
      alert(res.Message);
      navigate("/material/packing-slip-table");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Transactions" }, { name: "Packing Slip" }]}
        />
      </Box>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            background: "#fff",
            padding: 4,
          }}
        >
          <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>
            <TextField
              label="Packing Type"
              name="packingType"
              value={state.packingType}
              onChange={handleChange}
              select
              size="small"
              fullWidth
            >
              <MenuItem value="DOMESTIC">DOMESTIC</MenuItem>
              <MenuItem value="Export">Export</MenuItem>
              <MenuItem value="PROFORMA">PROFORMA</MenuItem>
              <MenuItem value="NON-EXCISE">NON-EXCISE</MenuItem>
              <MenuItem value="SEZ">SEZ</MenuItem>
              <MenuItem value="SERVICE">SERVICE</MenuItem>
              <MenuItem value="DEPOT">DEPOT</MenuItem>
            </TextField>

            <TextField
              label="Sub Type"
              name="subType"
              value={state.subType}
              onChange={handleChange}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">-- Select Sub Type --</MenuItem>

              {filteredSubTypes.map((item, index) => (
                <MenuItem key={index} value={item.SALES_TYPE}>
                  {item.SALES_TYPE}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Slip No"
              name="slipNo"
              value={state.slipNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            <TextField
              type="date"
              label="Date"
              name="date"
              value={state.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />

            {/* <TextField
              label="Customer"
              name="customer"
              value={state.customer}
              onChange={handleChange}
              fullWidth
              size="small"
            /> */}

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
                customers.find((c) => c.Cust_code === state.customer) || null
              }
              onChange={async (event, newValue) => {
                const custCode = newValue ? newValue.Cust_code : "";

                setState((prev) => ({
                  ...prev,
                  customer: custCode,
                  itemCode: "", // ✅ reset item code
                }));

                if (custCode) {
                  await loadItemCodes(custCode);
                } else {
                  setItemCodes([]);
                }
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

            <TextField
              label="Order No"
              name="orderNo"
              value={state.orderNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            <TextField
              label="P.O No"
              name="poNo"
              value={state.poNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            <TextField
              type="date"
              label="P.O Date"
              name="poDate"
              value={state.poDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />

            <TextField
              label="Remark"
              name="remark"
              value={state.remark}
              onChange={handleChange}
              size="small"
              rows={2}
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={state.referGrn}
                  onChange={handleChange}
                  name="referGrn"
                />
              }
              label="Refer GRN"
            />
          </Box>
        </Box>
        <Box
          sx={{
            background: "#fff",
            padding: 4,
            mb: -4,
            mt: -4,
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleAddItem}>
              {selectedItems.length === 1 ? "UPDATE" : "ADD"}
            </Button>

            <Button
              variant="contained"
              color="error"
              disabled={selectedItems.length === 0}
              onClick={handleRemoveItem}
            >
              REMOVE
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenTransporter(true)}
            >
              TRANSPORTER
            </Button>

            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenTagModal(true)}
            >
              TAG DETAILS
            </Button> */}
          </Box>
        </Box>
        <Box
          sx={{
            background: "#fff",
            padding: 4,
          }}
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            gap={3}
            alignItems="center"
          >
            <Autocomplete
              size="small"
              fullWidth
              options={itemCodes || []}
              loading={loadingItems} // ✅ loader
              getOptionLabel={(option) =>
                `${option.ITEM_CODE} - ${option.DESC || ""} - ${option.UOM || ""}`
              }
              isOptionEqualToValue={(option, value) =>
                option.ITEM_CODE === value.ITEM_CODE
              }
              value={
                itemCodes.find((i) => i.ITEM_CODE === state.itemCode) || null
              }
              onChange={(event, newValue) => {
                setState((prev) => ({
                  ...prev,
                  itemCode: newValue ? newValue.ITEM_CODE : "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item Code"
                  disabled={!state.customer} // ✅ disable until customer selected
                />
              )}
            />

            <TextField
              label="Operation"
              name="operation"
              value={state.operation}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={state.quantity}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            gap={3}
            mt={4}
          >
            <TextField
              label="Form No"
              name="formNo"
              value={state.formNo}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            <TextField
              type="date"
              label="Form Date"
              name="formDate"
              value={state.formDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />

            <TextField
              label="Form Type"
              name="formType"
              value={state.formType}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            <TextField
              label="Currency"
              name="currency"
              value={state.currency}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>

          {/* Items Table */}
          {items.length > 0 && (
            <Box mt={4}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell>Item Code</TableCell>
                    <TableCell>Operation</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Form No</TableCell>
                    <TableCell>Form Date</TableCell>
                    <TableCell>Form Type</TableCell>
                    <TableCell>Currency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow
                      key={index}
                      selected={selectedItems.includes(index)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(index)}
                          onChange={() => handleItemSelect(index)}
                        />
                      </TableCell>
                      <TableCell>{item.itemCode}</TableCell>
                      <TableCell>{item.operation}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.formNo}</TableCell>
                      <TableCell>{item.formDate}</TableCell>
                      <TableCell>{item.formType}</TableCell>
                      <TableCell>{item.currency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}

          {/* Save */}
          <Box mt={4} textAlign="right">
            <Button
              type="submit"
              variant="contained"
              startIcon={<Icon>save</Icon>}
            >
              <Span>Save</Span>
            </Button>
          </Box>
        </Box>
      </form>

      {/* Transporter Modal */}
      <TransporterModal
        open={openTransporter}
        onClose={() => setOpenTransporter(false)}
        onSave={(data) => setTransporterData(data)}
      />

      {/* <TagDetailsModal
        open={openTagModal}
        onClose={() => setOpenTagModal(false)}
        onSave={(newTag) => setTags([...tags, newTag])}
      /> */}
    </Container>
  );
};

export default PackingSlipForm;

// {
//   "packingSlip_ex": {
//     "slip_No": "string",
//     "slip_dt": "2026-03-25T14:03:01.135Z",
//     "cust_Code": "strin",
//     "po_Id": "string",
//     "po_id_dt": "2026-03-25T14:03:01.135Z",
//     "emp_no": "strin",
//     "remark": "string",
//     "slip_type": "string",
//     "profcen_cd": "str",
//     "saleS_TYPE": "string",
//     "iS_REFERGIN": "s",
//     "curR_CODE": "strin",
//     "form_type": "strin",
//     "form_no": "string",
//     "form_date": "2026-03-25T14:03:01.135Z",
//     "transporteR_CODE": "stri",
//     "vehiclE_NO": "string",
//     "deleverY_BY": "string",
//     "transport": "s",
//     "packFWD_amt": 0,
//     "custMatAmt": 0,
//     "trans_name": "string",
//     "uT1_no": "string",
//     "uT1_date": "2026-03-25T14:03:01.135Z",
//     "valid_date": "2026-03-25T14:03:01.135Z",
//     "discAmount": 0,
//     "ewayBill_no": "string",
//     "app_by2": "string",
//     "app_date2": "2026-03-25T14:03:01.135Z",
//     "user_name": "string",
//     "user_date": "2026-03-25T14:03:01.135Z",
//     "app_flag": "s",
//     "app_by": "string",
//     "app_date": "2026-03-25T14:03:01.135Z",
//     "app_by1": "string",
//     "app_date1": "2026-03-25T14:03:01.135Z"
//   },
//   "list_packingslip_detail_ex": [
//     {
//       "slip_No": "string",
//       "slip_dt": "2026-03-25T14:03:01.135Z",
//       "item_code": "string",
//       "quantity": 0,
//       "emp_no": "strin",
//       "heat_code": "string",
//       "inv_no": "string",
//       "inv_dt": "2026-03-25T14:03:01.135Z",
//       "slip_type": "string",
//       "profcen_cd": "str",
//       "amend_no": "string",
//       "amend_dt": "2026-03-25T14:03:01.135Z",
//       "po_Id": "string",
//       "po_id_dt": "2026-03-25T14:03:01.135Z",
//       "uL_LOCATION": "string",
//       "remark": "string",
//       "wt": 0,
//       "box_no": "string",
//       "man_Dt": "2026-03-25T14:03:01.135Z",
//       "exp_Dt": "2026-03-25T14:03:01.135Z",
//       "batchQty": 0,
//       "batch_no": "string",
//       "burnt_per": 0,
//       "wo_no": "string",
//       "wo_date": "2026-03-25T14:03:01.135Z",
//       "cust_Ul_Location": "string",
//       "act_batchqty": 0,
//       "box_uom": "str",
//       "layout_len": 0,
//       "stk_idnt": "string",
//       "cust_item_desc": "string",
//       "pcust_code": "stri",
//       "packingrate": 0,
//       "sW_flag": "s",
//       "part_full": "s",
//       "mfG_rate": 0,
//       "pack_uom": "strin",
//       "dept_Code": "string"
//     }
//   ],
//   "list_tag_details_ex": [
//     {
//       "slip_no": "string",
//       "slip_date": "2026-03-25T14:03:01.135Z",
//       "inv_no": "string",
//       "inv_date": "2026-03-25T14:03:01.135Z",
//       "profcen_cd": "str",
//       "srno": 0,
//       "packingtype": "string",
//       "qty_per_pack": 0,
//       "packqty": 0,
//       "inV_TYPE": "string",
//       "saleS_TYPE": "string",
//       "item_code": "string",
//       "wt_per_box": 0,
//       "sub_type": "string",
//       "subpackqty": 0,
//       "pack_remark": "string",
//       "ul_Location": "string",
//       "cinv_no": "string",
//       "cinv_Dt": "2026-03-25T14:03:01.135Z",
//       "po_id": "string",
//       "tBox_no": "string"
//     }
//   ],
//   "period": "string",
//   "mM_DOC_DOCUMNET": "string",
//   "mM_DOC_TYPE": "string",
//   "profceN_CD": "string"
// }

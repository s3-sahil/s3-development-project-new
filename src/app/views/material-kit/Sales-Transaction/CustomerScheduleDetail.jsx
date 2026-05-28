import {
  Box,
  Container,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Icon,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCustomerSchedule,
  updateCustomerSchedule,
} from "app/utils/salesTransactionServices";

const CustomerScheduleDetail = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const isEditMode = !!scheduleId;

  // ✅ DATE FORMAT
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d.toISOString();
  };

  // ✅ HEADER STATE
  const [headerData, setHeaderData] = useState({
    period: "",
    customerCode: "",
    customerName: "",
    date: new Date().toISOString().split("T")[0],
    itemCode: "",
    itemName: "",
    poLoginNo: "",
    poNoDate: "",
    custPartNo: "",
    totalQuantity: 0,
  });

  // ✅ ITEM STATE
  const [itemData, setItemData] = useState({
    scheduleType: "",
    schDate: "",
    ourDeliveryDate: "",
    quantity: "",
    remark: "",
  });

  const [items, setItems] = useState([]);

  // ✅ TOTAL QTY AUTO UPDATE
  useEffect(() => {
    const total = items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );
    setHeaderData((prev) => ({ ...prev, totalQuantity: total }));
  }, [items]);

  // ✅ HANDLE CHANGE
  const handleHeaderChange = (e) => {
    setHeaderData({ ...headerData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  // ✅ NEW BUTTON → ADD ROW
  const handleAddItem = () => {
    if (!itemData.schDate || !itemData.quantity) {
      alert("Sch Date & Quantity required");
      return;
    }

    const newRow = {
      id: Date.now(),

      // 👉 HEADER DATA STORE
      period: headerData.period,
      customerCode: headerData.customerCode,
      customerName: headerData.customerName,
      itemCode: headerData.itemCode,
      itemName: headerData.itemName,
      poLoginNo: headerData.poLoginNo,
      poNoDate: headerData.poNoDate,
      custPartNo: headerData.custPartNo,

      // 👉 ITEM DATA
      ...itemData,
    };

    setItems((prev) => [...prev, newRow]);

    // CLEAR ITEM
    setItemData({
      scheduleType: "",
      schDate: "",
      ourDeliveryDate: "",
      quantity: "",
      remark: "",
    });
  };

  // ✅ DELETE ROW
  const handleDelete = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleSave = async () => {
    if (!items.length) {
      alert("Add at least one item");
      return;
    }

    const payload = {
      list_Schedule_ex: items.map((item, index) => ({
        sr_No: index + 1,

        // ✅ REQUIRED FIELDS (DON'T CHANGE NAMES)
        CUST_CODE: item.customerCode,
        ITEM_CODE: item.itemCode,

        PO_ID: item.poLoginNo,
        PO_ID_DT: formatDate(item.poNoDate),

        profcen_cd: localStorage.getItem("PROFCEN_CD") || "P001",

        SDate: formatDate(item.schDate),

        UL_LOCATION: item.ul_location || "MAIN", // ✅ MUST NOT BE EMPTY

        // ✅ बाकी fields
        pC_CODE: "",
        scH_QTY: Number(item.quantity) || 0,
        scH_VALUE: 0,

        moN_PL_QTY: 0,
        disP_QTY: 0,
        disP_VALUE: 0,
        backloG_QTY: 0,

        syear: item.period || "",
        smonth: "",

        po_rate: 0,
        o_qty: 0,

        type: item.scheduleType || "",
        week: "",

        amend_no: 0,
        user_name: "admin",

        reason: item.remark || "",

        sch_entry_date: new Date().toISOString(),

        cust_item_code: item.custPartNo || "",

        batchqty: "",
        prod_head: "",

        our_delv_dt: formatDate(item.ourDeliveryDate),

        wo_qty: 0,

        po_no: item.poLoginNo,
        po_Dt: formatDate(item.poNoDate),

        prod_date: null,
        fps_qty: 0,
        dispatch_date: null,

        division: "",
        indentqty: 0,
        planDisp: 0,
        to_sdate: null,
      })),
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      if (isEditMode) {
        await updateCustomerSchedule(payload);
        alert("Updated Successfully");
      } else {
        await addCustomerSchedule(payload);
        alert("Saved Successfully");
      }

      navigate("/material/sales-customer-schedule-detail-table");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        {/* ✅ HEADER */}
        <Grid container spacing={2}>
          <Grid item md={3}>
            <TextField
              label="Period"
              name="period"
              value={headerData.period}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              label="Customer Code"
              name="customerCode"
              value={headerData.customerCode}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              label="Customer Name"
              name="customerName"
              value={headerData.customerName}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              type="date"
              label="Date"
              name="date"
              value={headerData.date}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              label="Item Code"
              name="itemCode"
              value={headerData.itemCode}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              label="Item Name"
              name="itemName"
              value={headerData.itemName}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              label="PO Login No"
              name="poLoginNo"
              value={headerData.poLoginNo}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              type="date"
              label="PO Date"
              name="poNoDate"
              value={headerData.poNoDate}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              label="Cust Part No"
              name="custPartNo"
              value={headerData.custPartNo}
              onChange={handleHeaderChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              label="Total Qty"
              value={headerData.totalQuantity}
              fullWidth
              size="small"
              disabled
            />
          </Grid>
        </Grid>

        <Box mt={3} />

        {/* ✅ ITEM ENTRY */}
        <Grid container spacing={2}>
          <Grid item md={2}>
            <TextField
              select
              label="Type"
              name="scheduleType"
              value={itemData.scheduleType}
              onChange={handleItemChange}
              fullWidth
              size="small"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </TextField>
          </Grid>

          <Grid item md={2}>
            <TextField
              type="date"
              label="Sch Date"
              name="schDate"
              value={itemData.schDate}
              onChange={handleItemChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item md={2}>
            <TextField
              type="date"
              label="Delivery Date"
              name="ourDeliveryDate"
              value={itemData.ourDeliveryDate}
              onChange={handleItemChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item md={2}>
            <TextField
              type="number"
              label="Quantity"
              name="quantity"
              value={itemData.quantity}
              onChange={handleItemChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              label="Remark"
              name="remark"
              value={itemData.remark}
              onChange={handleItemChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item md={1}>
            <Button variant="contained" onClick={handleAddItem} fullWidth>
              New
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ✅ TABLE */}
      <Paper sx={{ mt: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Sch Date</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.period}</TableCell>
                <TableCell>{row.customerCode}</TableCell>
                <TableCell>{row.itemCode}</TableCell>
                <TableCell>{row.scheduleType}</TableCell>
                <TableCell>{row.schDate}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(row.id)}
                    color="error"
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default CustomerScheduleDetail;

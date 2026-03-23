import {
  Box,
  Container,
  TextField,
  MenuItem,
  Button,
  Icon,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import {
  addCustomerSchedule,
  updateCustomerSchedule,
} from "app/utils/salesTransactionServices";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CustomerScheduleDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scheduleId } = useParams();
  const isEditMode = !!scheduleId;

  const [headerData, setHeaderData] = useState({
    period: "",
    customerCode: "",
    customerName: "",
    date: new Date().toISOString().split("T")[0],
    itemCode: "",
    itemName: "",
    poLoginNo: "",
    poNoDate: "",
    totalQuantity: "",
    custPartNo: "",
  });

  const [itemData, setItemData] = useState({
    scheduleType: "",
    schDate: "",
    ourDeliveryDate: "",
    quantity: "",
    remark: "",
  });

  const [items, setItems] = useState([]);

  // ✅ Edit Mode Data Load
  useEffect(() => {
    if (isEditMode && location.state) {
      setHeaderData(location.state.header || {});
      setItems(location.state.items || []);
    }
  }, [isEditMode, location.state]);

  // ✅ Auto Total Quantity
  useEffect(() => {
    const total = items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );
    setHeaderData((prev) => ({ ...prev, totalQuantity: total }));
  }, [items]);

  const handleHeaderChange = (e) => {
    setHeaderData({ ...headerData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (!itemData.schDate || !itemData.quantity) {
      alert("Schedule Date and Quantity are required.");
      return;
    }

    setItems([...items, { id: Date.now(), ...itemData }]);

    setItemData({
      scheduleType: "",
      schDate: "",
      ourDeliveryDate: "",
      quantity: "",
      remark: "",
    });
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // ✅ Save (Add + Update)
  const handleSave = async () => {
    if (!headerData.customerCode || !headerData.itemCode) {
      alert("Customer and Item information is required.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one schedule item.");
      return;
    }

    const payload = {
      list_Schedule_ex: items.map((item, index) => ({
        sr_No: index + 1,

        cusT_CODE: headerData.customerCode,
        iteM_CODE: headerData.itemCode,

        pO_ID: headerData.poLoginNo || "",
        pO_ID_DT: headerData.poNoDate
          ? new Date(headerData.poNoDate).toISOString()
          : null,

        po_no: headerData.poLoginNo || "",
        po_Dt: headerData.poNoDate
          ? new Date(headerData.poNoDate).toISOString()
          : null,

        cust_item_code: headerData.custPartNo || "",

        scH_QTY: Number(item.quantity) || 0,
        scH_VALUE: 0,

        type: item.scheduleType || "",
        sDate: item.schDate
          ? new Date(item.schDate).toISOString()
          : null,

        our_delv_dt: item.ourDeliveryDate
          ? new Date(item.ourDeliveryDate).toISOString()
          : null,

        remark: item.remark || "",

        // Defaults
        pC_CODE: "",
        moN_PL_QTY: 0,
        disP_QTY: 0,
        disP_VALUE: 0,
        backloG_QTY: 0,

        syear: headerData.period || "",
        smonth: "",

        po_rate: 0,
        o_qty: 0,

        week: "",

        profcen_cd: "",
        amend_no: 0,
        user_name: "admin",

        reason: "",
        sch_entry_date: new Date().toISOString(),

        batchqty: "",
        prod_head: "",

        ul_location: "",
        wo_qty: 0,

        prod_date: null,
        fps_qty: 0,
        dispatch_date: null,

        division: "",
        indentqty: 0,
        planDisp: 0,

        to_sdate: null,

        // 👉 If update API needs ID
        schedule_id: scheduleId || 0,
      })),
    };

    try {
      if (isEditMode) {
        await updateCustomerSchedule(payload);
        alert("Updated Successfully!");
      } else {
        await addCustomerSchedule(payload);
        alert("Saved Successfully!");
      }

      navigate("/material/sales-customer-schedule-detail-table");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Sales" },
            { name: "Customer Schedule Detail" },
          ]}
        />
      </Box>

      {/* Save Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          <Span>{isEditMode ? "Update" : "Save"}</Span>
        </Button>
      </Box>

      {/* Main Form */}
      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField label="Period" name="period" value={headerData.period} onChange={handleHeaderChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Customer Code" name="customerCode" value={headerData.customerCode} onChange={handleHeaderChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Customer Name" name="customerName" value={headerData.customerName} onChange={handleHeaderChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Date" type="date" name="date" value={headerData.date} onChange={handleHeaderChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField label="Item Code" name="itemCode" value={headerData.itemCode} onChange={handleHeaderChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Item Name" name="itemName" value={headerData.itemName} onChange={handleHeaderChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="PO Login No." name="poLoginNo" value={headerData.poLoginNo} onChange={handleHeaderChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="PO No & Dt" name="poNoDate" value={headerData.poNoDate} onChange={handleHeaderChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField label="Total Quantity" name="totalQuantity" value={headerData.totalQuantity} size="small" fullWidth disabled />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Cust Part No" name="custPartNo" value={headerData.custPartNo} onChange={handleHeaderChange} size="small" fullWidth />
          </Grid>
        </Grid>

        <Box sx={{ my: 4, borderTop: "1px solid #ddd" }} />

        {/* Item Entry */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <TextField select label="Schedule Type" name="scheduleType" value={itemData.scheduleType} onChange={handleItemChange} size="small" fullWidth>
              <MenuItem value="">--Select--</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField type="date" label="Sch Date" name="schDate" value={itemData.schDate} onChange={handleItemChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField type="date" label="Delivery Date" name="ourDeliveryDate" value={itemData.ourDeliveryDate} onChange={handleItemChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField type="number" label="Quantity" name="quantity" value={itemData.quantity} onChange={handleItemChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField label="Remark" name="remark" value={itemData.remark} onChange={handleItemChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={12} md={1}>
            <Button variant="contained" onClick={handleAddItem} fullWidth>
              OK
            </Button>
          </Grid>
        </Grid>

        {/* Table */}
        <Paper sx={{ mt: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length ? (
                items.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.scheduleType}</TableCell>
                    <TableCell>{row.schDate}</TableCell>
                    <TableCell>{row.ourDeliveryDate}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.remark}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemoveItem(row.id)} color="error">
                        <Icon>delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomerScheduleDetail;
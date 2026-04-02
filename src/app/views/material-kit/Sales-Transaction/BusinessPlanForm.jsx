import {
  Container,
  Icon,
  Button,
  TextField,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Breadcrumb } from "app/components";
import {
  addBusinessPlan,
  updateBusinessPlan,
} from "app/utils/salesTransactionServices";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BusinessPlanForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const itemRef = useRef(null);
  const isEditMode = !!location?.state?.businessplan;

  const [formData, setFormData] = useState({
    period: "",
    customer: "",
    type: "",
    status: "",
    item: "",
    custItemCode: "",
    qty: "",
    rate: "",
    amount: "",
  });

  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // ✅ Track edit row

  // ✅ Format Period
  const formatPeriod = (period) => {
    if (!period) return "";

    // If already in YYYY-MM → return directly
    if (/^\d{4}-\d{2}$/.test(period)) {
      return period;
    }

    // If full date → convert to YYYY-MM
    const date = new Date(period);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid Period format");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  };

  // ✅ Load Edit Data
  useEffect(() => {
    if (isEditMode) {
      const data = location?.state?.businessplan || [];

      const mappedRows = data.map((item, index) => ({
        id: index + 1,
        period: item.period,
        cust_Code: item.Cust_Code,
        item_Code: item.Item_Code,
        cust_item_Code: item.Cust_item_Code,
        plan_qty: item.Plan_qty,
        amt: item.Amt,
        rate: item.Rate,
        plan_type: item.Plan_type,
        order_Status: item.Order_Status,
      }));

      setRows(mappedRows);

      if (mappedRows.length > 0) {
        handleRowClick(mappedRows[0], 0);
      }
    }
  }, [isEditMode, location]);

  // ✅ Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "qty" || name === "rate") {
      const qty = name === "qty" ? value : formData.qty;
      const rate = name === "rate" ? value : formData.rate;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        amount: qty && rate ? Number(qty) * Number(rate) : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFocus = (fieldName) => {
    inputRefs.current[fieldName]?.focus();
  };

  // ✅ Row Click → Fill Form
  const handleRowClick = (row, index) => {
    setFormData({
      period: row.period || "",
      customer: row.cust_Code || "",
      type: row.plan_type || "",
      status: row.order_Status || "",
      item: row.item_Code || "",
      custItemCode: row.cust_item_Code || "",
      qty: row.plan_qty || "",
      rate: row.rate || "",
      amount: row.amt || "",
    });

    setEditIndex(index); // ✅ set edit mode
  };

  // ✅ Add OR Update Row
  const handleAdd = () => {
    const newRow = {
      period: formData.period,
      cust_Code: formData.customer,
      item_Code: formData.item,
      cust_item_Code: formData.custItemCode,
      profcen_Cd: "str",
      plan_qty: Number(formData.qty),
      amt: Number(formData.amount),
      curr_Code: "INR",
      curr_amt: Number(formData.amount),
      curr_rate: Number(formData.rate),
      order_qty: 0,
      order_amt: 0,
      rate: Number(formData.rate),
      plan_type: formData.type,
      order_Status: formData.status,
    };

    if (editIndex !== null) {
      // ✅ Update row
      const updatedRows = [...rows];
      updatedRows[editIndex] = newRow;
      setRows(updatedRows);
    } else {
      // ➕ Add new row
      setRows((prev) => [...prev, newRow]);
    }

    // Reset form
    setFormData({
      period: "",
      customer: "",
      type: "",
      status: "",
      item: "",
      custItemCode: "",
      qty: "",
      rate: "",
      amount: "",
    });

    setEditIndex(null); // reset edit mode
  };

  const handleRemove = () => {
    setRows((prev) => prev.slice(0, -1));
    setEditIndex(null);
  };

  const handleSave = async () => {
    try {
      if (rows.length === 0) {
        alert("Please add at least one row");
        return;
      }

      const payload = rows.map((row) => ({
        period: formatPeriod(row.period),
        cust_Code: row.cust_Code,
        item_Code: row.item_Code,
        cust_item_Code: row.cust_item_Code,
        profcen_Cd: row.profcen_Cd || "str",
        plan_qty: Number(row.plan_qty),
        amt: Number(row.amt),
        curr_Code: row.curr_Code || "INR",
        curr_amt: Number(row.curr_amt || row.amt),
        curr_rate: Number(row.curr_rate || row.rate),
        order_qty: Number(row.order_qty || 0),
        order_amt: Number(row.order_amt || 0),
        rate: Number(row.rate),
        plan_type: row.plan_type,
        order_Status: row.order_Status,
      }));

      if (isEditMode) {
        await updateBusinessPlan(payload);
        alert("Updated successfully ✅");
        navigate("/material/sales-business-plan-table");
      } else {
        await addBusinessPlan(payload);
        alert("Saved successfully ✅");
        navigate("/material/sales-business-plan-table");
      }

      setRows([]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Planning" }, { name: "Business Plan" }]}
        />
      </Box>

      {/* Save Button */}
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          {isEditMode ? "Update" : "Save"}
        </Button>
      </Box>

      {/* Form */}
      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          {[
            { label: "Period", name: "period" },
            { label: "Customer", name: "customer" },
            { label: "Type", name: "type" },
            { label: "Status", name: "status" },
            { label: "Item", name: "item" },
            { label: "Cust Item Code", name: "custItemCode" },
          ].map((field) => (
            <Grid item xs={6} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                size="small"
                fullWidth
                inputRef={(el) => (inputRefs.current[field.name] = el)}
              />
            </Grid>
          ))}

          <Grid item xs={4}>
            <TextField
              label="Qty"
              name="qty"
              type="number"
              value={formData.qty}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Rate"
              name="rate"
              type="number"
              value={formData.rate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Amount"
              value={formData.amount}
              size="small"
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
            <Button variant="contained" onClick={() => handleFocus("item")}>
              Change Item
            </Button>

            <Button variant="contained" onClick={() => handleFocus("customer")}>
              Change Customer
            </Button>

            <Button variant="contained" onClick={() => handleFocus("period")}>
              Change Period
            </Button>
            <Button variant="contained" color="success" onClick={handleAdd}>
              {editIndex !== null ? "Update Row" : "Add"}
            </Button>

            <Button variant="contained" color="error" onClick={handleRemove}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Table */}
      <Box mt={3}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(row, index)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{row.item_Code}</TableCell>
                    <TableCell>{row.cust_Code}</TableCell>
                    <TableCell>{row.plan_qty}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>{row.amt}</TableCell>
                    <TableCell>{row.plan_type}</TableCell>
                    <TableCell>{row.order_Status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data added
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

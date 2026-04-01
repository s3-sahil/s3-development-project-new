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
import { addBusinessPlan } from "app/utils/salesTransactionServices";
import { useState } from "react";

export default function BusinessPlanForm() {
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
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBusinessPlan({
        custCode: "", // optional filter
        profcenCd: "",
        period: "",
      });

      console.log("GET API 👉", res);

      const mappedRows = res?.map((item, index) => ({
        id: index + 1, // ⚠️ better use unique id if available
        empNo: item.cust_Code,
        cardNumber: item.item_Code,

        // keep original data for edit
        period: item.period,
        cust_Code: item.cust_Code,
        item_Code: item.item_Code,
        cust_item_Code: item.cust_item_Code,
        plan_qty: item.plan_qty,
        amt: item.amt,
        rate: item.rate,
        plan_type: item.plan_type,
        order_Status: item.order_Status,
      }));

      setRows(mappedRows);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
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

    setRows((prev) => [...prev, newRow]);

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
  };

  const handleRemove = () => {
    setRows((prev) => prev.slice(0, -1));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (rows.length === 0) {
        alert("Please add at least one row");
        return;
      }

      const res = await addBusinessPlan(rows); // ✅ send full array

      console.log("Success 👉", res);
      alert("Saved successfully ✅");

      setRows([]); // clear after save
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
          Save
        </Button>
      </Box>

      {/* Form Card */}
      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Period"
              name="period"
              value={formData.period}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Item"
              name="item"
              value={formData.item}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Cust Item Code"
              name="custItemCode"
              value={formData.custItemCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

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
              label="Amount (INR)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
            <Button variant="contained">Change Item</Button>
            <Button variant="contained">Change Customer</Button>
            <Button variant="contained">Change Period</Button>
            <Button variant="contained" color="success" onClick={handleAdd}>
              Add
            </Button>

            <Button variant="contained" color="error" onClick={handleRemove}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <h4>Added Rows:</h4>

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
                  <TableRow key={index}>
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

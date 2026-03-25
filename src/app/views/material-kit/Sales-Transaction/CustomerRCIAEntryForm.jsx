import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addCustomerRCIAEntry } from "app/utils/salesTransactionServices";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CustomerRCIAEntryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state;

  const initialFormData = {
    customerCode: "",
    invoiceNo: "",
    invoiceDate: "",
    itemCode: "",
    rciaNo: "",
    rciaDate: "",
    invoiceQty: "",
    receivedQty: "",
    acceptedQty: "",
    rejectedQty: "",
    remark: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // 🔹 Edit mode
  useEffect(() => {
    if (editData) {
      setFormData({
        customerCode: editData.cust_code || "",
        invoiceNo: editData.inv_no || "",
        invoiceDate: editData.inv_date
          ? editData.inv_date.split("T")[0]
          : "",
        itemCode: editData.item_code || "",
        rciaNo: editData.rcia_no || "",
        rciaDate: editData.rcia_date
          ? editData.rcia_date.split("T")[0]
          : "",
        invoiceQty: editData.challan_qty || "",
        receivedQty: editData.rec_qty || "",
        acceptedQty: editData.actual_qty || "",
        rejectedQty: editData.reject_qty || "",
        remark: editData.remark || "",
      });
    }
  }, [editData]);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Add or Update Row in Table
  const handleAddOrUpdate = () => {
    if (!formData.customerCode || !formData.invoiceNo) {
      alert("Please fill required fields");
      return;
    }

    const newRow = {
      cust_code: formData.customerCode,
      rcia_no: formData.rciaNo,
      rcia_date: formData.rciaDate,
      inv_no: formData.invoiceNo,
      inv_date: formData.invoiceDate,
      challan_qty: Number(formData.invoiceQty) || 0,
      rec_qty: Number(formData.receivedQty) || 0,
      actual_qty: Number(formData.acceptedQty) || 0,
      reject_qty: Number(formData.rejectedQty) || 0,
      item_code: formData.itemCode,
      remark: formData.remark,
    };

    if (editingIndex !== null) {
      const updatedTableData = [...tableData];
      updatedTableData[editingIndex] = newRow;
      setTableData(updatedTableData);
      setEditingIndex(null);
    } else {
      setTableData((prev) => [...prev, newRow]);
    }

    // Clear form
    setFormData(initialFormData);
  };

  // 🔹 Start editing a row
  const handleStartEdit = (index) => {
    const rowToEdit = tableData[index];
    setFormData({
      customerCode: rowToEdit.cust_code || "",
      invoiceNo: rowToEdit.inv_no || "",
      invoiceDate: rowToEdit.inv_date ? rowToEdit.inv_date.split("T")[0] : "",
      itemCode: rowToEdit.item_code || "",
      rciaNo: rowToEdit.rcia_no || "",
      rciaDate: rowToEdit.rcia_date ? rowToEdit.rcia_date.split("T")[0] : "",
      invoiceQty: rowToEdit.challan_qty || "",
      receivedQty: rowToEdit.rec_qty || "",
      acceptedQty: rowToEdit.actual_qty || "",
      rejectedQty: rowToEdit.reject_qty || "",
      remark: rowToEdit.remark || "",
    });
    setEditingIndex(index);
  };

  // 🔹 Delete Row
  const handleDelete = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null);
      setFormData(initialFormData);
    }
    const updated = tableData.filter((_, i) => i !== index);
    setTableData(updated);
  };

  // 🔹 Save All Data
  const handleSave = async () => {
    if (tableData.length === 0) {
      alert("Please add at least one record");
      return;
    }

    const profcen_Cd = localStorage.getItem("profcen_cd") || "str";

    const payload = tableData.map((row) => ({
      cust_code: row.cust_code,
      rcia_no: row.rcia_no,
      rcia_date: row.rcia_date ? new Date(row.rcia_date).toISOString() : null,
      inv_no: row.inv_no,
      inv_date: row.inv_date ? new Date(row.inv_date).toISOString() : null,
      challan_qty: row.challan_qty,
      actual_qty: row.actual_qty,
      reject_qty: row.reject_qty,
      item_code: row.item_code,
      acc_vou_no: "string",
      rec_qty: row.rec_qty,
      profcen_Cd: profcen_Cd,
      indicator: "s",
      rej_value: 0,
      rate: 0,
      remark: row.remark,
    }));

    try {
      const response = await addCustomerRCIAEntry(payload);
      alert(response?.message || "Saved successfully");
      navigate("/material/sales-customer-RCIA-entry-table");
    } catch (error) {
      console.error(error);
      alert("Failed to save RCIA entry.");
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "TQM" },
            { name: "Customer RCIA Entry" },
          ]}
        />
      </Box>

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2} mb={3}>
        <Button variant="contained" color="primary" onClick={handleAddOrUpdate}>
          {editingIndex !== null ? "Update" : "Add"}
        </Button>

        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      {/* Form */}
      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="Customer Code" name="customerCode" value={formData.customerCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Invoice No" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField type="date" label="Invoice Date" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="RCIA No" name="rciaNo" value={formData.rciaNo} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField type="date" label="RCIA Date" name="rciaDate" value={formData.rciaDate} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Invoice Qty" name="invoiceQty" value={formData.invoiceQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Received Qty" name="receivedQty" value={formData.receivedQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Accepted Qty" name="acceptedQty" value={formData.acceptedQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Rejected Qty" name="rejectedQty" value={formData.rejectedQty} onChange={handleChange} size="small" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} size="small" fullWidth multiline rows={3} />
          </Grid>
        </Grid>
      </Box>

      {/* Table */}
      <Box mt={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Invoice No</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>RCIA No</TableCell>
              <TableCell>Accepted Qty</TableCell>
              <TableCell>Rejected Qty</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.cust_code}</TableCell>
                <TableCell>{row.inv_no}</TableCell>
                <TableCell>{row.item_code}</TableCell>
                <TableCell>{row.rcia_no}</TableCell>
                <TableCell>{row.actual_qty}</TableCell>
                <TableCell>{row.reject_qty}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleStartEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default CustomerRCIAEntryForm;
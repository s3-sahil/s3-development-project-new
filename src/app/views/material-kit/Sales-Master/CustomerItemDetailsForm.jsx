import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Autocomplete,
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
  fetchCustomerAPI,
  saveCustomerItemDetails,
  updateCustomerItemDetails,
} from "app/utils/authServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CustomerItemDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productCode: "",
    productName: "",
    customerItemCode: "",
    customerItemDescription: "",
  });

  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [rows, setRows] = useState([]);
  const location = useLocation();

  const isEditMode = location?.state?.id;
  // ✅ Fetch customers (search)
  const fetchCustomers = async (searchText) => {
    try {
      const res = await fetchCustomerAPI(searchText);

      const normalized = res.map((c) => ({
        id: c.Cust_code,
        name: c.Cust_name,
      }));

      setCustomerOptions(normalized);
    } catch (err) {
      console.error("Customer fetch failed:", err);
      setCustomerOptions([]);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchCustomers("");
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isEditMode && location.state) {
      const data = location.state;

      const row = {
        customerId: data.customerId || "",
        customerName: data.customer || "",
        productCode: data.productCode || "",
        productName: data.productName || "",
        customerItemCode: data.customerItemCode || "",
        customerItemDescription: data.customerItemDescription || "",
      };

      setRows([row]); // load into table

      setSelectedCustomer({
        id: row.customerId,
        name: row.customerName,
      });

      setFormData({
        productCode: row.productCode,
        productName: row.productName,
        customerItemCode: row.customerItemCode,
        customerItemDescription: row.customerItemDescription,
      });
    }
  }, [isEditMode, location.state]);
  // ✅ Add row
  const handleAddRow = () => {
    if (!selectedCustomer) {
      alert("Please select customer");
      return;
    }

    if (!formData.productCode) {
      alert("Enter product code");
      return;
    }

    const newRow = {
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      productCode: formData.productCode,
      productName: formData.productName,
      customerItemCode: formData.customerItemCode,
      customerItemDescription: formData.customerItemDescription,
    };

    setRows((prev) => [...prev, newRow]);

    // clear fields
    setFormData({
      productCode: "",
      productName: "",
      customerItemCode: "",
      customerItemDescription: "",
    });

    setSelectedCustomer(null);
  };

  // ✅ Remove row
  const handleRemoveRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Save API
  const handleSave = async () => {
    try {
      if (rows.length === 0) {
        alert("Add at least one record");
        return;
      }

      const payload = rows.map((r) => ({
        item_Code: r.productCode,
        alternate_item: r.productName,
        cust_Code: r.customerId,
        cust_item_desc: r.customerItemDescription,
      }));

      const res = await saveCustomerItemDetails(payload);

      alert(res.message || "Saved successfully!");

      // ✅ Navigate after success
      navigate("/material/sales-customer-item-details-form-table"); // 👈 change to your route

    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      if (rows.length === 0) {
        alert("No data to update");
        return;
      }

      const payload = rows.map((r) => ({
        item_Code: r.productCode,
        alternate_item: r.productName,
        cust_Code: r.customerId,
        cust_item_desc: r.customerItemDescription,
      }));

      const res = await updateCustomerItemDetails(payload);

      if (res.Success) {
        alert(`Updated ${res.updated} record(s)`);

        navigate("/material/sales-customer-item-details-form-table");
      } else {
        alert("No records updated");
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Sales" }, { name: "Customer Item Details" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <h2></h2>
          <Button
            variant="contained"
            startIcon={<Icon>{isEditMode ? "edit" : "save"}</Icon>}
            onClick={isEditMode ? handleUpdate : handleSave}
          >
            <Span>{isEditMode ? "Update" : "Save"}</Span>
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              size="small"
              options={customerOptions}
              getOptionLabel={(option) => option.name || ""}
              value={selectedCustomer}
              onChange={(e, newValue) => setSelectedCustomer(newValue)}
              onInputChange={(e, value) => fetchCustomers(value)}
              renderInput={(params) => (
                <TextField {...params} label="Customer" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Product Code"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Customer Item Code"
              name="customerItemCode"
              value={formData.customerItemCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Customer Item Description"
              name="customerItemDescription"
              value={formData.customerItemDescription}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={2} display="flex" gap={1}>
          <Button variant="contained" onClick={handleAddRow}>
            Add Detail
          </Button>
        </Box>

        {/* Table */}
        <Box mt={4}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Product Code</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Cust Item Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.productCode}</TableCell>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.customerItemCode}</TableCell>
                  <TableCell>{row.customerItemDescription}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveRow(index)}>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data added
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default CustomerItemDetailsForm;
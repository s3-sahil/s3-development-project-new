import {
  Container,
  Icon,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Breadcrumb } from "app/components";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="lg">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Business Plan" }]} />
      </Box>

      {/* Save Button */}
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button variant="contained" startIcon={<Icon>save</Icon>}>
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
            <Button variant="contained" color="success">Add</Button>
            <Button variant="contained" color="error">Remove</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Icon,
} from "@mui/material";

const PaymentTermsPurchaseOrderModal = ({ open, onClose }) => {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    percentage: "",
    description: "",
    mode: "",
    period: "",
    date: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Save Data
  const handleSave = () => {
    if (!form.percentage || !form.description) return;

    setRows([...rows, form]);

    setForm({
      percentage: "",
      description: "",
      mode: "",
      period: "",
      date: "",
    });
  };

  // Delete Last Row
  const handleDelete = () => {
    const updated = [...rows];
    updated.pop();
    setRows(updated);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Payment Terms
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment Term</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>dd/mm</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                  <TableCell>{row.mode}</TableCell>
                  <TableCell>{row.period}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Form */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Percentage"
              name="percentage"
              value={form.percentage}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              <MenuItem value="">-- Select --</MenuItem>
              <MenuItem value="Advance Milestone">Advance Milestone</MenuItem>
              <MenuItem value="Advance Payment">Advance Payment</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Payment Mode"
              name="mode"
              value={form.mode}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              <MenuItem value="">-- Select --</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Cheque">Cheque</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Period"
              name="period"
              value={form.period}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={3} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>

          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentTermsPurchaseOrderModal;

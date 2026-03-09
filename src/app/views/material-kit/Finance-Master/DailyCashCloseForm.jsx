import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function DailyCashCloseForm() {
  const [formData, setFormData] = useState({
    documentType: "",
    closingDate: "",
    status: "Open",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.documentType && formData.closingDate) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({ documentType: "", closingDate: "", status: "Open", unit: "UNIT-1" });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Daily Cash Close" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Daily Cash Close</Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Document Type"
              size="small"
              fullWidth
              value={formData.documentType}
              onChange={handleChange("documentType")}
            >
              <MenuItem value="Cash Ledger">Cash Ledger</MenuItem>
              <MenuItem value="Sales Ledger">Sales Ledger</MenuItem>
              <MenuItem value="Purchase Ledger">Purchase Ledger</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Closing Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.closingDate}
              onChange={handleChange("closingDate")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Status"
              size="small"
              fullWidth
              value={formData.status}
              onChange={handleChange("status")}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>Add</Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Records</Typography>
          {records.map((rec) => (
            <Box key={rec.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>{`${rec.documentType} - ${rec.closingDate} - ${rec.status}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
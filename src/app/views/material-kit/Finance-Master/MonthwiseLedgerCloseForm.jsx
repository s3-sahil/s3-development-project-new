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

export default function MonthwiseLedgerCloseForm() {
  const [formData, setFormData] = useState({
    documentType: "",
    closingPeriod: "",
    status: "Open",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.documentType && formData.closingPeriod) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({ documentType: "", closingPeriod: "", status: "Open", unit: "UNIT-1" });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Monthwise Ledger Close" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">Monthwise Ledger Close</Typography>
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
              <MenuItem value="Sales Ledger">Sales Ledger</MenuItem>
              <MenuItem value="Purchase Ledger">Purchase Ledger</MenuItem>
              <MenuItem value="General Ledger">General Ledger</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Closing Period (MM/YYYY)"
              size="small"
              fullWidth
              value={formData.closingPeriod}
              onChange={handleChange("closingPeriod")}
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
              <Typography>{`${rec.documentType} - ${rec.closingPeriod} - ${rec.status}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
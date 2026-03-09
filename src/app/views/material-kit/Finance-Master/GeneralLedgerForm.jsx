import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function GeneralLedgerForm() {
  const [formData, setFormData] = useState({
    glCode: "",
    groupCode: "",
    subGroupCode: "",
    glName: "",
    groupCategory: "",
    glSchedule: "",
    gstRetention: "",
    dueDateGovLiability: "",
    inUse: false,
    gplFlag: false,
    glSummary: false,
    purchaseRegFlag: false,
    provisionFlag: false,
    putToUseFlag: false,
    govLiability: false,
    unit: "UNIT-1",
  });

  const [ledgers, setLedgers] = useState([]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleAdd = () => {
    if (formData.glCode && formData.glName && formData.groupCode) {
      setLedgers([...ledgers, { ...formData, id: ledgers.length + 1 }]);
      setFormData({
        glCode: "",
        groupCode: "",
        subGroupCode: "",
        glName: "",
        groupCategory: "",
        glSchedule: "",
        gstRetention: "",
        dueDateGovLiability: "",
        inUse: false,
        gplFlag: false,
        glSummary: false,
        purchaseRegFlag: false,
        provisionFlag: false,
        putToUseFlag: false,
        govLiability: false,
        unit: "UNIT-1",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "General Ledger" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            General Ledger
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="GL Code"
              size="small"
              fullWidth
              value={formData.glCode}
              onChange={handleChange("glCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Group Code"
              size="small"
              fullWidth
              value={formData.groupCode}
              onChange={handleChange("groupCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Sub Group Code"
              size="small"
              fullWidth
              value={formData.subGroupCode}
              onChange={handleChange("subGroupCode")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="General Ledger Name"
              size="small"
              fullWidth
              value={formData.glName}
              onChange={handleChange("glName")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Group Category"
              size="small"
              fullWidth
              value={formData.groupCategory}
              onChange={handleChange("groupCategory")}
            >
              <MenuItem value="Assets">Assets</MenuItem>
              <MenuItem value="Liabilities">Liabilities</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expenses">Expenses</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="GL Schedule"
              size="small"
              fullWidth
              value={formData.glSchedule}
              onChange={handleChange("glSchedule")}
            >
              <MenuItem value="Schedule I">Schedule I</MenuItem>
              <MenuItem value="Schedule II">Schedule II</MenuItem>
              <MenuItem value="Schedule III">Schedule III</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="GST Retention %"
              size="small"
              fullWidth
              value={formData.gstRetention}
              onChange={handleChange("gstRetention")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Due Date For Gov. Liability"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dueDateGovLiability}
              onChange={handleChange("dueDateGovLiability")}
            />
          </Grid>
        </Grid>

        {/* Flags */}
        <Box mt={2}>
          <FormControlLabel
            control={<Checkbox checked={formData.inUse} onChange={handleChange("inUse")} />}
            label="In Use"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.gplFlag} onChange={handleChange("gplFlag")} />}
            label="GPL Flag"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.glSummary} onChange={handleChange("glSummary")} />}
            label="GL Summary"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.purchaseRegFlag} onChange={handleChange("purchaseRegFlag")} />}
            label="Purchase Reg Flag"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.provisionFlag} onChange={handleChange("provisionFlag")} />}
            label="Provision Flag"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.putToUseFlag} onChange={handleChange("putToUseFlag")} />}
            label="Put To Use Flag"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.govLiability} onChange={handleChange("govLiability")} />}
            label="Government Liability"
          />
        </Box>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={handleAdd}>
            Add
          </Button>
        </Box>

        {/* Added Ledgers Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">Added Ledgers</Typography>
          {ledgers.map((ledger) => (
            <Box key={ledger.id} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}>
              <Typography>
                {`${ledger.glCode} - ${ledger.glName} - ${ledger.groupCode} (${ledger.groupCategory})`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
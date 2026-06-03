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
import { addDebtorsBillwiseEntry } from "app/utils/FinanceMasterServices";
import { useState } from "react";

export default function DebtorsBillwiseEntryForm() {
  const [formData, setFormData] = useState({
    subCode: "",
    voucherNo: "",
    voucherDate: "",
    voucherType: "",
    invoiceNo: "",
    invoiceDate: "",
    billAmt: "",
    balanceAmt: "",
    dueDate: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.subCode && formData.voucherNo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        subCode: "",
        voucherNo: "",
        voucherDate: "",
        voucherType: "",
        invoiceNo: "",
        invoiceDate: "",
        billAmt: "",
        balanceAmt: "",
        dueDate: "",
        unit: "UNIT-1",
      });
    }
  };

  const handleChangeSubCode = () => {
    // Example: reset subCode or open a dialog for selection
    setFormData({ ...formData, subCode: "" });
    alert("Change Sub Code clicked!");
  };

  const handleSave = async () => {
    try {
      const payload = {
        vou_no: formData.voucherNo || "",

        vou_type: formData.voucherType || "",

        vou_date: formData.voucherDate
          ? new Date(formData.voucherDate).toISOString()
          : null,

        acc_code: "",

        sub_code: formData.subCode || "",

        invoice_no: formData.invoiceNo || "",

        bill_date: formData.invoiceDate
          ? new Date(formData.invoiceDate).toISOString()
          : null,

        amount: Number(formData.balanceAmt || 0),

        flag: "A",

        bilL_AMT: Number(formData.billAmt || 0),

        recD_AMT: 0,

        duE_DATE: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,

        duE1: 0,
        duE2: 0,
        duE3: 0,
        duE4: 0,
        duE5: 0,

        profcen_cd: localStorage.getItem("PROFCEN_CD") || "",

        dN_Amt: 0,
        cN_Amt: 0,
        jV_Amt: 0,

        user_name: localStorage.getItem("login_name") || "",

        userdate: new Date().toISOString(),

        yyyy_mm: `${new Date().getFullYear()}${String(
          new Date().getMonth() + 1,
        ).padStart(2, "0")}`,

        inV_TYPE: "SALES",

        saleS_TYPE: formData.voucherType || "",

        party_Name: "",

        diff_amt: 0,

        curr_rate: 1,

        currcode: "INR",

        po_no: "",

        rbi_curr_rate: 0,

        rbi_curr_diff: 0,

        curr_Due_Amt: Number(formData.balanceAmt || 0),

        curr_recd_Amt: 0,

        curr_jv_amt: 0,

        curr_cn_Amt: 0,

        curr_dn_Amt: 0,

        rcia_no: "",

        pc_Code: 0,

        bill_amt_curr: Number(formData.billAmt || 0),

        received_Dt: new Date().toISOString(),

        pdc_amt: 0,

        pdc_amt_jv: 0,

        tdSamt: 0,

        otherAmt: 0,

        roundamt: 0,
      };

      console.log("Payload =>", payload);

      await addDebtorsBillwiseEntry(payload);

      alert("Debtors Billwise Entry Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Save Debtors Billwise Entry");
    }
  };
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: "Finace" },
            { name: "Debtors Billwise Entry" },
          ]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Sub Code"
              size="small"
              fullWidth
              value={formData.subCode}
              onChange={handleChange("subCode")}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              startIcon={<Icon>edit</Icon>}
              onClick={handleChangeSubCode}
            >
              Change Sub Code
            </Button>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Voucher No"
              size="small"
              fullWidth
              value={formData.voucherNo}
              onChange={handleChange("voucherNo")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Voucher Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.voucherDate}
              onChange={handleChange("voucherDate")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Voucher Type"
              size="small"
              fullWidth
              value={formData.voucherType}
              onChange={handleChange("voucherType")}
            >
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Purchase">Purchase</MenuItem>
              <MenuItem value="Journal">Journal</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Invoice No"
              size="small"
              fullWidth
              value={formData.invoiceNo}
              onChange={handleChange("invoiceNo")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Invoice Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.invoiceDate}
              onChange={handleChange("invoiceDate")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Bill Amt"
              size="small"
              fullWidth
              value={formData.billAmt}
              onChange={handleChange("billAmt")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Balance Amt"
              size="small"
              fullWidth
              value={formData.balanceAmt}
              onChange={handleChange("balanceAmt")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Due Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dueDate}
              onChange={handleChange("dueDate")}
            />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Added Entries
          </Typography>
          {records.map((rec) => (
            <Box
              key={rec.id}
              sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}
            >
              <Typography>
                {`${rec.subCode} - Voucher: ${rec.voucherNo} (${rec.voucherType}) - Invoice: ${rec.invoiceNo} | Bill: ${rec.billAmt} | Balance: ${rec.balanceAmt} | Due: ${rec.dueDate}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

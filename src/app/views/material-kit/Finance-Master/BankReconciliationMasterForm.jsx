import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  addBankReconciliationMaster,
  updateBankReconciliationMaster,
} from "app/utils/FinanceMasterServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BankReconciliationMasterForm() {
  const [formData, setFormData] = useState({
    bankCode: "",
    bankName: "",
    month: "",
    year: "",
    fromDate: "",
    toDate: "",
    passBookBalance: "",
    bankBookBalance: "",
    issuedNotPresent: "",
    depositedNotCleared: "",
    difference: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (location.state?.isEdit) {
      const data = location.state;

      setIsEdit(true);

      setFormData({
        bankCode: data.bank_code || "",
        bankName: data.party_name || "",
        month: data.yyyy_mm?.substring(4, 6) || "",
        year: data.yyyy_mm?.substring(0, 4) || "",

        fromDate: data.chq_date ? data.chq_date.split("T")[0] : "",

        toDate: data.clear_date ? data.clear_date.split("T")[0] : "",

        passBookBalance: data.chq_amt || "",

        bankBookBalance: "",
        issuedNotPresent: "",
        depositedNotCleared: "",
        difference: "",

        unit: "UNIT-1",
      });
    }
  }, [location.state]);
  
  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleAdd = () => {
    if (formData.bankCode && formData.bankName) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        bankCode: "",
        bankName: "",
        month: "",
        year: "",
        fromDate: "",
        toDate: "",
        passBookBalance: "",
        bankBookBalance: "",
        issuedNotPresent: "",
        depositedNotCleared: "",
        difference: "",
        unit: "UNIT-1",
      });
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        bank_Reco_Master_ex: {
          bank_code: formData.bankCode || "",
          chq_no: "",
          chq_date: new Date(formData.fromDate).toISOString(),
          chq_amt: Number(formData.passBookBalance || 0),

          profcen_cd: localStorage.getItem("PROFCEN_CD") || "",

          clear_flag: "N",
          mode: "M",

          useR_NAME: localStorage.getItem("login_name") || "",

          userdate: new Date().toISOString(),

          clear_date: new Date(formData.toDate).toISOString(),

          vou_no: "",
          vou_date: new Date().toISOString(),

          party_code: "",
          narration: `Bank Reconciliation ${formData.month}/${formData.year}`,

          party_name: formData.bankName || "",

          yyyy_mm: `${formData.year}${String(formData.month).padStart(2, "0")}`,

          flag: "A",
        },

        list_Bank_Reco_Detail_ex: [
          {
            bank_code: formData.bankCode || "",

            vou_no: "",
            vou_type: "BRM",

            cheque_no: "",

            cheque_date: new Date(formData.fromDate).toISOString(),

            amount: Number(formData.difference || 0),

            narration: `Issued Not Present : ${formData.issuedNotPresent}
Deposited Not Cleared : ${formData.depositedNotCleared}`,

            clear_flag: "N",

            clear_date: new Date(formData.toDate).toISOString(),

            profcen_cd: localStorage.getItem("PROFCEN_CD") || "",

            party_name: formData.bankName || "",

            cheque_type: "NORMAL",

            vou_Date: new Date().toISOString(),
          },
        ],
      };

      if (isEdit) {
        await updateBankReconciliationMaster(payload);
        alert("Bank Reconciliation Updated Successfully");
      } else {
        await addBankReconciliationMaster(payload);
        alert("Bank Reconciliation Saved Successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: "Finace" },
            { name: "Bank Reconciliation Master" },
          ]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold"></Typography>
          <Button
            variant="contained"
            startIcon={<Icon>{isEdit ? "edit" : "save"}</Icon>}
            onClick={handleSave}
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Bank Code"
              size="small"
              fullWidth
              value={formData.bankCode}
              onChange={handleChange("bankCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Bank Name"
              size="small"
              fullWidth
              value={formData.bankName}
              onChange={handleChange("bankName")}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Month"
              size="small"
              fullWidth
              value={formData.month}
              onChange={handleChange("month")}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Year"
              size="small"
              fullWidth
              value={formData.year}
              onChange={handleChange("year")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="From Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fromDate}
              onChange={handleChange("fromDate")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="To Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.toDate}
              onChange={handleChange("toDate")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Pass Book Balance"
              size="small"
              fullWidth
              value={formData.passBookBalance}
              onChange={handleChange("passBookBalance")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Bank Book Balance"
              size="small"
              fullWidth
              value={formData.bankBookBalance}
              onChange={handleChange("bankBookBalance")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Issued Not Present"
              size="small"
              fullWidth
              value={formData.issuedNotPresent}
              onChange={handleChange("issuedNotPresent")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Deposited Not Cleared"
              size="small"
              fullWidth
              value={formData.depositedNotCleared}
              onChange={handleChange("depositedNotCleared")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Difference"
              size="small"
              fullWidth
              value={formData.difference}
              onChange={handleChange("difference")}
            />
          </Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Added Records
          </Typography>
          {records.map((rec) => (
            <Box
              key={rec.id}
              sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}
            >
              <Typography>{`${rec.bankCode} - ${rec.bankName} - ${rec.month}/${rec.year} - Diff: ${rec.difference}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

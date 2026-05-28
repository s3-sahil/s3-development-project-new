import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  addPaymentCondition,
  deletePaymentConditionDtlAPI,
} from "app/utils/materialMaterialServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentConditionsForm() {
  const [formData, setFormData] = useState({
    paymentCode: "",
    description: "",
    advanceApplicable: "No",
    inspectionDate: "No",
    lcApplicable: "No",
    invoiceDate: "No",
  });
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        pcdesc: formData.description,
        pC_CODE: Number(formData.paymentCode) || 0,

        advance_condt: formData.advanceApplicable === "Yes" ? "Y" : "N",

        inspection_condition: formData.inspectionDate === "Yes" ? "Y" : "N",
      };

      const res = await addPaymentCondition(payload);

      console.log("API Response:", res);

      alert(res.message || "Saved successfully ✅");

      // reset form
      setFormData({
        paymentCode: "",
        description: "",
        advanceApplicable: "No",
        inspectionDate: "No",
        lcApplicable: "No",
        invoiceDate: "No",
      });
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message || "Save failed ❌");
    }
  };

  // =========================
  // PAYMENT CONDITION DETAIL HANDLE DELETE
  // =========================

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Payment Condition Code ${formData.PC_CODE}?`,
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deletePaymentConditionDtlAPI(formData.PC_CODE);

      alert(
        res?.message ||
          res?.Errormessage ||
          res?.error ||
          "Deleted successfully",
      );

      navigate("/purchase/Payment-Condition-Detail-Table");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Finance" },
            { name: "Payment Conditions Detail" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {mode === "delete" ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<Icon>delete</Icon>}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Payment Code"
              name="paymentCode"
              value={formData.paymentCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <RadioGroup
              row
              name="advanceApplicable"
              value={formData.advanceApplicable}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Advance Applicable - Yes"
              />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>

          <Grid item xs={6}>
            <RadioGroup
              row
              name="inspectionDate"
              value={formData.inspectionDate}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Inspection Date - Yes"
              />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>

          <Grid item xs={6}>
            <RadioGroup
              row
              name="lcApplicable"
              value={formData.lcApplicable}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="LC Applicable - Yes"
              />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>

          <Grid item xs={6}>
            <RadioGroup
              row
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Invoice Date - Yes"
              />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

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
import { useState } from "react";

export default function PaymentConditionsForm() {
  const [formData, setFormData] = useState({
    paymentCode: "",
    description: "",
    advanceApplicable: "No",
    inspectionDate: "No",
    lcApplicable: "No",
    invoiceDate: "No",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Payment Conditions Saved (UI Only)");
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
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
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
              <FormControlLabel value="Yes" control={<Radio />} label="Advance Applicable - Yes" />
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
              <FormControlLabel value="Yes" control={<Radio />} label="Inspection Date - Yes" />
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
              <FormControlLabel value="Yes" control={<Radio />} label="LC Applicable - Yes" />
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
              <FormControlLabel value="Yes" control={<Radio />} label="Invoice Date - Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
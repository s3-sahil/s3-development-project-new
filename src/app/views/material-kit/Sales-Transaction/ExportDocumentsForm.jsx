import {
  Box,
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Icon,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";

const INITIAL_LEAD_OBJ = {
  Customer: "",
  Invoice_No: "",
  Invoice_Date: "",
  Invoice_INR: "",
  Invoice_Currency: "",
  Remark: "",
  Shipping_Bill_No: "",
  Shipping_Bill_Date: "",
  DBK_Submission_Date: "",
  Port_Code: "",
  Rebate_Submission_Date: "",
  Rebate_Number: "",
  Proof_Export_Date: "",
  CHA_Code: "",
  Customer_Approval: false,
  Show_All_Invoice: false,
};

const ExportDocumentsForm = () => {
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const updateFormValue = (field, value) => {
    setLeadObj((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // try {
    //   const payload = {
    //     ...leadObj,
    //   };

    //   console.log("Saving payload:", payload);

    //   const data = await save_Route_api(payload);

    //   if (data?.message) {
    //     alert("Data saved successfully!");
    //   }
    // } catch (error) {
    //   console.error("Save Error:", error);
    // }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Sales" }, { name: "Export Documents" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>
          <TextField
            label="Customer"
            size="small"
            value={leadObj.Customer}
            onChange={(e) => updateFormValue("Customer", e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={leadObj.Customer_Approval}
                onChange={(e) =>
                  updateFormValue("Customer_Approval", e.target.checked)
                }
              />
            }
            label="Customer Approval"
          />

          <TextField
            label="Invoice No"
            size="small"
            value={leadObj.Invoice_No}
            onChange={(e) => updateFormValue("Invoice_No", e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={leadObj.Show_All_Invoice}
                onChange={(e) =>
                  updateFormValue("Show_All_Invoice", e.target.checked)
                }
              />
            }
            label="Show ALL Invoice"
          />

          <TextField
            label="Invoice Amt. in INR"
            size="small"
            value={leadObj.Invoice_INR}
            onChange={(e) => updateFormValue("Invoice_INR", e.target.value)}
          />

          <TextField
            label="Invoice Amt. in Currency"
            size="small"
            value={leadObj.Invoice_Currency}
            onChange={(e) =>
              updateFormValue("Invoice_Currency", e.target.value)
            }
          />

          <TextField
            label="Invoice Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={leadObj.Invoice_Date}
            onChange={(e) => updateFormValue("Invoice_Date", e.target.value)}
          />

          <TextField
            label="Comm. Inv Nos / Remark"
            size="small"
            value={leadObj.Remark}
            onChange={(e) => updateFormValue("Remark", e.target.value)}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>
          <TextField
            label="Shipping Bill No"
            size="small"
            value={leadObj.Shipping_Bill_No}
            onChange={(e) =>
              updateFormValue("Shipping_Bill_No", e.target.value)
            }
          />

          <TextField
            label="Shipping Bill Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={leadObj.Shipping_Bill_Date}
            onChange={(e) =>
              updateFormValue("Shipping_Bill_Date", e.target.value)
            }
          />

          <TextField
            label="DBK Submission Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={leadObj.DBK_Submission_Date}
            onChange={(e) =>
              updateFormValue("DBK_Submission_Date", e.target.value)
            }
          />

          <TextField
            label="Port Code"
            size="small"
            value={leadObj.Port_Code}
            onChange={(e) => updateFormValue("Port_Code", e.target.value)}
          />

          <TextField
            label="Rebate Submission Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={leadObj.Rebate_Submission_Date}
            onChange={(e) =>
              updateFormValue("Rebate_Submission_Date", e.target.value)
            }
          />

          <TextField
            label="Rebate Number"
            size="small"
            value={leadObj.Rebate_Number}
            onChange={(e) => updateFormValue("Rebate_Number", e.target.value)}
          />

          <TextField
            label="Proof Of Export Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={leadObj.Proof_Export_Date}
            onChange={(e) =>
              updateFormValue("Proof_Export_Date", e.target.value)
            }
          />

          <TextField
            label="CHA Code"
            size="small"
            value={leadObj.CHA_Code}
            onChange={(e) => updateFormValue("CHA_Code", e.target.value)}
          />
        </Box>

        <Box display="flex" gap={2} mt={4}>
          <Button variant="contained">Received Documents</Button>

          <Button variant="contained">Other Details</Button>
        </Box>

        <Box mt={4} textAlign="right">
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ExportDocumentsForm;

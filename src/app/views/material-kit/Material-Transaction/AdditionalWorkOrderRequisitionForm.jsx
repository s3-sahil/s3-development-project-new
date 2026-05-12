import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function AdditionalWorkOrderRequisitionForm() {
  const [formData, setFormData] = useState({
    requisitionNo: "",
    date: "",
    workOrderNo: "",
    department: "",
    itemCode: "",
    uom: "",
    quantity: "",
    reason: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = [
        {
          wo_No: formData.workOrderNo,
          wo_Date: formData.date ? new Date(formData.date).toISOString() : null,
          item_Code: formData.itemCode,
          item_Idnt: "", // जर backend value असेल तर fill करा
          qty_Issue: Number(formData.quantity || 0),
          qty_Issued: 0,
          qty_Per_Piece: 0,
          profcen_cd: formData.department || "",
          wotype: "s",
          exc_doc_no: "",
          retok: 0,
          retscrap: 0,
          uom: formData.uom,
          issue_val: 0,
          temp_issued: 0,
          pitem: "",
          approve_by: "",
          approve_date: new Date().toISOString(),
          approve_flag: "s",
        },
      ];

      let response;

      if (formData.workOrderNo) {
        // UPDATE
        response = await updateAdditionalWorkOrderRequisition(payload);
      } else {
        // ADD
        response = await addAdditionalWorkOrderRequisition(payload);
      }

      console.log("API Response:", response);
      alert(response.message || "Saved Successfully");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Additional Work Order Requisition" },
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
              label="Requisition No."
              name="requisitionNo"
              value={formData.requisitionNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Work Order No."
              name="workOrderNo"
              value={formData.workOrderNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Item Code"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="UOM"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

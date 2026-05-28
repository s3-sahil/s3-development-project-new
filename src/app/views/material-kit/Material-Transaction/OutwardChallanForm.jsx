import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { saveOutwardChallan } from "app/utils/materialService";
import { useState } from "react";

export default function OutwardChallanForm() {
  const [formData, setFormData] = useState({
    challanNo: "",
    date: "",
    outwardType: "st",
    supplier: "",
    poNo: "",
    poDate: "",
    vehicleNo: "",
    returnDate: "",
    remark: "",
    billable: false,
    returnable: false,
    packingDetails: false,
    materialValue: "",
    transporter: "",
    ewayBillNo: "",
  });

  const [items, setItems] = useState([
    { item: "", quantity: "", unit: "", remark: "", totalWeight: "", operation: "" },
  ]);

  // 🔹 Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Handle Item Change
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  // 🔹 Add Item Row
  const addItem = () => {
    setItems([...items, { item: "", quantity: "", unit: "", remark: "", totalWeight: "", operation: "" }]);
  };

  // 🔹 Remove Item Row
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // 🔹 Format Date (IMPORTANT)
  const formatDate = (date) => {
    return date ? new Date(date).toISOString() : null;
  };

  // 🔹 Save API
  const handleSave = async () => {
    // ✅ Validation
    if (!formData.challanNo || !formData.date) {
      alert("Challan No and Date are required");
      return;
    }

    if (items.length === 0 || !items[0].item) {
      alert("Please add at least one item");
      return;
    }

    try {
      const profcen_Cd = localStorage.getItem("profcen_cd") || "str";

      const payload = {
        vchal_head_ex: {
          vchaL_NO: formData.challanNo,
          vchaL_DATE: formatDate(formData.date),
          chaltypE_CODE: formData.outwardType,
          profceN_CD: profcen_Cd,
          proJ_CODE: 0,
          venD_CODE: formData.supplier,
          op_code1: formatDate(formData.date),
          exP_RET_DATE: formatDate(formData.returnDate),
          returnable: formData.returnable ? "Y" : "N",
          billable: formData.billable ? "Y" : "N",
          giN_NO: "",
          giN_DATE: formatDate(formData.date),
          excisE_HEAD_NO: "",
          dutY_PERCENT: 0,
          dutY_AMT: 0,
          materiaL_VALUE: Number(formData.materialValue) || 0,
          pO_NO: formData.poNo,
          pO_DATE: formatDate(formData.poDate),
          prinT_FLAG: "N",
          vehiclE_NO: formData.vehicleNo,
          transporteR_CODE: formData.transporter,
          deliverY_BY: "Road",
          user_name: "admin",
          cusT_CODE: "",
          cusT_INV_NO: "",
          remark: formData.remark,
          end_piece: "N",
          ewayBill_no: formData.ewayBillNo,
          sys_Mat_Value: 0,
          sgst_per: 0,
          cgst_per: 0,
          igst_per: 0,
          sgst_amt: 0,
          cgst_amt: 0,
          igst_amt: 0,
          wo_no: "",
          wo_Date: formatDate(formData.date),
        },
        list_Vchal_det_ex: items.map((item, index) => ({
          vchaL_NO: formData.challanNo,
          vchaL_DATE: formatDate(formData.date),
          senD_ITEM_CODE: item.item,
          senD_ITEM_QTY: Number(item.quantity) || 0,
          senD_ITEM_UOM: item.unit,
          exP_ITEM_CODE: item.item,
          exP_ITEM_QTY: Number(item.quantity) || 0,
          exP_ITEM_UOM: item.unit,
          senD_ITEM_WT: Number(item.totalWeight) || 0,
          exP_ITEM_WT: 0,
          received_qty: 0,
          send_receipt: 0,
          child_qty: 0,
          op_code: item.operation,
          op_prev: "",
          temp_receipt: 0,
          profcen_cd: profcen_Cd,
          chaltypE_CODE: formData.outwardType,
          rm_item_idnt: "",
          exc_doc_no: "",
          exc_doc_date: formatDate(formData.date),
          sr_no: index + 1,
          prev_qty: 0,
          scR_qty: 0,
          scR_qty_REC: 0,
          burnT_qty: 0,
          location: "",
          item_SR_No: "",
          man_Dt: formatDate(formData.date),
          exp_Dt: formatDate(formData.date),
          batchqty: 0,
          net_wt: 0,
          itemRate: 0,
          dremark: item.remark,
          deptCode: "",
          reserved_qty: 0,
          tariff_Cd: "",
          exp_items: "",
          saC_Code: "",
          issueBar_qty: 0,
          sgstdet_amt: 0,
          cgstdet_amt: 0,
          igstdet_amt: 0,
          stockType: "",
          rawmat_Cost: 0,
          opncost: 0,
          cumm_opncost: 0,
        })),
        period: "",
        mM_DOC_DOCUMNET: "",
        mM_DOC_TYPE: "",
        profceN_CD: profcen_Cd,
      };

      console.log("Final Payload:", payload);

      const response = await saveOutwardChallan(payload);

      alert(response?.data?.message || "Saved successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save outward challan");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Outward Challan" }]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* SAVE BUTTON */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* TOP ROW */}
          <Grid item xs={3}>
            <TextField label="Challan No." size="small" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Challan No."
              name="challanNo"
              value={formData.challanNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.packingDetails}
                  onChange={handleChange}
                  name="packingDetails"
                />
              }
              label="Packing Details"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* SECOND ROW */}
          <Grid item xs={6} display="flex" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="billable"
                  checked={formData.billable}
                  onChange={handleChange}
                />
              }
              label="Billable"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="returnable"
                  checked={formData.returnable}
                  onChange={handleChange}
                />
              }
              label="Returnable"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="packingDetails"
                  checked={formData.packingDetails}
                  onChange={handleChange}
                />
              }
              label="Packing Details"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Outward Type"
              value="Normal"
              size="small"
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={1.5}>
            <TextField
              label="Material Value"
              name="materialValue"
              value={formData.materialValue}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={1.5}>
            <TextField
              label="Return Date"
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* REMARK */}
          <Grid item xs={6}>
            <TextField
              label="Remarks"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* SUPPLIER SECTION */}
          <Grid item xs={6}>
            <TextField
              label="Supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="PO No."
              name="poNo"
              value={formData.poNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Date"
              type="date"
              name="poDate"
              value={formData.poDate}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* TRANSPORT SECTION */}
          <Grid item xs={3}>
            <TextField
              label="Transporter"
              name="transporter"
              value={formData.transporter}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Transport By"
              value="Road"
              size="small"
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Vehicle No."
              name="vehicleNo"
              value={formData.vehicleNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Eway Bill No."
              name="ewayBillNo"
              value={formData.ewayBillNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* ITEM DETAILS */}
        <Box mt={4}>
          <h4>Item Details</h4>

          {items.map((item, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={2}>
                <TextField
                  label="Item"
                  name="item"
                  value={item.item}
                  onChange={(e) => handleItemChange(index, e)}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={1.5}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={1.5}>
                <TextField
                  label="Unit"
                  name="unit"
                  value={item.unit}
                  onChange={(e) => handleItemChange(index, e)}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Total Weight"
                  name="totalWeight"
                  value={item.totalWeight}
                  onChange={(e) => handleItemChange(index, e)}
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Operation"
                  name="operation"
                  value={item.operation}
                  onChange={(e) => handleItemChange(index, e)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Remark"
                  name="remark"
                  value={item.remark}
                  onChange={(e) => handleItemChange(index, e)}
                  size="small"
                  fullWidth
                />
              </Grid>
              {/* BUTTONS */}
              <Grid item xs={3} display="flex" gap={1}>
                <Button variant="contained" color="secondary" onClick={addItem}>
                  ADD
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

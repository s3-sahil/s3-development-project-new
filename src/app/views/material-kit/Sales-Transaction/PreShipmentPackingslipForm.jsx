import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  MenuItem,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { addPreShipmentPackingSlip } from "app/utils/salesTransactionServices";
import { useState } from "react";

const PreShipmentPackingslipForm = () => {
  const [formData, setFormData] = useState({
    packingType: "",
    subType: "",
    slipNo: "",
    date: "",
    customer: "",
    orderNo: "",
    poNoDate: "",
    itemCode: "",
    operation: "",
    remarkHeader: "",
    quantity: "",
    currency: "",
    itemRemark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const currentDate = formData.date + "T00:00:00"; // important format

      const payload = {
        pR_PACKINGSLIP_ex: {
          slip_No: formData.slipNo || "AUTO",
          slip_dt: currentDate,
          cust_Code: formData.customer || "",
          po_Id: formData.orderNo || "",
          po_id_dt: currentDate,
          emp_no: "admin",
          remark: formData.remarkHeader || "",
          slip_type: formData.packingType || "",
          profcen_cd: "01",
          saleS_TYPE: formData.subType || "",
          iS_REFERGIN: "N",
          curR_CODE: formData.currency || "",
          form_type: "",
          form_no: "",
          form_date: currentDate,
          transporteR_CODE: "",
          vehiclE_NO: "",
          deleverY_BY: "",
          transport: "",
          packFWD_amt: 0,
          custMatAmt: 0,
          trans_name: "",
          uT1_no: "",
          uT1_date: currentDate,
          valid_date: currentDate,
          discAmount: 0,
          ewayBill_no: "",
          app_by2: "",
          app_date2: currentDate,
          user_name: "admin",
          user_date: currentDate,
          app_flag: "N",
          app_by: "",
          app_date: currentDate,
          app_by1: "",
          app_date1: currentDate,
        },

        list_PR_PACKINGSLIP_detail_ex: [
          {
            slip_No: formData.slipNo || "AUTO",
            slip_dt: currentDate,
            item_code: formData.itemCode || "",
            quantity: Number(formData.quantity) || 0,
            emp_no: "admin",
            heat_code: "",
            inv_no: "",
            inv_dt: currentDate,
            slip_type: formData.packingType || "",
            profcen_cd: "01",
            amend_no: "",
            amend_dt: currentDate,
            po_Id: formData.orderNo || "",
            po_id_dt: currentDate,
            uL_LOCATION: "",
            remark: formData.itemRemark || "",
            wt: 0,
            box_no: "",
            man_Dt: currentDate,
            exp_Dt: currentDate,
            batchQty: 0,
            batch_no: "",
            burnt_per: 0,
            wo_no: "",
            wo_date: currentDate,
            cust_Ul_Location: "",
            act_batchqty: 0,
            box_uom: "",
            layout_len: 0,
            stk_idnt: "",
            cust_item_desc: "",
            pcust_code: "",
            packingrate: 0,
            sW_flag: "N",
            part_full: "N",
            mfG_rate: 0,
            pack_uom: "",
            dept_Code: "",
          },
        ],

        list_PR_TAG_DETAILS_ex: [
          {
            slip_no: formData.slipNo || "AUTO",
            slip_date: currentDate,
            inv_no: "",
            inv_date: currentDate,
            profcen_cd: "01",
            srno: 1,
            packingtype: formData.packingType || "",
            qty_per_pack: 0,
            packqty: Number(formData.quantity) || 0,
            inV_TYPE: "",
            saleS_TYPE: formData.subType || "",
            item_code: formData.itemCode || "",
            wt_per_box: 0,
            sub_type: formData.subType || "",
            subpackqty: 0,
            pack_remark: formData.itemRemark || "",
            ul_Location: "",
            cinv_no: "",
            cinv_Dt: currentDate,
            po_id: formData.orderNo || "",
            tBox_no: "",
          },
        ],
      };

      console.log("FINAL PAYLOAD 👉", payload);

      const res = await addPreShipmentPackingSlip(payload);

      alert(res?.Message || "Saved Successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Error ❌");
    }
  };

  const handleAdd = () => {
    console.log("Add Item");
  };

  const handleRemove = () => {
    console.log("Remove Item");
  };

  const handleTransporter = () => {
    console.log("Transporter Click");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "SALES" },
            { name: "PRE Shipment Packingslip" },
          ]}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      <Box p={3} boxShadow={2} borderRadius={2}>
        <Grid container spacing={3}>
          {/* Header Row */}
          <Grid item xs={3}>
            <TextField
              select
              label="Packing Type"
              name="packingType"
              value={formData.packingType}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="BOX">BOX</MenuItem>
              <MenuItem value="PALLET">PALLET</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              select
              label="Sub Type"
              name="subType"
              value={formData.subType}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="EXPORT">EXPORT</MenuItem>
              <MenuItem value="DOMESTIC">DOMESTIC</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Slip No"
              name="slipNo"
              value={formData.slipNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              type="date"
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Second Row */}
          <Grid item xs={6}>
            <TextField
              label="Customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Order No"
              name="orderNo"
              value={formData.orderNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Third Row */}
          <Grid item xs={6}>
            <TextField
              label="Remark"
              name="remarkHeader"
              value={formData.remarkHeader}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="P.O No / Date"
              name="poNoDate"
              value={formData.poNoDate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Item Section */}
          <Grid item xs={4}>
            <TextField
              label="Item Code"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Operation"
              name="operation"
              value={formData.operation}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Item Remark"
              name="itemRemark"
              value={formData.itemRemark}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              ADD
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRemove}
            >
              REMOVE
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={handleTransporter}
            >
              TRANSPORTER
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PreShipmentPackingslipForm;

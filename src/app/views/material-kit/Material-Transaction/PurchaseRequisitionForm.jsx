import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { fetchItemcodeAPI } from "app/utils/authServices";
import axiosInstance from "app/utils/axiosInstance";
import {
  addPurchaseRequisition,
  getPurchaseRequisition,
} from "app/utils/materialTransactionServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PurchaseRequisitionForm() {
  const [formData, setFormData] = useState({});
  const [item, setItem] = useState({
    itemCode: "",
    quantity: "",
    rate: "",
    requiredDate: "",
    remark: "",
    uom: "",
    stock: "",
  });
  const [items, setItems] = useState([]);
  const [itemCodes, setItemCodes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      fetchPRData(location.state);
    }
  }, []);

  const fetchPRData = async (data) => {
    debugger
    try {
      const division = localStorage.getItem("selectedDivision");

      const res = await getPurchaseRequisition({
        prNo: data.prNo,
        date: new Date(data.date).toISOString(),
        division,
      });

      console.log("EDIT DATA:", res?.Data);

      // ✅ Bind Header
      const head = res?.Data?.Indent_head_ex;

      setFormData({
        prNo: head.IND_NO,
        date: head.IND_DATE?.split("T")[0],
        department: head.DEPT_CODE,
        project: head.PROJ_CODE,
        prBy: head.EMP_NO,
        currency: head.currency,
        priority: head.Priority_level,
        approxCost: head.APPROX_COST,
        supplier: head.Supplier,
        remark: head.remark,
      });

      // ✅ Bind Items
      const mappedItems = res.List_Indent_det_ex.map((it) => ({
        itemCode: it.ITEM_CODE,
        quantity: it.QTY,
        rate: it.ITEM_RATE,
        requiredDate: it.REQ_DATE?.split("T")[0],
        remark: it.itemRem,
        uom: it.UOM,
        stock: it.ItemRem,
      }));

      setItems(mappedItems);
    } catch (err) {
      alert("Failed to load data");
    }
  };
  // ---------------- ITEM ----------------
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (!item.itemCode || !item.quantity) {
      alert("Item Code & Quantity required");
      return;
    }

    const exists = items.some((i) => i.itemCode === item.itemCode);
    if (exists) {
      alert("Item already added");
      return;
    }

    setItems((prev) => [...prev, item]);

    setItem({
      itemCode: "",
      quantity: "",
      rate: "",
      requiredDate: "",
      remark: "",
      uom: "",
      stock: "",
    });
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const loadItemCodes = async () => {
    const data = await fetchItemcodeAPI();
    setItemCodes(data);
  };

  // ---------------- FORM ----------------
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---------------- SAVE API ----------------
  const handleSave = async () => {
    try {
      if (!items.length) {
        alert("Add at least one item");
        return;
      }

      const formatDate = (date) => {
        return date ? new Date(date).toISOString() : new Date().toISOString();
      };

      const payload = {
        indent_head_ex: {
          inD_NO: formData.prNo || "",
          inD_DATE: formatDate(formData.date),
          depT_CODE: formData.department || "",
          approX_COST: Number(formData.approxCost || 0),
          remark: formData.remark || "",
          profceN_CD: localStorage.getItem("selectedDivision"),
          proJ_CODE: formData.project || "",
          emP_NO: formData.prBy || "",
          useR_NAME: "admin",
          datE_TIME: new Date().toISOString(),
          approveD_BY: "",
          approvaL_DATE: formatDate(formData.date),
          approval_flag: "N",
          inD_FLAG: "N",
          budget_Doc: "",
          dud_bal: 0,
          reC_AMT: 0,
          priority_level: formData.priority || "",
          supplier: formData.supplier || "",
          currency: formData.currency || "",
        },

        list_Indent_det_ex: items.map((it) => ({
          inD_NO: formData.prNo || "",
          inD_DATE: formatDate(formData.date),
          iteM_CODE: it.itemCode,
          qty: Number(it.quantity || 0),
          reQ_DATE: formatDate(it.requiredDate),
          pO_QTY: 0,
          profceN_CD: localStorage.getItem("selectedDivision"),
          iteM_RATE: Number(it.rate || 0),
          giN_QTY: 0,
          close_item: false,
          itemRem: it.remark || "",
          uom: it.uom || "",
          qty_in_no: Number(it.quantity || 0),
        })),

        period: "2026",
        mM_DOC_DOCUMNET: "PR",
        mM_DOC_TYPE: "PR",
        profceN_CD: localStorage.getItem("selectedDivision"),
      };

      console.log("Payload:", payload);

      const response = await addPurchaseRequisition(payload);

      alert("Saved Successfully");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("API Error");
    }
  };

  useEffect(() => {
    loadItemCodes();
  }, []);
  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Purchase Requisition" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 3 }}>
        {/* SAVE */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        {/* FORM */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="PR No."
              name="prNo"
              value={formData.prNo || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date || ""}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Project"
              name="project"
              value={formData.project || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Department"
              name="department"
              value={formData.department || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="PR By"
              name="prBy"
              value={formData.prBy || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Currency"
              name="currency"
              value={formData.currency || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Priority Level"
              name="priority"
              value={formData.priority || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox name="capitalIndent" onChange={handleChange} />
              }
              label="Capital Indent"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Approx Cost"
              name="approxCost"
              value={formData.approxCost || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Recommended Supplier"
              name="supplier"
              value={formData.supplier || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Remark"
              name="remark"
              value={formData.remark || ""}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* ITEM SECTION */}
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              {/* <TextField
                label="Item Code"
                name="itemCode"
                value={item.itemCode}
                onChange={handleItemChange}
                size="small"
                fullWidth
              /> */}
              <Autocomplete
                size="small"
                fullWidth
                options={itemCodes || []}
                getOptionLabel={(option) =>
                  option?.ITEM_CODE
                    ? `${option.ITEM_CODE} - ${option.DESC || ""} - ${option.UOM || ""}`
                    : ""
                }
                isOptionEqualToValue={(option, value) =>
                  option.ITEM_CODE === value.ITEM_CODE
                }
                value={
                  itemCodes.find((i) => i.ITEM_CODE === item.itemCode) || null
                }
                onChange={(event, newValue) => {
                  setItem((prev) => ({
                    ...prev,
                    itemCode: newValue ? newValue.ITEM_CODE : "",
                    uom: newValue?.UOM || "",
                    remark: newValue?.DESC || "", // optional autofill
                  }));
                }}
                filterOptions={(options, state) => {
                  const input = state.inputValue.toLowerCase();

                  return options.filter((opt) =>
                    `${opt.ITEM_CODE} ${opt.DESC || ""}`
                      .toLowerCase()
                      .includes(input),
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Item Code" />
                )}
              />
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                label="Quantity"
                name="quantity"
                value={item.quantity}
                onChange={handleItemChange}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                label="Rate"
                name="rate"
                value={item.rate}
                onChange={handleItemChange}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Required Date"
                type="date"
                name="requiredDate"
                value={item.requiredDate}
                onChange={handleItemChange}
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="UOM"
                name="uom"
                value={item.uom}
                // onChange={handleItemChange}
                disabled
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Stock"
                name="stock"
                value={item.stock}
                onChange={handleItemChange}
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={handleAddItem}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>

          {/* TABLE */}
          <Box mt={3}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Item Code</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Req Date</TableCell>
                  <TableCell>UOM</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Remark</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.itemCode}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>{row.requiredDate}</TableCell>
                    <TableCell>{row.uom}</TableCell>
                    <TableCell>{row.stock}</TableCell>
                    <TableCell>{row.remark}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemoveItem(i)}>
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

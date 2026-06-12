import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import {
  fetchPackingSlipQuantity,
  fetchPackingTypeAPI,
} from "app/utils/salesTransactionServices";
import { useEffect, useState } from "react";

const PackingTypeModal = ({
  open,
  onClose,
  rows,
  setRows,
  packingType,
  setPackingType,
  boxes,
  setBoxes,
  looseQty,
  setLooseQty,
  itemCode,
  setFinalQuantity,
  selectedItem,
  payValue,
  remark,
  setRemark,
  setPayValue,
}) => {
  const [qtyPerBox, setQtyPerBox] = useState("");
  const [loading, setLoading] = useState(false);
  const [packingTypeOptions, setPackingTypeOptions] = useState([]);

  // ✅ Validation helper for numeric input
  const validateNumericInput = (value) => {
    if (value === "" || value === null) return "";
    const num = parseFloat(value);
    return isNaN(num) || num < 0 ? "" : num.toString();
  };

  useEffect(() => {
    const getPackingType = async () => {
      const response = await fetchPackingTypeAPI();
      debugger
      setPackingTypeOptions(response);
    };

    getPackingType();
  }, []);

  console.log("payValue:", payValue, selectedItem);
  // ✅ ADD ROW - IMPROVED
  const handleAddRow = () => {
    // Validation: Check packing type
    if (!packingType || packingType.trim() === "") {
      alert("Please select packing type first");
      return;
    }

    // Validation: For Box type, check Boxes value
    if (packingType === "Box") {
      if (!boxes || parseFloat(boxes) <= 0) {
        alert("Please enter valid number of boxes");
        return;
      }
      if (!qtyPerBox || parseFloat(qtyPerBox) < 0) {
        alert("Please enter valid quantity per box");
        return;
      }
    }

    // Validation: For Loose type, check Loose Qty
    if (packingType === "Loose") {
      if (!looseQty || parseFloat(looseQty) <= 0) {
        alert("Please enter valid loose quantity");
        return;
      }
    }

    const newRow = {
      srNo: rows.length + 1,
      qty:
        packingType === "Box" ? parseFloat(qtyPerBox || 0) : parseFloat(looseQty || 0),
      total: packingType === "Box" ? parseFloat(boxes || 0) : parseFloat(looseQty || 0),
      itemCode: itemCode || "",
    };

    setRows((prev) => [...prev, newRow]);
    const updatedRows = [...rows, newRow];

    // Update remark based on packing type
    const remarkText = updatedRows
      .map((row, idx) =>
        packingType === "Box"
          ? `Box ${idx + 1}: ${row.qty}/${row.total}`
          : `Loose ${idx + 1}: ${row.qty}`
      )
      .join(" | ");

    setRemark?.(remarkText);

    // Reset input fields after adding row
    if (packingType === "Box") {
      setQtyPerBox("");
    } else {
      setLooseQty("");
    }
  };

  // ✅ REMOVE ROW
  const handleRemoveRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);

    // re-index srNo
    const reIndex = updated.map((row, i) => ({
      ...row,
      srNo: i + 1,
    }));

    setRows(reIndex);
  };

  // ✅ CHANGE ROW (Editable + Auto Calculate)
  const handleRowChange = (index, value) => {
    const numValue = parseFloat(value) || 0;

    // Validation: Prevent negative values
    if (numValue < 0) {
      alert("Negative values are not allowed");
      return;
    }

    const updated = [...rows];
    updated[index].qty = numValue;

    // Auto-calculate total based on packing type
    if (packingType === "Box") {
      // For Box: use the boxes value set at top
      updated[index].total = parseFloat(boxes) || 0;
    } else {
      // For Loose: total = quantity
      updated[index].total = numValue;
    }

    setRows(updated);
  };

  // ✅ Update itemCode in all rows
  useEffect(() => {
    if (itemCode) {
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          itemCode,
        })),
      );
    }
  }, [itemCode]);

  // ✅ CALCULATE BUTTON - IMPROVED
  const handleCalculate = () => {
    // Validation: Check if rows exist
    if (!rows || rows.length === 0) {
      alert("Please add rows before calculating");
      return;
    }

    // Validation: Check if packing type is selected
    if (!packingType || packingType.trim() === "") {
      alert("Please select packing type");
      return;
    }

    let grandTotal = 0;
    let errorRows = [];

    // Calculate total for each row
    rows.forEach((row, index) => {
      const qty = parseFloat(row.qty) || 0;
      const total = parseFloat(row.total) || 0;

      // Validation: Check for negative or invalid values
      if (qty < 0 || total < 0) {
        errorRows.push(index + 1);
        return;
      }

      let rowCalculation = 0;

      if (packingType === "Box") {
        // For Box: only qty per box (no multiplication)
        rowCalculation = qty;
        
        // Validation: Ensure qty is provided for Box type
        if (qty === 0) {
          console.warn(`Row ${index + 1}: Qty is 0 for Box packing`);
        }
      } else if (packingType === "Loose") {
        // For Loose: just the loose quantity
        rowCalculation = qty;
      } else {
        // For other types: use quantity
        rowCalculation = qty;
      }

      grandTotal += rowCalculation;
    });

    // Validation: Show error if any row has invalid values
    if (errorRows.length > 0) {
      alert(`Invalid values in row(s): ${errorRows.join(", ")}`);
      return;
    }

    // Validation: Check if grand total is 0
    if (grandTotal === 0) {
      alert("Calculated total is 0. Please enter valid quantities.");
      return;
    }

    // Round to 2 decimal places for currency/quantity
    const finalTotal = Math.round(grandTotal * 100) / 100;

    console.log("Calculate Details:", {
      packingType,
      rows,
      grandTotal: finalTotal,
    });

    // Send to parent component
    if (setFinalQuantity) {
      setFinalQuantity(finalTotal);
      alert(`Total Quantity: ${finalTotal}\n\nPacking Type: ${packingType}`);
    }
  };

  const handleQtyEnter = async (e) => {
    if (e.key !== "Enter") return;

    try {
      setLoading(true);

      const res = await fetchPackingSlipQuantity({
        Pay_type: payValue,
        Item_Catg_Type: selectedItem?.CATG_CODE || "",
        Profcen_cd: localStorage.getItem("PROFCEN_CD"),
        Period: new Date(localStorage.getItem("toDate"))
          .toISOString()
          .slice(0, 7),
        Item_Code: selectedItem?.ITEM_CODE || "",
      });

      const data = res?.Data || [];

      if (!Array.isArray(data)) return;

      if (data.length === 0) return;

      const newRows = data.map((item, index) => ({
        srNo: rows.length + index + 1,
        qty: Number(item.QTY_PER_BOX || item.qty || 0),
        total: Number(item.TOTAL_BOX || item.total || 0),
        itemCode: itemCode,
      }));

      setRows((prev) => [...prev, ...newRows]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{ sx: { width: 800 } }}
    >
      <DialogTitle>
        Packing Type
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* TOP SECTION */}
        <Box mb={3}>
          <Typography fontWeight={600} mb={1}>
            Packing Details
          </Typography>

          <Box
            sx={{
              border: "1px solid #bdbdbd",
              p: 2,
              mb: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              {/* Packing Type */}
              <Grid item xs={4}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  label="Packing Type"
                  value={packingType}
                  onChange={(e) => setPackingType(e.target.value)}
                >
                  {packingTypeOptions.map((item, index) => (
                    <MenuItem key={index} value={item.packing_type}>
                      {item.packing_type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* BOX */}
              {packingType === "Box" && (
                <>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Boxes"
                      type="number"
                      value={boxes}
                      onChange={(e) => setBoxes(validateNumericInput(e.target.value))}
                      error={boxes === ""}
                      helperText={boxes === "" ? "Required for Box type" : ""}
                      autoComplete="off"
                      inputProps={{ min: 0, step: 1 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Qty / Box"
                      type="number"
                      value={qtyPerBox}
                      onChange={(e) => setQtyPerBox(validateNumericInput(e.target.value))}
                      onKeyDown={handleQtyEnter}
                      error={qtyPerBox === ""}
                      helperText={qtyPerBox === "" ? "Required for Box type" : ""}
                      autoComplete="off"
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </Grid>
                </>
              )}

              {/* LOOSE */}
              {packingType === "Loose" && (
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Loose Qty"
                    type="number"
                    value={looseQty}
                    onChange={(e) => setLooseQty(validateNumericInput(e.target.value))}
                    error={looseQty === ""}
                    helperText={looseQty === "" ? "Required for Loose type" : ""}
                    autoComplete="off"
                    inputProps={{ min: 0, step: 0.01 }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>

        {/* TABLE */}
        <Box mt={3}>
          <Typography fontWeight={600} mb={2}>
            Packing Details Table
          </Typography>
          <Table size="small" border={1}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell>Sr No.</TableCell>

                {packingType === "Box" ? (
                  <>
                    <TableCell>Qty / Box</TableCell>
                    <TableCell>Total Boxes</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>Loose Qty</TableCell>
                    <TableCell>Total Loose</TableCell>
                  </>
                )}

                <TableCell>Item Code</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows && rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={row.srNo || index}> {/* ✅ Use srNo as unique key */}
                    <TableCell>{row.srNo}</TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={row.qty}
                        onChange={(e) => handleRowChange(index, e.target.value)}
                        inputProps={{ step: 0.01 }}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={row.total}
                        disabled
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            color: "black",
                            WebkitTextFillColor: "black",
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.itemCode}
                        disabled
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            color: "black",
                            WebkitTextFillColor: "black",
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => handleRemoveRow(index)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 2, color: "#999" }}>
                    No rows added yet. Click "Add Row" to add items.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        {/* TOTAL SUMMARY */}
        {rows && rows.length > 0 && (
          <Box
            mt={3}
            p={2}
            sx={{
              backgroundColor: "#e8f5e9",
              border: "2px solid #4caf50",
              borderRadius: 1,
            }}
          >
            <Typography fontWeight={700} color="success.dark">
              📊 Summary
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Packing Type:</strong> {packingType}
            </Typography>
            <Typography variant="body2">
              <strong>Total Rows:</strong> {rows.length}
            </Typography>
            <Typography variant="body2">
              <strong>Items in List:</strong>{" "}
              {rows.map((r) => `${r.qty}${packingType === "Box" ? ` × ${r.total}` : ""}`).join(" + ")}
            </Typography>
            <Typography
              variant="h6"
              mt={1}
              sx={{ color: "#2e7d32", fontWeight: 700 }}
            >
              Click "Calculate" to compute total quantity
            </Typography>
          </Box>
        )}

        {/* BUTTONS */}
        <Box
          mt={3}
          display="flex"
          justifyContent="space-between"
          sx={{ borderTop: "1px solid #ddd", pt: 2 }}
        >
          <Button
            variant="contained"
            onClick={handleAddRow}
            disabled={!packingType}
            startIcon={<Icon>add</Icon>}
          >
            Add Row
          </Button>

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleCalculate}
              disabled={!rows || rows.length === 0}
              startIcon={<Icon>calculate</Icon>}
              sx={{ fontWeight: 600 }}
            >
              Calculate Total
            </Button>

            <Button
              variant="outlined"
              onClick={onClose}
              startIcon={<Icon>close</Icon>}
            >
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PackingTypeModal;

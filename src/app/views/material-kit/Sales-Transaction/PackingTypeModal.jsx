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
}) => {
  const [qtyPerBox, setQtyPerBox] = useState("");

  // ✅ ADD ROW
  const handleAddRow = () => {
    const newRow = {
      srNo: rows.length + 1,

      qty:
        packingType === "Box" ? Number(qtyPerBox || 0) : Number(looseQty || 0),

      total: packingType === "Box" ? Number(boxes || 0) : Number(looseQty || 0),

      itemCode: itemCode || "",
    };

    setRows((prev) => [...prev, newRow]);
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

  // ✅ CHANGE (Editable + Auto Calculate)
  const handleRowChange = (index, value) => {
    const updated = [...rows];
    updated[index].qty = value;

    if (packingType === "Box") {
      updated[index].total = Number(boxes || 0); // only boxes
    } else {
      updated[index].total = Number(value || 0);
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

  // ✅ CALCULATE BUTTON
  const handleCalculate = () => {
    let grandTotal = 0;

    rows.forEach((row) => {
      let total = 0;

      if (packingType === "Box") {
        total = Number(row.qty || 0) * Number(row.total || 0);
      } else {
        total = Number(row.qty || 0);
      }

      grandTotal += total;
    });

    // ✅ only send to parent
    if (setFinalQuantity) {
      setFinalQuantity(grandTotal);
    }

    console.log("Grand Total:", grandTotal);
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
                  <MenuItem value="Box">Box</MenuItem>
                  <MenuItem value="Loose">Loose</MenuItem>
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
                      value={boxes}
                      onChange={(e) => setBoxes(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Qty / Box"
                      value={qtyPerBox}
                      onChange={(e) => setQtyPerBox(e.target.value)}
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
                    value={looseQty}
                    onChange={(e) => setLooseQty(e.target.value)}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>

        {/* TABLE */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sr No.</TableCell>

              {packingType === "Box" ? (
                <>
                  <TableCell>Qty / Box</TableCell>
                  <TableCell>Total Boxs</TableCell>
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
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.srNo}</TableCell>

                <TableCell>
                  <TextField
                    size="small"
                    fullWidth
                    value={row.qty}
                    onChange={(e) => handleRowChange(index, e.target.value)}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    size="small"
                    fullWidth
                    value={row.total}
                    disabled
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    size="small"
                    fullWidth
                    value={row.itemCode}
                    disabled
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
            ))}
          </TableBody>
        </Table>

        {/* BUTTONS */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={handleAddRow}>
            Add Row
          </Button>

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleCalculate}
            >
              Calculate
            </Button>

            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PackingTypeModal;

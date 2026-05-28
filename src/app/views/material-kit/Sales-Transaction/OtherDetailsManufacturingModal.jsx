import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const OtherDetailsManufacturingModal = ({
  isOpen,
  onClose,
  leadObj,
  setLeadObj,
}) => {
  const [rows, setRows] = useState([
    {
      ITEM_CODE: "",
      QUANTITY: "",
      CustDeliveryDate: "",
      OurDeliveryDate: "",
      Packing: "",
    },
  ]);

  // 🔥 Autofill when modal opens
  useEffect(() => {
    if (isOpen && leadObj?.List_Custpo_det_ex?.length > 0) {
      const mainRow = leadObj.List_Custpo_det_ex[0];

      setRows([
        {
          ITEM_CODE: mainRow.ITEM_CODE || "",
          QUANTITY: mainRow.QUANTITY || "",
          CustDeliveryDate: "",
          OurDeliveryDate: "",
          Packing: "",
        },
      ]);
    }
  }, [isOpen, leadObj]);

  // 🔥 Handle change
  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // 🔥 Add Row
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        ITEM_CODE: rows[0]?.ITEM_CODE || "",
        QUANTITY: rows[0]?.QUANTITY || "",
        CustDeliveryDate: "",
        OurDeliveryDate: "",
        Packing: "",
      },
    ]);
  };

  // 🔥 Remove Row
  const handleRemoveRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  // 🔥 Save
  const handleSave = () => {
    if (!rows || rows.length === 0) {
      alert("Add at least 1 row");
      return;
    }

    setLeadObj((prev) => ({
      ...prev,
      List_Schedule_ex: rows,
    }));

    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: 1000,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: 700, color: "#6C2BD9" }}
      >
        Manufacturing Schedule
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", left: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Header */}
        <Grid container spacing={2} mb={1}>
          <Grid item xs={2}>
            <Typography fontWeight={600}>Item Code</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight={600}>Quantity</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight={600}>Cust Delivery</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight={600}>Our Delivery</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight={600}>Packing</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight={600}>Action</Typography>
          </Grid>
        </Grid>

        {/* Rows */}
        {rows.map((row, index) => (
          <Grid container spacing={2} mb={2} key={index}>
            <Grid item xs={2}>
              <TextField
                fullWidth
                size="small"
                value={row.ITEM_CODE}
                disabled
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={row.QUANTITY}
                onChange={(e) =>
                  handleChange(index, "QUANTITY", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={row.CustDeliveryDate}
                onChange={(e) =>
                  handleChange(index, "CustDeliveryDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={row.OurDeliveryDate}
                onChange={(e) =>
                  handleChange(index, "OurDeliveryDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                size="small"
                value={row.Packing}
                onChange={(e) =>
                  handleChange(index, "Packing", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={2}>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleRemoveRow(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}

        {/* Add Row Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" onClick={handleAddRow}>
            Add Row
          </Button>
        </Box>

        {/* Footer */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OtherDetailsManufacturingModal;
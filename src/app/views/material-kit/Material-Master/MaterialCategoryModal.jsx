import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";

const MaterialCategoryModal = ({
  open,
  onClose,
  onSave,
  categoryList = [],   // all categories from API
  defaultData = [],    // already selected
}) => {
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState([]);

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  // ================= LOAD DATA =================
  useEffect(() => {
    if (open) {
      const selectedIds = defaultData.map((d) => d.id);

      setSelected(defaultData);

      setAvailable(
        categoryList.filter((c) => !selectedIds.includes(c.id))
      );
    }
  }, [open, categoryList, defaultData]);

  // ================= ADD =================
  const handleAdd = () => {
    if (!selectedLeft) return;

    setSelected((prev) => [...prev, selectedLeft]);
    setAvailable((prev) =>
      prev.filter((item) => item.id !== selectedLeft.id)
    );

    setSelectedLeft(null);
  };

  // ================= REMOVE =================
  const handleRemove = () => {
    if (!selectedRight) return;

    setAvailable((prev) => [...prev, selectedRight]);
    setSelected((prev) =>
      prev.filter((item) => item.id !== selectedRight.id)
    );

    setSelectedRight(null);
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
        Category Selection
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} alignItems="center">

          {/* LEFT LIST */}
          <Grid item xs={5}>
            <Box fontWeight={600} mb={1}>
              Available Categories
            </Box>

            <List sx={{ border: "1px solid #ccc", height: 250, overflow: "auto" }}>
              {available.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    selected={selectedLeft?.id === item.id}
                    onClick={() => setSelectedLeft(item)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* BUTTONS */}
          <Grid item xs={2}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="contained" onClick={handleAdd}>
                Add →
              </Button>

              <Button variant="contained" onClick={handleRemove}>
                ← Remove
              </Button>
            </Box>
          </Grid>

          {/* RIGHT LIST */}
          <Grid item xs={5}>
            <Box fontWeight={600} mb={1}>
              Selected Categories
            </Box>

            <List sx={{ border: "1px solid #ccc", height: 250, overflow: "auto" }}>
              {selected.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    selected={selectedRight?.id === item.id}
                    onClick={() => setSelectedRight(item)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

        </Grid>

        {/* FOOTER */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="contained" onClick={() => onSave(selected)}>
            Save
          </Button>

          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialCategoryModal;
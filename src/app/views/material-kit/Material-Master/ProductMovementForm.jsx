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
import { deleteProductMovementFlowAPI } from "app/utils/materialMaterialServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ProductMovementForm() {
  const [formData, setFormData] = useState({
    fromDepartment: "",
    toDepartment: "",
  });
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Product Movement Saved (UI Only)");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Department Code ${formData.DEPT_CODE}?`,
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deleteProductMovementFlowAPI(formData.DEPT_CODE);

      alert(res?.message || res?.error || "Deleted successfully");

      navigate("/material/Product-Movement-Flow-Table");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Product Movement Flow" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {mode === "delete" ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<Icon>delete</Icon>}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Icon>save</Icon>}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              select
              label="From Department"
              name="fromDepartment"
              value={formData.fromDepartment}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Assembly">Assembly</MenuItem>
              <MenuItem value="Fabrication">Fabrication</MenuItem>
              <MenuItem value="Warehouse">Warehouse</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="To Department"
              name="toDepartment"
              value={formData.toDepartment}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Painting">Painting</MenuItem>
              <MenuItem value="Packing">Packing</MenuItem>
              <MenuItem value="Dispatch">Dispatch</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

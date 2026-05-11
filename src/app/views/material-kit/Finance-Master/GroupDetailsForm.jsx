import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { deleteGroupDetailsAPI } from "app/utils/materialMaterialServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function GroupDetailsForm() {
  const [formData, setFormData] = useState({
    groupCode: "",
    belongsTo: "",
    subGroupApplicable: false,
    desc: "",
    category: "",
    schedule: "",
    unit: "UNIT-1",
  });

  const [records, setRecords] = useState([]);
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) =>
    setFormData({ ...formData, [field]: event.target.value });

  const handleCheckboxChange = (event) =>
    setFormData({ ...formData, subGroupApplicable: event.target.checked });

  const handleAdd = () => {
    if (formData.groupCode && formData.belongsTo) {
      setRecords([...records, { ...formData, id: records.length + 1 }]);
      setFormData({
        groupCode: "",
        belongsTo: "",
        subGroupApplicable: false,
        desc: "",
        category: "",
        schedule: "",
        unit: "UNIT-1",
      });
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Group Code ${formData.Group_code}?`,
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deleteGroupDetailsAPI(formData.Group_code);

      alert(
        res?.message ||
          res?.Errormessage ||
          res?.error ||
          "Deleted successfully",
      );

      navigate("/finance/Group-Details-Table");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "Finace" }, { name: "Group Details" }]}
        />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}></Typography>

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
              // onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          )}
        </Box>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Group Code"
              size="small"
              fullWidth
              value={formData.groupCode}
              onChange={handleChange("groupCode")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Group Belongs To"
              size="small"
              fullWidth
              value={formData.belongsTo}
              onChange={handleChange("belongsTo")}
            >
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Operations">Operations</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.subGroupApplicable}
                  onChange={handleCheckboxChange}
                />
              }
              label="Sub Group Applicable"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Group Desc"
              size="small"
              fullWidth
              value={formData.desc}
              onChange={handleChange("desc")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              label="Group Category"
              size="small"
              fullWidth
              value={formData.category}
              onChange={handleChange("category")}
            >
              <MenuItem value="Assets">Assets</MenuItem>
              <MenuItem value="Liabilities">Liabilities</MenuItem>
              <MenuItem value="Expenses">Expenses</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              label="Schedule"
              size="small"
              fullWidth
              value={formData.schedule}
              onChange={handleChange("schedule")}
            >
              <MenuItem value="Schedule I">Schedule I</MenuItem>
              <MenuItem value="Schedule II">Schedule II</MenuItem>
              <MenuItem value="Schedule III">Schedule III</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>

        {/* Preview */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Added Groups
          </Typography>
          {records.map((rec) => (
            <Box
              key={rec.id}
              sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1, mb: 1 }}
            >
              <Typography>{`${rec.groupCode} | ${rec.belongsTo} | SubGroup: ${rec.subGroupApplicable ? "Yes" : "No"} | ${rec.desc} | ${rec.category} | ${rec.schedule}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Icon,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function AssignCardForm() {
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state;

  const [formData, setFormData] = useState({
    cardNo: "",
    empNo: "",
    assignDate: "",
    unit: "UNIT-1",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Assign Cards" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
          </Typography>
          <Button variant="contained" startIcon={<Icon>save</Icon>}>Save</Button>
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}>
            <TextField
              label="Card Number"
              size="small"
              fullWidth
              value={formData.cardNo}
              onChange={handleChange("cardNo")}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              size="small"
              fullWidth
              value={formData.empNo}
              onChange={handleChange("empNo")}
              displayEmpty
            >
              <MenuItem value="">Select Employee</MenuItem>
              <MenuItem value="00001">00001</MenuItem>
              <MenuItem value="00100">00100</MenuItem>
              <MenuItem value="00101">00101</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Assign Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.assignDate}
              onChange={handleChange("assignDate")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function RouteForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state;

  const [formData, setFormData] = useState({
    routeFrom: "",
    routeTo: "",
    routeDetails: "",
    routeKM: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    navigate("/material/route-table");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Route Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            {id ? "Edit Route" : "New Route"}
          </Typography>

          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Route From"
              size="small"
              fullWidth
              value={formData.routeFrom}
              onChange={handleChange("routeFrom")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Route To"
              size="small"
              fullWidth
              value={formData.routeTo}
              onChange={handleChange("routeTo")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Route Details"
              size="small"
              fullWidth
              value={formData.routeDetails}
              onChange={handleChange("routeDetails")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Route KM"
              type="number"
              size="small"
              fullWidth
              value={formData.routeKM}
              onChange={handleChange("routeKM")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
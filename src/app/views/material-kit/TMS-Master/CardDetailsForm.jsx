import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CardDetailsForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state;

  const [formData, setFormData] = useState({
    cardNumber: "",
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
    console.log("Saved:", formData);

    // 👉 Call your API here

    navigate("/material/card-details");
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Card Details" }]} />
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, background: "#fff" }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
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
          <Grid item xs={4}>
            <TextField
              label="Card Number"
              size="small"
              fullWidth
              value={formData.cardNumber}
              onChange={handleChange("cardNumber")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
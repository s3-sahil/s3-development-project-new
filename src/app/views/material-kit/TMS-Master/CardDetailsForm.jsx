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
import { saveCardDetails } from "app/utils/authServices";
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

  //
  const confirmDelete = () => {
    alert("Delete functionality not implemented");
  };

  //const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const [actionMode, setActionMode] = useState("new");

  const [saveMode, setSaveMode] = useState(false);  
  const isEdit = location.pathname.includes("edit");

  
  //

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  
    // useEffect(() => {
    //   if (location.state) {
    //     setActionMode("edit");
    //     setSaveMode(true);
  
    //     const data = location.state;
  
    //     setFormData({
    //       Card_No : data.cardNumber || "",
    //     });
    //   }
    // }, [location.state]);
  

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSave = async () => {
    // console.log("Saved:", formData);

    // // 👉 Call your API here

    // navigate("/material/card-details");
    if (isSaving) return;

    setIsSaving(true);

    try
    {
      const payload = formData.cardNumber;
      // {
      //   Card_No : formData.cardNumber
      // };

      console.log("Saving Payload:", payload);
      
            const result = await saveCardDetails(payload);
      
            if (result) {
              alert(result.message || "Saved Successfully");
      
              navigate("/material/TMS-card-details-table", {
                state: { refresh: true },
              });
            }
    } 
    catch (err)
    {
      console.error("Save error:", err, errorm = err.message);
      alert("Save failed");
    }
    finally
    {
      setIsSaving(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[
          { name: "TMS" }, 
          { name: isEdit ? "Edit Card Details" :  "Add Card Details" }]} />
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
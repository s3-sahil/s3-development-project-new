import { Box, Container, TextField, Button, Icon, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import {
  ContractReviewChecklistDetailsAdd,
} from "app/utils/authServices";
import { useLocation, useNavigate } from "react-router-dom";



const ContractReviewChecklistForm = () => {
  const [formData, setFormData] = useState({
    checklistCode: "",
    checklistDescription: "",
  });

    const [actionMode, setActionMode] = useState("new"); // new | edit
    const navigate = useNavigate();
    const location = useLocation(); // for edit data
    const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   // 🔹 Save (Add / Update)
  const handleSave = async () => {
    if (
      !formData.checklistCode ||
      !formData.checklistDescription
    ) {
      alert("Please fill all required fields");
      return;
    }

    //const nameParts = formData.Description.trim().split(" ");

    const payload = {
      check_list_code: formData.checklistCode,
      Description: formData.checklistDescription,
    };

    try {
      setLoading(true);

      await ContractReviewChecklistDetailsAdd(payload); // same API for add/update

      alert(
        actionMode === "edit"
          ? "Contract Review Checklist updated successfully!"
          : "Contract Review Checklist added successfully!"
      );

      navigate("/material/sales-contract-review-checklist-form-table"); // go back to table
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save salesman");
    } finally {
      setLoading(false);
    }
  };


  // 🔹 If Edit mode, fetch full record
        const fetchEditData = async (check_list_code) => {
          try {
            const res = await ContactReviewCheckListEdit(check_list_code);
      
            if (res?.data) {
              const data = res.data;
              setFormData({
              checklistCode: data.item_code,
              checklistDescription: data.sales_rate
              });
            }
          } catch (error) {
            console.error("Edit fetch error:", error);
          }
        };
  

 // 🔹 On load
  useEffect(() => {
    //fetchEmployeeCode();

    // If coming from Edit
    if (location.state?.check_list_code) {
      setActionMode("edit");
      fetchEditData(location.state.check_list_code);
    }
  }, []);


  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sales" }, { name: "Contract Review Checklist" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Contract Review Checklist</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            <Span>Save</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Checklist Code"
              name="checklistCode"
              value={formData.checklistCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Checklist Description"
              name="checklistDescription"
              value={formData.checklistDescription}
              onChange={handleChange}
              size="small"
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContractReviewChecklistForm;

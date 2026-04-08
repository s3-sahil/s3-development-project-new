import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
  Grid,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { ProductPriceListSAVE } from "app/utils/authServices"
import { useNavigate } from "react-router-dom"



const ProductPriceListDetailsForm = () => {
  const [formData, setFormData] = useState({
    ITEM_CODE: "",
    productName: "",
    sales_rate: "",
    stock_trans_rate: "",
    discount_per: "",
    wef: "",
  });

  //const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


     // 🔹 Save (Add / Update)
      const handleSave = async () => {
        if (
          !formData.ITEM_CODE
        ) {
          alert("Please fill all required fields");
          return;
        }
    
        //const nameParts = formData.activityDescription.trim().split(" ");
    
        const payload = {
          //ITEM_CODE : formData.ITEM_CODE
          
        };
    
        try {
          setLoading(true);
    
          const result =  await ProductPriceListSAVE(formData); // same API for add/update
  
              if (result) {
                alert(result.message || "Product Price List Saved Successfully");
                navigate("/material/sales-product-price-list-details-table"); // go back to table
              }    
        } catch (error) {
          console.error("Save Error:", error);
          alert("Failed to save Product Price List");
        } finally {
          setLoading(false);
        }
      };


  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Sales" },
            { name: "Product Price List Details" },
          ]}
        />
      </Box>

      {/* Save Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<Icon>save</Icon>}
          onClick={handleSave}
          disabled={loading}
        >
          Save
        </Button>
      </Box>

      {/* Form */}
      <Box p={3} borderRadius={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Product Code"
              name="ITEM_CODE"
              value={formData.ITEM_CODE}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <TextField
              label="Product Name"
              name="productName"
              //value={formData.productName}
              //onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Sales Rate"
              name="sales_rate"
              value={formData.sales_rate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Stock Transfer Rate"
              name="stock_trans_rate"
              value={formData.stock_trans_rate}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              label="Disc %"
              name="discount_per"
              value={formData.discount_per}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              label="WEF"
              type="date"
              name="wef"
              value={formData.wef}
              onChange={handleChange}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
};

export default ProductPriceListDetailsForm;
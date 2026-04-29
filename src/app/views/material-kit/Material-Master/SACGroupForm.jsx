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
import { useState } from "react";
import { addSacGroupMaster } from "app/utils/materialMaterialServices";

export default function SACGroupForm() {
  const [formData, setFormData] = useState({
    headingNo: "",
    groupCode: "",
    groupDescription: "",
    flag: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      headingNo: "",
      groupCode: "",
      groupDescription: "",
      flag: "",
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.groupCode || !formData.groupDescription) {
        alert("Please fill required fields");
        return;
      }

      setLoading(true);

      const payload = {
        tgroup_Code: formData.groupCode,
        group_desc: formData.groupDescription,
        flag: formData.flag === "Service" ? "S" : "M",
        heading_no: formData.headingNo,
      };

      console.log("Payload =>", payload);

      const res = await addSacGroupMaster(payload);

      alert(res.message || "Saved Successfully ✅");

      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message || "Save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Finance" },
            { name: "SAC Group Master" },
          ]}
        />
      </Box>

      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              select
              label="Category"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Heading No."
              name="headingNo"
              value={formData.headingNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Group Code"
              name="groupCode"
              value={formData.groupCode}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Group Description"
              name="groupDescription"
              value={formData.groupDescription}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
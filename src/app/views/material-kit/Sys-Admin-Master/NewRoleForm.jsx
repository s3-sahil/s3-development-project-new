import {
  Box,
  Container,
  TextField,
  Button,
  Icon,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewRoleForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state;

  const [activity, setActivity] = useState(
    editData?.activity || ""
  );

  const handleSave = () => {
    alert("Data saved successfully!");
    navigate("/sysadmin/new-role");
  };

  return (
    <Container maxWidth="lg">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "SYS ADMIN" },
            { name: "New Role" },
          ]}
        />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <h2>New Role</h2>

          <Button
            variant="contained"
            startIcon={<Icon>save</Icon>}
            onClick={handleSave}
          >
            <Span>Save</Span>
          </Button>
        </Box>

        {/* Form */}
        <TextField
          label="New Role"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          fullWidth
          size="small"
        />
      </Box>
    </Container>
  );
}
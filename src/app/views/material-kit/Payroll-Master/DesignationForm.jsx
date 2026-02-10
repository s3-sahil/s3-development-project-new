import { Box, Container, TextField, Button } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function DesignationForm() {
  const [form, setForm] = useState({
    code: "",
    description: "",
    appointmentFlag: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Designation Save", form);
  };

  return (
    <Container>
      <Breadcrumb routeSegments={[{ name: "Designation Details" }]} />

      <Box className="card" p={3}>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <TextField label="Designation Code" name="code" value={form.code} onChange={handleChange} fullWidth />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth />
          <TextField label="Appointment Letter Flag" name="appointmentFlag" value={form.appointmentFlag} onChange={handleChange} fullWidth />
        </Box>

        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
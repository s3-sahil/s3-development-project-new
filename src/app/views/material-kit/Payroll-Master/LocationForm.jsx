import { Box, Button, Container, MenuItem, TextField } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

const states = [
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
  "Andhra Pradesh",
];

export default function LocationForm() {
  const [form, setForm] = useState({
    locationCode: "",
    description: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Location Save", form);
  };

  return (
    <Container>
      <Breadcrumb routeSegments={[{ name: "Location Details" }]} />

      <Box className="card" p={3}>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <TextField
            label="Location Code"
            name="locationCode"
            value={form.locationCode}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Location Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
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

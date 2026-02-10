import { Box, Button, Container, TextField } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function LabourWelfareSlabForm() {
  const [form, setForm] = useState({
    fromSalary: "",
    toSalary: "",
    employee: "",
    employer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Labour Welfare Slab Save", form);
  };

  return (
    <Container maxWidth="xl">
      <Breadcrumb routeSegments={[{ name: "Labour Welfare Slab" }]} />

      <Box className="card" p={3}>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <TextField
            size="small"
            label="From Salary"
            name="fromSalary"
            value={form.fromSalary}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            size="small"
            label="To Salary"
            name="toSalary"
            value={form.toSalary}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            size="small"
            label="Employee's"
            name="employee"
            value={form.employee}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            size="small"
            label="Employer's"
            name="employer"
            value={form.employer}
            onChange={handleChange}
            fullWidth
          />
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

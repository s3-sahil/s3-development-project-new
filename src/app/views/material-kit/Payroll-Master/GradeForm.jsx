import { Box, Container, TextField, Button, Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function GradeForm() {
  const [form, setForm] = useState({
    grade: "",
    description: "",
    voucher: false,
    labourWelfare: false,
    overtimeFlag: false,
    payType: "S",
    superAnnuation: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {
    console.log("Grade Save", form);
  };

  return (
    <Container>
      <Breadcrumb routeSegments={[{ name: "Grade Details" }]} />

      <Box className="card" p={3}>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <TextField label="Grade" name="grade" value={form.grade} onChange={handleChange} fullWidth />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth />
        </Box>

        <Box mt={2} display="flex" gap={4}>
          <FormControlLabel control={<Checkbox name="voucher" checked={form.voucher} onChange={handleChange} />} label="Voucher" />
          <FormControlLabel control={<Checkbox name="labourWelfare" checked={form.labourWelfare} onChange={handleChange} />} label="Labour Welfare" />
          <FormControlLabel control={<Checkbox name="overtimeFlag" checked={form.overtimeFlag} onChange={handleChange} />} label="Overtime Flag" />
        </Box>

        <Box mt={2}>
          <RadioGroup row name="payType" value={form.payType} onChange={handleChange}>
            <FormControlLabel value="S" control={<Radio />} label="Salary" />
            <FormControlLabel value="W" control={<Radio />} label="Wages" />
          </RadioGroup>
        </Box>

        <Box mt={2}>
          <FormControlLabel
            control={<Checkbox name="superAnnuation" checked={form.superAnnuation} onChange={handleChange} />}
            label="Super Annuation Appl"
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
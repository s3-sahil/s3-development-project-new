import {
  Box,
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";

export default function GradeForm() {
  const [form, setForm] = useState({
    grade: "",
    grade_desc: "",
    voucher: false,
    uniform_allow: false,
    oT_allow: false,
    pay_type: "S",
    autoSal_Rounding: false,
    super_Ann_Flg: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        grade: form.grade,
        grade_desc: form.grade_desc,
        voucher: form.voucher ? "Y" : "N",
        uniform_allow: form.uniform_allow ? "Y" : "N",
        oT_allow: form.oT_allow ? "Y" : "N",
        pay_type: form.pay_type,
        autoSal_Rounding: form.autoSal_Rounding ? "Y" : "N",
        super_Ann_Flg: form.super_Ann_Flg ? "Y" : "N",
      };

      console.log("Payload:", payload);

      const response = await fetch(
        "https://localhost:7189/api/GradeDetails/add-Grade",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json-patch+json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
        alert(data.message || "Grade saved successfully!");

        setForm({
          grade: "",
          grade_desc: "",
          voucher: false,
          uniform_allow: false,
          oT_allow: false,
          pay_type: "S",
          autoSal_Rounding: false,
          super_Ann_Flg: false,
        });
      } else {
        alert(data.message || "Failed to save grade");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection error");
    }
  };

  return (
    <Container maxWidth="xl">
      <Breadcrumb routeSegments={[{ name: "Grade Details" }]} />

      <Box className="card" p={3}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap={2}
        >
          <TextField
            label="Grade"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="grade_desc"
            value={form.grade_desc}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box mt={2} display="flex" gap={4} flexWrap="wrap">
          <FormControlLabel
            control={
              <Checkbox
                name="voucher"
                checked={form.voucher}
                onChange={handleChange}
              />
            }
            label="Voucher"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="uniform_allow"
                checked={form.uniform_allow}
                onChange={handleChange}
              />
            }
            label="Uniform Allow"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="oT_allow"
                checked={form.oT_allow}
                onChange={handleChange}
              />
            }
            label="OT Allow"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="autoSal_Rounding"
                checked={form.autoSal_Rounding}
                onChange={handleChange}
              />
            }
            label="Auto Salary Rounding"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="super_Ann_Flg"
                checked={form.super_Ann_Flg}
                onChange={handleChange}
              />
            }
            label="Super Annuation"
          />
        </Box>

        <Box mt={2}>
          <RadioGroup
            row
            name="pay_type"
            value={form.pay_type}
            onChange={handleChange}
          >
            <FormControlLabel
              value="S"
              control={<Radio />}
              label="Salary"
            />
            <FormControlLabel
              value="W"
              control={<Radio />}
              label="Wages"
            />
          </RadioGroup>
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
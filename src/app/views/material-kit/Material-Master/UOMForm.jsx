// UOMForm.jsx
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
} from "@mui/material";

export default function UOMForm({ form, setForm, onSave }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Box
      sx={{
        border: "1px solid #777",
        p: 2,
        mb: 2,
        background: "#f5f5f5",
      }}
    >
      <Typography sx={{ mb: 2, fontWeight: "bold" }}>
        UOM Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography>UOM :</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="uom"
            value={form.uom}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <Typography>UOM Description :</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="desc"
            value={form.desc}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                name="decimal"
                checked={form.decimal}
                onChange={handleChange}
              />
            }
            label="Decimal Applicable"
          />
        </Grid>

        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                name="conversion"
                checked={form.conversion}
                onChange={handleChange}
              />
            }
            label="Conversion Applicable"
          />
        </Grid>
      </Grid>

      {/* ACTION BUTTON */}
      <Box mt={2}>
        <Button variant="contained" onClick={onSave}>
          SAVE
        </Button>
      </Box>
    </Box>
  );
}
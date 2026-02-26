import PrintIcon from "@mui/icons-material/Print";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

export default function YearlyHolidayForm() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Breadcrumb
        routeSegments={[
          { name: "Master" },
          { name: "Yearly Holiday Details" },
        ]}
      />

      <Stack elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
           

            <Typography variant="h5" fontWeight="bold" color="#7b1fa2">
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
           
            <Button variant="contained" sx={{ background: "#7b1fa2" }}>
              Save
            </Button>
          </Box>
        </Box>


        {/* Form Fields */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Description"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography fontWeight="500">Weekly Off</Typography>
            <RadioGroup row defaultValue="No">
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControlLabel
              control={<Checkbox />}
              label="Public Holiday"
            />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
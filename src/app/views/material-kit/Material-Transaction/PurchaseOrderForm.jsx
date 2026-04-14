import {
  Container,
  Button,
  TextField,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Icon,
} from "@mui/material";
import PaymentTermsPurchaseOrderModal from "./PaymentTermsPurchaseOrderModal";
import TaxTermPurchaseOrderModal from "./TaxTermPurchaseOrderModal";

export default function PurchaseOrderForm() {
  const [openPayment, setOpenPayment] = useState(false);
  const [openTaxModal, setOpenTaxModal] = useState(false);
  const [taxRows, setTaxRows] = useState([]); // store saved tax data

  const handleOpenTax = () => setOpenTaxModal(true);
  const handleCloseTax = () => setOpenTaxModal(false);

  const handleSaveTax = (rows) => {
    setTaxRows(rows); // store in parent
    setOpenTaxModal(false);
  };

  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => setOpenPayment(false);
  return (
    <Container maxWidth="lg">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <h2 style={{ color: "#6C2BD9" }}></h2>
        <Button
          variant="contained"
          startIcon={<Icon>save</Icon>}
          // onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      {/* MAIN CARD */}
      <Box p={3} boxShadow={2} borderRadius={2} bgcolor="#fff">
        <Grid container spacing={2}>
          {/* ROW 1 */}
          <Grid item xs={4}>
            <TextField label="Order No." fullWidth size="small" />
          </Grid>
          <Grid item xs={4}>
            <TextField type="date" fullWidth size="small" />
          </Grid>
          <Grid item xs={4}>
            <TextField type="date" label="Valid Date" fullWidth size="small" />
          </Grid>

          {/* ROW 2 */}
          <Grid item xs={4}>
            <TextField label="Project Code" fullWidth size="small" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Buyer" fullWidth size="small" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Department" fullWidth size="small" />
          </Grid>

          {/* ROW 3 */}
          <Grid item xs={4}>
            <TextField label="PO Type" fullWidth size="small" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="PO Category" fullWidth size="small" />
          </Grid>

          {/* ROW 4 */}
          <Grid item xs={4}>
            <TextField label="Supplier" fullWidth size="small" />
          </Grid>

          {/* CHECKBOXES */}
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox />} label="All Supplier" />
            <FormControlLabel control={<Checkbox />} label="Open Order" />
            <FormControlLabel control={<Checkbox />} label="Schedule Order" />
            <FormControlLabel control={<Checkbox />} label="Internal Remark" />
          </Grid>

          {/* QUOTATION */}
          <Grid item xs={4}>
            <TextField label="Quotation No" fullWidth size="small" />
          </Grid>
          <Grid item xs={4}>
            <TextField type="date" fullWidth size="small" />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              style={{ background: "#6C2BD9", height: "40px" }}
            >
              Browse
            </Button>
          </Grid>

          {/* DELIVERY */}
          <Grid item xs={6}>
            <TextField label="Delivery Location" fullWidth size="small" />
          </Grid>

          {/* ACTION BUTTONS */}
          <Grid item xs={12} display="flex" gap={2}>
            <Button variant="contained" onClick={handleOpenTax}>
              Tax Term
            </Button>
            <Button variant="contained" onClick={handleOpenPayment}>
              Payment Terms
            </Button>
            <Button variant="contained" style={{ background: "#6C2BD9" }}>
              Other Details
            </Button>
          </Grid>

          {/* ITEM SECTION */}
          <Grid item xs={3}>
            <TextField label="Item Code" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="UOM" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Make" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Quantity" fullWidth size="small" />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Rate" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Disc (%)" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" label="W.E.F" fullWidth size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Amount" fullWidth size="small" />
          </Grid>

          {/* EXTRA */}
          <Grid item xs={3}>
            <Button variant="contained" style={{ background: "#6C2BD9" }}>
              View Drawing
            </Button>
          </Grid>

          <Grid item xs={3}>
            <TextField label="Reason" fullWidth size="small" />
          </Grid>

          <Grid item xs={3}>
            <TextField label="Required By" fullWidth size="small" />
          </Grid>

          <Grid item xs={3}>
            <TextField
              type="date"
              label="Delivery Date"
              fullWidth
              size="small"
            />
          </Grid>

          {/* FOOTER BUTTONS */}
          <Grid item xs={12} display="flex" gap={2}>
            <Button variant="contained" style={{ background: "#6C2BD9" }}>
              Add Schedule
            </Button>
            <Button variant="contained" color="error">
              Remove
            </Button>
            <Button variant="contained" style={{ background: "#6C2BD9" }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>

      <PaymentTermsPurchaseOrderModal
        open={openPayment}
        onClose={handleClosePayment}
      />
      <TaxTermPurchaseOrderModal
        open={openTaxModal}
        onClose={handleCloseTax}
        onSave={handleSaveTax}
        defaultRows={taxRows}
      />
    </Container>
  );
}

import {
    Box,
    Container,
    TextField,
    Button,
    Divider,
    Checkbox,
    FormControlLabel,
    IconButton,
    Icon,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";

const ProformaInvoiceForm = () => {
    return (
        <Container maxWidth="xl">
            {/* ===== Breadcrumb ===== */}
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Proforma Invoice" },
                    ]}
                />
            </Box>

            {/* ===== Main Card ===== */}
            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
                <Box display="grid" gridTemplateColumns="3fr 1fr" gap={3}>

                    {/* ================= LEFT SECTION ================= */}
                    <Box>
                        {/* Header Section */}
                        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                            <TextField label="Invoice Type" size="small" />
                            <TextField label="Invoice Sub Type" size="small" />

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Refer GRN"
                            />

                            <Box />

                            <TextField label="Inv. No" size="small" />
                            <TextField
                                type="date"
                                label="Inv. Date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField label="Customer" size="small" />
                            <TextField label="Cust. Name" size="small" />

                            <TextField label="PO Login" size="small" />
                            <TextField
                                type="date"
                                label="PO Date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField label="PO No." size="small" />
                            <TextField label="Remark" size="small" />
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* ================= ITEM ENTRY ================= */}
                        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                            <TextField label="Item Code" size="small" />
                            <TextField label="Qty" size="small" />
                            <TextField label="Packing Type" size="small" />
                            <TextField label="Rate" size="small" />
                            <TextField label="Discount (%)" size="small" />
                        </Box>

                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(4, 1fr)"
                            gap={2}
                            mt={2}
                        >
                            <TextField label="UOM" size="small" />
                            <TextField label="Amount" size="small" />
                            <TextField label="Dis Amt" size="small" />
                            <TextField label="Net Amt" size="small" />
                        </Box>

                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(3, 1fr)"
                            gap={2}
                            mt={2}
                        >
                            <TextField label="Serial No" size="small" />
                            <TextField label="MRP" size="small" />
                            <TextField label="Customer Item Code" size="small" />
                        </Box>

                        <Box mt={2}>
                            <TextField
                                label="Item Remark"
                                size="small"
                                fullWidth
                            />
                        </Box>

                        {/* Buttons */}
                        <Box display="flex" gap={2} mt={3}>
                            <Button variant="contained" color="error">
                                Remove
                            </Button>
                            <Button variant="contained" color="secondary">
                                OK
                            </Button>
                        </Box>
                    </Box>

                    {/* ================= RIGHT SUMMARY PANEL ================= */}
                    <Box
                        sx={{
                            border: "1px solid #eee",
                            borderRadius: 2,
                            p: 2,
                            background: "#fafafa",
                        }}
                    >
                        <TextField label="Total Amount" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Discount (%)" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Discount Amount" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Packing & Fwd" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Freight" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Net Total" size="small" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Advance Amt." size="small" fullWidth sx={{ mb: 3 }} />

                        <Box display="flex" flexDirection="column" gap={1}>
                            <Button variant="contained">
                                Show Payment Terms
                            </Button>
                            <Button variant="contained">
                                Show Tax Details
                            </Button>
                            <Button variant="contained">
                                Other Details
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* ===== Save Button ===== */}
                <Box mt={4} textAlign="right">
                    <Button
                        variant="contained"
                        startIcon={<Icon>save</Icon>}
                    >
                        <Span>Save</Span>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ProformaInvoiceForm;
import {
    Box,
    Container,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Divider,
    Icon,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";

const ExportDocumentsForm = () => {
    return (
        <Container maxWidth="xl">
            {/* ===== Breadcrumb ===== */}
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Export Documents" },
                    ]}
                />
            </Box>

            {/* ===== Main Card ===== */}
            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>

                {/* ===== Top Section ===== */}
                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>

                    <TextField label="Customer" size="small" />

                    <FormControlLabel
                        control={<Checkbox />}
                        label="Customer Approval"
                        sx={{ alignSelf: "center" }}
                    />

                    <TextField label="Invoice No" size="small" />

                    <FormControlLabel
                        control={<Checkbox />}
                        label="Show ALL Invoice"
                        sx={{ alignSelf: "center" }}
                    />

                    <TextField label="Invoice Amt. in INR" size="small" />

                    <TextField label="Invoice Amt. in Currency" size="small" />

                    <TextField
                        label="Invoice Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField label="Comm. Inv Nos / Remark" size="small" />
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* ===== Bottom Section ===== */}
                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>

                    <TextField label="Shipping Bill No" size="small" />

                    <TextField
                        label="Shipping Bill Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="DBK Submission Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField label="Port Code" size="small" />

                    <TextField
                        label="Rebate Submission Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField label="Rebate Number" size="small" />

                    <TextField
                        label="Proof Of Export Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField label="CHA Code" size="small" />
                </Box>

                {/* ===== Action Buttons ===== */}
                <Box display="flex" gap={2} mt={4}>
                    <Button variant="contained">
                        Received Documents
                    </Button>

                    <Button variant="contained">
                        Other Details
                    </Button>
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

export default ExportDocumentsForm;
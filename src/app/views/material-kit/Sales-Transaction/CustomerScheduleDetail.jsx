import {
    Box,
    Container,
    TextField,
    MenuItem,
    Button,
    Icon,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";

const CustomerScheduleDetail = () => {
    return (
        <Container maxWidth="xl">
            {/* ===== Breadcrumb ===== */}
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Customer Schedule Detail" },
                    ]}
                />
            </Box>

            {/* ===== Main Card ===== */}
            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
                {/* ===== Form Grid ===== */}
                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>

                    <TextField label="Period" size="small" />
                    <TextField label="Customer Code" size="small" />
                    <TextField label="Customer Name" size="small" />
                    <TextField
                        label="Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField label="Item Code" size="small" />
                    <TextField label="Item Name" size="small" />
                    <TextField label="PO Login No." size="small" />
                    <Box />

                    <TextField label="PO No & Dt" size="small" />
                    <TextField label="Total Quantity" size="small" />
                    <TextField label="Cust. Part No" size="small" />
                    <Box />

                    <TextField
                        label="Schedule Type"
                        size="small"
                        select
                        defaultValue=""
                    >
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Urgent">Urgent</MenuItem>
                    </TextField>

                    <TextField
                        label="Sch. Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Our Delivery Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField label="Quantity" size="small" />

                    <TextField
                        label="Remark"
                        size="small"
                        multiline
                        rows={1}
                        sx={{ gridColumn: "span 2" }}
                    />
                </Box>

                {/* ===== Bottom Buttons ===== */}
                <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                    <Button variant="contained">OK</Button>
                    <Button variant="contained" color="secondary">
                        New Item
                    </Button>
                </Box>

                {/* ===== Save Button Top Right (Optional) ===== */}
                <Box mt={4} textAlign="right">
                    <Button variant="contained" startIcon={<Icon>save</Icon>}>
                        <Span>Save</Span>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CustomerScheduleDetail;

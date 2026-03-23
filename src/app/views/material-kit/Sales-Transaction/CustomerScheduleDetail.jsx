import {
    Box,
    Container,
    TextField,
    MenuItem,
    Button,
    Icon,
    Grid,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CustomerScheduleDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { scheduleId } = useParams();
    const isEditMode = !!scheduleId;

    const [headerData, setHeaderData] = useState({
        period: "",
        customerCode: "",
        customerName: "",
        date: new Date().toISOString().split("T")[0],
        itemCode: "",
        itemName: "",
        poLoginNo: "",
        poNoDate: "",
        totalQuantity: "",
        custPartNo: "",
    });

    const [itemData, setItemData] = useState({
        scheduleType: "",
        schDate: "",
        ourDeliveryDate: "",
        quantity: "",
        remark: "",
    });

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (isEditMode && location.state) {
            // Assuming location.state contains header and items array
            setHeaderData(location.state.header || {});
            setItems(location.state.items || []);
        }
    }, [isEditMode, location.state]);

    const handleHeaderChange = (e) => {
        setHeaderData({ ...headerData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        setItemData({ ...itemData, [e.target.name]: e.target.value });
    };

    const handleAddItem = () => {
        if (!itemData.schDate || !itemData.quantity) {
            alert("Schedule Date and Quantity are required for each item.");
            return;
        }
        setItems([...items, { id: Date.now(), ...itemData }]);
        setItemData({
            scheduleType: "",
            schDate: "",
            ourDeliveryDate: "",
            quantity: "",
            remark: "",
        }); // Reset for next entry
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleSave = () => {
        // API Integration Logic
        if (!headerData.customerCode || !headerData.itemCode) {
            alert("Customer and Item information is required.");
            return;
        }
        if (items.length === 0) {
            alert("Please add at least one schedule item.");
            return;
        }

        const payload = {
            header: headerData,
            details: items,
        };

        console.log("Saving Payload:", payload);
        alert("Saved Successfully!");
        navigate("/material/sales-customer-schedule-detail-table");
    };

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

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
                    <Span>{isEditMode ? "Update" : "Save"}</Span>
                </Button>
            </Box>

            {/* ===== Main Card ===== */}
            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
                {/* ===== Form Grid ===== */}
                <Grid container spacing={3}>
                    {/* Header Fields */}
                    <Grid item xs={12} md={3}>
                        <TextField label="Period" name="period" value={headerData.period} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Customer Code" name="customerCode" value={headerData.customerCode} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Customer Name" name="customerName" value={headerData.customerName} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Date" name="date" type="date" value={headerData.date} onChange={handleHeaderChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Item Code" name="itemCode" value={headerData.itemCode} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Item Name" name="itemName" value={headerData.itemName} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="PO Login No." name="poLoginNo" value={headerData.poLoginNo} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="PO No & Dt" name="poNoDate" value={headerData.poNoDate} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Total Quantity" name="totalQuantity" value={headerData.totalQuantity} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Cust. Part No" name="custPartNo" value={headerData.custPartNo} onChange={handleHeaderChange} size="small" fullWidth />
                    </Grid>
                </Grid>

                <Box sx={{ my: 4, borderTop: "1px solid #ddd" }} />

                {/* Item Entry Fields */}
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={2}>
                        <TextField label="Schedule Type" name="scheduleType" value={itemData.scheduleType} onChange={handleItemChange} size="small" select fullWidth>
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="Regular">Regular</MenuItem>
                            <MenuItem value="Urgent">Urgent</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField label="Sch. Date" name="schDate" type="date" value={itemData.schDate} onChange={handleItemChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField label="Our Delivery Date" name="ourDeliveryDate" type="date" value={itemData.ourDeliveryDate} onChange={handleItemChange} size="small" fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField label="Quantity" name="quantity" type="number" value={itemData.quantity} onChange={handleItemChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Remark" name="remark" value={itemData.remark} onChange={handleItemChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Button variant="contained" onClick={handleAddItem} fullWidth>OK</Button>
                    </Grid>
                </Grid>

                {/* Items Table */}
                <Paper sx={{ mt: 4, width: '100%', overflow: 'hidden' }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sch. Type</TableCell>
                                <TableCell>Sch. Date</TableCell>
                                <TableCell>Delivery Date</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Remark</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.length > 0 ? (
                                items.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.scheduleType}</TableCell>
                                        <TableCell>{row.schDate}</TableCell>
                                        <TableCell>{row.ourDeliveryDate}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>{row.remark}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleRemoveItem(row.id)} color="error" size="small">
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No schedule items added.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Container>
    );
};

export default CustomerScheduleDetail;

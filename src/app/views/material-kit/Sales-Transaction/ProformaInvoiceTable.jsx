import {
    Container,
    Icon,
    IconButton,
    Tooltip,
    Button,
    Typography,
    TextField,
    MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProformaInvoiceTable() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Dummy Data (Replace with API response)
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setRows([
                { id: 1, invoiceNo: "PI-001", date: "2024-02-01", customer: "Customer A", amount: 15000 },
                { id: 2, invoiceNo: "PI-002", date: "2024-02-05", customer: "Customer B", amount: 25000 },
                { id: 3, invoiceNo: "PI-003", date: "2024-02-08", customer: "Customer C", amount: 5000 },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleAdd = () => {
        navigate("/material/sales-proforma-invoice-form/add");
    };

    const handleEdit = (row) => {
        navigate(`/material/sales-proforma-invoice-form/edit/${row.id}`, { state: row });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const columns = [
        {
            field: "invoiceNo",
            headerName: "Invoice No",
            flex: 1,
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
        },
        {
            field: "customer",
            headerName: "Customer",
            flex: 1,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 130,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <Icon color="primary">edit</Icon>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row.id)}>
                            <Icon color="error">delete</Icon>
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <Container maxWidth="xl">
            {/* ===== Breadcrumb ===== */}
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: "Sales" }, { name: "Proforma Invoice" }]}
                />
            </Box>

            <Stack spacing={3}>
                {/* ===== Top Section (Search + New Button) ===== */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {/* Search Section */}
                    <Box display="flex" gap={2}>
                        <TextField size="small" placeholder="Search..." />
                        <TextField size="small" select defaultValue="" sx={{ width: 200 }}>
                            <MenuItem value="">Select Column</MenuItem>
                            <MenuItem value="invoiceNo">Invoice No</MenuItem>
                            <MenuItem value="customer">Customer</MenuItem>
                        </TextField>
                        <Button variant="contained">Search</Button>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAdd}
                    >
                        New
                    </Button>
                </Box>

                {/* ===== Data Table ===== */}
                <Box sx={{ height: 420, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={loading}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10, page: 0 } },
                        }}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Stack>
        </Container>
    );
}

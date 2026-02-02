import {
    Container,
    Icon,
    IconButton,
    Tooltip,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

export default function LinkInvoiceToExportSchemesTable() {
    const navigate = useNavigate();

    // 🔹 Dummy Data (replace with API)
    const rows = [
        {
            id: 1,
            invoiceNo: "INV-001",
            invoiceDate: "12/01/2026",
            customer: "ABC Exports",
            invoiceAmtInr: 250000,
            invoiceAmtCur: 3000,
            currency: "USD",
            scheme: "RoDTEP",
        },
        {
            id: 2,
            invoiceNo: "INV-002",
            invoiceDate: "15/01/2026",
            customer: "XYZ Traders",
            invoiceAmtInr: 180000,
            invoiceAmtCur: 2100,
            currency: "EUR",
            scheme: "EPCG",
        },
    ];

    const handleAdd = () => {
        navigate("/material/sales-link-invoice-to-export-schemes-form/add");
    };

    const handleEdit = (row) => {
        navigate(
            `/material/sales-link-invoice-to-export-schemes-form/edit/${row.id}`,
            { state: row }
        );
    };

    const handleDelete = (id) => {
        console.log("Delete:", id);
    };

    const columns = [
        { field: "invoiceNo", headerName: "Invoice No", width: 130 },
        { field: "invoiceDate", headerName: "Invoice Date", width: 130 },
        { field: "customer", headerName: "Customer", flex: 1 },
        {
            field: "invoiceAmtInr",
            headerName: "Invoice Amt (INR)",
            width: 160,
        },
        {
            field: "invoiceAmtCur",
            headerName: "Invoice Amt (Currency)",
            width: 190,
        },
        { field: "currency", headerName: "Currency", width: 100 },
        { field: "scheme", headerName: "Scheme", width: 140 },

        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => handleEdit(params.row)}
                        >
                            <Icon color="primary">edit</Icon>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => handleDelete(params.row.id)}
                        >
                            <Icon color="error">delete</Icon>
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <Container maxWidth="xl">
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Link Invoice To Export Schemes" },
                    ]}
                />
            </Box>
            <br />
            <Stack spacing={3}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box display="flex" gap={2}>
                        <TextField
                            size="small"
                            placeholder="Search..."
                        />

                        <TextField
                            size="small"
                            select
                            defaultValue=""
                            sx={{ width: 200 }}
                        >
                            <MenuItem value="">
                                Select Column
                            </MenuItem>
                            <MenuItem value="invoiceNo">
                                Invoice No
                            </MenuItem>
                            <MenuItem value="customer">
                                Customer
                            </MenuItem>
                            <MenuItem value="scheme">
                                Scheme
                            </MenuItem>
                        </TextField>

                        <Button variant="contained">
                            Search
                        </Button>
                    </Box>

                    {/* New Button */}
                    <Button
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAdd}
                    >
                        New
                    </Button>
                </Box>

                {/* ===== DataGrid ===== */}
                <Box sx={{ height: 500, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[10, 25, 50]}
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                    page: 0,
                                },
                            },
                        }}
                    />
                </Box>
            </Stack>
        </Container>
    );
}
import {
    Container,
    Icon,
    IconButton,
    Tooltip,
    Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InvoicePaginationAPI } from "app/utils/authServices";

export default function InvoiceTable() {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    // =============================
    // 🔥 Fetch API Data
    // =============================
    const fetchInvoices = async () => {
        debugger;
        try {
            setLoading(true);

            const response = await InvoicePaginationAPI(
                "invoice_hed",
                paginationModel.page + 1, // API page starts from 1
                paginationModel.pageSize
            );

            if (response?.Data) {
                const apiData = response.Data;

                // Map API data to DataGrid format
                const formattedRows = apiData.map((item, index) => ({
                    id: item.inV_NO || index,
                    invoiceNo: item.inV_NO,
                    invoiceDate: item.inV_DT,
                    customerCode: item.cusT_CODE,
                    totalAmount: item.totaL_AMT,
                    netAmount: item.neT_AMT,
                }));

                setRows(formattedRows);

                // If API returns totalRecords
                setRowCount(response.TotalRecords || apiData.length);
            }
        } catch (error) {
            console.error("Invoice fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [paginationModel]);

    // =============================
    // Navigation
    // =============================
    const handleAdd = () => {
        navigate("/material/sales-invoice-form/add");
    };

    const handleEdit = (row) => {
        navigate(`/material/sales-invoice-form/edit/${row.id}`, {
            state: row,
        });
    };

    const handleDelete = (id) => {
        console.log("Delete invoice:", id);
    };

    const columns = [
        {
            field: "invoiceNo",
            headerName: "Invoice No",
            flex: 1,
        },
        {
            field: "invoiceDate",
            headerName: "Date",
            flex: 1,
        },
        {
            field: "customerCode",
            headerName: "Customer Code",
            flex: 1,
        },
        {
            field: "totalAmount",
            headerName: "Total Amount",
            flex: 1,
        },
        {
            field: "netAmount",
            headerName: "Net Amount",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
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
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: "Sales" }, { name: "Invoice" }]}
                />
            </Box>

            <Stack spacing={3}>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAdd}
                    >
                        New
                    </Button>
                </Box>

                <Box sx={{ height: 500, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={loading}
                        rowCount={rowCount}
                        paginationMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10, 20]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Stack>
        </Container>
    );
}

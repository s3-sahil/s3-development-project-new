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
import { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter";

export default function CustomerScheduleTable() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [originalRows, setOriginalRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchColumn, setSearchColumn] = useState("");

    // Simulate API call
    useEffect(() => {
        setLoading(true);
        // Replace with your actual API call
        setTimeout(() => {
            const dummyData = [
                {
                    id: 1,
                    period: "08/2025",
                    customerName: "ABC Corp",
                    poNo: "PO-123",
                    itemCode: "ITEM-001",
                    totalQuantity: 500,
                },
                {
                    id: 2,
                    period: "08/2025",
                    customerName: "XYZ Inc",
                    poNo: "PO-456",
                    itemCode: "ITEM-002",
                    totalQuantity: 1200,
                },
            ];
            setRows(dummyData);
            setOriginalRows(dummyData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleAdd = () => {
        navigate("/material/sales-customer-schedule-detail-form/add");
    };

    const handleEdit = (row) => {
        navigate(`/material/sales-customer-schedule-detail-form/edit/${row.id}`, {
            state: row,
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this schedule?")) {
            // API call to delete would go here
            setRows(rows.filter((row) => row.id !== id));
            console.log("Deleted:", id);
        }
    };

    const handleSearch = () => {
        if (!searchQuery) {
            setRows(originalRows);
            return;
        }

        const filteredRows = originalRows.filter((row) => {
            const searchStr = searchQuery.toLowerCase();

            if (searchColumn) {
                const value = row[searchColumn];
                return String(value).toLowerCase().includes(searchStr);
            } else {
                return Object.values(row).some((val) =>
                    String(val).toLowerCase().includes(searchStr)
                );
            }
        });

        setRows(filteredRows);
    };

    const columns = [
        { field: "period", headerName: "Period", width: 120 },
        { field: "customerName", headerName: "Customer Name", flex: 1 },
        { field: "poNo", headerName: "PO No.", width: 150 },
        { field: "itemCode", headerName: "Item Code", width: 150 },
        {
            field: "totalQuantity",
            headerName: "Total Quantity",
            width: 150,
            align: "right",
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
            {/* ===== Breadcrumb ===== */}
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Customer Schedule Detail" },
                    ]}
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
                    <SearchFilter
                        searchValue={searchQuery}
                        setSearchValue={setSearchQuery}
                        searchColumn={searchColumn}
                        setSearchColumn={setSearchColumn}
                        columnOptions={[
                            { value: "customerName", label: "Customer Name" },
                            { value: "poNo", label: "PO No" },
                        ]}
                        onSearch={handleSearch}
                    />

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
                        loading={loading}
                        pageSizeOptions={[10, 25, 50]}
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                        }}
                    />
                </Box>
            </Stack>
        </Container>
    );
}

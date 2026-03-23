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

export default function EnquiryLoginEntryTable() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [originalRows, setOriginalRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchColumn, setSearchColumn] = useState("");

    const initialData = [
        {
            id: 1,
            enquiryNo: "ENQ-001",
            enquiryDate: "2026-01-29",
            customerName: "ABC Industries",
            marketingBy: "John",
            source: "Email",
            itemName: "Steel Component",
            quantity: 500,
            status: "Open",
        },
        {
            id: 2,
            enquiryNo: "ENQ-002",
            enquiryDate: "2026-01-30",
            customerName: "XYZ Pvt Ltd",
            marketingBy: "David",
            source: "Phone",
            itemName: "Aluminium Part",
            quantity: 1200,
            status: "Closed",
        },
    ];

    useEffect(() => {
        setRows(initialData);
        setOriginalRows(initialData);
    }, []);

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

    const handleAdd = () => {
        navigate("/material/sales-enquiry-login-entry-form/add");
    };

    const handleEdit = (row) => {
        navigate(`/material/sales-enquiry-login-entry-form/edit/${row.id}`, {
            state: row,
        });
    };

    const handleDelete = (id) => {
        console.log("Delete enquiry:", id);
    };

    const columns = [
        {
            field: "enquiryNo",
            headerName: "Enquiry No",
            width: 140,
        },
        {
            field: "enquiryDate",
            headerName: "Date",
            width: 120,
        },
        {
            field: "customerName",
            headerName: "Customer Name",
            flex: 1,
        },
        {
            field: "marketingBy",
            headerName: "Marketing By",
            width: 140,
        },
        {
            field: "source",
            headerName: "Source",
            width: 120,
        },
        {
            field: "itemName",
            headerName: "Item Name",
            flex: 1,
        },
        {
            field: "quantity",
            headerName: "Qty",
            width: 90,
            align: "right",
            headerAlign: "right",
        },
        {
            field: "status",
            headerName: "Status",
            width: 110,
            renderCell: (params) => (
                <Box
                    sx={{
                        color: params.value === "Open" ? "green" : "gray",
                        fontWeight: 600,
                    }}
                >
                    {params.value}
                </Box>
            ),
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
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Enquiry Login Entry" },
                    ]}
                />
            </Box>

            <Stack spacing={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <SearchFilter
                        searchValue={searchQuery}
                        setSearchValue={setSearchQuery}
                        searchColumn={searchColumn}
                        setSearchColumn={setSearchColumn}
                        columnOptions={[
                            { value: "enquiryNo", label: "Enquiry No" },
                            { value: "customerName", label: "Customer Name" },
                        ]}
                        onSearch={handleSearch}
                    />

                    <Button
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAdd}
                    >
                        New
                    </Button>
                </Box>

                <Box sx={{ height: 450, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5, page: 0 },
                            },
                        }}
                    />
                </Box>
            </Stack>
        </Container>
    );
}

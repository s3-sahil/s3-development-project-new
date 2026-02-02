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

export default function CustomerScheduleTable() {
    const navigate = useNavigate();

    // 🔹 Dummy Data (replace with API response)
    const rows = [
        {
            id: 1,
            shiftCode: "F",
            description: "FIRST",
            shiftStart: 8,
            shiftEnd: 17,
            totalHrs: 9,
            lunchStart: 12.3,
            lunchEnd: 13,
            earlyIn: 7.3,
            division: "C",
        },
        {
            id: 2,
            shiftCode: "G",
            description: "GENERAL",
            shiftStart: 8.3,
            shiftEnd: 17.3,
            totalHrs: 9,
            lunchStart: 12.3,
            lunchEnd: 13,
            earlyIn: 8,
            division: "C",
        },
    ];

    const handleAdd = () => {
        navigate("/material/sales-customer-schedule-detail-form/add");
    };

    const handleEdit = (row) => {
        navigate(`/material/sales-customer-schedule-detail-form/edit/${row.id}`, {
            state: row,
        });
    };

    const handleDelete = (id) => {
        console.log("Delete:", id);
    };

    const columns = [
        { field: "shiftCode", headerName: "Shift Code", width: 110 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "shiftStart", headerName: "Shift Start", width: 120 },
        { field: "shiftEnd", headerName: "Shift End", width: 120 },
        { field: "totalHrs", headerName: "Total Hrs", width: 100 },
        { field: "lunchStart", headerName: "Lunch Start", width: 120 },
        { field: "lunchEnd", headerName: "Lunch End", width: 120 },
        { field: "earlyIn", headerName: "Early In", width: 100 },
        { field: "division", headerName: "Division", width: 100 },

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
                    <Box display="flex" gap={2}>
                        <TextField
                            size="small"
                            placeholder="Search..."
                        />
                        <TextField
                            size="small"
                            select
                            defaultValue=""
                            sx={{ width: 180 }}
                        >
                            <MenuItem value="">Select Column</MenuItem>
                            <MenuItem value="shiftCode">Shift Code</MenuItem>
                            <MenuItem value="description">Description</MenuItem>
                        </TextField>
                        <Button variant="contained">Search</Button>
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
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                        }}
                    />
                </Box>
            </Stack>
        </Container>
    );
}

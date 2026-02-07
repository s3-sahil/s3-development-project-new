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

export default function CustomerDetailTable() {
    const navigate = useNavigate();

    // 🔹 HARD CODED DATA
    const rows = [
        {
            code: "C001",
            name: "ABC Pvt Ltd",
            city: "Pune",
            phone: "9876543210",
            email: "abc@gmail.com",
        },
        {
            code: "C002",
            name: "XYZ Traders",
            city: "Mumbai",
            phone: "9123456780",
            email: "xyz@gmail.com",
        },
        {
            code: "C003",
            name: "Global Corp",
            city: "Delhi",
            phone: "9988776655",
            email: "global@gmail.com",
        },
        {
            code: "C004",
            name: "Sunrise Industries",
            city: "Bangalore",
            phone: "9001122334",
            email: "sunrise@gmail.com",
        },
    ];

    const handleEdit = (row) => {
        navigate(`/material/customer/edit/${row.code}`, { state: row });
    };

    const handleDelete = (code) => {
        console.log("Delete customer:", code);
    };

    const handleAddNew = () => {
        navigate("/material/customer/add");
    };

    const columns = [
        { field: "code", headerName: "Code", width: 120 },
        { field: "name", headerName: "Name", width: 180 },
        { field: "city", headerName: "City", width: 150 },
        { field: "phone", headerName: "Phone", width: 160 },
        { field: "email", headerName: "Email", width: 220 },

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
                        <IconButton onClick={() => handleDelete(params.row.code)}>
                            <Icon color="error">delete</Icon>
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Master" },
                        { name: "Customer Detail" },
                    ]}
                />
            </Box>

            <Stack spacing={3}>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAddNew}
                    >
                        Add New
                    </Button>
                </Box>

                <Box sx={{ height: 420, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.code}
                        pageSizeOptions={[5, 10]}
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

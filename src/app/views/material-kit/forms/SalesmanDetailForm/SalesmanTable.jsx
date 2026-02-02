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

export default function SalesmanTable() {
    const navigate = useNavigate();

    // 🔹 HARD CODED DATA
    const rows = [
        {
            id: 1,
            employeeCode: "EMP001",
            employeeName: "John Doe",
            email: "john@gmail.com",
            contactNo: "9876543210",
            gender: "Male",
        },
        {
            id: 2,
            employeeCode: "EMP002",
            employeeName: "Jane Smith",
            email: "jane@gmail.com",
            contactNo: "9123456789",
            gender: "Female",
        },
        {
            id: 3,
            employeeCode: "EMP003",
            employeeName: "Rahul Kumar",
            email: "rahul@gmail.com",
            contactNo: "9988776655",
            gender: "Male",
        },
    ];

    const handleAdd = () => {
        navigate("/material/salesman/add");
    };

    const handleEdit = (row) => {
        navigate(`/material/salesman/edit/${row.employeeCode}`, {
            state: row,
        });
    };

    const handleDelete = (id) => {
        console.log("Delete salesman:", id);
    };

    const columns = [
        { field: "employeeCode", headerName: "Code", width: 140 },
        { field: "employeeName", headerName: "Name", width: 180 },
        { field: "email", headerName: "Email", width: 220 },
        { field: "contactNo", headerName: "Contact No", width: 160 },
        { field: "gender", headerName: "Gender", width: 120 },

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
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: "Master" }, { name: "Salesman" }]}
                />
            </Box>

            <Stack spacing={3}>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAdd}
                    >
                        Add Salesman
                    </Button>
                </Box>

                <Box sx={{ height: 420, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
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

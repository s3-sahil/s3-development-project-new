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

export default function PackingSlipTable() {
    const navigate = useNavigate();

    // 🔹 Hardcoded Data (Replace with API later)
    const rows = [
        {
            id: 1,
            functionName: "Packing Slip",
            objectName: "Dispatch Module",
            new: true,
            edit: true,
            delete: false,
            view: true,
            menuLevel: "Level 1",
        },
        {
            id: 2,
            functionName: "Packing Slip Entry",
            objectName: "Sales Module",
            new: true,
            edit: false,
            delete: false,
            view: true,
            menuLevel: "Level 2",
        },
    ];

    const handleAdd = () => {
        navigate("/material/packing-slip/add");
    };

    const handleEdit = (row) => {
        navigate(`/material/packing-slip/edit/${row.id}`, {
            state: row,
        });
    };

    const handleDelete = (id) => {
        console.log("Delete packing slip:", id);
    };

    const columns = [
        { field: "functionName", headerName: "Function", flex: 1 },
        { field: "objectName", headerName: "Object Name", flex: 1 },

        {
            field: "new",
            headerName: "New",
            width: 90,
            renderCell: (params) =>
                params.value ? <Icon color="success">check</Icon> : null,
        },
        {
            field: "edit",
            headerName: "Edit",
            width: 90,
            renderCell: (params) =>
                params.value ? <Icon color="primary">check</Icon> : null,
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 100,
            renderCell: (params) =>
                params.value ? <Icon color="error">check</Icon> : null,
        },
        {
            field: "view",
            headerName: "View",
            width: 90,
            renderCell: (params) =>
                params.value ? <Icon color="action">check</Icon> : null,
        },

        { field: "menuLevel", headerName: "Menu Level", width: 130 },

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
                    routeSegments={[{ name: "Transaction" }, { name: "Packing Slip" }]}
                />
            </Box>

            <Stack spacing={3}>
                {/* Top Right Add Button */}
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                        onClick={handleAdd}
                    >
                        New
                    </Button>
                </Box>

                {/* Data Grid */}
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

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
import {
    PackingSlipPaginationAPI,
    getPackingSlipDetailsAPI,
    deletePackingSlipAPI,
} from "app/utils/authServices"; // Note: Assuming these APIs exist

export default function PackingSlipTable() {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const fetchPackingSlips = async () => {
        setLoading(true);
        try {
            const response = await PackingSlipPaginationAPI(
                "packingslip_hed",
                paginationModel.page + 1,
                paginationModel.pageSize
            );
            if (response?.Data) {
                setRows(response.Data);
                setRowCount(response.TotalCount || 0);
            }
        } catch (e) {
            console.error("Error fetching packing slips:", e);
            setRows([]);
            setRowCount(0);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPackingSlips();
    }, [paginationModel]);

    const handleAdd = () => {
        navigate("/material/packing-slip/add");
    };

    const handleEdit = async (row) => {
        setLoading(true);
        try {
            const profcen_cd = localStorage.getItem("PROFCEN_CD");
            const response = await getPackingSlipDetailsAPI({
                slip_No: row.slip_No,
                profcen_cd: profcen_cd,
            });

            if (response) {
                navigate(`/material/packing-slip/edit/${row.slip_No}`, {
                    state: { packingSlipDetails: response },
                });
            }
        } catch (e) {
            console.error("Failed to fetch packing slip details:", e);
        }
        setLoading(false);
    };

    const handleDelete = async (slip_No) => {
        if (window.confirm("Are you sure you want to delete this packing slip?")) {
            try {
                await deletePackingSlipAPI({ slip_No });
                alert("Packing slip deleted successfully.");
                fetchPackingSlips();
            } catch (e) {
                console.error("Failed to delete packing slip:", e);
                alert("Failed to delete packing slip.");
            }
        }
    };

    const columns = [
        { field: "slip_No", headerName: "Slip No", flex: 1 },
        {
            field: "slip_dt",
            headerName: "Date",
            flex: 1,
            valueGetter: ({ value }) =>
                value && new Date(value).toLocaleDateString(),
        },
        { field: "cust_Code", headerName: "Customer", flex: 1 },
        { field: "po_Id", headerName: "PO No", flex: 1 },
        { field: "slip_type", headerName: "Type", flex: 1 },
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
                        <IconButton onClick={() => handleDelete(params.row.slip_No)}>
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
                <Box sx={{ height: 500, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.slip_No}
                        loading={loading}
                        rowCount={rowCount}
                        paginationMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 25, 50]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Stack>
        </Container>
    );
}
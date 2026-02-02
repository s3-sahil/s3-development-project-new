import {
    Container,
    Icon,
    IconButton,
    Tooltip,
    Button,
    Stack,
    Chip,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EnquiryPaginationAPI, GetEnquiryDetailsAPI } from "app/utils/authServices";

export default function EnquiryTable() {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const fetchEnquiries = async () => {
        setLoading(true);

        const response = await EnquiryPaginationAPI(
            "enquiry_hed",
            paginationModel.page + 1,
            paginationModel.pageSize
        );

        if (response?.Data) {
            const mappedRows = response.Data.map((item, index) => ({
                id: `${item.Enq_no}-${item.Enq_dt}`,
                enquiryNo: item.Enq_no,
                date: item.Enq_dt,
                customer: item.Cust_name,
                type: item.Enq_type,
                source: item.source_name || "-",
                contactPerson: item.cont_per || "-",
                status: item.enq_close ? "Closed" : "Open",
                raw: item,
            }));

            setRows(mappedRows);
            setRowCount(response.TotalCount || 0);
        }

        setLoading(false);
    };


    useEffect(() => {
        fetchEnquiries();
    }, [paginationModel]);

    const handleAdd = () => {
        navigate("/material/sales-enquiry-form/add");
    };

    const handleEdit = async (row) => {
        const { Enq_no, Enq_dt, profcen_cd } = row.raw;

        setLoading(true);

        const response = await GetEnquiryDetailsAPI({
            Enq_no,
            Enq_dt,
            profcen_cd,
        });

        setLoading(false);

        if (response) {
            navigate(
                `/material/sales-enquiry-form/edit/${Enq_no}`,
                {
                    state: {
                        enquiryDetails: response,
                    },
                }
            );
        }
    };
    const handleDelete = (id) => {
        console.log("Delete:", id);
    };

    const columns = [
        { field: "enquiryNo", headerName: "Enquiry No", flex: 1 },
        { field: "date", headerName: "Date", width: 120 },
        { field: "customer", headerName: "Customer", flex: 1.5 },
        { field: "type", headerName: "Type", width: 120 },
        { field: "source", headerName: "Source", width: 120 },
        { field: "contactPerson", headerName: "Contact Person", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={
                        params.value === "Open"
                            ? "success"
                            : params.value === "Closed"
                                ? "default"
                                : "warning"
                    }
                />
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
                    routeSegments={[{ name: "Sales" }, { name: "Enquiry" }]}
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

                <Box sx={{ height: 450, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={loading}
                        rowCount={rowCount}
                        paginationMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={(newModel) => {
                            setPaginationModel((prev) => ({
                                page:
                                    newModel.pageSize !== prev.pageSize
                                        ? 0
                                        : newModel.page,
                                pageSize: newModel.pageSize,
                            }));
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Stack>
        </Container>
    );
}

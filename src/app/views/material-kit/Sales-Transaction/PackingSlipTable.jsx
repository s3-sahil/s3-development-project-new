import { Box, Button, Icon, IconButton, Tooltip } from "@mui/material";
import { Breadcrumb } from "app/components";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import {
    PackingSlipPaginationAPI,
    getPackingSlipDetailsAPI,
    deletePackingSlipAPI,
} from "app/utils/authServices"; // Note: Assuming these APIs exist
=======
import { PackingSlipPaginationAPI } from "app/utils/authServices";
>>>>>>> d80e84b6be74dd911a4dfa8a4103dc9f09f0c14f

const PackingSlipTable = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCountState, setRowCountState] = useState(0);

<<<<<<< HEAD
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
=======
  const fetchPackingSlips = async () => {
    setLoading(true);
    try {
      const response = await PackingSlipPaginationAPI(
        "packingSlip",
        paginationModel.page + 1,
        paginationModel.pageSize,
      );
      debugger;
      if (response && response.Data) {
        const dataWithId = response.Data.map((row) => ({
          ...row,
          id: row.Slip_No,
          slip_No: row.Slip_No,
          slip_dt: row.Slip_dt,
          cust_Code: row.Cust_Code,
          po_Id: row.Po_Id,
        }));
        setRows(dataWithId);
        setRowCountState(response.TotalCount || 0);
      } else {
        setRows([]);
        setRowCountState(0);
      }
    } catch (error) {
      console.error("Failed to fetch packing slips:", error);
      setRows([]);
      setRowCountState(0);
    }
    setLoading(false);
  };
>>>>>>> d80e84b6be74dd911a4dfa8a4103dc9f09f0c14f

  useEffect(() => {
    fetchPackingSlips();
  }, [paginationModel.page, paginationModel.pageSize]);

<<<<<<< HEAD
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
=======
  const handleAdd = () => {
    navigate("/material/packing-slip/add");
  };

  const handleEdit = (row) => {
    navigate(`/material/packing-slip/edit/${row.slip_No}`, { state: row });
  };

  const handleDelete = (id) => {
    console.log("Delete packing slip:", id);
    // You would call a delete API here and then refetch the data
  };

  const columns = [
    { field: "slip_No", headerName: "Slip No", flex: 1 },
    {
      field: "Slip_dt",
      headerName: "Slip Date",
      flex: 1,
      valueFormatter: (params) =>
        params
          ? new Date(params).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "",
    },
    { field: "cust_Code", headerName: "Customer", flex: 1 },
    { field: "po_Id", headerName: "PO No", flex: 1 },
    { field: "remark", headerName: "Remark", flex: 2 },
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
    <Box m={3}>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Transaction" }, { name: "Packing Slip" }]}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
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
          rowCount={rowCountState}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>
    </Box>
  );
};

export default PackingSlipTable;
>>>>>>> d80e84b6be74dd911a4dfa8a4103dc9f09f0c14f

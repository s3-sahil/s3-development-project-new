import { Box, Button, Icon, IconButton, Tooltip, TextField } from "@mui/material";
import { Breadcrumb } from "app/components";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackingSlipPaginationAPI } from "app/utils/authServices";

const PackingSlipTable = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCountState, setRowCountState] = useState(0);

  const fetchPackingSlips = async (pageOverride) => {
    setLoading(true);
    const pageToFetch = typeof pageOverride === "number" ? pageOverride : paginationModel.page;
    try {
      const response = await PackingSlipPaginationAPI(
        "packingSlip",
        pageToFetch + 1,
        paginationModel.pageSize,
        searchQuery
      );
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

  useEffect(() => {
    fetchPackingSlips();
  }, [paginationModel.page, paginationModel.pageSize]);

  const handleAdd = () => {
    navigate("/material/packing-slip/add");
  };

  const handleSearch = () => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
    fetchPackingSlips(0);
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

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={2}>
          <TextField
            size="small"
            placeholder="Search by Slip No"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

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

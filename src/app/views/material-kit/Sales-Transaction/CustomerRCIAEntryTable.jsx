import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CustomerRCIAPaginationAPI } from "app/utils/salesTransactionServices";

export default function CustomerRCIAEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await CustomerRCIAPaginationAPI(
        "cust_rcia",
        paginationModel.page + 1,
        paginationModel.pageSize
      );

      if (response && response.Data) {
        setRows(
          response.Data.map((row, index) => ({ ...row, id: row.rcia_no || index }))
        );
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  const columns = [
    { field: "cust_code", headerName: "Customer Code", flex: 1 },
    { field: "rcia_no", headerName: "RCIA No", flex: 1 },
    { field: "rcia_date", headerName: "RCIA Date", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/sales-customer-RCIA-entry-form/edit/${params.row.id}`, { state: params.row })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
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
          routeSegments={[{ name: "TQM" }, { name: "Customer RCIA Entry" }]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Action Bar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box display="flex" gap={2}>
            <TextField size="small" placeholder="Search..." />
            <TextField size="small" placeholder="Select Column" />
            <Button variant="contained">Search</Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-customer-RCIA-entry-form/add")}
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
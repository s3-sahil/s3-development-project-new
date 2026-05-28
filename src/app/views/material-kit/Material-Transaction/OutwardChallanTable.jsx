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
import { OutwardChallanPaginationAPI } from "app/utils/materialService";

export default function OutwardChallanTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // 🔹 Fetch Data (API)
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await OutwardChallanPaginationAPI(
        "vchal_head",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response && response.Data) {
        const mappedData = response.Data.map((row, index) => ({
          id: `${row.getOut_No}_${index}`,
          challanNo: row.Challan_NO,
          date: row.OutDate ? row.OutDate.split("T")[0] : "",
          outwardType: row.OutType,
          supplier: row.Party_Name,
          vehicleNo: row.Vehicle_No,
          status: row.status || "Pending",
          original: row, // for edit
        }));

        setRows(mappedData);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching outward challan:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // 🔹 Columns
  const columns = [
    { field: "challanNo", headerName: "Challan No", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "outwardType", headerName: "Outward Type", flex: 1 },
    { field: "supplier", headerName: "Supplier", flex: 1 },
    { field: "vehicleNo", headerName: "Vehicle No", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },

    {
      field: "actions",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(
                `/material/material-outward-challan-form/edit/${params.row.id}`,
                { state: params.row.original }
              )
            }
          >
            <Icon color="primary">edit</Icon>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Outward Challan" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Bar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "challan_NO", label: "Challan No" },
              { value: "party_Name", label: "Supplier" },
              { value: "vehicle_No", label: "Vehicle No" },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-outward-challan-form/add")
            }
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
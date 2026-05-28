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
import { useState, useEffect } from "react";
import { DbkMasterEntryPaginationAPI } from "app/utils/FinanceTransactionServices";

export default function DbkMasterEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] =
    useState("tariffCode");

  const [paginationModel, setPaginationModel] =
    useState({
      page: 0,
      pageSize: 10,
    });

  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response =
        await DbkMasterEntryPaginationAPI(
          "DBK_MASTER_ENTRY",
          paginationModel.page + 1,
          paginationModel.pageSize,
          searchField,
          searchText
        );

      if (response?.Data) {
        const mappedRows = response.Data.map(
          (item, index) => ({
            id: item.id || index + 1,
            tariffCode: item.tariffCode || "",
            srNo: item.srNo || "",
            rate: item.rate || "",
            inputTariff:
              item.inputTariff || false,
            rateKg: item.rateKg || "",
            remark: item.remark || "",
            wefDate: item.wefDate || "",
            original: item,
          })
        );

        setRows(mappedRows);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error(
        "Fetch Error:",
        error.response || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    paginationModel,
    searchText,
    searchField,
  ]);

  // ================= DELETE =================
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // ================= COLUMNS =================
  const columns = [
    {
      field: "tariffCode",
      headerName: "Tariff Code",
      flex: 1,
    },
    {
      field: "srNo",
      headerName: "Sr No",
      flex: 1,
    },
    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
    },
    {
      field: "inputTariff",
      headerName: "Input Tariff",
      flex: 1,
      renderCell: (params) =>
        params.value ? "Yes" : "No",
    },
    {
      field: "rateKg",
      headerName: "Rate/Kg",
      flex: 1,
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: 1,
    },
    {
      field: "wefDate",
      headerName: "WEF Date",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/finance-dbk-master-entry-form/edit/${params.row.id}`,
                  {
                    state: params.row.original,
                  }
                )
              }
            >
              <Icon color="primary">
                edit
              </Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                handleDelete(params.row.id)
              }
            >
              <Icon color="error">
                delete
              </Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Finance" },
            {
              name: "Dbk Master Entry",
            },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

            <TextField
              select
              size="small"
              value={searchField}
              onChange={(e) =>
                setSearchField(e.target.value)
              }
              sx={{ width: 220 }}
            >
              <MenuItem value="tariffCode">
                Tariff Code
              </MenuItem>

              <MenuItem value="srNo">
                Sr No
              </MenuItem>

              <MenuItem value="rate">
                Rate
              </MenuItem>

              <MenuItem value="remark">
                Remark
              </MenuItem>
            </TextField>

            <Button
              variant="contained"
              onClick={fetchData}
            >
              Search
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate(
                "/material/finance-dbk-master-entry-form/add"
              )
            }
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={
              setPaginationModel
            }
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
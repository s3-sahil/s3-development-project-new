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
import { MaterialRateContractPaginationAPI } from "app/utils/materialMaterialServices";
import SearchFilter from "../SearchFilter";

export default function MaterialRateContractTable() {
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

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await MaterialRateContractPaginationAPI(
        "material_rate_contract",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery,
      );

      if (response?.Data) {
        const mappedData = response.Data.map((row, index) => ({
          ...row,
          id: `${row.itemCode}_${index}`,
        }));

        setRows(mappedData);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching Material Rate Contract:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  const columns = [
    {
      field: "itemCode",
      headerName: "Item Code",
      flex: 1,
    },
    {
      field: "uom",
      headerName: "UOM",
      flex: 1,
    },
    {
      field: "supplierCode",
      headerName: "Supplier Code",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
    },
    {
      field: "discount",
      headerName: "Discount (%)",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(
                `/material/material-rate-contract-form/edit/${params.row.id}`,
                {
                  state: params.row,
                },
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
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Rate Contract" },
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
              {
                value: "itemCode",
                label: "Item Code",
              },
              {
                value: "supplierCode",
                label: "Supplier Code",
              },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-rate-contract-form/add")
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
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
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

import { AdditionalWorkOrderRequisitionPaginationAPI } from "app/utils/materialMaterialServices";

export default function AdditionalWorkOrderRequisitionTable() {
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
      const response = await AdditionalWorkOrderRequisitionPaginationAPI(
        "additional_work_order_requisition",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery,
      );

      if (response && response.Data) {
        const mappedData = response.Data.map((row, index) => ({
          ...row,
          id: `${row.requisitionNo || index}_${index}`,
        }));

        setRows(mappedData);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  const columns = [
    {
      field: "requisitionNo",
      headerName: "Requisition No.",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "workOrderNo",
      headerName: "Work Order No.",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "itemCode",
      headerName: "Item Code",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "uom",
      headerName: "UOM",
      flex: 1,
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/material-additional-work-order-requisition-form/edit/${params.row.id}`,
                  {
                    state: params.row,
                  },
                )
              }
            >
              <Icon color="primary">edit</Icon>
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
          routeSegments={[
            { name: "Material" },
            { name: "Additional Work Order Requisition" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* TOP BAR */}
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
                value: "requisitionNo",
                label: "Requisition No",
              },
              {
                value: "workOrderNo",
                label: "Work Order No",
              },
              {
                value: "department",
                label: "Department",
              },
              {
                value: "itemCode",
                label: "Item Code",
              },
              {
                value: "status",
                label: "Status",
              },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate(
                "/material/material-additional-work-order-requisition-form/add",
              )
            }
          >
            New
          </Button>
        </Box>

        {/* TABLE */}
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
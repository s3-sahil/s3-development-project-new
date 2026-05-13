import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter";
import { SectionWiseProductionDetailPaginationAPI } from "app/utils/ProductionTransactionServices";

export default function SectionWiseProductionDetailTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rowCount, setRowCount] = useState(0);

  // ✅ Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await SectionWiseProductionDetailPaginationAPI(
        "SECTIONWISE_PRODUCTION_DETAIL",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.id || index + 1,
          reportNo: item.reportNo || "",
          reportDate: item.reportDate || "",
          shiftFrom: item.shiftFrom || "",
          shiftTo: item.shiftTo || "",
          shiftIncharge: item.shiftIncharge || "",
          machineNo: item.machineNo || "",
          cutTime: item.cutTime || "",
          productCode: item.productCode || "",
          operation: item.operation || "",
          productionType: item.productionType || "",
          produceQty: item.produceQty || "",
          rejectionQty: item.rejectionQty || "",
          okQty: item.okQty || "",
          wipQty: item.wipQty || "",
          breakdownReason: item.breakdownReason || "",
          totalBreakdownTime: item.totalBreakdownTime || "",
          directEmployee: item.directEmployee || "",
          indirectEmployee: item.indirectEmployee || "",
          employee: item.employee || "",
          original: item,
        }));

        setRows(mappedRows);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // ✅ Edit
  const handleEdit = (row) => {
    navigate(
      `/material/production-section-wise-production-detail-form/edit/${row.id}`,
      {
        state: row.original,
      }
    );
  };

  // ✅ Columns
  const columns = [
    { field: "reportNo", headerName: "Report No", width: 120 },
    { field: "reportDate", headerName: "Report Date", width: 150 },
    { field: "shiftFrom", headerName: "Shift From", width: 120 },
    { field: "shiftTo", headerName: "Shift To", width: 120 },
    { field: "shiftIncharge", headerName: "Shift Incharge", width: 180 },
    { field: "machineNo", headerName: "Machine No", width: 150 },
    { field: "cutTime", headerName: "Cut Time", width: 120 },
    { field: "productCode", headerName: "Product Code", width: 150 },
    { field: "operation", headerName: "Operation", width: 150 },
    { field: "productionType", headerName: "Production Type", width: 180 },
    { field: "produceQty", headerName: "Produce Qty", width: 150 },
    { field: "rejectionQty", headerName: "Rejection Qty", width: 150 },
    { field: "okQty", headerName: "OK Qty", width: 120 },
    { field: "wipQty", headerName: "WIP Qty", width: 120 },
    { field: "breakdownReason", headerName: "Breakdown Reason", width: 180 },
    {
      field: "totalBreakdownTime",
      headerName: "Breakdown Time",
      width: 180,
    },
    {
      field: "directEmployee",
      headerName: "Direct Employee",
      width: 180,
    },
    {
      field: "indirectEmployee",
      headerName: "Indirect Employee",
      width: 180,
    },
    { field: "employee", headerName: "Employee", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(params.row)}>
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
            { name: "Production" },
            { name: "Section Wise Production Details" },
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
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "reportNo", label: "Report No" },
              { value: "reportDate", label: "Report Date" },
              { value: "shiftIncharge", label: "Shift Incharge" },
              { value: "machineNo", label: "Machine No" },
              { value: "productCode", label: "Product Code" },
              { value: "operation", label: "Operation" },
            ]}
            onSearch={fetchData}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate(
                "/material/production-section-wise-production-detail-form/add"
              )
            }
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
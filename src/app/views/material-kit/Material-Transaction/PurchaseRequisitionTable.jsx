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
import { PurchaseRequisitionPaginationAPI } from "app/utils/materialTransactionServices";

export default function PurchaseRequisitionTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  // ---------------- FETCH API ----------------
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await PurchaseRequisitionPaginationAPI(
        "Indent_head",
        page + 1,
        pageSize
      );

      const data = res?.Data || [];

      // ✅ SAFE MAPPING (prevents empty row crash)
      const mappedRows = (data || [])
        .filter((item) => item?.IND_NO) // remove invalid rows
        .map((item) => ({
          id: item.IND_NO || `${Math.random()}`, // fallback safety
          requisitionNo: item.IND_NO || "",
          date: item.IND_DATE ? item.IND_DATE.split("T")[0] : "",
          department: item.DEPT_CODE || "",
          supplier: item.Supplier || "",
          status:
            item.approval_flag === "Y"
              ? "Approved"
              : item.approval_flag === "A"
              ? "Pending"
              : "Draft",
        }));

      setRows(mappedRows);

      setRowCount(res?.TotalCount || mappedRows.length);
    } catch (error) {
      console.error("Fetch Error:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  // ---------------- COLUMNS ----------------
  const columns = [
    { field: "requisitionNo", headerName: "Requisition No", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "department", headerName: "Department", width: 180 },
    { field: "supplier", headerName: "Supplier", width: 180 },
    { field: "status", headerName: "Status", width: 140 },

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
                `/material/material-purchase-requisition-form/edit/${params?.row?.id}`,
                {
                  state: {
                    prNo: params.row.requisitionNo,
                    date: params.row.date,
                  },
                }
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
      {/* BREADCRUMB */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Purchase Requisition" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* NEW BUTTON */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-purchase-requisition-form/add")
            }
          >
            New
          </Button>
        </Box>

        {/* TABLE */}
        <Box sx={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pagination
            paginationMode="server"
            pageSizeOptions={[5, 10, 20]}
            rowCount={rowCount}
            page={page}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newSize) => setPageSize(newSize)}
            getRowId={(row) => row.id}   // ✅ SAFE + REQUIRED FIX
          />
        </Box>
      </Stack>
    </Container>
  );
}
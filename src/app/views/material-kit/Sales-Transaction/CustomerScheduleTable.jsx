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
import SearchFilter from "../SearchFilter";

// 👉 IMPORT YOUR API
import {
  CustomerSchedulePaginationAPI,
} from "app/utils/salesTransactionServices";

export default function CustomerScheduleTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  // ===========================
  // ✅ FETCH DATA (SERVER SIDE)
  // ===========================
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await CustomerSchedulePaginationAPI(
        "cust_rcia",
        paginationModel.page + 1,
        paginationModel.pageSize
      );

      if (response?.Data) {
        const formattedData = response.Data.map((item, index) => ({
          id: item.cust_code || index, // ✅ important

          customerName: item.cust_code,
          itemCode: item.item_code,
          totalQuantity: item.TotalCount,
        }));

        setRows(formattedData);
        setOriginalRows(formattedData);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setRows([]);
      setOriginalRows([]);
      setRowCount(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  // ===========================
  // ✅ NAVIGATION
  // ===========================
  const handleAdd = () => {
    navigate("/material/sales-customer-schedule-detail-form/add");
  };

  const handleEdit = async (row) => {
    setLoading(true);
    // try {
    //   const response = await getCustomerScheduleById(row.id);

    //   if (response) {
    //     navigate(
    //       `/material/sales-customer-schedule-detail-form/edit/${row.id}`,
    //       {
    //         state: { scheduleData: response },
    //       }
    //     );
    //   }
    // } catch (error) {
    //   console.error("Edit fetch error:", error);
    // }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
    //   try {
    //     await deleteCustomerSchedule(id);
    //     alert("Deleted Successfully");
    //     fetchData();
    //   } catch (error) {
    //     console.error("Delete error:", error);
    //     alert("Delete failed");
    //   }
    }
  };

  // ===========================
  // ✅ SEARCH
  // ===========================
  const handleSearch = () => {
    if (!searchQuery) {
      setRows(originalRows);
      return;
    }

    const filtered = originalRows.filter((row) => {
      const searchStr = searchQuery.toLowerCase();

      if (searchColumn) {
        return String(row[searchColumn])
          .toLowerCase()
          .includes(searchStr);
      } else {
        return Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchStr)
        );
      }
    });

    setRows(filtered);
  };

  // ===========================
  // ✅ COLUMNS
  // ===========================
  const columns = [
    { field: "period", headerName: "Period", width: 120 },
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    {
      field: "totalQuantity",
      headerName: "Total Quantity",
      width: 150,
      align: "right",
    },

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
    <Container maxWidth="xl">
      {/* ===== Breadcrumb ===== */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Sales" },
            { name: "Customer Schedule Detail" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* ===== Top Section ===== */}
        <Box display="flex" justifyContent="space-between">
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "customerName", label: "Customer Name" },
              { value: "poNo", label: "PO No" },
            ]}
            onSearch={handleSearch}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            New
          </Button>
        </Box>

        {/* ===== DataGrid ===== */}
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
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
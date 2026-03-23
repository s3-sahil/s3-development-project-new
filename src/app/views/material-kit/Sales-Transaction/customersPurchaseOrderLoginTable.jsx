import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletecustomerpurchaselogindetail } from "app/utils/authServices";
import SearchFilter from "../SearchFilter";

export default function CustomersPurchaseOrderLoginTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  // 🔹 Dummy Data with fields required for deletion (Replace with actual Fetch API)
  useEffect(() => {
    const data = [
      {
        id: 1,
        PO_NO: "PO-2024-001",
        PO_DT: "2024-02-15",
        CUST_CODE: "C001",
        CUST_NAME: "Tech Solutions Ltd",
        PO_ID: "PID001",
        PO_ID_DT: "2024-02-15T10:00:00",
        PROFCEN_CD: "2",
      },
      {
        id: 2,
        PO_NO: "PO-2024-002",
        PO_DT: "2024-02-16",
        CUST_CODE: "C002",
        CUST_NAME: "Global Corp",
        PO_ID: "PID002",
        PO_ID_DT: "2024-02-16T11:30:00",
        PROFCEN_CD: "2",
      },
    ];
    setRows(data);
    setOriginalRows(data);
  }, []);

  const handleAdd = () => {
    navigate("/material/customers-purchase-order-login-form/add");
  };

  const handleEdit = (row) => {
    navigate(
      `/material/customers-purchase-order-login-form/edit/${row.PO_NO}`,
      {
        state: row,
      },
    );
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setRows(originalRows);
      return;
    }

    const filteredRows = originalRows.filter((row) => {
      const searchStr = searchQuery.toLowerCase();

      if (searchColumn) {
        const value = row[searchColumn];
        return String(value).toLowerCase().includes(searchStr);
      } else {
        // If no column selected, search all relevant fields
        return Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchStr)
        );
      }
    });

    setRows(filteredRows);
  };

  const handleDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this Purchase Order?")) {
      try {
        setLoading(true);
        await deletecustomerpurchaselogindetail(row);
        setRows((prev) => prev.filter((r) => r.id !== row.id));
        setOriginalRows((prev) => prev.filter((r) => r.id !== row.id));
        alert("Deleted successfully!");
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete record.");
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    { field: "PO_NO", headerName: "PO No", width: 150 },
    { field: "PO_DT", headerName: "PO Date", width: 120 },
    { field: "CUST_CODE", headerName: "Customer Code", width: 120 },
    { field: "CUST_NAME", headerName: "Customer Name", flex: 1 },
    { field: "PO_ID", headerName: "PO ID", width: 100 },

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
            <IconButton onClick={() => handleDelete(params.row)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Transaction" },
            { name: "Customer Purchase Order Login" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "PO_NO", label: "PO No" },
              { value: "CUST_NAME", label: "Customer Name" },
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

        <Box sx={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}

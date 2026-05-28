import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter";
import {
  BusinessPlanPaginationAPI,
  getBusinessPlan,
} from "app/utils/salesTransactionServices";

export default function BusinessPlanTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0); // DataGrid starts from 0
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  const fetchData = async (pageNo = page, size = pageSize) => {
    try {
      setLoading(true);

      const res = await BusinessPlanPaginationAPI(
        "BUSINESS_PLAN",
        pageNo + 1,
        size,
      );
      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.id || index + 1,
          Period: item.Period,
          Cust_Code: item.Cust_Code,
          Item_Code: item.Item_Code,
          Profcen_Cd:item.Profcen_Cd
        }));

        setRows(formattedRows);
        setRowCount(res.TotalCount || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const handleEdit = async (row) => {
    try {
      setLoading(true);

      const payload = {
        Cust_Code: row?.Cust_Code,
        Profcen_Cd: row?.Profcen_Cd,
        Period: row?.Period
      };

      console.log("Edit Payload:", payload);

      const response = await getBusinessPlan(
        payload.Cust_Code,
        payload.Profcen_Cd,
        payload.Period,
      );

      if (!response?.data || response?.data?.length === 0) {
        alert("No data found for selected record");
        return;
      }

      navigate(`/material/sales-business-plan-form/edit/${row.id}`, {
        state: { businessplan: response?.data },
      });
    } catch (e) {
      console.error("Failed to fetch business plan:", e.message);
      alert(e.message); // show backend error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      fetchData(); // reload original
      return;
    }

    const filtered = rows.filter((row) => {
      const searchStr = searchQuery.toLowerCase();

      if (searchColumn) {
        return String(row[searchColumn]).toLowerCase().includes(searchStr);
      }

      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchStr),
      );
    });

    setRows(filtered);
  };

  const columns = [
    { field: "Period", headerName: "Period", flex: 1 },
    { field: "Cust_Code", headerName: "Customer Code", flex: 1 },
    { field: "Item_Code", headerName: "Item Code", flex: 1 },
    { field: "Profcen_Cd", headerName: "Profcen_Cd", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
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
          routeSegments={[{ name: "Planning" }, { name: "Business Plan" }]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Search Bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "empNo", label: "Emp No" },
              { value: "cardNumber", label: "Card Number" },
            ]}
            onSearch={handleSearch}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-business-plan-form/add")}
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
            paginationMode="server"
            rowCount={rowCount}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}

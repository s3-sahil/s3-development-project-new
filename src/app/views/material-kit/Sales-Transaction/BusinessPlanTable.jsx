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

export default function BusinessPlanTable() {
  const navigate = useNavigate();

  const initialRows = [
    { id: 1, empNo: "00001", cardNumber: "1" },
    { id: 2, empNo: "00100", cardNumber: "100" },
    { id: 3, empNo: "00101", cardNumber: "101" },
    { id: 4, empNo: "00103", cardNumber: "103" },
    { id: 5, empNo: "00105", cardNumber: "105" },
  ];

  const [rows, setRows] = useState(initialRows);
  const [originalRows, setOriginalRows] = useState(initialRows);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

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
        return Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchStr)
        );
      }
    });

    setRows(filteredRows);
  };

  const columns = [
    { field: "empNo", headerName: "Emp No", flex: 1 },
    { field: "cardNumber", headerName: "Card Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: () => (
        <>
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
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Business Plan" }]} />
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
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
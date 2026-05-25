import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardDetailPaginationAPI } from "app/utils/authServices";



export default function CardDetailTable() {
  

  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState("");


  const fetchData = async () => {
      setLoading(true);

    try {
      const response = await CardDetailPaginationAPI(
        "Card_mst",
        page + 1,
        pageSize,
      );

      const data = response?.Data || [];

      const formattedRows = data.map((item,index) => ({
        id: item.Card_No,
        Card_No: item.Card_No,
        Emp_No: item.Emp_No,
        Assign_Date: item.Assign_Date
      }));

      setRows(formattedRows);
      setFilteredRows(formattedRows);
      setTotalRows(response?.TotalCount || 0);
    } catch (error) {
      console.error("Table fetch error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
      fetchData();
    }, [page, pageSize, location.state]);

  // // //
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = rows.filter((row) =>
        row.Card_No?.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      
      setFilteredRows(filtered);

    }, 300);

    return () => clearTimeout(timer);

  }, [searchText, rows]);

  // // //
  const handleSearch = () => {
    const filtered = rows.filter((row) =>
      row.Card_No?.toLowerCase().includes(searchText.toLowerCase())
    );
    // setRows(filtered);
    // setFilteredRows(filtered);
    setFilteredRows(filtered);
  };

  const handleDelete = (Card_No) => {
    const updatedRows = rows.filter((row) => row.Card_No !== Card_No);
    setRows(updatedRows);
    setFilteredRows(updatedRows);
  };

  const columns = [
    { field: "Card_No", headerName: "Card Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/TMS-card-details-form/edit/${params.row.Card_No}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.Card_No)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Card Details" }]} />
      </Box>

      <Stack spacing={3}>
        {/* 🔍 Top Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-card-details-form/add")}
          >
            New
          </Button>
        </Box>

        {/* 📊 Table */}
        <Box sx={{ height: 500 }}>
          <DataGrid
            //rows={rows}
            rows={filteredRows}
            columns={columns}
            rowCount={totalRows}
            loading={loading}
            pagination
            paginationMode="server"
            pageSizeOptions={[5, 10, 20]}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}
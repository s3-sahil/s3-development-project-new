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
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CardDetailsTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, cardNumber: "020033AD3DA1" },
    { id: 2, cardNumber: "100" },
    { id: 3, cardNumber: "101" },
    { id: 4, cardNumber: "103" },
    { id: 5, cardNumber: "105" },
  ]);

  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearch = () => {
    const filtered = rows.filter((row) =>
      row.cardNumber.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    setFilteredRows(updatedRows);
  };

  const columns = [
    { field: "cardNumber", headerName: "Card Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/card-details-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
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
            onClick={() => navigate("/material/card-details-form/add")}
          >
            New
          </Button>
        </Box>

        {/* 📊 Table */}
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
      </Stack>
    </Container>
  );
}
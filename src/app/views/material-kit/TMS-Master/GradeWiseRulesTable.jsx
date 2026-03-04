import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GradeWiseRulesTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, grade: "I", coffApplicable: "Yes", minFullDay: 0.9, minHalfDay: 0.45 },
    { id: 2, grade: "M1", coffApplicable: "No", minFullDay: "-", minHalfDay: "-" },
    { id: 3, grade: "P", coffApplicable: "Yes", minFullDay: 0.9, minHalfDay: 0.45 },
  ]);

  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("grade");

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSearch = () => {
    if (!searchText) return;

    const filtered = rows.filter((row) =>
      String(row[searchColumn])
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    setRows(filtered);
  };

  const columns = [
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "coffApplicable", headerName: "COff Applicable", flex: 2 },
    { field: "minFullDay", headerName: "Min Presenty Req. For Full Day", flex: 2 },
    { field: "minHalfDay", headerName: "Min Presenty Req. For Half Day", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/TMS-grade-wise-rules-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Grade Wise Rules" }]} />
      </Box>

      <Stack spacing={3}>
        
        {/* Top Bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          
          {/* Search Section */}
          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Select
              size="small"
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              <MenuItem value="grade">Grade</MenuItem>
              <MenuItem value="coffApplicable">COff Applicable</MenuItem>
              <MenuItem value="minFullDay">Min Full Day</MenuItem>
              <MenuItem value="minHalfDay">Min Half Day</MenuItem>
            </Select>

            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Stack>

          {/* New Button */}
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-grade-wise-rules-form/add")}
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
      </Stack>
    </Container>
  );
}
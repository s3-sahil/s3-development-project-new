import { useEffect, useState } from "react";
import {
  Box,
  Card,
  TextField,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axiosInstance from "app/api/axiosInstance"; // adjust path

export default function AttendanceStatusTable() {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Data
  const fetchAttendanceStatus = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/API/TMS/TMS_PARAMETER/GET-ATTENDANCE-STATUS"
      ); // change API if different

      setRows(response.data || []);
    } catch (error) {
      console.error("Error fetching attendance status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceStatus();
  }, []);

  // 🔹 Search Filter
  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // 🔹 Columns
  const columns = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 250,
    },
    {
      field: "applicableStatus",
      headerName: "Applicable Status",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleView(params.row)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const handleView = (row) => {
    console.log("View Row:", row);
    // navigate(`/attendance-status/${row.code}`);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Attendance Status Details
      </Typography>

      {/* 🔹 Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      {/* 🔹 DataGrid */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.code}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          pagination
        />
      </Box>
    </Card>
  );
}
import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter";
import { EnquiryPaginationAPI } from "app/utils/salesTransactionServices";

export default function EnquiryLoginEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch API Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await EnquiryPaginationAPI(
        "enquiry_hed",
        paginationModel.page + 1, // API is 1-based
        paginationModel.pageSize,
      );

      if (res?.Data) {
        const mappedRows = res.Data.map((item) => ({
          id: item.Enq_no, // ✅ MUST be unique (important fix)
          enquiryNo: item.Enq_no,
          enquiryDate: item.Enq_dt?.split("T")[0],
          customerName: item.Cust_name,
          marketingBy: item.Emp_name,
        }));

        setRows(mappedRows);
        setRowCount(res.TotalCount || 0); // ✅ correct total count
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  // 🔍 Search (client-side optional)
  const handleSearch = () => {
    if (!searchQuery) {
      fetchData();
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

  const handleAdd = () => {
    navigate("/material/sales-enquiry-login-entry-form/add");
  };

  //   const handleEdit = (row) => {
  //     navigate(`/material/sales-enquiry-login-entry-form/edit/${row.id}`, {
  //       state: row,
  //     });
  //   };
  const handleEdit = (row) => {
    const formatDate = (date) => {
      return date ? `${date}T00:00:00` : "";
    };

    navigate(`/material/sales-enquiry-login-entry-form/edit/${row.id}`, {
      state: {
        Enq_no: row.enquiryNo,
        Enq_dt: formatDate(row.enquiryDate), // ✅ FIXED
        profcen_cd: row.profcen_cd
      },
    });
  };

  const handleDelete = (id) => {
    console.log("Delete enquiry:", id);
  };

  const columns = [
    { field: "enquiryNo", headerName: "Enquiry No", width: 140 },
    { field: "enquiryDate", headerName: "Date", width: 120 },
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
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
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Sales" }, { name: "Enquiry Login Entry" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between">
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "enquiryNo", label: "Enquiry No" },
              { value: "customerName", label: "Customer Name" },
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

        <Box sx={{ height: 450, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={rowCount}
            loading={loading}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => {
              setPaginationModel({
                page: model.page,
                pageSize: model.pageSize,
              });
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}

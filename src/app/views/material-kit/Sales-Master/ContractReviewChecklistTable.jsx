import { Container, Box, Icon, IconButton, Tooltip, TextField,MenuItem , Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
//import { useState } from "react";
import { useEffect, useState } from "react";
import { ContractReviewChecklistPaginationAPI } from "app/utils/authServices";

const ContractReviewChecklistTable = () => {


  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadProjectActivity = async () => {
    setLoading(true);
    const res = await ContractReviewChecklistPaginationAPI(
      "contract_review_checklist",
      page + 1,
      pageSize
    );

    if (res?.Data) {
      setRows(
        res.Data.map((item, index) => ({
          id: item.id || index + 1,
          ...item,
        }))
      );
      setRowCount(res.TotalCount || 0);
    }

    setLoading(false);
  };


  useEffect(() => {
    loadProjectActivity();
  }, [page, pageSize]);

  const handleAdd = () => {
    navigate("/material/sales-contract-review-checklist-form/add");
  }

  const handleEdit = (row) => {
    navigate(`/material/sales-contract-review-checklist-form/edit/${row.Activity_code}`, {
      state: row,
    });
  };

  const handleDelete = (row) => {
    console.log("Delete contract review checklist:", row.Activity_code);
  };


  const columns = [
    { field: "check_list_code", headerName: "Checklist Code", flex: 1 },
    { field: "Description", headerName: "Checklist Description", flex: 2 },

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
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sales" }, { name: "Contract Review Checklist" }]} />
      </Box>


      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Search Section */}
        <Box display="flex" gap={2}>
          <TextField
            size="small"
            placeholder="Search..."
          />
          <TextField
            size="small"
            select
            defaultValue=""
            sx={{ width: 180 }}
          >
            <MenuItem value="">Select Column</MenuItem>
            <MenuItem value="shiftCode">Shift Code</MenuItem>
            <MenuItem value="description">Description</MenuItem>
          </TextField>
          <Button variant="contained">Search</Button>
        </Box>

        {/* New Button */}
        <Button
          variant="contained"
          startIcon={<Icon>add</Icon>}
          onClick={() => navigate("/material/sales-contract-review-checklist-form/add")}
        >
          New
        </Button>
      </Box>

      <Box sx={{ height: 520, width: "100%", background: "#fff", borderRadius: 2 }}>
        <DataGrid
          // rows={rows} columns={columns} disableRowSelectionOnClick 
          rows={rows}
          columns={columns}
          loading={loading}
          rowCount={rowCount}
          paginationMode="server"
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
        />
      </Box>
    </Container>
  );
};

export default ContractReviewChecklistTable;

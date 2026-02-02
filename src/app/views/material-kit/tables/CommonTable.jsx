import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    IconButton,
    Paper,
    Icon,
} from "@mui/material";

/* ---------- Sorting helpers ---------- */
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

/* ---------- Component ---------- */
export default function CommonTable({
    columns,
    rows,
    onEdit,
    onDelete,
}) {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedRows = [...rows].sort(getComparator(order, orderBy));
    const paginatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.id} align={col.align || "left"}>
                                    {col.sortable ? (
                                        <TableSortLabel
                                            active={orderBy === col.id}
                                            direction={orderBy === col.id ? order : "asc"}
                                            onClick={() => handleSort(col.id)}
                                        >
                                            {col.label}
                                        </TableSortLabel>
                                    ) : (
                                        col.label
                                    )}
                                </TableCell>
                            ))}
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedRows.map((row, index) => (
                            <TableRow key={index} hover>
                                {columns.map((col) => (
                                    <TableCell key={col.id} align={col.align || "left"}>
                                        {row[col.id]}
                                    </TableCell>
                                ))}

                                <TableCell align="right">
                                    <IconButton onClick={() => onEdit(row)}>
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(row)}>
                                        <Icon color="error">delete</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Paper>
    );
}

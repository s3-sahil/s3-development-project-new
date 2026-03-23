import { Box, Button, MenuItem, TextField } from "@mui/material";

export default function SearchFilter({
  searchValue,
  setSearchValue,
  searchColumn,
  setSearchColumn,
  columnOptions = [],
  onSearch,
}) {
  return (
    <Box display="flex" gap={2}>
      <TextField
        size="small"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
      <TextField
        size="small"
        select
        value={searchColumn}
        onChange={(e) => setSearchColumn(e.target.value)}
        sx={{ width: 180 }}
      >
        <MenuItem value="">Select Column</MenuItem>
        {columnOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={onSearch}>Search</Button>
    </Box>
  );
}
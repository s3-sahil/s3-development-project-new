import axiosInstance from "./axiosInstance";

export const TDS_PARA_PaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchColumn = "",
  searchText = "",
) => {
  try {
    const response = await axiosInstance.get(`/API/MASTER/PAGINATION`, {
      params: {
        tableName,
        pageNo,
        pageSize,
        searchColumn,
        searchText,
      },
    });

    return response.data;
  } catch (error) {
    console.error("TDS_PARA Pagination API Error:", error);
    return null;
  }
};

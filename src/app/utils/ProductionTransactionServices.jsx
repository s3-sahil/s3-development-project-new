import axiosInstance from "./axiosInstance";

export const SectionWiseProductionDetailPaginationAPI = async (
  tableName = "SECTIONWISE_PRODUCTION_DETAIL",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchText = ""
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: tableName,
          pageNumber,
          pageSize,
          SearchColumn: searchColumn,
          SearchText: searchText,
        },
      }
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Section Wise Production Detail pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};
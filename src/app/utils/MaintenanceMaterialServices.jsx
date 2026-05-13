import axiosInstance from "./axiosInstance";

export const MaintenanceCategoryPaginationAPI = async (
  tableName = "MAINTENANCE_CATEGORY",
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
      "Maintenance Category pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};


export const MaintenanceReasonPaginationAPI = async (
  tableName = "maintenance_reason_master",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchValue = ""
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
          SearchValue: searchValue,
        },
      }
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error(
      "Maintenance Reason pagination fetch error:",
      error
    );

    return null;
  }
};


export const PreventiveMaintenancePaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchColumn = "",
  searchValue = ""
) => {
  try {
    const response = await fetch(
      `/api/CommonPagination/GetPagination`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          tableName: tableName,
          pageNo: pageNo,
          pageSize: pageSize,
          searchColumn: searchColumn,
          searchValue: searchValue,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error(
      "PreventiveMaintenancePaginationAPI Error:",
      error
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const RootCausePaginationAPI = async (
  tableName = "ROOT_CAUSE_MASTER",
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
      "Root Cause pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};
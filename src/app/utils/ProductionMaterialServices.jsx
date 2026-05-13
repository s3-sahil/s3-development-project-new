import axiosInstance from "./axiosInstance";

export const BreakdownDetailPaginationAPI = async (
  tableName = "vbreakdown_detail",
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

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Breakdown Detail pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};


export const BreakdownTypePaginationAPI = async (
  tableName = "BREAKDOWN_TYPE_MASTER",
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
      "Breakdown Type pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};


export const MachineAssetDetailPaginationAPI = async (
  tableName = "MACHINE_ASSET_MASTER",
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
      "Machine Asset pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};


export const MachineAssetGroupPaginationAPI = async (
  tableName = "MACHINE_ASSET_GROUP_MASTER",
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
      "Machine Asset Group pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};


export const MachineProcessPaginationAPI = async (
  tableName = "machine_process_master",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchQuery = ""
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: tableName,
          pageNumber,
          pageSize,
          searchColumn,
          searchQuery,
        },
      }
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Machine Process pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};


export const ProductCostingParameterPaginationAPI = async (
  tableName = "product_costing_parameter",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchQuery = ""
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: tableName,
          pageNumber,
          pageSize,
          searchColumn,
          searchQuery,
        },
      }
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Product Costing Parameter pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};


export const SectionPaginationAPI = async (
  tableName = "section_master",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchQuery = ""
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: tableName,
          pageNumber,
          pageSize,
          searchColumn,
          searchQuery,
        },
      }
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Section pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};


export const SectionWiseProcessPaginationAPI = async (
  tableName = "SECTIONWISE_PROCESS",
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
      "Section Wise Process pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};
import axiosInstance from "./axiosInstance";

export const BreakdownDetailPaginationAPI = async (
  tableName = "vbreakdown_detail",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchValue = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Breakdown Detail pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const BreakdownTypePaginationAPI = async (
  tableName = "BREAKDOWN_TYPE_MASTER",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchText = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Breakdown Type pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const MachineAssetDetailPaginationAPI = async (
  tableName = "MACHINE_ASSET_MASTER",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchText = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Machine Asset pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const MachineAssetGroupPaginationAPI = async (
  tableName = "MACHINE_ASSET_GROUP_MASTER",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchText = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Machine Asset Group pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const MachineProcessPaginationAPI = async (
  tableName = "machine_process_master",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchQuery = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Machine Process pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const ProductCostingParameterPaginationAPI = async (
  tableName = "product_costing_parameter",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchQuery = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Product Costing Parameter pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const SectionPaginationAPI = async (
  tableName = "section_master",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchQuery = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Section pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const SectionWiseProcessPaginationAPI = async (
  tableName = "SECTIONWISE_PROCESS",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchText = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Section Wise Process pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const addSectionDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/API/PRODUCTION/SECTION_DETAILS/ADD-SECTION_DETAILS",
      data,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message || "Failed to add section details.",
    );
  }
};

export const addSectionWiseProcessDetails = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/PRODUCTION/SECTION_WISE_PROCESS_DETAILS/ADD-SECTION_WISE_PROCESS_DETAILS",
      payload,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Section Wise Process API Error:",
      error.response || error.message,
    );

    throw new Error(
      error.response?.data?.message ||
        "Failed to add section wise process details.",
    );
  }
};

export const addBreakDownDetail = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/PRODUCTION/BREAK_DOWN_DETAIL/ADD-BREAK_DOWN_DETAIL",
      payload,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Break Down Detail API Error:",
      error.response || error.message,
    );

    throw new Error(
      error.response?.data?.message || "Failed to add break down detail.",
    );
  }
};

export const addMachineAssetDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/API/PRODUCTION/MACHINEASSET_DETAILS/ADD-MACHINEASSET_DETAILS",
      data,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Machine Asset Details API Error:",
      error.response || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        "Failed to add machine/asset details."
    );
  }
};
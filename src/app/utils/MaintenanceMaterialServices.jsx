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

export const addMaintenanceCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-MAINTENANCE_CATEGORY_DETAIL",
      {
        fld_CategCd: categoryData.categoryCode,
        fld_Description: categoryData.description,
      },
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to add maintenance category."
    );
  }
};


export const addRootCauseDetails = async (rootCauseData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-ROOT_COUSE_DETAILS",
      {
        root_cause_code: rootCauseData.rootCauseCode,
        description: rootCauseData.rootCause,
      },
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to add root cause details."
    );
  }
};


export const addMaintenanceReasonMaster = async (reasonData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-MAINTENANCE_REASON_MASTER",
      {
        fld_Cd: reasonData.code,
        fld_Description: reasonData.description,
        fld_CategCd: reasonData.category,
        fld_MainType: reasonData.category, // same as category radio
        fld_tobechecked: reasonData.toBeChecked ? "Y" : "N",
      },
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to add maintenance reason."
    );
  }
};


export const addPreventiveMaintenanceScheduling = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-PREVENTIVE_MAINTENANCE_SCHEDULING",
      {
        fld_SchNo: data.scheduleNo,
        fld_PrevCd: data.preventiveReason,
        fld_MachineNo: data.machineGroup,
        fld_Frequency: data.frequency,
        fld_TimeFrom: data.timeFrom || new Date().toISOString(),
        fld_TimeTo: data.timeTo || "",
        profcen_cd: data.employee,
        scheduleday: data.scheduleDay || "",
        scheduledate: data.scheduleDate || new Date().toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to save preventive maintenance."
    );
  }
};
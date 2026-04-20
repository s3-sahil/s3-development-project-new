import axiosInstance from "./axiosInstance";

export const PurchaseOrderPaginationAPI = async (type, page, size) => {
  // API call
};

export const getPurchaseOrder = async (orderNo) => {
  // API call
};

export const addPurchaseRequisition = async (data) => {
  debugger
  try {
    const response = await axiosInstance.post(
      "/ADD-PURCHASE_REQUISITION",
      data,
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
      error.response?.data?.message ||
        "Failed to add purchase requisition."
    );
  }
};

export const getPurchaseRequisition = async (params) => {
  debugger
  try {
    const response = await axiosInstance.get(
      "/GET-PURCHASE_REQUISITION",
      {
        params: {
          IND_DATE: params.date,
          IND_NO: params.prNo,
          PROFCEN_CD: params.division,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("GET API Error:", error.response || error);
    throw error;
  }
};

export const PurchaseRequisitionPaginationAPI = async (
    tableName = "Indent_head",
    pageNumber = 1,
    pageSize = 10
) => {
    try {
        const { data } = await axiosInstance.get(
            "/api/PaginationByTable/GetPaginationByTable",
            {
                params: {
                    TableNameForPagination: tableName,
                    pageNumber,
                    pageSize,
                },
            }
        );

        if (data?.StatusCode === 200 || data?.Data) {
            return data;
        }

        return null;
    } catch (error) {
        console.error("Purchase Requisition pagination fetch error:", error);
        return null;
    }
};

import axiosInstance from "./axiosInstance";

export const saveCustomerPurchaseOrder = async (purchaseOrderData) => {
    try {

        const response = await axiosInstance.post(
            "/ADD-CUSTOMER_PURCHASE_ORDER",
            purchaseOrderData
        );

        return response.data;

    } catch (error) {

        console.error(
            "API Error:",
            error.response?.data || error.message
        );

        throw new Error(
            error.response?.data?.message ||
            "Failed to save Customer Purchase Order."
        );
    }
};

export const CustomerPurchaseOrderLoginPaginationAPI = async (
    tableName = "custpo_hed",
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

        return { Data: [], TotalCount: 0 };
    } catch (error) {
        console.error(
            "Customer Purchase Order Login fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const ExportDocumentParameterPaginationAPI = async (
    tableName = "invoice_hed",
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

        return { Data: [], TotalCount: 0 };
    } catch (error) {
        console.error(
            "Export Document fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const addCustomerRCIAEntry = async (payload) => {
  try {
    const response = await axiosInstance.post(`/ADD-CUSTOMER-RCIA-ENTRY`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding Customer RCIA Entry:", error);
    throw error;
  }
};


export const ProformaInvoicePaginationAPI = async (
    tableName = "cust_rcia",
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

        return { Data: [], TotalCount: 0 };
    } catch (error) {
        console.error(
            "Customer RCIAP fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const addProformaInvoice = async (payload) => {
  try {
    const response = await axiosInstance.post(`/ADD-PINVOICE`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding Proforma Invoice", error);
    throw error;
  }
};

export const updateProformaInvoice = async (payload) => {
  try {
    const response = await axiosInstance.post(`/ADD-PINVOICE`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating Proforma Invoice", error);
    throw error;
  }
};

export const CustomerRCIAPaginationAPI = async (
    tableName = "cust_rcia",
    pageNumber = 1,
    pageSize = 10,
    searchColumn = "",
    searchString = ""
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
                    searchString,
                },
            }
        );

        if (data?.StatusCode === 200 || data?.Data) {
            return data;
        }

        return { Data: [], TotalCount: 0 };
    } catch (error) {
        console.error(
            "Customer RCIAP fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const addCustomerSchedule = async (payload) => {
  try {
    const response = await axiosInstance.post(`/ADD-CUSTOMER-SCHEDULE`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding Customer Schedule", error);
    throw error;
  }
};

export const updateCustomerSchedule = async (payload) => {
  try {
    const response = await axiosInstance.post(`/UPDATE-CUSTOMER-SCHEDULE`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating Customer Schedule", error);
    throw error;
  }
};

export const CustomerSchedulePaginationAPI = async (
    tableName = "cust_rcia",
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

        return { Data: [], TotalCount: 0 };
    } catch (error) {
        console.error(
            "Customer RCIAP fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const addEnquiryLoginEntry = async (payload) => {
  try {
    const response = await axiosInstance.post(`/ADD-ENQUIRY`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding Customer Schedule", error);
    throw error;
  }
};

export const updateEnquiryLoginEntry = async (payload) => {
  try {
    const response = await axiosInstance.post(`/UPDATE-ENQUIRY`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating Customer Schedule", error);
    throw error;
  }
};

export const EnquiryLoginEntryPaginationAPI = async (
    tableName = "cust_rcia",
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

        return { Data: [], TotalCount: 0 };
    } catch (error) {
        console.error(
            "Enquiry Login Entry fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};
import axiosInstance from "./axiosInstance";

export const saveCustomerPurchaseOrder = async (purchaseOrderData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-CUSTOMER_PURCHASE_ORDER",
      purchaseOrderData,
      {
        headers: {
          "Content-Type": "application/json-patch+json", // ✅ IMPORTANT
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ API FULL ERROR:", error.response?.data || error);

    throw error.response?.data || {
      Message: "Failed to save Customer Purchase Order",
    };
  }
};

export const CustomerPurchaseOrderLoginPaginationAPI = async (
  tableName,
  pageNumber,
  pageSize,
  profcen_cd,
  financeDTColumn,
  fstartDate,
  fendDate,
  columnNameForSearch,
  searchString
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: tableName,
          pageNumber,
          pageSize,
          ...(profcen_cd && { Profcen_cd: profcen_cd }),
          ...(financeDTColumn && { financeDTColumn }),
          ...(fstartDate && { fstartDate }),
          ...(fendDate && { fendDate }),
          ...(columnNameForSearch && { columnNameForSearch }),
          ...(searchString && { searchString }),
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Pagination API Error:", error);
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

export const addEnquiry = async (enquiryData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-ENQUIRY",
      enquiryData,
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
      error.response?.data?.message || "Failed to add enquiry."
    );
  }
};

export const EnquiryPaginationAPI = async (
    tableName = "enquiry_hed",
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
        console.error("Enquiry pagination fetch error:", error);
        return null;
    }
};

export const getEnquiryById = async (Enq_no, Enq_dt, profcen_cd) => {
  try {
    const response = await axiosInstance.get("/GET-ENQUIRY", {
      params: {
        Enq_no,
        Enq_dt,
        profcen_cd,
      },
    });

    return response.data;
  } catch (error) {
    console.error("GET Enquiry Error:", error);
    throw error;
  }
};

export const addBusinessPlan = async (businessPlanData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-BUSINESS_PLAN",
      businessPlanData,
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
      error.response?.data?.message || "Failed to add business plan."
    );
  }
};

export const updateBusinessPlan = async (businessPlanData) => {
  try {
    const response = await axiosInstance.put(
      "/UPDATE-BUSINESS_PLAN",
      businessPlanData,
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
      error.response?.data?.message || "Failed to update business plan."
    );
  }
};

export const getBusinessPlan = async (Cust_Code,Profcen_Cd,Period) => {
  try {
    const response = await axiosInstance.get("/GET-BUSINESS_PLAN", {
      params: {
        Cust_Code,
        Profcen_Cd,
        Period,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch business plan."
    );
  }
};

export const BusinessPlanPaginationAPI = async (
    tableName = "BUSINESS_PLAN",
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
        console.error("Busniess Plan pagination fetch error:", error);
        return null;
    }
};


export const getTaxTermByHSNCode = async (hsn) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/Master/Fetch-Tariff_Tax_By_HSN_CODE?HSN_CODE=${hsn}`
    );

    // ✅ your API returns: { list: [...] }
    return data?.Data || [];
  } catch (error) {
    console.error("Error fetching tax by HSN:", error);
    return [];
  }
};

export const fetchPackingAndSubType = async (loginName) => {
  try {
    const response = await axiosInstance.get(
      `/api/Master/Fetch-PACKING_TYPE_AND_SUB_TYPE?LOGIN_NAME=${loginName}`
    );

    return response.data;
  } catch (error) {
    console.error("Fetch Packing/SubType Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch Packing Type and Sub Type."
    );
  }
};

export const fetchItemCodesByCustomer = async (custCode) => {
  try {
    const response = await axiosInstance.get(
      `/Fetch-PACKING_SLIP_ITEM_CODE_LIST?Cust_code=${custCode}`
    );

    return response.data;
  } catch (error) {
    console.error("Fetch Item Codes Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch item codes."
    );
  }
};

export const fetchPackingSlipQuantity = async ({
  Pay_type,
  Item_Catg_Type,
  Profcen_cd,
  Period,
  Item_Code,
}) => {
  try {
    const response = await axiosInstance.get(
      `/api/Master/Fetch-PACKING_SLIP_QUANTITY`,
      {
        params: {
          Pay_type,
          Item_Catg_Type,
          Profcen_cd,
          Period,
          Item_Code,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Fetch Packing Slip Quantity Error:",
      error.response || error.message
    );

    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch Packing Slip Quantity."
    );
  }
};

export const getCustomerPurchaseOrder = async ({
  CUST_CODE,
  PO_ID,
  PO_ID_DT,
  PO_NO,
  PO_DT,
  oa_type,
  PROFCEN_CD,
}) => {
  try {
    const response = await axiosInstance.get(
      `/GET-CUSTOMER_PURCHASE_ORDER`,
      {
        params: {
          CUST_CODE,
          PO_ID,
          PO_ID_DT,
          PO_NO,
          PO_DT,
          oa_type,
          PROFCEN_CD,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "GET CUSTOMER PURCHASE ORDER ERROR:",
      error.response || error.message
    );

    throw new Error(
      error.response?.data?.Message ||
      "Failed to fetch Customer Purchase Order."
    );
  }
};
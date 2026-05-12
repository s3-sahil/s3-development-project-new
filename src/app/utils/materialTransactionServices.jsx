import axiosInstance from "./axiosInstance";

export const PurchaseOrderPaginationAPI = async (
  tableName = "PURCHASE_ORDER",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Purchase Order fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const getPurchaseOrder = async (orderNo) => {
  // API call
};

export const addPurchaseRequisition = async (data) => {
  debugger;
  try {
    const response = await axiosInstance.post(
      "/ADD-PURCHASE_REQUISITION",
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
      error.response?.data?.message || "Failed to add purchase requisition.",
    );
  }
};

export const getPurchaseRequisition = async (params) => {
  debugger;
  try {
    const response = await axiosInstance.get("/GET-PURCHASE_REQUISITION", {
      params: {
        IND_DATE: params.date,
        IND_NO: params.prNo,
        PROFCEN_CD: params.division,
      },
    });

    return response.data;
  } catch (error) {
    console.error("GET API Error:", error.response || error);
    throw error;
  }
};

export const PurchaseRequisitionPaginationAPI = async (
  tableName = "Indent_head",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Purchase Requisition pagination fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const addCustomerPO = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/ADD-CUSTOMER_PURCHASE_ORDER",
      payload,
    );
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const addAdditionalWorkOrderRequisition = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-ADDITIONAL_WRK_ORD_REQUIS",
      data,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Add API Error:", error);
    throw error;
  }
};

export const updateAdditionalWorkOrderRequisition = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/UPDATE-ADDITIONAL_WRK_ORD_REQUIS",
      data,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Update API Error:", error);
    throw error;
  }
};

export const AdditionalWorkOrderRequisitionPaginationAPI = async (
  tableName = "additional_work_order_requisition",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Additional Work Order Requisition fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const CustomerStockAdjustmentPaginationAPI = async (
  tableName = "customer_stock_adjustment",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Customer Stock Adjustment fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const CustomerWipAdjustmentPaginationAPI = async (
  tableName = "customer_wip_adjustment",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Customer WIP Adjustment fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const GoodsReceiptInspectionTableAPI = async (
  tableName = "goods_receipt_inspection",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Goods Receipt Inspection fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const GoodsReceiptNoteTableAPI = async (
  tableName = "goods_receipt_note",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Goods Receipt Note fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const JobworkStockAdjustmentPaginationAPI = async (
  tableName = "jobwork_stock_adjustment",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Jobwork Stock Adjustment pagination error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const MaterialIssuePaginationAPI = async (
  tableName = "material_issue",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Material Issue pagination error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const MaterialRateContractPaginationAPI = async (
  tableName = "material_rate_contract",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Material Rate Contract pagination error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const MaterialRequisitionPaginationAPI = async (
  tableName = "material_requisition",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Material Requisition fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const MaterialReturnReceivedPaginationAPI = async (
  tableName = "material_return_received",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Material Return Received fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const MaterialStockAdjustmentPaginationAPI = async (
  tableName = "material_stock_adjustment",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Material Stock Adjustment fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const ProductMovementSlipPaginationAPI = async (
  tableName = "product_movement_slip",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Product Movement Slip fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const PurchaseLineRejectionPaginationAPI = async (
  tableName = "purchase_line_rejection",
  pageNumber = 1,
  pageSize = 10,
  searchColumn = "",
  searchString = "",
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
      },
    );

    if (data?.StatusCode === 200 || data?.Data) {
      return data;
    }

    return { Data: [], TotalCount: 0 };
  } catch (error) {
    console.error(
      "Purchase Line Rejection fetch error:",
      error.response || error.message,
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const SupplierBillsPaginationAPI = async (
  tableName = "supplier_bill",
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
      "Supplier Bills pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};

export const SupplierSchedulePaginationAPI = async (
  tableName = "supplier_schedule",
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
      "Supplier Schedule pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};

// ================= API =================

export const WipMaterialAdjustmentPaginationAPI = async (
  tableName = "vwip_material_adjustment",
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
      "WIP Material Adjustment pagination fetch error:",
      error
    );

    return { Data: [], TotalCount: 0 };
  }
};

// ================= API =================

export const WorkOrderIssuePaginationAPI = async (
  tableName = "vwork_order_issue",
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
      "Work Order Issue pagination fetch error:",
      error.response || error.message
    );

    return { Data: [], TotalCount: 0 };
  }
};
import axiosInstance from "./axiosInstance";

export const BillPassingPaginationAPI = async (
  tableName = "BILL_PASSING",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Bill Passing pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

// ================= CASH FLOW PROVISION PAGINATION API =================

export const CashFlowProvisionPaginationAPI = async (
  tableName = "CASH_FLOW_PROVISION",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Cash Flow Provision pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

// ================= BANK RECEIPT PAGINATION API =================

export const BankReceiptPaginationAPI = async (
  tableName = "BANK_RECEIPT",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Bank Receipt pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

// ================= CASH RECEIPT PAGINATION API =================

export const CashReceiptPaginationAPI = async (
  tableName = "CASH_RECEIPT",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Cash Receipt pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

// ================= CASH PAYMENT PAGINATION API =================

export const CashPaymentPaginationAPI = async (
  tableName = "CASH_PAYMENT",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Cash Payment pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

// ================= CREDIT NOTE PAGINATION API =================

export const CreditNotePaginationAPI = async (
  tableName = "CREDIT_NOTE",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Credit Note pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

// ================= API =================

export const DbkMasterEntryPaginationAPI = async (
  tableName = "DBK_MASTER_ENTRY",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "DBK Master Entry pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const JournalEntryPaginationAPI = async (
  tableName = "JOURNAL_ENTRY",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Journal Entry pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const DebitNotePaginationAPI = async (
  tableName = "DEBIT_NOTE",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Debit Note pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const OnAccountRequestPaginationAPI = async (
  tableName = "ON_ACCOUNT_REQUEST",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "On Account Request pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const PaymentRequestPaginationAPI = async (
  tableName = "PAYMENT_REQUEST",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Payment Request pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const RoDTEPMasterEntryPaginationAPI = async (
  tableName = "RODTEP_MASTER_ENTRY",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "RoDTEP Master Entry pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const SalesVoucherPaginationAPI = async (
  tableName = "SALES_VOUCHER",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Sales Voucher pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const SupplierBillsMultipleTaxPaginationAPI = async (
  tableName = "SUPPLIER_BILLS_MULTIPLE_TAX",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Supplier Bills Multiple Tax pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const SupplierBillPaginationAPI = async (
  tableName = "SUPPLIER_BILL",
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

    return {
      Data: [],
      TotalCount: 0,
    };
  } catch (error) {
    console.error(
      "Supplier Bill pagination fetch error:",
      error.response || error.message,
    );

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const SupplierBillNoPoPaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Supplier Bill No PO Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const BankPaymentPaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Bank Payment Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const BankReconciliationPaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Bank Reconciliation Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const Bank_master_PaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Bank Master Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const BankReconciliationClosePaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Bank Reconciliation Close Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const BankReconciliationMasterPaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Bank Reconciliation Master Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const BankReconciliationUntaggingPaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Bank Reconciliation Untagging Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const ChequeOpeningEntryPaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Cheque Opening Entry Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

export const CloseFinalizationPaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchField,
  searchText,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        tableName,
        pageNo,
        pageSize,
        searchField,
        searchText,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Close Finalization Pagination API Error:", error);

    return {
      Data: [],
      TotalCount: 0,
    };
  }
};

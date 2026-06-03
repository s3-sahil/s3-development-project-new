import axiosInstance from "./axiosInstance";

export const TDS_PARA_PaginationAPI = async (
  tableName,
  pageNo,
  pageSize,
  searchColumn = "",
  searchText = "",
) => {
  try {
    const response = await axiosInstance.get(`/API/MASTER/PAGINATION`, {
      params: {
        tableName,
        pageNo,
        pageSize,
        searchColumn,
        searchText,
      },
    });

    return response.data;
  } catch (error) {
    console.error("TDS_PARA Pagination API Error:", error);
    return null;
  }
};

export const addBankDetails = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/BANK_DETAILS/ADD-BANK_DETAILS",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Bank Details Error:", error);
    throw error;
  }
};

export const updateBankDetails = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/API/FINANCE/BANK_DETAILS/UPDATE-BANK_DETAILS",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update Bank Details Error:", error);
    throw error;
  }
};

export const addBankReconciliationMaster = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-BANK_RECONCILIATION_MASTER",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Bank Reconciliation Master Error:", error);
    throw error;
  }
};

export const updateBankReconciliationMaster = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/UPDATE-BANK_RECONCILIATION_MASTER",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update Bank Reconciliation Master Error:", error);
    throw error;
  }
};

export const addChequeOpeningEntry = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/CHEQUE_OPENING_ENTRY/ADD-CHEQUE_OPENING_ENTRY",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Cheque Opening Entry Error:", error);
    throw error;
  }
};

export const addCreditorsBillwiseEntry = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/CREDITORS_BILLWISE_ENTRY/ADD-CREDITORS_BILLWISE_ENTRY",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Creditors Billwise Entry Error:", error);
    throw error;
  }
};

export const updateCreditorsBillwiseEntry = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/CREDITORS_BILLWISE_ENTRY/UPDATE-CREDITORS_BILLWISE_ENTRY",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update Creditors Billwise Entry Error:", error);
    throw error;
  }
};

export const addDebtorsBillwiseEntry = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/DEBTORS_BILLWISE_ENTRY/ADD-DEBTORS_BILLWISE_ENTRY",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Debtors Billwise Entry Error:", error);
    throw error;
  }
};

export const addDepreciationParameter = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-DEPRICIATION_PARAMETER",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Depreciation Parameter Error:", error);
    throw error;
  }
};

export const updateDepreciationParameter = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/UPDATE-DEPRICIATION_PARAMETER",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update Depreciation Parameter Error:", error);
    throw error;
  }
};

export const addEmployeeAdvanceDetails = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-EMPLOYEE_ADVANCE_DETAILS",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Employee Advance Details Error:", error);
    throw error;
  }
};

export const updateEmployeeAdvanceDetails = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/UPDATE-EMPLOYEE_ADVANCE_DETAILS",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update EMPLOYEE_ADVANCE_DETAILS Error:", error);
    throw error;
  }
};

export const addGeneralLedger = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/GENERAL_LEDGER/ADD-GENERAL_LEDGER",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add General Ledger Error:", error);
    throw error;
  }
};

export const updateGeneralLedger = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/API/FINANCE/GENERAL_LEDGER/UPDATE-GENERAL_LEDGER",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update General Ledger Error:", error);
    throw error;
  }
};

export const addGroupDetails = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/GROUP_DETAILS/ADD-GROUP_DETAILS",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Group Details Error:", error);
    throw error;
  }
};

export const updateGroupDetails = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/API/FINANCE/GROUP_DETAILS/UPDATE-GROUP_DETAILS",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update Group Details Error:", error);
    throw error;
  }
};

export const addScheduleDetails = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/SCHEDULE_DETAILS/ADD-SCHEDULE_DETAILS",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Schedule Details Error:", error);
    throw error;
  }
};

export const updateScheduleDetails = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/API/FINANCE/SCHEDULE_DETAILS/UPDATE-SCHEDULE_DETAILS",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update Schedule Details Error:", error);
    throw error;
  }
};

export const SubGroupDetailsSave = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/SUB_GROUP_D/ADD-SUB_GROUP_D",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add Sub Group Details Error:", error);
    throw error;
  }
};

export const UpdateSubGroupDetails = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/API/FINANCE/SUB_GROUP_D/UPDATE-SUB_GROUP_D",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update Sub Group Details Error:", error);
    throw error;
  }
};

export const TDSParameterSave = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/API/FINANCE/TDS_PARAMETER/ADD-TDS_PARAMETER",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Add TDS Parameter Error:", error);
    throw error;
  }
};

export const UpdateTDSParameter = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/API/FINANCE/TDS_PARAMETER/UPDATE-TDS_PARAMETER",
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Update TDS Parameter Error:", error);
    throw error;
  }
};

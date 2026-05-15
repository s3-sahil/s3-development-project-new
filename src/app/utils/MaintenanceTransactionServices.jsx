import axiosInstance from "./axiosInstance";

export const addBreakdownSlipEntry = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-BREAKDOWN_SLIP_ENTRY",
      {
        fld_SlipNo: data.slipNo,
        fld_Date: data.date,
        fld_TimeFrom: data.breakdownTime,
        fld_TimeReported: data.reportedTime,
        fld_MachineNo: data.machine,
        fld_Reason: data.reason,
        fld_ReportedBy: data.reportedBy,
        shift: data.shift || "",
        profcen_cd: data.profcen_cd || "",
        dt_breakdown: data.breakdownDate,
        flag: data.flag || "s",
        productive_Flag: data.productive_Flag || "s",
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
      error.response?.data?.message || "Failed to save breakdown slip entry."
    );
  }
};


export const addPreventiveSlipEntry = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-PREVENTIVE_SLIP_ENTRY",
      {
        fld_SlipNo: data.slipNo,
        fld_DateFrom: data.dateFrom,
        fld_TimeFrom: data.startAt,
        fld_DateTo: data.dateTo || data.dateFrom,
        fld_TimeTo: data.timeTo || "",
        fld_Reason: data.preventiveReason,
        fld_MainCd: data.maintenanceType,
        fld_machinecd: data.machine,
        fld_Frequency: data.frequency || "",
        fld_Status: data.status || "OPEN",
        fld_hours: data.hours || 0,
        profcen_cd: data.profcen_cd || "",
        remark: data.remark,
        machinecost: data.machineCost || 0,
        empCost: data.empCost || 0,
        spareCost: data.spareCost || 0,
        root_cause_code: data.rootCauseCode || "",
        why1: data.why1 || "",
        why2: data.why2 || "",
        why3: data.why3 || "",
        why4: data.why4 || "",
        why5: data.why5 || "",
        dueTo1: data.dueTo1 || "",
        dueTo2: data.dueTo2 || "",
        dueTo3: data.dueTo3 || "",
        dueTo4: data.dueTo4 || "",
        dueTo5: data.dueTo5 || "",
        corrective_Action: data.correctiveAction || "",
        outside_Lbr: data.outsideLbr || 0,
        outside_Rpr: data.outsideRpr || 0,
        service_Cntr: data.serviceCntr || 0,
        productive_Flag: data.productiveFlag || "s",
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
      error.response?.data?.message || "Failed to save preventive slip entry."
    );
  }
};


export const addBreakdownShutdownStartEntry = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-BREAKDOWN_SHUTDOWN_START_ENTRY",
      {
        fld_SlipNo: data.slipNo,
        fld_Date: data.startDate
          ? new Date(data.startDate).toISOString()
          : null,
        fld_TimeFrom: data.startAt,
        fld_TimeReported: data.startAt || "",
        fld_MachineNo: data.machine,
        fld_Reason: data.reasonCode,
        fld_ReportedBy: data.reportedBy || "",
        shift: data.shift || "",
        profcen_cd: data.profcen_cd || "",
        dt_breakdown: data.startDate
          ? new Date(data.startDate).toISOString()
          : null,
        flag: "s",
        productive_Flag: "s",
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
      error.response?.data?.message ||
        "Failed to save breakdown/shutdown start entry."
    );
  }
};


export const BreakdownSlipPaginationAPI = async (
  tableName,
  page,
  pageSize,
  searchField,
  searchText
) => {
  try {
    const response = await axiosInstance.get(
      "/Fetch-BREAKDOWN_SLIP_LIST",
      {
        params: {
          table: tableName,
          page,
          pageSize,
          searchField,
          searchText,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Breakdown Slip API Error:", error);
    throw error;
  }
};


export const BreakdownStartPaginationAPI = async (
  tableName,
  page,
  pageSize,
  searchField,
  searchText
) => {
  try {
    const response = await axiosInstance.get(
      "/Fetch-BREAKDOWN_START_LIST",
      {
        params: {
          table: tableName,
          page,
          pageSize,
          searchField,
          searchText,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Breakdown Start API Error:", error);
    throw error;
  }
};


export const PreventiveSlipPaginationAPI = async (
  tableName,
  page,
  pageSize,
  searchField,
  searchText
) => {
  try {
    const response = await axiosInstance.get(
      "/Fetch-PREVENTIVE_SLIP_LIST",
      {
        params: {
          table: tableName,
          page,
          pageSize,
          searchField,
          searchText,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Preventive Slip API Error:", error);
    throw error;
  }
};
import axiosInstance from "../utils/axiosInstance";

// ✅ No need for BASE_URL here, axiosInstance already has it
export const loginApi = async (Login_Name, Login_Pwd) => {
    try {
        console.log("Calling API with:", { Login_Name, Login_Pwd });

        const response = await axiosInstance.post(
            "/api/Auth/Login", // relative to baseURL
            { Login_Name, Login_Pwd }
        );

        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Failed to login. Please try again.");
    }
};

export const logoutApi = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("divisions");
    localStorage.removeItem("modules");
    localStorage.removeItem("departments");
    localStorage.removeItem("PROFCEN_CD");
    localStorage.removeItem("login_name");
};

export const addSalesman = async (salesmanData) => {
    try {
        const response = await axiosInstance.post("/ADD-SALESMAN_DETAILS", salesmanData);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response || error.message);
        throw new Error(error.response?.data?.message || "Failed to add salesman.");
    }
};

export const fetchEmployeesDropdown = async (profcen_cd) => {
    try {
        const { data } = await axiosInstance.get(
            `/api/Master/Fetch-Employees-dropdown?Profcen_cd=${profcen_cd}`
        );
        return data.Data || []; // ✅ return just the array
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        return [];
    }
};

export const customerPurchaseOrderType = async () => {
    try {
        const { data } = await axiosInstance.get(
            "/api/Master/FETCH-OA_type"
        );

        // Adjust based on API structure
        return data.Data || [];
    } catch (error) {
        console.error("Error fetching OA Type:", error.response || error.message);
        return [];
    }
};


export const fetchItemcodeAPI = async () => {
    try {
        const { data } = await axiosInstance.get(`/api/Master/Fetch-Item`);
        return data.Data || [];

    } catch (error) {
        console.error("Error fetching item codes:", error);
        return [];
    }
};

export const fetchCustomerAPI = async () => {
    try {
        const { data } = await axiosInstance.get(`/api/Master/Fetch-Customer`);
        return data.Data || [];
    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }
};

export const fetchSalesmanAPI = async () => {
    try {
        const { data } = await axiosInstance.get(`/api/Master/Fetch-Salesman`);
        return data.Data || [];
    } catch (error) {
        console.error("Error fetching salesman:", error);
        return [];
    }
};

export const fetchCurrencyAPI = async () => {
    try {
        const { data } = await axiosInstance.get(
            `/api/Master/Fetch-CurrencyMaster`
        );

        return data.Data || [];
    } catch (error) {
        console.error("Error fetching currencies:", error);
        return [];
    }
};

// SGST
export const fetchSGST = async () => {
    try {
        const response = await axiosInstance.get(
            "/api/Master/Fetch-S-GST"
        );
        console.log("SGST Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching SGST:", error);
        throw error;
    }
};

// CGST
export const fetchCGST = async () => {
    try {
        const response = await axiosInstance.get(
            "/api/Master/Fetch-C-GST"
        );
        console.log("CGST Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching CGST:", error);
        throw error;
    }
};

// IGST
export const fetchIGST = async () => {
    try {
        const response = await axiosInstance.get(
            "/api/Master/Fetch-I-GST"
        );
        console.log("IGST Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching IGST:", error);
        throw error;
    }
};

export const fetchPayCondAPI = async () => {
    try {
        const { data } = await axiosInstance.get(
            `/api/Master/FETCH-PAYCOND`
        );

        if (data?.StatusCode === 200) {
            return data.Data || [];
        }

        return [];
    } catch (error) {
        console.error("PAYCOND fetch error:", error);
        return [];
    }
};

export const saveCustomerPurchaseOrder = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/ADD-CUSTOMER_PURCHASE_ORDER",
            payload,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.Message || "Failed to save Customer Purchase Order"
        );
    }
};

export const login = async (Login_Name, Login_Pwd) => {
    try {
        console.log("Calling API with:", { Login_Name, Login_Pwd });

        const response = await axiosInstance.post(
            "/api/Auth/Login",
            { Login_Name, Login_Pwd },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        console.log("API Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("API Error:", error.response || error.message);

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to login. Please try again.");
    }
};

export const addPackingSlip = async (payload) => {
    try {
        console.log("Sending Packing Slip Payload:", payload);

        const response = await axiosInstance.post(
            "/ADD-PACKING_SLIP",
            payload,
            {
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
            }
        );

        console.log("Packing Slip API Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Packing Slip API Error:", error.response || error.message);

        if (error.response?.data?.Message) {
            throw new Error(error.response.data.Message);
        }

        throw new Error("Failed to add Packing Slip. Please try again.");
    }
};

export const addEnquiryDetails = async (enquiryData) => {
    try {
        const response = await axiosInstance.post("/ADD-EQUIRE_DEATILS", enquiryData);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response || error.message);
        throw new Error(error.response?.data?.message || "Failed to add enquiry details.");
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

export const GetEnquiryDetailsAPI = async ({
    Enq_no,
    Enq_dt,
    profcen_cd,
}) => {
    try {
        const { data } = await axiosInstance.get(
            "/GETRETRIVE-EQUIRE_DEATILS",
            {
                params: {
                    Enq_no,
                    Enq_dt,
                    profcen_cd,
                },
            }
        );

        return data;
    } catch (error) {
        console.error("Get enquiry details error:", error);
        return null;
    }
};

export const addInvoice = async (invoiceData) => {
    try {
        const response = await axiosInstance.post(
            "/ADD-INVOICE",
            invoiceData
        );
        return response.data;
    } catch (error) {
        console.error("Invoice API Error:", error.response || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to add invoice."
        );
    }
};

export const InvoicePaginationAPI = async (
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

        return null;
    } catch (error) {
        console.error("Enquiry pagination fetch error:", error);
        return null;
    }
};

export const SalesmanPaginationAPI = async (
    tableName = "salesman",
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
        console.error("Salesman pagination fetch error:", error);
        return null;
    }
};

export const salesmanDetailsEdit = async (empNo) => {
    try {
        const response = await axiosInstance.get(
            "/GETRETRIVE-SALESMAN_DETAILS",
            {
                params: { Emp_no: empNo },
            }
        );

        const data = response.data;
        console.log("API Response Data:", data);

        // Lowercase top-level keys
        const lowerCaseResponse = Object.keys(data).reduce((acc, key) => {
            acc[key.toLowerCase()] = data[key];
            return acc;
        }, {});

        // Lowercase nested Data keys
        const normalizedData = Object.keys(
            lowerCaseResponse.data || {}
        ).reduce((acc, key) => {
            acc[key.toLowerCase()] = lowerCaseResponse.data[key];
            return acc;
        }, {});

        return { data: normalizedData };
    } catch (error) {
        console.error(
            "Salesman Edit API Error:",
            error.response || error.message
        );
        return { data: {} };
    }
};

export const Employeelistapichange = async (profcen_cd) => {
    try {
        const response = await axiosInstance.get(
            "/api/Master/Fetch-Employees-dropdown",
            {
                params: { Profcen_cd: profcen_cd },
            }
        );

        const data = response.data;

        console.log("API Response Data:", data);

        // Lowercase top-level keys
        const lowerCaseResponse = Object.keys(data).reduce((acc, key) => {
            acc[key.toLowerCase()] = data[key];
            return acc;
        }, {});

        return lowerCaseResponse; // { data: [...] }
    } catch (error) {
        console.error(
            "Error fetching dropdown data:",
            error.response || error.message
        );
        return { data: [] };
    }
};

export const customerDetailPaginationAPI = async (
    tableName = "cust_mst",
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
            "Customer pagination fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const salesmanDetailsAdd = async (payload) => {
  try {
    console.log("Calling Salesman Add API with:", payload);

    const response = await axiosInstance.post(
      "/ADD-SALESMAN_DETAILS", // relative to baseURL
      payload
    );

    console.log("Salesman Add API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Salesman Add API Error:", error.response || error.message);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Failed to add salesman. Please try again.");
  }
};
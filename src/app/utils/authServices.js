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

export const employeeSalaryApi = async (salaryData) => {
    try {
        console.log("Calling Salary API with:", salaryData);

        const response = await axiosInstance.post(
            "/api/Salary/add-Salary-Details",
            salaryData
        );

        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Failed to save employee salary details. Please try again.");
    }
};

export const saveTmsParameter = async (tmsData) => {
    try {
        const response = await axiosInstance.post(
            "/API/TMS/TMS_PARAMETER/ADD-TMSPARAMETER",
            tmsData
        );

        return response.data;
    } catch (error) {
        console.error("API Error:", error.response || error.message);

        throw new Error(
            error.response?.data?.message ||
            "Failed to save TMS Parameter."
        );
    }
};

export const TMSParameterPaginationAPI = async (
    tableName = "TMS_PARA",
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


export const saveCardDetails = async (cardData) => {
    try {
        const response = await axiosInstance.post(
            "/API/TMS/CARD_DETAILS/ADD-CARDETAILS?Card_No=" + cardData,
        );

        return response.data;
    } catch (error) {
        console.error("API Error:", error.response || error.message);

        throw new Error(
            error.response?.data?.message ||
            "Failed to save Card Details."
        );
    }
};


export const CardDetailPaginationAPI = async (
    tableName = "Card_Mst",
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
            "Card Details pagination fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const ProjectActivityPaginationAPI = async (
    tableName = "Project_activity",
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

// export const saveCustomerDetail = async (customerData) => {
//   try {
//     const response = await axiosInstance.post(
//       "/API/SD/CUSTOMER_DETAIL/ADD-CUSTOMER_DETAIL_ALL",
//       customerData
//     );

//     return response.data;
//   } catch (error) {
//     console.error("API Error:", error.response);

//     throw new Error(
//       error.response?.data?.message ||
//       "Failed to save Customer Detail."
//     );
//   }
// };

export const CUSTOMER_DETAILPaginationAPI = async (
    tableName = "Cust_mst",
    orderBy = "cust_code",
    pageNumber = 1,
    pageSize = 10
) => {
    try {
        const { data } = await axiosInstance.get(
            "/api/PaginationByTable/GetPaginationByTable",
            {
                params: {
                    TableNameForPagination: tableName,
                    orderBy,
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
            "Customer Detail pagination fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const saveCustomerDetail = async (customerData) => {
    try {
        const response = await axiosInstance.post(
            "/API/SD/CUSTOMER_DETAIL/ADD-CUSTOMER_DETAIL",
            customerData
        );

        return response.data;
    } catch (error) {
        console.error("API Error:", error.response);

        throw new Error(
            error.response?.data?.message ||
            "Failed to save Customer Detail."
        );
    }
};



export const ProjectActivityAdd = async (payload) => {
    try {
        console.log("Calling Project Activity Add API with:", payload);

        const response = await axiosInstance.post(
            "ADD-PROJECT_ACTIVITY", // relative to baseURL
            payload
        );


        console.log("Project Activity Add API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Project Activity Add API Error:", error.response || error.message);

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to add Project Activity. Please try again.");
    }
};

export const ContractReviewChecklistPaginationAPI = async (
    tableName = "contract_review_checklist",
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
            "Contract Review Checklist pagination fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const deleteSalesman = async (empCode) => {
    try {
        const response = await axiosInstance.delete(
            `/DELETE-SALESMAN_DETAILS/${empCode}`
        );

        return response.data;
    } catch (error) {
        console.error("Delete Error:", error.response || error.message);

        throw new Error(
            error.response?.data?.message ||
            "Failed to delete Salesman Detail."
        );
    }
};


export const deleteCustomerDetail = async (empCode) => {
    try {
        const response = await axiosInstance.delete(
            `/${empCode}`
        );

        return response.data;
    } catch (error) {
        console.error("Delete Error:", error.response || error.message);

        throw new Error(
            error.response?.data?.message ||
            "Failed to delete Customer Detail."
        );
    }
};


// export const salesmanDetailsAdd = async (payload) => {
//     try {
//         console.log("Calling Salesman Add API with:", payload);

//         const response = await axiosInstance.post(
//             "/ADD-SALESMAN_DETAILS", // relative to baseURL
//             payload
//         );

//         console.log("Salesman Add API Response:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Salesman Add API Error:", error.response || error.message);

//         if (error.response?.data?.message) {
//             throw new Error(error.response.data.message);
//         }

//         throw new Error("Failed to add salesman. Please try again.");
//     }
// };

export const ContractReviewChecklistDetailsAdd = async (payload) => {
    try {
        console.log("Calling ContractReviewChecklistDetailsAdd Add API with:", payload);

        const response = await axiosInstance.post(
            "/ADD-CONTACT_REVIEW_CHECKLIST", // relative to baseURL
            payload
        );

        console.log("ContractReviewChecklistDetailsAdd Add API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("ContractReviewChecklistDetailsAdd Add API Error:", error.response || error.message);

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to add salesman. Please try again.");
    }
};

export const ConsigneeTablePaginationAPI = async (
    tableName = "Cust_Consignee",
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
            "Consignee Detail pagination fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const ConsigneeFormSAVE = async (payload) => {
    try {
        console.log("Calling Consignee Add API with:", payload);

        const response = await axiosInstance.post(
            "API/SD/CONSIGNEE_DETAIL/ADD-CONSIGNEE_DETAIL", // relative to baseURL
            payload
        );


        console.log("Consignee Add API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Consignee Add API Error:", error.response || error.message);

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to add Consignee. Please try again.");
    }
};


export const fetchCustomerList = async () => {

    try {
        const { data } = await axiosInstance.get(
            `api/Master/FETCH-CUSTOMER`
        );
        return data.Data || []; // ✅ return just the array
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        return [];
    }
};

export const fetch_state = async () => {

    try {
        const { data } = await axiosInstance.get(
            `api/Master/Fetch-State`
        );
        return data.Data || []; // ✅ return just the array
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        return [];
    }
};


export const Fetch_District = async () => {

    try {
        const { data } = await axiosInstance.get(
            `api/Master/Fetch-District`
        );
        return data.Data || []; // ✅ return just the array
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        return [];
    }
};


export const Fetch_Country = async () => {

    try {
        const { data } = await axiosInstance.get(
            `api/Master/Fetch-Country_code_mst`
        );
        return data.Data || []; // ✅ return just the array
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        return [];
    }
};

export const Fetch_PAYCOND = async () => {

    try {
        const { data } = await axiosInstance.get(
            `api/Master/FETCH-PAYCOND`
        );
        return data.Data || []; // ✅ return just the array
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        return [];
    }
};

export const ProductPriceListPaginationAPI = async (
    tableName = "PriceList",
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
            "Product Price List Details pagination fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};


export const ProductPriceListSAVE = async (payload) => {
    try {
        console.log("Calling Consignee Add API with:", payload);

        const response = await axiosInstance.post(
            "API/SD/PRODUCT_PRICE_LIST_DETAILS/ADD-PRODUCT_PRICE_LIST_DETAILS", // relative to baseURL
            payload
        );


        console.log("Product Price List Add API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Product Price List Add API Error:", error.response || error.message);

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to add Product Price List. Please try again.");
    }
};

export const ProjectExecutionPlan_PaginationAPI = async (
    tableName = "Project_execution_Head",
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
            "Project Execution Plan pagination fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const ProjectExecutionPlan_SAVE = async (payload) => {
    try {
        console.log("Calling Consignee Add API with:", payload);

        const response = await axiosInstance.post(
            "ADD-PROJECT_EXECUTION_PLAN", // relative to baseURL
            payload
        );


        console.log("Project Execution Plan Add API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Project Execution Plan Add API Error:", error.response || error.message);

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to add Project Execution Plan. Please try again.");
    }
};

export const ProjectExecutionPlan_Delete = async (r) => {
    try {
        const response = await axiosInstance.delete(
            `/DELETE-PROJECT_EXECUTION_PLAN`,
            {
                params: {
                    po_id: r.po_id,
                    item_Code: r.item_Code,
                    Proj_code: r.Proj_code,
                    profcen_cd: r.profcen_cd
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Delete Error:", error.response || error.message);

        throw new Error(
            error.response?.data?.message ||
            "Failed to delete Salesman Detail."
        );
    }
};

export const ITEM_CATEGORY_PaginationAPI = async (
    tableName = "CATEGORY",
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
            "Project Execution Plan pagination fetch error:",
            error.response || error.message
        );

        return { Data: [], TotalCount: 0 };
    }
};

export const ITEM_CATEGORY_SAVE = async (payload) => {
    try {
        console.log("Calling Consignee Add API with:", payload);

        const response = await axiosInstance.post(
            "API/MATERIAL/ITEM_CATEGORY_DETAILS/ADD-ITEM_CATEGORY_D", // relative to baseURL
            payload
        );


        console.log("Project Execution Plan Add API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Project Execution Plan Add API Error:", error.response || error.message);

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to add Project Execution Plan. Please try again.");
    }
};


export const ConsigneeDetailsEdit = async (cust_code, Con_code) => {
    try {
        const response = await axiosInstance.get(
            "API/SD/CONSIGNEE_DETAIL/GETRETRIVE-CONSIGNEE_DETAIL",
            {
                params: { cust_code: cust_code, Con_code: Con_code },
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
            "Consignee Edit API Error:",
            error.response || error.message
        );
        return { data: {} };
    }
};

// GET CUSTOMER
export const CustomerDetailsEdit = async (cust_code) => {
    try {
        const response = await axiosInstance.get(
            "/API/SD/CUSTOMER_DETAIL/GET-CUSTOMER_DETAIL",
            {
                params: { cust_code: cust_code },
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
            "Consignee Edit API Error:",
            error.response || error.message
        );
        return { data: {} };
    }
};

// UPDATE CUSTOMER

export const UpdatedCustomerDetail = async (customerData) => {
    try {
        const response = await axiosInstance.post(
            "/API/SD/CUSTOMER_DETAIL/UPDATE-CUSTOMER_DETAIL",
            customerData
        );

        return response.data;
    } catch (error) {
        console.error("API Error:", error.response);

        throw new Error(
            error.response?.data?.message ||
            "*Failed to Update Customer Detail."
        );
    }
};


export const fetchCategoryCustomerDetails = async () => {

    try {
        const { data } = await axiosInstance.get(
            `api/Master/Fetch-Vendor_Type`
        );
        return data.Data || []; // ✅ return just the array
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        return [];
    }
};

export const checkPanExists = async (panNumber) => {
    try {
        const { data } = await axiosInstance.get(
            `/API/SD/CUSTOMER_DETAIL/CHECK-EXIST-PAN_CARD?panNumber=${panNumber}`
        );

        return data?.Data || data || {};
    } catch (error) {
        console.error("Error checking PAN:", error);
        return {};
    }
};


export const checkGSTExists = async (GSTnumber) => {
    try {
        const { data } = await axiosInstance.get(
            `/API/SD/CUSTOMER_DETAIL/CHECK-EXIST-GSTNO?GSTnumber=${GSTnumber}`
        );

        return data?.Data || data || {};
    } catch (error) {
        console.error("Error checking GSTnumber:", error);
        return {};
    }
};

export const getCustomerMaxCode = async (firstLetter) => {
    try {
        const { data } = await axiosInstance.get(
            `/API/SD/CUSTOMER_DETAIL/CUSTOMER_DETAIL-MaxCode_By_FLatter?FLatter=${firstLetter}`
        );
        return data || {};
    } catch (error) {
        console.error("Error fetching max code:", error);
        return {};
    }
};


export const fetchIndustry_typeCustomer = async () => {

    try {
        const { data } = await axiosInstance.get(
            `api/Master/Fetch-Industry_type`
        );
        return data.Data || []; // ✅ return just the array
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        return [];
    }
};


export const saveCustomerItemDetails = async (payload) => {
    try {
        console.log("Calling Customer Item Details API with:", payload);

        const response = await axiosInstance.post(
            "/ADD-CUSTOMER_ITEM_DETAILS",
            payload,
            {
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
            }
        );

        console.log("Customer Item Details API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Customer Item Details API Error:",
            error.response || error.message
        );

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to save Customer Item Details.");
    }
};

export const updateCustomerItemDetails = async (payload) => {
    try {
        console.log("Calling Update API with:", payload);

        const response = await axiosInstance.post(
            "/UPDATE-CUSTOMER_ITEM_DETAILS",
            payload,
            {
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
            }
        );

        console.log("Update API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Update API Error:",
            error.response || error.message
        );

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Failed to update Customer Item Details.");
    }
};

export const CustomerItemDetailsPaginationAPI = async ({
    tableName = "Alternate_Item",
    pageNumber = 1,
    pageSize = 10,
    searchString = "",
    columnNameForSearch = "",
    orderBy = "",
    userName = "",
    profcen_cd = "",
    financeDTColumn = "",
    fstartDate = "",
    fendDate = "",
} = {}) => {
    try {
        const { data } = await axiosInstance.get(
            "/api/PaginationByTable/GetPaginationByTable",
            {
                params: {
                    TableNameForPagination: tableName,
                    pageNumber,
                    pageSize,
                    searchString,
                    columnNameForSearch,
                    orderBy,
                    userName,
                    Profcen_cd: profcen_cd,
                    financeDTColumn,
                    fstartDate,
                    fendDate,
                },
            }
        );

        if (data?.Data) {
            return data;
        }

        return null;
    } catch (error) {
        console.error("Customer Item pagination error:", error);
        return null;
    }
};
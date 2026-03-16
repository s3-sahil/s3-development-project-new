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
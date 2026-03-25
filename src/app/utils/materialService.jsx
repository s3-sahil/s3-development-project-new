import axiosInstance from "./axiosInstance";

export const saveOutwardChallan = async (payload) => {
  try {
    const response = await axiosInstance.post(`/ADD-OUTWARD_CHALLAN`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding OUTWARD CHALLAN", error);
    throw error;
  }
};

export const updateOutwardChallan = async (payload) => {
  try {
    const response = await axiosInstance.post(`/UPDATE-OUTWARD_CHALLAN`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating OUTWARD CHALLAN", error);
    throw error;
  }
};


export const OutwardChallanPaginationAPI = async (
    tableName = "vchal_head",
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
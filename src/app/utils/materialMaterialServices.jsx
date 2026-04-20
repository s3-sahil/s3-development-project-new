import axiosInstance from "./axiosInstance";

export const addItemDetails = async (itemData) => {
  try {
    const response = await axiosInstance.post(
      "/API/MATERIAL/ITEM_DETAILS/ADD-ITEM_DETAILS",
      itemData,
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
      error.response?.data?.message || "Failed to add item details."
    );
  }
};


export const fetchCategoryTypeAPI = async () => {
  try {
    const { data } = await axiosInstance.get(
      "/api/Master/Fetch-categorytype"
    );

    return data?.Data || [];

  } catch (error) {
    console.error("Error fetching category type:", error);
    return [];
  }
};


export const fetchCategoryByTypeAPI = async (indicator) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/Master/Fetch-category_By_categorytype`,
      {
        params: { indicator }, // 👈 query param
      }
    );

    return data?.Data || [];

  } catch (error) {
    console.error("Error fetching category by type:", error);
    return [];
  }
};

export const fetchSubCategoryAPI = async () => {
    
  try {
    const { data } = await axiosInstance.get(
      "/api/Master/Fetch-Subcatg"
    );

    return data?.Data || [];

  } catch (error) {
    console.error("Error fetching sub category:", error);
    return [];
  }
};

export const fetchUOMAPI = async () => {
  try {
    const { data } = await axiosInstance.get("/api/Master/Fetch-UOM");
    return data?.Data || [];
  } catch (error) {
    console.error("Error fetching UOM:", error);
    return [];
  }
};
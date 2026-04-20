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
      },
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to add item details.",
    );
  }
};

export const fetchCategoryTypeAPI = async () => {
  try {
    const { data } = await axiosInstance.get("/api/Master/Fetch-categorytype");

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
      },
    );

    return data?.Data || [];
  } catch (error) {
    console.error("Error fetching category by type:", error);
    return [];
  }
};

export const fetchSubCategoryAPI = async () => {
  try {
    const { data } = await axiosInstance.get("/api/Master/Fetch-Subcatg");

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

export const addItemCategoryDetails = async (itemData) => {
  try {
    const response = await axiosInstance.post(
      "/API/MATERIAL/ITEM_CATEGORY_DETAILS/ADD-ITEM_CATEGORY_D",
      itemData,
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
      error.response?.data?.message || "Failed to add item category details.",
    );
  }
};

export const addItemWiseMOQ = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/API/MATERIAL/ITEMWISE_MOQ/ADD-ITEMWISE_MOQ",
      data,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("MOQ API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.Errormessage ||
        error.response?.data?.message ||
        "Failed to save MOQ details"
    );
  }
};

export const addItemRateDetails = async (rateData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-ITEM_RATE_DETAILS",
      rateData,
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
      error.response?.data?.Errormessage ||
      "Failed to save item rate."
    );
  }
};

export const addShareOfBusiness = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-SHARE_OF_BUSINESS",
      data,
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
      "Failed to save share of business."
    );
  }
};

export const addHSN = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/API/MATERIAL/HSN_SAC_MASTER/ADD-HSN_SAC",
      data,
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
      error.response?.data?.message || "Failed to save HSN/SAC"
    );
  }
};
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
      },
    );

    return response.data;
  } catch (error) {
    console.error("MOQ API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.Errormessage ||
        error.response?.data?.message ||
        "Failed to save MOQ details",
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
      },
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.Errormessage || "Failed to save item rate.",
    );
  }
};

export const addShareOfBusiness = async (data) => {
  try {
    const response = await axiosInstance.post("/ADD-SHARE_OF_BUSINESS", data, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to save share of business.",
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
      },
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Failed to save HSN/SAC");
  }
};

export const addCountryDetails = async (countryData) => {
  try {
    const response = await axiosInstance.post(
      "/API/MATERIAL/COUNTRY_DETAIL/ADD-COUNTRY_DETAIL",
      countryData,
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
      error.response?.data?.message || "Failed to add country details.",
    );
  }
};

export const addStateDetails = async (stateData) => {
  try {
    const response = await axiosInstance.post(
      "/API/MATERIAL/STATE_DETAIL/ADD-STATE",
      stateData,
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
      error.response?.data?.message || "Failed to add state details.",
    );
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axiosInstance.get("/api/Master/Fetch-Country_mst");

    return response.data.Data; // important
  } catch (error) {
    console.error("API Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message || "Failed to fetch countries.",
    );
  }
};

export const fetchStates = async () => {
  try {
    const res = await axiosInstance.get("/api/Master/Fetch-State");
    return res.data.Data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch states");
  }
};

export const addDistrictDetails = async (districtData) => {
  try {
    const response = await axiosInstance.post(
      "/API/MATERIAL/DISTRICT_DETAIL/ADD-DISTRICT_DETAIL",
      districtData,
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
      error.response?.data?.message || "Failed to add district details.",
    );
  }
};

export const addOperationDetails = async (operationData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-OPERATION_DETAILS",
      operationData,
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
      error.response?.data?.message || "Failed to add operation details.",
    );
  }
};

export const addAlternateItemDetails = async (alternateData) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-ALTERNATE_ITEM_DETAILS",
      alternateData,
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
      error.response?.data?.message || "Failed to add alternate item details.",
    );
  }
};

export const addCategoryPropertyValues = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-CATEGORIWISE_PROPERTY_VALUES",
      payload,
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
      error.response?.data?.message ||
        "Failed to add category property values.",
    );
  }
};

export const addExchangeCurrency = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-EXCHANGE_CURRENCY_MASTER",
      payload,
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
      error.response?.data?.message || "Failed to add exchange currency.",
    );
  }
};

export const addGradeMaster = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-GRADE_MASTER_DETAIL",
      payload,
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
      error.response?.data?.message || "Failed to add grade master details.",
    );
  }
};

export const addGRNOpeningStock = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/ADD-GRN_WISE_OPENING_STOCK",
      payload,
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
      error.response?.data?.message || "Failed to add GRN opening stock.",
    );
  }
};

export const addGSTDetails = async (payload) => {
  try {
    const response = await axiosInstance.post("/ADD-GST_DETAILS", payload, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message || "Failed to add GST details.",
    );
  }
};

export const addProjectDetail = async (payload) => {
  try {
    const res = await axiosInstance.post(
      "/API/MATERIAL/PROJECT_DETAIL/ADD-PROJECT_DETAIL",
      payload,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message || "Failed to save project detail",
    );
  }
};

export const addPhysicalInventory = async (payload) => {
  try {
    const res = await axiosInstance.post(
      "/ADD-PHYSICAL_INVENTORY_STOCK_PHYS",
      payload,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message || "Failed to save physical inventory",
    );
  }
};

export const addMachineHourRate = async (payload) => {
  try {
    const res = await axiosInstance.post(
      "/ADD-MACHINE_HOUR_RATE_DETAIL",
      payload,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message || "Failed to save machine hour rate",
    );
  }
};


export const addMaterialDefect = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/API/MATERIAL/MATERIAL_DEFECT_DETAILS/ADD-MATERIAL_DEFECT_DETAILS",
      payload
    );
    return data;
  } catch (error) {
    console.error("Material Defect API Error:", error);
    throw error.response?.data || error;
  }
};

export const addPaymentCondition = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/ADD-PAYMENT_CONDITION_DTL",
      payload
    );
    return data;
  } catch (error) {
    console.error("Payment Condition API Error:", error);
    throw error.response?.data || error;
  }
};

export const addPropertyValues = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/ADD-PROPERTY_VALUES",
      payload
    );
    return data;
  } catch (error) {
    console.error("Property Values API Error:", error);
    throw error.response?.data || error;
  }
};

export const addSupplierDetails = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/ADD-SUPPLIER_DETAILS",
      payload
    );
    return data;
  } catch (error) {
    console.error("Supplier API Error:", error);
    throw error.response?.data || error;
  }
};

export const fetchMaxSupplierCode = async (name) => {
  try {
    const { data } = await axiosInstance.get(
      `/SUPPLIER_DETAILS-MaxCode_By_FLatter?FLatter=${name}`
    );
    return data?.MaxCode || "";
  } catch (error) {
    console.error("MaxCode API Error:", error);
    return "";
  }
};

export const addUOM = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/API/MATERIAL/UNIT_OF_MEASUREMENT/ADD-UNIT_OF_MEASUREMENT",
      payload
    );
    return data;
  } catch (error) {
    console.error("UOM API Error:", error);
    throw error.response?.data || error;
  }
};

export const addInspectionParameter = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/ADD-INSPECTION_PARAMETERS",
      payload
    );
    return data;
  } catch (error) {
    console.error("Inspection Parameter API Error:", error);
    throw error.response?.data || error;
  }
};
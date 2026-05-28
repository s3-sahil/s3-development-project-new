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
      payload,
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
      payload,
    );
    return data;
  } catch (error) {
    console.error("Payment Condition API Error:", error);
    throw error.response?.data || error;
  }
};

export const addPropertyValues = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/ADD-PROPERTY_VALUES", payload);
    return data;
  } catch (error) {
    console.error("Property Values API Error:", error);
    throw error.response?.data || error;
  }
};

export const addSupplierDetails = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/ADD-SUPPLIER_DETAILS", payload);
    return data;
  } catch (error) {
    console.error("Supplier API Error:", error);
    throw error.response?.data || error;
  }
};

export const fetchMaxSupplierCode = async (name) => {
  try {
    const { data } = await axiosInstance.get(
      `/SUPPLIER_DETAILS-MaxCode_By_FLatter?FLatter=${name}`,
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
      payload,
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
      payload,
    );
    return data;
  } catch (error) {
    console.error("Inspection Parameter API Error:", error);
    throw error.response?.data || error;
  }
};

export const addItemMaterialGrade = async (payload) => {
  try {
    const res = await axiosInstance.post(
      "/ADD-ITEMWISE_MATERIAL_GRADE_DETAIL",
      payload, // 👈 must be ARRAY
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
      error.response?.data?.message || "Failed to save material grade detail",
    );
  }
};

export const addSacGroupMaster = async (payload) => {
  try {
    const res = await axiosInstance.post(
      "/API/MATERIAL/SAC_GROUP_MASTER/ADD-SAC_GROUP_MASTER",
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
      error.response?.data?.message || "Failed to save SAC Group Master",
    );
  }
};


export const UOMPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "uom",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("UOM pagination fetch error:", error);

    return null;
  }
};

export const deleteUOMAPI = async (uom) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/UNIT_OF_MEASUREMENT/DELETE-UNIT_OF_MEASUREMENT",
      {
        params: {
          UOM: uom,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete UOM error:", error);
    return null;
  }
};

export const deleteItemCategoryAPI = async (catgCode, indicator) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/ITEM_CATEGORY_DETAILS/DELETE-ITEM_CATEGORY_D",
      {
        params: {
          CATG_CODE: catgCode,
          indicator: indicator,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Item Category error:", error);
    return null;
  }
};

export const deleteExchangeCurrencyAPI = async (currency, conv_date) => {
  try {
    const { data } = await axiosInstance.delete(
      "/DELETE-EXCHANGE_CURRENCY_MASTER",
      {
        params: {
          currency,
          conv_date,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Exchange Currency error:", error);
    return null;
  }
};

export const deleteSupplierDetailsAPI = async (vend_code) => {
  try {
    const { data } = await axiosInstance.delete("/DELETE-SUPPLIER_DETAILS", {
      params: {
        vend_code,
      },
    });

    return data;
  } catch (error) {
    console.error("Delete Supplier Details error:", error);
    return null;
  }
};

export const deleteShareOfBusinessAPI = async (Item_code, Vend_code) => {
  try {
    const { data } = await axiosInstance.delete("/DELETE-SHARE_OF_BUSINESS", {
      params: {
        Item_code,
        Vend_code,
      },
    });

    return data;
  } catch (error) {
    console.error("Delete Share Of Business error:", error);
    return null;
  }
};

export const deleteSACGroupMasterAPI = async (Tgroup_Code) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/SAC_GROUP_MASTER/DELETE-SAC_GROUP_MASTER",
      {
        params: {
          Tgroup_Code,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete SAC Group Master error:", error);
    return null;
  }
};

export const deletePropertyValuesAPI = async (Property_name) => {
  try {
    const { data } = await axiosInstance.delete("/DELETE-PROPERTY_VALUES", {
      params: {
        Property_name,
      },
    });

    return data;
  } catch (error) {
    console.error("Delete Property Values error:", error);
    return null;
  }
};

export const deleteProductMovementFlowAPI = async (DEPT_CODE) => {
  try {
    const { data } = await axiosInstance.delete(
      "/DELETE-PRODUCT_MOVEMENT_FLOW",
      {
        params: {
          DEPT_CODE,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Product Movement Flow error:", error);
    return error?.response?.data || null;
  }
};

export const deleteProjectDetailAPI = async (PROJ_CODE, PROFCEN_CD) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/PROJECT_DETAIL/DELETE-PROJECT_DETAIL",
      {
        params: {
          PROJ_CODE,
          PROFCEN_CD,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Project Detail error:", error);
    return error?.response?.data || null;
  }
};

export const deletePaymentConditionDtlAPI = async (PC_CODE) => {
  try {
    const { data } = await axiosInstance.delete(
      "/DELETE-PAYMENT_CONDITION_DTL",
      {
        params: {
          PC_CODE,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Payment Condition Detail error:", error);
    return error?.response?.data || null;
  }
};

export const deleteGradeMasterDetailAPI = async (mat_code) => {
  try {
    const { data } = await axiosInstance.delete("/DELETE-GRADE_MASTER_DETAIL", {
      params: {
        mat_code,
      },
    });

    return data;
  } catch (error) {
    console.error("Delete Grade Master Detail error:", error);
    return error?.response?.data || null;
  }
};

export const deleteGRNWiseOpeningStockAPI = async (
  GIN_NO,
  GIN_DATE,
  ITEM_CODE,
  yyyy_mm,
  profcen_cd,
  item_idnt,
  HSN_Code,
) => {
  try {
    const { data } = await axiosInstance.delete(
      "/DELETE-GRN_WISE_OPENING_STOCK",
      {
        params: {
          GIN_NO,
          GIN_DATE,
          ITEM_CODE,
          yyyy_mm,
          profcen_cd,
          item_idnt,
          HSN_Code,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete GRN Wise Opening Stock error:", error);
    return error?.response?.data || null;
  }
};

export const deleteGroupDetailsAPI = async (Group_code) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/FINANCE/GROUP_DETAILS/DELETE-GROUP_DETAILS",
      {
        params: {
          Group_code,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Group Details error:", error);
    return error?.response?.data || null;
  }
};

export const deleteGSTDetailsAPI = async (TAX_CODE) => {
  try {
    const { data } = await axiosInstance.delete("/DELETE-GST_DETAILS", {
      params: {
        TAX_CODE,
      },
    });

    return data;
  } catch (error) {
    console.error("Delete GST Details error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// HSN SAC MASTER
// ==========================================

export const deleteHSNSACMasterAPI = async (TARIFF_CODE) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/HSN_SAC_MASTER/DELETE-HSN_SAC",
      {
        params: {
          TARIFF_CODE,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete HSN SAC Master error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// INSPECTION PARAMETERS
// ==========================================

export const deleteInspectionParametersAPI = async (RM_parameter) => {
  try {
    const { data } = await axiosInstance.delete(
      "/DELETE-INSPECTION_PARAMETERS",
      {
        params: {
          RM_parameter,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Inspection Parameters error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// ITEM CATEGORY DETAILS
// ==========================================

export const deleteItemCategoryDetailsAPI = async (CATG_CODE, indicator) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/ITEM_CATEGORY_DETAILS/DELETE-ITEM_CATEGORY_D",
      {
        params: {
          CATG_CODE,
          indicator,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Item Category Details error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// ITEM DETAILS
// ==========================================

export const deleteItemDetailsAPI = async (ITEM_CODE) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/ITEM_DETAILS/DELETE-ITEM_DETAILS",
      {
        params: {
          ITEM_CODE,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Item Details error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// ALTERNATE ITEM DETAILS
// ==========================================

export const deleteAlternateItemDetailsAPI = async (Item_Code) => {
  try {
    const { data } = await axiosInstance.delete(
      "/DELETE-ALTERNATE_ITEM_DETAILS",
      {
        params: {
          Item_Code,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Alternate Item Details error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// ITEMWISE MATERIAL GRADE DETAIL
// ==========================================

export const deleteItemwiseMaterialGradeDetailAPI = async (
  catg_Code,
  subcatg_code,
) => {
  try {
    const { data } = await axiosInstance.delete(
      "/DELETE-ITEMWISE_MATERIAL_GRADE_DETAIL",
      {
        params: {
          catg_Code,
          subcatg_code,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Itemwise Material Grade Detail error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// ITEM RATE DETAILS
// ==========================================

export const deleteItemRateDetailsAPI = async (item_code) => {
  try {
    const { data } = await axiosInstance.delete("/DELETE-ITEM_RATE_DETAILS", {
      params: {
        item_code,
      },
    });

    return data;
  } catch (error) {
    console.error("Delete Item Rate Details error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// ITEMWISE MOQ
// ==========================================

export const deleteItemwiseMOQAPI = async (ITEM_CODE, profcen_cd) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/ITEMWISE_MOQ/DELETE-ITEMWISE_MOQ",
      {
        params: {
          ITEM_CODE,
          profcen_cd,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Itemwise MOQ error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// MACHINE HOUR RATE DETAIL
// ==========================================

export const deleteMachineHourRateDetailAPI = async (unit_code) => {
  try {
    const { data } = await axiosInstance.delete(
      "/DELETE-MACHINE_HOUR_RATE_DETAIL",
      {
        params: {
          unit_code,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Machine Hour Rate Detail error:", error);
    return error?.response?.data || null;
  }
};

// ==========================================
// MATERIAL DEFECT DETAILS
// ==========================================

export const deleteMaterialDefectDetailsAPI = async (
  Defect_cd,
  category_type,
  profcen_Cd,
) => {
  try {
    const { data } = await axiosInstance.delete(
      "/API/MATERIAL/MATERIAL_DEFECT_DETAILS/DELETE-MATERIAL_DEFECT_DETAILS",
      {
        params: {
          Defect_cd,
          category_type,
          profcen_Cd,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Delete Material Defect Details error:", error);
    return error?.response?.data || null;
  }
};

// ========================= API =========================

export const MaterialGradePaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Item_OhterDetail",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Material Grade Pagination Error:", error);

    return null;
  }
};

// ========================= materialMaterialServices.js =========================

export const ItemRatePaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "item_rate_mast",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Item Rate Pagination Error:", error);

    return null;
  }
};

// ================= API =================

export const MachineHourRatePaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Machine_Hour_rate",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Machine Hour Rate Pagination Error:", error);

    return null;
  }
};


export const OperationPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Operation",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Operation Pagination Error:", error);

    return null;
  }
};


export const PaymentConditionsPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Paycond",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Payment Conditions Pagination Error:", error);

    return null;
  }
};


export const PhysicalInventoryPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "WIP_Phys_Inventory",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Physical Inventory Pagination Error:", error);

    return null;
  }
};


export const PropertyValuesPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Property_values",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Property Values Pagination Error:", error);

    return null;
  }
};

// ================= API =================

export const TariffGroupPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Tariff_group",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Tariff Group Pagination Error:", error);

    return null;
  }
};


export const ShareOfBusinessPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "ShareOfBusiness",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Share Of Business Pagination Error:", error);

    return null;
  }
};


export const VendorPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "vendor",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Vendor Pagination Error:", error);

    return null;
  }
};


export const ItemPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Item",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Item Pagination Error:", error);

    return null;
  }
};


export const RMInspectionParameterPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "RM_insp_parameter",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("RM Inspection Parameter Pagination Error:", error);

    return null;
  }
};


export const TariffPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Tariff",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Tariff Pagination Error:", error);

    return null;
  }
};


export const TaxPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Tax",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Tax Pagination Error:", error);

    return null;
  }
};


export const GinValuationPaginationAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "gin_valuation",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    if (data?.Data) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("GIN Valuation Pagination Error:", error);

    return null;
  }
};


export const GradeMasterPaginationAPI = async (
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Grade_master",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Grade Master pagination error:", error);

    return null;
  }
};


export const ExchangeCurrencyPaginationAPI = async (
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "currency_mst",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Exchange Currency pagination error:", error);

    return null;
  }
};


export const CategoryPropertyPaginationAPI = async (
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  columnNameForSearch = "",
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/PaginationByTable/GetPaginationByTable",
      {
        params: {
          TableNameForPagination: "Category_property",

          pageNumber,

          pageSize,

          searchString,

          columnNameForSearch,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Category Property pagination error:", error);

    return null;
  }
};
import axiosInstance from "./axiosInstance";

export const addProfessionTaxSlab = async (payload) => {
  try {
    const res = await axiosInstance.post(
      "/api/ProfesitionalTaxSlab/Add-PrfTaxSlab",
      payload,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message ||
        "Failed to save Profession Tax Slab"
    );
  }
};
import { BASE_URL } from "@/service/api";



export const apiPath = {
  login: `${BASE_URL}/api/v1/auth/login`,
  register: `${BASE_URL}/api/v1/auth/register`,
};

export const productApiPath = {
  getAllProducts: `${BASE_URL}/api/v1/products`,
  getProductById: `${BASE_URL}/api/v1/products`,
};

export const houseApiPath = {
  bookingHouse: `${BASE_URL}/api/v1/bookings`,
  uploadContactQrCode: `${BASE_URL}/api/v1/images`,
};

export const contractApiPath = {
  uploadIdentificationCards: `${BASE_URL}/api/v1/images`,
  createContract: `${BASE_URL}/api/v1/contracts/create`,
  uploadSignatureImage: `${BASE_URL}/api/v1/images`,
};

export const regulationsApiPath = {
  getRegulations: `${BASE_URL}/api/regulations`,
};

export const companyInfo = {
  getCompanyInfo: `${BASE_URL}/api/company-info`,
};
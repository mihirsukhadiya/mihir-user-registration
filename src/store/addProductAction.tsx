import { GET_ALL_PRODUCT_DATA, EDIT_PRODUCT_DATA } from "./addProductType";

export const getAllProductsData = (data:any) => {
  return {
    type: GET_ALL_PRODUCT_DATA,
    payload: data,
  };
};

export const editProductData = (data:any) => {
  return {
    type: EDIT_PRODUCT_DATA,
    payload: data,
  };
};
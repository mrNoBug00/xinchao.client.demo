"use server"


import { productApiPath } from "@/utils/apiPath";


export async function fetchAllProducts() {
    try {
      const result = await fetch(productApiPath.getAllProducts, {
        method: "GET",
        cache: "no-store",
      });
      const data = await result.json();
  
      return {
        success: true,
        data: data?.products,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: "Some error occured! Please try again",
      };
    }
  }
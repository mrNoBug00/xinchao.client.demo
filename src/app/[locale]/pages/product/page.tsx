"use client";

import React, { useState, useEffect } from "react";
import "../../../../styles/globals.css";
import ProductList from "@/component/ProductList";

const Products: React.FC = () => {
  
  return (
    <div >
      <div className="max-w-screen-2xl mx-auto ">
        <ProductList />
      </div>
    </div>
  );
};

export default Products;

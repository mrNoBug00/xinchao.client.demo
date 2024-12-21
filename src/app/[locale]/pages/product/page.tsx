"use client";

import React, { useState, useEffect } from "react";
import "../../../../styles/globals.css";
import ProductList from "@/component/ProductList";

const Products: React.FC = () => {
  
  return (
    <div className="m-2">
      <div className="max-w-screen-xl mx-auto p-4">
        <ProductList />
      </div>
    </div>
  );
};

export default Products;

import React, { createContext, useContext } from "react";
import { useProducts } from "../hooks";
import { Product } from "../../types.ts";

interface ProductContextType {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be inside ProductsProvider");
  return ctx;
};

export const ProductProvider = ({
  children,
  initialProducts,
}: {
  children: React.ReactNode;
  initialProducts: Product[];
}) => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

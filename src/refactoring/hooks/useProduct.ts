import { useState } from "react";
import { Product } from "../../types.ts";
import { append } from "../utils/array.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? product : p)),
    );
  };

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => append(prevProducts, product));
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};

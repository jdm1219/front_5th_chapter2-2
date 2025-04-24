import { useState } from "react";
import { Product } from "../../types.ts";

const initialNewProduct = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

export const useProductManagement = () => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    ...initialNewProduct,
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const setInitialNewProduct = () => {
    setNewProduct({
      ...initialNewProduct,
    });
  };

  const toggleNewProductForm = () => {
    setShowNewProductForm((prev) => !prev);
  };

  return {
    newProduct,
    setNewProduct,
    showNewProductForm,
    setShowNewProductForm,
    toggleNewProductForm,
    setInitialNewProduct,
  };
};

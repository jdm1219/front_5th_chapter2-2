import { useProductContext } from "../provider/ProductProvider.tsx";
import { useState } from "react";
import { Product } from "../../types.ts";

const initialNewProduct = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

export const useProductManagement = () => {
  const { addProduct } = useProductContext();
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

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    addProduct(productWithId);
    setInitialNewProduct();
    setShowNewProductForm(false);
  };

  return {
    newProduct,
    setNewProduct,
    showNewProductForm,
    toggleNewProductForm,
    handleAddNewProduct,
  };
};

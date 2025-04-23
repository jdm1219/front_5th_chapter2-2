import ProductItem from "./ProductItem.tsx";
import { useProductContext } from "../../provider/ProductProvider.tsx";
import { useState } from "react";
import { Product } from "../../../types.ts";

const ProductItemList = () => {
  const { products } = useProductContext();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem
          key={index}
          index={index}
          product={product}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />
      ))}
    </div>
  );
};

export default ProductItemList;

import ProductItemList from "./ProductItemList.tsx";
import { useProductManagement } from "../../hooks";
import { ChangeEvent } from "react";
import { useProductContext } from "../../provider/ProductProvider.tsx";

export const ProductManagement = () => {
  const { addProduct } = useProductContext();
  const {
    newProduct,
    setNewProduct,
    showNewProductForm,
    setShowNewProductForm,
    toggleNewProductForm,
    setInitialNewProduct,
  } = useProductManagement();

  const handleNameUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewProduct({ ...newProduct, name });
  };

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    setNewProduct({ ...newProduct, price });
  };

  const handleStockUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const stock = Number(e.target.value);
    setNewProduct({ ...newProduct, stock });
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    addProduct(productWithId);
    setInitialNewProduct();
    setShowNewProductForm(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={toggleNewProductForm}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          <div className="mb-2">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              상품명
            </label>
            <input
              id="productName"
              type="text"
              value={newProduct.name}
              onChange={handleNameUpdate}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="productPrice"
              className="block text-sm font-medium text-gray-700"
            >
              가격
            </label>
            <input
              id="productPrice"
              type="number"
              value={newProduct.price}
              onChange={handlePriceUpdate}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="productStock"
              className="block text-sm font-medium text-gray-700"
            >
              재고
            </label>
            <input
              id="productStock"
              type="number"
              value={newProduct.stock}
              onChange={handleStockUpdate}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddNewProduct}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            추가
          </button>
        </div>
      )}
      <ProductItemList />
    </div>
  );
};

import { Discount, Product } from "../../../types.ts";
import { ChangeEvent, useState } from "react";
import { useProductContext } from "../../provider/ProductProvider.tsx";

interface Props {
  index: number;
  product: Product;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
}

const initialNewDicount = {
  quantity: 0,
  rate: 0,
};

const ProductItem = ({
  index,
  product,
  editingProduct,
  setEditingProduct,
}: Props) => {
  const { updateProduct } = useProductContext();
  const [openProduct, setOpenProduct] = useState<boolean>(false);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    ...initialNewDicount,
  });
  const toggleProductAccordion = () => {
    setOpenProduct((prev) => !prev);
  };

  // handleEditProduct 함수 수정
  const handleEditProduct = () => {
    setEditingProduct({ ...product });
  };

  // 새로운 핸들러 함수 추가
  const handleProductNameUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    const name = e.target.value;
    setEditingProduct({ ...editingProduct, name });
  };

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    const price = Number(e.target.value);
    setEditingProduct({ ...editingProduct, price });
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleStockUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const stock = Number(e.target.value);
    const newProduct = { ...product, stock };
    updateProduct(newProduct);
    setEditingProduct(newProduct);
  };

  const handleAddDiscount = () => {
    const newProduct = {
      ...product,
      discounts: [...product.discounts, newDiscount],
    };
    updateProduct(newProduct);
    setEditingProduct(newProduct);
    setNewDiscount({ ...initialNewDicount });
  };

  const handleRemoveDiscount = (index: number) => {
    const newProduct = {
      ...product,
      discounts: product.discounts.filter((_, i) => i !== index),
    };
    updateProduct(newProduct);
    setEditingProduct(newProduct);
  };
  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion()}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {openProduct && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <div>
              <div className="mb-4">
                <label className="block mb-1">상품명: </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={handleProductNameUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">가격: </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={handlePriceUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">재고: </label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={handleStockUpdate}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* 할인 정보 수정 부분 */}
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map((discount, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                      할인
                    </span>
                    <button
                      onClick={() => handleRemoveDiscount(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="수량"
                    value={newDiscount.quantity}
                    onChange={(e) =>
                      setNewDiscount({
                        ...newDiscount,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="할인율 (%)"
                    value={newDiscount.rate * 100}
                    onChange={(e) =>
                      setNewDiscount({
                        ...newDiscount,
                        rate: parseInt(e.target.value) / 100,
                      })
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <button
                    onClick={handleAddDiscount}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    할인 추가
                  </button>
                </div>
              </div>
              <button
                onClick={handleEditComplete}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
              >
                수정 완료
              </button>
            </div>
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={handleEditProduct}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductItem;

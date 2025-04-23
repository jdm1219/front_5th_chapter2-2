import { ChangeEvent, useState } from "react";
import { Coupon } from "../../../types.ts";
import { useCouponContext } from "../../provider/CouponProvider.tsx";

const initialNewCoupon: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

const CouponManagement = () => {
  const { coupons, addCoupon } = useCouponContext();
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    ...initialNewCoupon,
  });

  const handleNameUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewCoupon({ ...newCoupon, name });
  };

  // 새로운 핸들러 함수 추가
  const handleCodeUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setNewCoupon({ ...newCoupon, code });
  };

  const handleStockUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
    const discountType = e.target.value as "amount" | "percentage";
    setNewCoupon({ ...newCoupon, discountType: discountType });
  };

  const handleAddCoupon = () => {
    addCoupon(newCoupon);
    setNewCoupon({
      ...initialNewCoupon,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="쿠폰 이름"
            value={newCoupon.name}
            onChange={handleNameUpdate}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="쿠폰 코드"
            value={newCoupon.code}
            onChange={handleCodeUpdate}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <select
              value={newCoupon.discountType}
              onChange={handleStockUpdate}
              className="w-full p-2 border rounded"
            >
              <option value="amount">금액(원)</option>
              <option value="percentage">할인율(%)</option>
            </select>
            <input
              type="number"
              placeholder="할인 값"
              value={newCoupon.discountValue}
              onChange={(e) =>
                setNewCoupon({
                  ...newCoupon,
                  discountValue: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddCoupon}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            쿠폰 추가
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
          <div className="space-y-2">
            {coupons.map((coupon, index) => (
              <div
                key={index}
                data-testid={`coupon-${index + 1}`}
                className="bg-gray-100 p-2 rounded"
              >
                {coupon.name} ({coupon.code}):
                {coupon.discountType === "amount"
                  ? `${coupon.discountValue}원`
                  : `${coupon.discountValue}%`}{" "}
                할인
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;

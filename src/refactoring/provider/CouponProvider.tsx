import React, { createContext, useContext } from "react";
import { useCoupons } from "../hooks";
import { Coupon } from "../../types.ts";

interface CouponContextType {
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const useCouponContext = () => {
  const ctx = useContext(CouponContext);
  if (!ctx) throw new Error("useCoupons must be inside CouponsProvider");
  return ctx;
};

export const CouponProvider = ({
  children,
  initialCoupons,
}: {
  children: React.ReactNode;
  initialCoupons: Coupon[];
}) => {
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  return (
    <CouponContext.Provider value={{ coupons, addCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};

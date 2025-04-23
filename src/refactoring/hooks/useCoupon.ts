import { useState } from "react";
import { Coupon } from "../../types.ts";
import { append } from "../utils/array.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prevCoupons) => append(prevCoupons, coupon));
  };

  return { coupons, addCoupon };
};

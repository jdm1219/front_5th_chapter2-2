import { CartItem, Coupon } from "../../types";
import { clamp } from "../utils/number.ts";

const calculateItemTotalBeforeDiscount = (item: CartItem) => {
  return item.product.price * item.quantity;
};

export const calculateItemTotal = (item: CartItem) => {
  return (
    calculateItemTotalBeforeDiscount(item) *
    (1 - getMaxApplicableDiscount(item))
  );
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  return discounts.reduce(
    (max, discount) =>
      quantity >= discount.quantity ? Math.max(max, discount.rate) : max,
    0,
  );
};

const calculateAfterDiscountCoupon = (
  totalBeforeDiscount: number,
  selectedCoupon: Coupon,
) => {
  if (selectedCoupon.discountType === "amount") {
    return totalBeforeDiscount - selectedCoupon.discountValue;
  }
  if (selectedCoupon.discountType === "percentage") {
    return (totalBeforeDiscount * (100 - selectedCoupon.discountValue)) / 100;
  }
  return totalBeforeDiscount;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  const totalBeforeDiscount = cart.reduce(
    (sum, cartItem) => calculateItemTotalBeforeDiscount(cartItem) + sum,
    0,
  );

  const totalAfterItemDiscount = cart.reduce(
    (sum, cartItem) => calculateItemTotal(cartItem) + sum,
    0,
  );

  const totalAfterDiscount = selectedCoupon
    ? calculateAfterDiscountCoupon(totalAfterItemDiscount, selectedCoupon)
    : totalAfterItemDiscount;

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  return cart
    .map((cartItem) =>
      cartItem.product.id === productId
        ? {
            ...cartItem,
            quantity: clamp(newQuantity, 0, cartItem.product.stock),
          }
        : cartItem,
    )
    .filter((cartItem) => cartItem.quantity);
};

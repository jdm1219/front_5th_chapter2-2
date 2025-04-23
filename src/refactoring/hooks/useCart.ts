// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";
import { append } from "../utils/array.ts";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const getCartItemById = (productId: string): CartItem | undefined => {
    return cart.find((cartItem) => cartItem.product.id === productId);
  };

  const addToCart = (product: Product) => {
    const existingItem = getCartItemById(product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
      return;
    }
    setCart((prevCart) => append(prevCart, { product, quantity: 1 }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity),
    );
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

export type CartItem = {
  id: string; // product id
  slug: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalAmount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((v) => !v);

  const addItem: CartContextType["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + qty }
            : p
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsOpen(true);
  };

  const updateQuantity: CartContextType["updateQuantity"] = (
    id,
    qty
  ) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const totalQuantity = items.reduce(
      (sum, i) => sum + i.quantity,
      0
    );
    const totalAmount = items.reduce(
      (sum, i) => sum + i.quantity * i.price,
      0
    );
    return { totalQuantity, totalAmount };
  }, [items]);

  const value: CartContextType = {
    items,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalQuantity: totals.totalQuantity,
    totalAmount: totals.totalAmount,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

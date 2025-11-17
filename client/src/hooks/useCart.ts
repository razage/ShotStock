// hooks/useCart.ts (updated)
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
    cartridgeId: number;
    quantity: number;
    display: {
        primary: string; // e.g. "9mm Luger Federal"
        secondary: string; // e.g. "115gr • FMJ"
    };
};

export type InventoryEntry = {
    cartridgeId: number;
    quantity: number;
    addedAt: number;
};

type CartStore = {
    items: CartItem[];
    addToCart: (
        cartridgeId: number,
        quantity: number,
        display: CartItem["display"]
    ) => void;
    updateQuantity: (cartridgeId: number, newQuantity: number) => void;
    removeFromCart: (cartridgeId: number) => void;
    clearCart: () => void;
    checkout: () => InventoryEntry[];
};

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (cartridgeId, quantity, display) =>
                set((state) => {
                    const existing = state.items.find(
                        (i) => i.cartridgeId === cartridgeId
                    );
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.cartridgeId === cartridgeId
                                    ? { ...i, quantity: i.quantity + quantity }
                                    : i
                            ),
                        };
                    }
                    return {
                        items: [
                            ...state.items,
                            { cartridgeId, quantity, display },
                        ],
                    };
                }),

            updateQuantity: (cartridgeId, newQuantity) =>
                set((state) => ({
                    items: state.items
                        .map((i) =>
                            i.cartridgeId === cartridgeId
                                ? { ...i, quantity: newQuantity }
                                : i
                        )
                        .filter((i) => i.quantity > 0),
                })),

            removeFromCart: (cartridgeId) =>
                set((state) => ({
                    items: state.items.filter(
                        (i) => i.cartridgeId !== cartridgeId
                    ),
                })),

            clearCart: () => set({ items: [] }),

            checkout: () => {
                const items = get().items;
                if (items.length === 0) return [];

                const now = Date.now();
                const entries: InventoryEntry[] = items.map((item) => ({
                    cartridgeId: item.cartridgeId,
                    quantity: item.quantity,
                    addedAt: now,
                }));

                const existing = JSON.parse(
                    localStorage.getItem("shotstock-inventory") || "[]"
                );
                localStorage.setItem(
                    "shotstock-inventory",
                    JSON.stringify([...existing, ...entries])
                );

                set({ items: [] });
                return entries;
            },
        }),
        { name: "shotstock-inventory" }
    )
);

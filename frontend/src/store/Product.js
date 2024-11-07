
import { create } from "zustand";

export const useProductStore = create((set) => ({
    Products: [],
    setProducts: (products) => set({ Products: products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Fill in all fields" };
        }
        try {
            const res = await fetch("/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
            const data = await res.json();
            set((state) => ({ Products: [...state.Products, data.data] }));
            return { success: true, message: "Product created" };
        } catch (error) {
            return { success: false, message: "Failed to create product" };
        }
    }
}));
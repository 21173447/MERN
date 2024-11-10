import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],  // Consistent lowercase naming
  setProducts: (products) => set({ products }),

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
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created" };
    } catch (error) {
      console.error("Failed to create product:", error);
      return { success: false, message: "Failed to create product" };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/product");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
  deleteProduct: async (pid) => {
		const res = await fetch(`/api/product/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},


  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/product/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Failed to update product:", error);
      return { success: false, message: "Failed to update product" };
    }
  },
}));

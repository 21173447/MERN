
import { create } from "zustand";

export const useProductStore = create((set) => ({

  Products: [],
  setProducts: (newProducts) => set({ Products: newProducts }), 
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { sucess: false, message: "Fill in all fields" };
    }
    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body:JSON.stringify(newProduct)
    })
    const data =await res.json();
    set((state)=>({products:[...state.prodcts,data.data]}))
    return{sucess:true,message:"Product created "}
  }
 
}));


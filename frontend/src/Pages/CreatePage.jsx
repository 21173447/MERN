import React, { useState } from 'react';
import { useProductStore } from '../store/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from 'autoprefixer';

const CreatePage = () => {
  const { createProduct } = useProductStore();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
   
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
      });

      setNewProduct({ name: "", price: "", image: "" }); 
      } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
    console.log(newProduct)
  };

  return (
    <div className='dark:bg-blue-900 h-[100vh]'>
      <h1 className='flex justify-center py-16 text-2xl font-bold dark:text-gray-200'>
        CREATE NEW PRODUCT 
      </h1>
      <div className='bg-gray-800'>
        <div className='flex flex-col items-center justify-center py-10 space-y-6'>
          <input
            name='name'
            placeholder='Product Name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            name='price'
            placeholder='Price'
            type='number'
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            name='image'
            placeholder='Image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <button className='bg-blue-700 p-1 rounded-sm' onClick={handleAddProduct}>
            Add product
          </button>
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default CreatePage;

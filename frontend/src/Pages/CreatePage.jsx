import React, { useState } from 'react'
import { useProductStore } from '../store/Product';

const CreatePage = () => {
  const {createProduct} = useProductStore ()

    const handleAddProduct =async ()=>{
     const {success,message} = await createProduct(newPoduct)
     console.log("Success:",success)
     console.log("Message:",message)
    }

    const [newPoduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    })
    return (
        <div className='dark:bg-blue-900 h-[100vh]'>
            <h1 className='flex justify-center py-16 text-2xl font-bold dark:text-gray-200'>CREATE NEW PRODUCT </h1>
            <div className='bg-gray-800'>

                <div className='flex flex-col items-center justify-center py-10 space-y-6'>
                    <input
                        name='name'
                        placeholder='Product Name'
                        value={newPoduct.name}
                        onChange={(e) => setNewProduct({ ...newPoduct, name: e.target.value })}
                    />
                    <input
                        name='price'
                        placeholder='Price'
                        type='number'
                        value={newPoduct.price}
                        onChange={(e) => setNewProduct({ ...newPoduct, price: e.target.value })}
                    />
                    <input
                        name='image'
                        placeholder='Image'
                        value={newPoduct.image}
                        onChange={(e) => setNewProduct({ ...newPoduct, image: e.target.value })}
                    />
                    <button className='bg-blue-700 p-1 rounded-sm ' onClick={handleAddProduct}>Add product</button>
                </div>

            </div>

        </div>
    )
}

export default CreatePage
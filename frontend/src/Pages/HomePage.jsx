import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/Product';
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
    const { fetchProducts, products, updateProduct, deleteProduct } = useProductStore();
    const [editProductDetails, setEditProductDetails] = useState(null);

    const handleDelete = async (pid) => {
        const { success, message } = await deleteProduct(pid);
    
        if (success) {
            toast.success(message);
        } else {
            toast.error(`Failed to delete product: ${message}`);
        }
    };

    const handleEdit = (product) => {
        setEditProductDetails({ ...product });
    };

    const handleUpdate = async () => {
        const { success, message } = await updateProduct(editProductDetails._id, editProductDetails);
        if (success) {
            toast.success("Product updated successfully");
            setEditProductDetails(null); 
        } else {
            toast.error(`Failed to update product: ${message}`);
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            setEditProductDetails(null);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <section className='dark:bg-blue-900 h-[100vh]'>
            <div className='grid place-content-center py-20'>
                <h1 className='grid place-content-center'>Current products 🚀</h1>

                {products && products.length > 0 ? (
                    <div className='grid grid-cols-4 gap-4 py-10'>
                        {products.map((product) => (
                            <div key={product._id} className='border w-56 p-1'>
                                <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                                <h2 className='font-bold'>{product.name}</h2>
                                <p className='text-sm text-gray-500'>${product.price}</p>
                                <div className='flex space-x-4'>
                                    <MdDelete onClick={() => handleDelete(product._id)} />
                                    <MdEdit onClick={() => handleEdit(product)} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1>No products found😥</h1>
                )}

                <div className='font-bold text-blue-400 hover:underline'>
                    <Link to="/create">Create a product</Link>
                </div>

                {editProductDetails && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay"
                        onClick={handleOutsideClick}
                    >
                        <div className="bg-white p-8 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                            <label className="block mb-2">Name</label>
                            <input
                                type="text"
                                value={editProductDetails.name}
                                onChange={(e) => setEditProductDetails({ ...editProductDetails, name: e.target.value })}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <label className="block mb-2">Price</label>
                            <input
                                type="number"
                                value={editProductDetails.price}
                                onChange={(e) => setEditProductDetails({ ...editProductDetails, price: e.target.value })}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <label className="block mb-2">Image URL</label>
                            <input
                                type="text"
                                value={editProductDetails.image}
                                onChange={(e) => setEditProductDetails({ ...editProductDetails, image: e.target.value })}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleUpdate}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditProductDetails(null)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </section>
    );
};

export default HomePage;

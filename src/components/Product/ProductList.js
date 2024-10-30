import React, { useState } from 'react';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

const ProductList = ({ products, onEdit, onDelete }) => {
    if (products.length === 0) {
        return <p className="text-center">No products available.</p>; // Message si aucun produit n'est disponible
    }

    return (
        <table className="min-w-full border-collapse">
            <thead>
                <tr>
                    <th className="text-center border-b p-4">PRODUCT NAME</th>
                    <th className="text-center border-b p-4">CATEGORY</th>
                    <th className="text-center border-b p-4">DESCRIPTION</th>
                    <th className="text-center border-b p-4">PRICE</th>
                    <th className="text-center border-b p-4">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <ProductRow 
                        key={product.id} 
                        product={product} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                    />
                ))}
            </tbody>
        </table>
    );
};

const ProductRow = ({ product, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <tr>
            <td className="text-center border-b p-4">{product.name}</td>
            <td className="text-center border-b p-4 text-gray-500">{product.category}</td>
            <td className="text-center border-b p-4 text-gray-500">{product.description}</td>
            <td className="text-center border-b p-4 text-gray-500">
                {Intl.NumberFormat('fr-MG', {
                    style: 'currency',
                    currency: 'MGA',
                }).format(product.price)}
            </td>
            <td className="text-center border-b p-4 text-gray-500 relative">
                <button
                    onClick={toggleMenu}
                    className="bg-w text-black py-1 px-2 rounded focus:outline-none"
                >
                    <FaEllipsisV />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                        <button
                            onClick={() => {
                                onEdit(product);
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                        >
                            <FaEdit className="mr-1" /> Edit
                        </button>
                        <button
                            onClick={() => {
                                onDelete(product.id);
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                        >
                            <FaTrash className="mr-1" /> Delete
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default ProductList;

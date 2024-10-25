import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
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
                    <tr key={product.id}>
                        <td className="text-center border-b p-4">{product.name}</td>
                        <td className="text-center border-b p-4 text-gray-500">{product.category}</td>
                        <td className="text-center border-b p-4 text-gray-500">{product.description}</td>
                        <td className="text-center border-b p-4 text-gray-500">{product.price } ariary</td>
                        <td className="text-center border-b p-4 text-gray-500">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => onEdit(product)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(product.id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;

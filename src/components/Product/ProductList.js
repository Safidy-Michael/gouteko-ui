import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div>
            <h2 className="text-xl mb-2">Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="mb-2 flex justify-between">
                        <span>{product.name} - ${product.price}</span>
                        <div>
                            <button onClick={() => onEdit(product)} className="bg-yellow-500 text-B p-1 mr-2">
                                Edit
                            </button>
                            <button onClick={() => onDelete(product.id)} className="bg-red-500 text-B p-1">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;

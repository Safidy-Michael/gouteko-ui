import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div className="py-4">
            <h2 className="text-xl mb-4">Product List</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4 col-sm-6 mb-3">
                        <div className="p-3 border border-secondary rounded h-100">
                            <span>{product.name} - {product.price} ar</span>
                            <div className="mt-2"> 
                                <button
                                    onClick={() => onEdit(product)}
                                    className="btn btn-outline-danger bg-danger text-white px-2 me-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(product.id)}
                                    className="btn btn-outline-danger bg-danger text-white px-2 me-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;

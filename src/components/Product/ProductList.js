import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div className="bg-white">
            <div className="mx-auto h-8 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={product.productImage || 'https://via.placeholder.com/150'}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <button className="group" onClick={() => onEdit(product)}>
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            {product.name}
                                        </button>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color || 'No color specified'}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price} ar</p>
                            </div>
                            <div className="mt-2 flex justify-end">
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;

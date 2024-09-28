import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, product }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setAvailableQuantity(product.availableQuantity);
            setCategory(product.category);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, price, description, availableQuantity, category });
        setName('');
        setPrice('');
        setDescription('');
        setAvailableQuantity('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="number"
                placeholder="AvailableQuantity"
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-B p-2">
                {product ? 'Update Product' : 'Create Product'}
            </button>
        </form>
    );
};

export default ProductForm;

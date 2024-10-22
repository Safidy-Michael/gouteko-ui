import React, { useState, useEffect } from 'react';
import { createProduct } from '../../api/productApi';

const ProductForm = ({ onSubmit, product }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [productImage, setProductImage] = useState(null);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setAvailableQuantity(product.availableQuantity);
            setCategory(product.category);
            setProductImage(product.productImage);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const parsedPrice = parseFloat(price);
        const parsedAvailableQuantity = parseInt(availableQuantity, 10);

        if (isNaN(parsedPrice) || isNaN(parsedAvailableQuantity)) {
            alert("Veuillez entrer des valeurs valides pour le prix et la quantité disponible.");
            return;
        }

        const productData = {
            name,
            description,
            price: parsedPrice.toFixed(2).toString(),
            availableQuantity: parsedAvailableQuantity.toString(),
            category,
            image: productImage,
        };

        try {
            const responseData = await createProduct(productData);
            onSubmit(responseData);
            alert("Produit créé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            alert("Erreur lors de l'envoi des données : " + error.message);
        }
        setName('');
        setDescription('');
        setPrice('');
        setAvailableQuantity('');
        setCategory('');
        setProductImage(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Nom du Produit"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="Prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="border p-2 mr-2"
                step="any" 
            />
            <input
                type="number"
                placeholder="Quantité Disponible"
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Catégorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="file"
                onChange={(e) => setProductImage(e.target.files[0])}
                accept="image/*"
                className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
                {product ? 'Mettre à Jour le Produit' : 'Créer le Produit'}
            </button>
        </form>
    );
};

export default ProductForm;

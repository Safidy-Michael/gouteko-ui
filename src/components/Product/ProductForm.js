import React, { useState, useEffect } from 'react';
import { createProduct } from '../../api/productApi';
import { MDBInput } from 'mdb-react-ui-kit';

const ProductForm = ({ onSubmit, product, onClose }) => {
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
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="border rounded-lg p-8 bg-white w-full max-w-lg shadow-lg relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Créer un Produit</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <MDBInput
                        wrapperClass="mb-4" 
                        type="text"
                        placeholder="Nom du Produit"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border p-2 w-full"
                    /> 
                   <MDBInput
                    wrapperClass="mb-4" 
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                    <MDBInput
                        wrapperClass="mb-4" 
                        type="number"
                        placeholder="Prix"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="border p-2 w-full"
                        step="any" 
                    />
                    <MDBInput
                        wrapperClass="mb-4" 
                        type="number"
                        placeholder="Quantité Disponible"
                        value={availableQuantity}
                        onChange={(e) => setAvailableQuantity(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                    <MDBInput
                        wrapperClass="mb-4" 
                        type="text"
                        placeholder="Catégorie"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                    <input
                        type="file"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        accept="image/*"
                        className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer file:border-0 file:py-2 file:px-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                    />
                    <button 
                        type="submit" 
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200"
                    >
                        {product ? 'Mettre à Jour le Produit' : 'Créer le Produit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;

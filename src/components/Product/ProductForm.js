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
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-4">
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Nom du Produit"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 mr-2 w-full"
                    />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border p-2 mr-2 w-full"
                />
            </div>
            <div className="mb-3">
            <input
                type="number"
                placeholder="Prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="border p-2 mr-2 w-full"
                step="any" 
            />
            </div>
            <div className='mb-3'>
            <input
                type="number"
                placeholder="Quantité Disponible"
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                required
                className="border p-2 mr-2 w-full"
            />
            </div>
            <div className='mb-3'>
                <input
                    type="text"
                    placeholder="Catégorie"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="border p-2 mr-2 w-full"
                />
            </div>
           <input
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
            accept="image/*"
            className=" p-2 w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
            />

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>{product ? 'Mettre à Jour le Produit' : 'Créer le Produit'}
            </button>
        </form>
    );
};

export default ProductForm;

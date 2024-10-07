import React, { useState, useEffect } from 'react';
import { placeOrder } from '../../api/orderApi';
import axios from 'axios'; // Pour récupérer les produits depuis le backend

const OrderForm = () => {
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [products, setProducts] = useState([]); // Stocke les produits disponibles
    const [selectedProducts, setSelectedProducts] = useState([]); // Stocke les produits sélectionnés et leurs quantités
    const [loading, setLoading] = useState(true); // Indique si les produits sont en train de charger
    const [error, setError] = useState(null); // Stocke les erreurs de chargement

    // Récupérer la liste des produits depuis le backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/product/'); // Adapter selon l'URL de ton API
                setProducts(response.data); // On suppose que la réponse contient une liste d'objets { id, name, unit, price }
                setLoading(false); // Les produits sont chargés
            } catch (error) {
                setError('Erreur lors de la récupération des produits');
                setLoading(false); // Arrêter le chargement même en cas d'erreur
            }
        };
        fetchProducts();
    }, []);

    // Gérer l'ajout d'un produit avec le bouton "+"
    const handleAddProduct = (product) => {
        const existingProduct = selectedProducts.find(p => p.productName === product.name);
        if (existingProduct) {
            setSelectedProducts(selectedProducts.map(p =>
                p.productName === product.name ? { ...p, quantity: p.quantity + 1 } : p
            ));
        } else {
            setSelectedProducts([...selectedProducts, { productName: product.name, quantity: 1, unit: product.unit }]);
        }
    };

    // Gérer la diminution d'un produit avec le bouton "-"
    const handleRemoveProduct = (product) => {
        const existingProduct = selectedProducts.find(p => p.productName === product.name);
        if (existingProduct && existingProduct.quantity > 1) {
            setSelectedProducts(selectedProducts.map(p =>
                p.productName === product.name ? { ...p, quantity: p.quantity - 1 } : p
            ));
        } else {
            setSelectedProducts(selectedProducts.filter(p => p.productName !== product.name));
        }
    };

    // Soumettre la commande
    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderRequest = {
            firstName,
            address,
            productOrders: selectedProducts
        };

        try {
            const response = await placeOrder(orderRequest);
            console.log('Commande passée:', response.data); // Affiche la réponse
            // Réinitialiser le formulaire après soumission
            setFirstName('');
            setAddress('');
            setSelectedProducts([]); // Réinitialiser les produits sélectionnés
        } catch (error) {
            console.error('Erreur lors de la commande', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Passer commande</h2>
            <div>
                <input 
                    type="text" 
                    placeholder="Prénom" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Adresse" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                />
            </div>

            <h3>Produits disponibles</h3>

            {loading && <p>Chargement des produits...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <ul>
                    {products.map((product) => (
                        <li key={product.id} className="mb-4 p-2 border border-gray-300 rounded">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p>{product.name} ({product.unit})</p>
                                    <p>Prix : ${product.price.toFixed(2)}</p>
                                </div>
                                <div>
                                    <button 
                                        type="button" 
                                        onClick={() => handleAddProduct(product)} 
                                        className="mr-2 bg-blue-500 text-B px-2 py-1 rounded"
                                    >
                                        +
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveProduct(product)} 
                                        className="bg-red-500 text-B px-2 py-1 rounded"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Produits sélectionnés</h3>
            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index}>
                        {product.productName} - {product.quantity} {product.unit}
                    </li>
                ))}
            </ul>

            <button type="submit" className="bg-green-500 text-B px-4 py-2 mt-4 rounded">
                Passer commande
            </button>
        </form>
    );
};

export default OrderForm;

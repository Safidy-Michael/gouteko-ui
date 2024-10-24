import React, { useState, useEffect } from 'react';
import { placeOrder } from '../../api/orderApi';
import axios from 'axios';

const OrderForm = () => {
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedFirstName = localStorage.getItem('firstName');
        const storedAddress = localStorage.getItem('address');
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedAddress) setAddress(storedAddress);

        const fetchProducts = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8080/product/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.data); // Vérifiez la structure des données ici
                setProducts(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des produits');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderRequest = {
            firstName,
            address,
            productOrders: selectedProducts
        };

        try {
            const response = await placeOrder(orderRequest);
            console.log('Commande passée:', response.data); 
            
            setFirstName('');
            setAddress('');
            setSelectedProducts([]);

            alert('Commande passée avec succès !'); 
        
        } catch (error) {
            console.error('Erreur lors de la commande', error);
            setError('Erreur lors de la création de la commande.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Passer commande</h2>

            <div className="mb-3 w-25">
                <label htmlFor="firstName" className="form-label">Prénom</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="firstName" 
                    placeholder="Prénom" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                />
            </div>

            <div className="mb-3 w-25">
                <label htmlFor="address" className="form-label">Adresse</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="address" 
                    placeholder="Adresse" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                />
            </div>

            <h3>Produits disponibles</h3>

            {loading && <p>Chargement des produits...</p>}
            {error && <p className="text-danger">{error}</p>}
            
            {!loading && !error && (
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-3 mb-4">
                            <div className="border border-2 rounded p-2 h-100">
                                <div className="d-flex align-items-start">
                        
                                    <img 
                                      src={product.productImage || 'https://via.placeholder.com/150'}
                                       alt={product.name}
                                        className="w-50 h-auto object-cover object-center rounded mb-2"
                                    />
                                    <div className="ms-3">
                                        <p><strong>{product.name} ({product.unit})</strong></p>
                                        <p>Prix : {product.price.toFixed(2)} ariary</p>
                                    </div>
                                </div>
                            
                                <div className="d-flex mt-3">
                                    <button 
                                        type="button" 
                                        onClick={() => handleAddProduct(product)} 
                                        className="btn btn-outline-danger me-2 bg-danger text-white px-2 py-1 rounded"
                                    >
                                        +
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveProduct(product)} 
                                        className="btn btn-outline-danger bg-danger text-white px-2 py-1 rounded"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h3>Produits sélectionnés</h3>
            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index}>
                        {product.productName} - {product.quantity}
                    </li>
                ))}
            </ul>

            <button type="submit" className="btn btn-primary bg-green-500 text-white px-4 py-2 mt-4 rounded">
                Passer commande
            </button>
        </form>
    );
    
};

export default OrderForm;

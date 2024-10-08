import React, { useState, useEffect } from 'react';
import { placeOrder } from '../../api/orderApi';
import axios from 'axios'; // Pour récupérer les produits depuis le backend

const OrderForm = () => {
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/product/'); 
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Erreur lors de la récupération des produits');
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
        } catch (error) {
            console.error('Erreur lors de la commande', error);
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
            {error && <p>{error}</p>}

            {!loading && !error && (
                <ul className="row list-unstyled">
                    {products.map((product) => (
                        <li key={product.id} className="col-md-4 me-4 mb-2 p-2  w-25 border border-10 rounded">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p>{product.name} ({product.unit})</p>
                                    <p>Prix : {product.price.toFixed(2)} ariary</p>
                                </div>
                                <div>
                                    <button 
                                        type="button" 
                                        onClick={() => handleAddProduct(product)} 
                                        className=" btn btn-outline-danger mr-2 bg-danger bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        +
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveProduct(product)} 
                                        className=" btn btn-outline-danger bg-danger m-2 p-2 text-white px-2 py-1 rounded"
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

            <button type="submit" className=" btn btn-primary bg-green-500 text-B px-4 py-2 mt-4 rounded">
                Passer commande
            </button>
        </form>
    );
};

export default OrderForm;

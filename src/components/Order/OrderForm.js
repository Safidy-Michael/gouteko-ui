import React, { useState, useEffect } from 'react';
import { placeOrder } from '../../api/orderApi'; // Assurez-vous que ce chemin est correct
import axios from 'axios';


const OrderForm = ({ onClose }) => { // Ajoutez onClose comme prop
   const [firstName, setFirstName] = useState('');
   const [address, setAddress] = useState('');
   const [products, setProducts] = useState([]);
   const [selectedProducts, setSelectedProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isOpen, setIsOpen] = useState(true); // État pour gérer la visibilité


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
               console.log(response.data);
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
           setIsOpen(false); // Ferme le formulaire après soumission


           alert('Commande passée avec succès !');


       } catch (error) {
           console.error('Erreur lors de la commande', error);
           setError('Erreur lors de la création de la commande.');
       }
   };


   const handleClose = () => {
       setIsOpen(false);
       onClose(); // Appel de la fonction onClose passée en prop
   };


   if (!isOpen) return null;


   return (
       <div className="order-form">
           <button
               onClick={handleClose}
               className="absolute  right-8 text-gray-500 hover:text-gray-700 text-2xl font-bold"
           >
               &times;
           </button>
           <form onSubmit={handleSubmit}>
               <h2>Veuillez remplir le formulaire pour passer une commande</h2>


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


               <h3 className='psu-2'>Produits sélectionnés</h3>
               <ul>
                   {selectedProducts.map((product, index) => (
                       <li key={index}>
                           {product.productName} - {product.quantity}
                       </li>
                   ))}
               </ul>


               <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                   Passer commande
               </button>
           </form>
       </div>
   );
};


export default OrderForm;
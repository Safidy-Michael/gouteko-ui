import React, { useState, useEffect } from 'react';
import { placeOrder } from '../../api/orderApi';
import { getProducts } from '../../api/productApi';
import Pagination from '../Pagination';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

const OrderForm = ({ onClose }) => {
   const [email, setEmail] = useState('');
   const [address, setAddress] = useState('');
   const [products, setProducts] = useState([]);
   const [selectedProducts, setSelectedProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isOpen, setIsOpen] = useState(true);
   const [currentPage, setCurrentPage] = useState(0);
   const [totalItems, setTotalItems] = useState(0);
   const [pageSize] = useState(10);

   useEffect(() => {
       const storedEmail = localStorage.getItem('email');
       const storedAddress = localStorage.getItem('address');
       if (storedEmail) setEmail(storedEmail);
       if (storedAddress) setAddress(storedAddress);

       const fetchProducts = async () => {
           setLoading(true);
           try {
               const response = await getProducts(currentPage, pageSize);
               setProducts(response.content || []);
               setTotalItems(response.totalElements);
           } catch (error) {
               setError('Erreur lors de la récupération des produits');
           } finally {
               setLoading(false);
           }
       };

       fetchProducts();
   }, [currentPage, pageSize]);

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
       if (existingProduct) {
           if (existingProduct.quantity > 1) {
               setSelectedProducts(selectedProducts.map(p =>
                   p.productName === product.name ? { ...p, quantity: p.quantity - 1 } : p
               ));
           } else {
               setSelectedProducts(selectedProducts.filter(p => p.productName !== product.name));
           }
       }
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       const orderRequest = {
           email,
           address,
           productOrders: selectedProducts
       };

       try {
           const response = await placeOrder(orderRequest);
           console.log('Commande passée:', response.data);
           setEmail('');
           setAddress('');
           setSelectedProducts([]);
           setIsOpen(false);
           alert('Commande passée avec succès !');
       } catch (error) {
           console.error('Erreur lors de la commande', error);
           setError('Erreur lors de la création de la commande.');
       }
   };

   const handleClose = () => {
       setIsOpen(false);
       onClose();
   };

   const handlePageChange = (page) => {
       setCurrentPage(page);
   };

   if (!isOpen) return null;

   return (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
               <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                       <ShoppingCart className="w-6 h-6" />
                       Nouvelle commande
                   </h2>
                   <button
                       onClick={handleClose}
                       className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                   >
                       <X className="w-6 h-6" />
                   </button>
               </div>

               <form onSubmit={handleSubmit} className="p-6 space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                               Email
                           </label>
                           <input
                               type="email"
                               id="email"
                               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                               placeholder="Votre email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required
                           />
                       </div>
                       <div className="space-y-2">
                           <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                               Adresse
                           </label>
                           <input
                               type="text"
                               id="address"
                               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                               placeholder="Votre adresse"
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               required
                           />
                       </div>
                   </div>

                   <div className="space-y-4">
                       <h3 className="text-xl font-semibold text-gray-800">Produits disponibles</h3>
                       {loading && (
                           <div className="flex justify-center py-8">
                               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                           </div>
                       )}
                       {error && (
                           <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                               {error}
                           </div>
                       )}
                       {!loading && !error && (
                           <div className="grid md:grid-cols-2 gap-4">
                               {products.map((product) => (
                                   <div
                                       key={product.id}
                                       className="border rounded-lg p-4 flex justify-between items-center"
                                   >
                                       <div className="flex items-center space-x-4">
                                           <img
                                               src={product.productImage}
                                               alt={product.name}
                                               className="w-16 h-16 object-cover rounded-lg"
                                           />
                                           <div>
                                               <p className="font-semibold">{product.name}</p>
                                               <p className="text-sm text-gray-600">{product.unit}</p>
                                               <p className="text-blue-600 font-medium">
                                                   {product.price.toFixed(2)} Ar
                                               </p>
                                           </div>
                                       </div>
                                       <div className="flex items-center space-x-2">
                                           <button
                                               type="button"
                                               onClick={() => handleRemoveProduct(product)}
                                               className="p-1 hover:bg-gray-100 rounded-full"
                                           >
                                               <Minus className="w-5 h-5" />
                                           </button>
                                           <button
                                               type="button"
                                               onClick={() => handleAddProduct(product)}
                                               className="p-1 hover:bg-gray-100 rounded-full"
                                           >
                                               <Plus className="w-5 h-5" />
                                           </button>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       )}
                   </div>

                   <Pagination
                       currentPage={currentPage}
                       totalItems={totalItems}
                       pageSize={pageSize}
                       onPageChange={handlePageChange}
                   />

                   <div className="space-y-4">
                       <h3 className="text-xl font-semibold text-gray-800">Produits sélectionnés</h3>
                       {selectedProducts.length === 0 ? (
                           <p className="text-gray-500 italic">Aucun produit sélectionné</p>
                       ) : (
                           <ul className="space-y-2">
                               {selectedProducts.map((product, index) => (
                                   <li
                                       key={index}
                                       className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                                   >
                                       <span>{product.productName}</span>
                                       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                           Qté: {product.quantity}
                                       </span>
                                   </li>
                               ))}
                           </ul>
                       )}
                   </div>

                   <div className="pt-6 border-t">
                       <button
                           type="submit"
                           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                           disabled={selectedProducts.length === 0}
                       >
                           Passer la commande
                       </button>
                   </div>
               </form>
           </div>
       </div>
   );
};

export default OrderForm;
import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/productApi';
import ProductForm from './ProductForm';  
import ProductList from './ProductList';  
import { MDBInput } from 'mdb-react-ui-kit';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const productsData = await getProducts();
            setProducts(productsData);
            setFilteredProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCreateOrUpdateProduct = async (product) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, product);
                setEditingProduct(null);
            } else {
                await createProduct(product);
            }
            setShowForm(false); 
            await fetchProducts(); 
        } catch (error) {
            console.error('Error creating/updating product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete the product. Please try again.'); 
        }
    };

    const handleAddNewProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        setFilteredProducts(
            products.filter(product => 
                product.name.toLowerCase().includes(searchValue) ||
                product.category.toLowerCase().includes(searchValue) ||
                product.description.toLowerCase().includes(searchValue)
            )
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4 text-center">Product Management</h1>
            
            <div className="flex justify-between items-center mb-4">
                <MDBInput
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2"
                />
                <button 
                    onClick={handleAddNewProduct}
                    className="w-25 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200"
                >
                   + Add Product
                </button>
            </div>

            {showForm ? (
                <ProductForm 
                    onSubmit={handleCreateOrUpdateProduct} 
                    product={editingProduct} 
                    onClose={() => setShowForm(false)} 
                />
            ) : (
                <ProductList 
                    products={filteredProducts}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                />
            )}
        </div>
    );
};

export default ProductManagement;

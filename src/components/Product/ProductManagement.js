import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/productApi';
import ProductForm from './ProductForm';  
import ProductList from './ProductList';  

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
  
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const productsData = await getProducts();
            setProducts(productsData);
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
            await fetchProducts(); 
        } catch (error) {
            console.error('Error creating/updating product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product); 
    };

    const handleDeleteProduct = async (id) => {
        try {
            console.log("Deleting product with ID:", id);
            await deleteProduct(id);
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete the product. Please try again.'); 
        }
    };
    
    return (
        <div>
            <h1 className="text-2xl mb-4">Product Management</h1>
            <ProductForm onSubmit={handleCreateOrUpdateProduct} product={editingProduct} />
            <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </div>
    );
};

export default ProductManagement;

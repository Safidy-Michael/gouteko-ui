import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/productApi';
import ProductForm from './ProductForm';  
import ProductList from './ProductList';  

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const productsData = await getProducts();
        setProducts(productsData);
    };

    const handleCreateProduct = async (product) => {
        await createProduct(product);
        fetchProducts();
    };

    const handleUpdateProduct = async (product) => {
        await updateProduct(currentProduct.id, product);
        fetchProducts();
        setCurrentProduct(null);
    };

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    return (
        <div>
            <h1 className="text-2xl mb-4">Product Management</h1>
            <ProductForm onSubmit={currentProduct ? handleUpdateProduct : handleCreateProduct} product={currentProduct} setProduct={setCurrentProduct} />
            <ProductList products={products} onEdit={setCurrentProduct} onDelete={handleDeleteProduct} />
        </div>
    );
};

export default ProductManagement;

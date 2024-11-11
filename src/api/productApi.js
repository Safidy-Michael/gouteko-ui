import axios from 'axios';

const API_URL = 'http://localhost:8080/product';

const getToken = () => {
    return localStorage.getItem('token');
}

export const getProducts = async () => {
    const token = getToken(); 
    const response = await axios.get(`${API_URL}/`, {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
};

    export const createProduct = async (product) => {
    try {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('availableQuantity', product.availableQuantity);
        formData.append('category', product.category);
        if (product.image) {
            formData.append('productImage', product.image); 
        }

        const token = getToken();
        const response = await axios.post(`${API_URL}/create`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du produit :', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const updateProduct = async (id, product) => {
    try {
        const formData = new FormData(); 
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('availableQuantity', product.availableQuantity);
        formData.append('category', product.category);
        if (product.image) {
            formData.append('product_image', product.image); 
        }

        const token = getToken(); 
        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' 
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit :', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const token = getToken();
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error.response ? error.response.data : error.message);
        throw error;
    }
};

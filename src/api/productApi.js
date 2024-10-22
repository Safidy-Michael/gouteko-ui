import axios from 'axios';

const API_URL = 'http://localhost:8080/product';

const token = localStorage.getItem('token');

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/`,{
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
};


export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/create`, product, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }})
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du produit :', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit :', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

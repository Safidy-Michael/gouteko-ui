import axios from 'axios';

const API_URL = 'http://localhost:8080/product';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        throw error;
    }
};

export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/create`, product);
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

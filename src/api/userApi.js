import axios from 'axios';

const API_URL = 'http://localhost:8080/user'; 

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};

export const createUser = async (formData) => {
    const response = await axios.post(`${API_URL}/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(`${API_URL}/${id}`, user, {
        headers: {
            'Content-Type': 'multipart/form-data' // Spécifier le type de contenu
        }
    });
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        throw error;
    }
};

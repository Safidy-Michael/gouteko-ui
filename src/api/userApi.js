import axios from 'axios';

const API_URL = 'http://localhost:8080/user'; 

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};

export const createUser = async (user) => {
    const response = await axios.post(`${API_URL}/create`, user);
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(`${API_URL}/${id}`, user);
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

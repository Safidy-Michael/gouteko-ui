import axios from 'axios';

const API_URL = 'http://localhost:8080/user'; 
const token = localStorage.getItem('token');

export const getUsers = async (
    page = 0, 
    size = 10,
    sortField = 'id',
    direction = 'ASC') => {
    if (!token) {
        console.error('Token not found');
        return { content: [], totalPages: 0, totalElements: 0, size, page, empty: true };
    }

    try {
        const response = await axios.get(`${API_URL}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
           params: { page, size, sortField, direction },
        });
        
        return response.data || {
            content: [],
            totalPages: 0,
            totalElements: 0,
            size,
            page,
            empty: true,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (formData) => {
    const response = await axios.post(`${API_URL}/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
};
export const updateUser = async (id, user) => {

    const response = await axios.put(`${API_URL}/${id}`, user, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}` ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        throw error;
    }
};

import axios from 'axios';

const API_URL = 'http://localhost:8080/order';
const getToken = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Token non trouvé dans localStorage');
    }

    return token;
};

export const placeOrder = async (orderRequest) => {
    try {
        const response = await axios.post(`${API_URL}/place`, orderRequest, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de la commande :', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const getOrders = async (page = 0, size = 10) => {
    const token = getToken();

    if (!token) {
        console.error('Token not found');
        return;
    }

    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                page,  
                size,  
            }
        });
        
        return response.data.content || []; 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const updateOrder = async (id, orderRequest) => {
    const token = getToken();
    
    const response = await axios.put(`${API_URL}/${id}`, orderRequest, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data; 
};

export const deleteOrder = async (id) => {
    const token = getToken();
    
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getOrderById = async (id) => {
    const token = getToken();
    
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la commande par ID:', error);
        throw error; 
    }
};

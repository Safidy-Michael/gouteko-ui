    import axios from 'axios';

    const API_URL = 'http://localhost:8080/orders';
    export const placeOrder = async (orderRequest) => {
        const response = await axios.post(`${API_URL}/place`, orderRequest); 
        return response.data; 
    };


    export const createOrder = async (orderRequest) => {
        const response = await axios.post(`${API_URL}/place`, orderRequest); 
        return response.data; 
    };

    export const getOrders = async () => {
        const response = await axios.get(API_URL);
        return response.data; 
    };

    export const updateOrder = async (id, orderRequest) => {
        const response = await axios.put(`${API_URL}/${id}`, orderRequest);
        return response.data; 
    };

    export const deleteOrder = async (id) => {
        await axios.delete(`${API_URL}/${id}`); 
    };

    export const getOrderById = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order by ID:', error);
            throw error; 
        }
    };


import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const getProductById = async (code) => {
    const response = await axios.get(`${API_URL}/products/${code}`);
    return response.data;
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products/create`, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Success:", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log("Error:", error.response.data);
            return error.response.data;
        } else if (error.request) {            
            console.log("Error:", error.request);
            return { error: 'No response from server' };
        } else {
            console.log("Error:", error.message);
            return { error: error.message };
        }
    }
};

export const updateProduct = async (code, product) => {
    const response = await axios.put(`${API_URL}/products/${code}/update`, product, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const deleteProduct = async (code) => {
    const response = await axios.delete(`${API_URL}/products/${code}/delete`);
    return response.data;
};

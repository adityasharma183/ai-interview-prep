import axios from "axios";

export const registerUser = async ({username, email, password}) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
            username,
            email,
            password
        },{
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error.response ? error.response.data : { message: 'Network error' };
    }   
    
};

export const loginUser = async ({email, password}) => { 
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email,
            password
        },{
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error.response ? error.response.data : { message: 'Network error' };
    }   
}

export const logoutUser = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/auth/logout', {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error.response ? error.response.data : { message: 'Network error' };
    }   
}

export const getMe = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/auth/get-me', {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user information:', error);
        throw error.response ? error.response.data : { message: 'Network error' };
    }   
}    
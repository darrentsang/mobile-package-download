import axios from 'axios';

const LoginUrl = process.env.REACT_APP_API_ENDPOINT + "/login"

export const login = async (username, password) => {
    try {
        const response = await axios.post(LoginUrl, {
            username: username,
            password: password
        })
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}


import axios from 'axios';

export const getInstanceAxios = (headers) => {
    return axios.create({
        headers: {
            ...headers
        }
    });
};
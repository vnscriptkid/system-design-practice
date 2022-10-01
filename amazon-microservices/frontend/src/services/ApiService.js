import axios from 'axios';
import config from '@/app.config';

export default class Api {
    async get(uri, params = {}) {
        return (await axios.get(`${config.baseUrl}/${uri}`, { params })).data.data;
    }

    async post(uri, data) {
        try {
            return (await axios.post(`${config.baseUrl}/${uri}`, data)).data.data;
        } catch (err) {
            this.displayError(err);
            return false;
        }
    }

    displayError(err) {
        let message = err;
        if (err.response) {
            message = JSON.stringify(err.response.data);
        }

        window.alert(message);
    }
}
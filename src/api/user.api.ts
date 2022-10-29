import AxiosClient from './axiosClient/AxiosClient';

export interface DtoUser {
    email: string;
    password: string;
}

const userApi = {
    login: (email: string, password: string) => {
        const url = '/auth/login';
        return AxiosClient.post(url, { email, password });
    },
    get: () => {
        const url = '/category';
        return AxiosClient.get(url);
    },
};
export default userApi;

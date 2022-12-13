import axiosClient from '@api/axiosClient';

export interface userApiAuth {
    email: string;
    password: string;
}
export interface userUpdateProfile {
    email: string;
    username: string;
    shortInfo: string;
    gender: string;
}

const userApi = {
    login: (email: string, password: string) => {
        const url = `/auth/login`;
        return axiosClient.post(url, {
            email,
            password,
        });
    },

    logout: () => {
        const url = `/auth/log-out`;
        return axiosClient.post(url);
    },

    getMe: (lazyToken?: string) => {
        const url = `/auth/me`;
        if (lazyToken !== undefined) {
            let config = {
                headers: { Authorization: 'Bearer ' + lazyToken },
            };

            return axiosClient.get(url, config);
        } else return axiosClient.get(url);
    },

    getAllUser: (q: string, pageNumber?: number, size?: number) => {
        const url = `/users/all?name=${q}`;
        return axiosClient.post(url, {
            size: size || 9,
            pageNumber: pageNumber || 1,
            order: [],
        });
    },
};
export default userApi;

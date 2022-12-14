import axiosClient from '@api/axiosClient';

const categoryApi = {
    getCategoryByName: (name: string) => {
        const url = `/category/find?name=${name}`;
        return axiosClient.post(url);
    },
    getAllCategory: (pageNumber?: number, nameTag?: string) => {
        let url = ``;
        if (nameTag !== undefined && nameTag !== null && nameTag !== '')
            url = `/category?name=${nameTag}`;
        else url = `/category`;
        return axiosClient.post(url, {
            size: 9,
            pageNumber: pageNumber || 1,
        });
    },
    getAllCategoryHidden: (pageNumber?: number, nameTag?: string) => {
        const url = `/category/delete?name=${nameTag}`;
        return axiosClient.post(url, {
            size: 9,
            pageNumber: pageNumber || 1,
        });
    },
    getAllCategory10000: () => {
        const url = `/category`;
        return axiosClient.post(url, {
            size: 100000,
            pageNumber: 1,
        });
    },
    getTop5CategoryMostUsed: () => {
        const url = `/category/top`;
        return axiosClient.get(url);
    },
    createCategory: (categoryName: string) => {
        const url = `/category/create`;

        // formData.append('tags', postData.tags.toString());

        return axiosClient.post(url, { categoryName });
    },
    editCategory: (id: string, categoryName: string) => {
        const url = `/category/edit/${id}`;

        // formData.append('tags', postData.tags.toString());

        return axiosClient.put(url, { categoryName });
    },
    hiddenCategory: (id: string) => {
        const url = `/category/hide/${id}`;

        // formData.append('tags', postData.tags.toString());

        return axiosClient.post(url);
    },
    showCategory: (id: string) => {
        const url = `/category/show/${id}`;

        // formData.append('tags', postData.tags.toString());

        return axiosClient.post(url);
    },
    deleteCategory: (id: string) => {
        const url = `/post/post-tag/delete/${id}`;

        return axiosClient.delete(url);
    },
};
export default categoryApi;

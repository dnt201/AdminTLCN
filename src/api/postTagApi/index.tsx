import axiosClient from '@api/axiosClient';
import { isFulfilled } from '@reduxjs/toolkit';

export interface postTagCreate {
    file?: File;
    postTagName: string;
    displayName: string;
    colorCode: string;
}
const postTagApi = {
    getAllPostTag: (pageNumber?: number, nameTag?: string) => {
        let url = ``;
        if (nameTag !== undefined && nameTag !== null && nameTag !== '')
            url = `/post/post-tag?name=${nameTag}`;
        else url = `/post/post-tag`;
        return axiosClient.post(url, {
            size: 9,
            pageNumber: pageNumber || 1,
        });
    },
    getAllPostTag10000: () => {
        const url = `/post/post-tag`;
        return axiosClient.post(url, {
            size: 100000,
            pageNumber: 1,
        });
    },
    getTop5PostTagMostUsed: () => {
        const url = `/post/post-tag/top`;
        return axiosClient.get(url);
    },
    createPostTag: (postData: postTagCreate) => {
        const url = `/post/post-tag/create`;

        const formData = new FormData();
        if (postData.file !== undefined && postData.file !== null)
            formData.append('file', postData.file);
        formData.append('colorCode', postData.colorCode);
        formData.append('displayName', postData.displayName);
        formData.append('postTagName', postData.postTagName);
        // formData.append('tags', postData.tags.toString());

        return axiosClient.post(url, formData);
    },
    editPostTag: (id: string, postData: postTagCreate) => {
        const url = `/post/post-tag/edit/${id}`;

        const formData = new FormData();
        if (postData.file !== undefined && postData.file !== null)
            formData.append('file', postData.file);
        formData.append('colorCode', postData.colorCode);
        formData.append('displayName', postData.displayName);
        formData.append('postTagName', postData.postTagName);
        // formData.append('tags', postData.tags.toString());

        return axiosClient.put(url, formData);
    },
    deleteTag: (id: string) => {
        const url = `/post/post-tag/delete/${id}`;

        return axiosClient.delete(url);
    },
};
export default postTagApi;

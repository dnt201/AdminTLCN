import React, { HTMLProps, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Trash, Write } from '@icons/index';
import postApi from '@api/postApi';
import { toast } from 'react-toastify';
import { lazy } from 'yup';
interface iProps extends React.HTMLProps<HTMLDivElement> {
    idPost: string;
    img?: string;
    lazy?: boolean;
}
const ActionModal: React.FC<iProps> = (props) => {
    const { idPost, className, lazy } = props;
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    return (
        <div
            className={
                '  rounded-md py-2 w-fit flex flex-col gap-2  bg-[#f1f1f1] absolute top-0   z-1000000 text-bg' +
                className +
                (lazy ? ' -translate-x-1/2   ' : ' translate-x-full -right-4  ')
            }
        >
            <Link to={`/edit-post/${idPost}`}>
                <div className='flex items-center gap-1 p-1 px-3 hover:bg-primaryHover hover:text-primary '>
                    <Write className='w-4 h-4  ' />

                    <span className='text-ss flex-1   ml-1 whitespace-nowrap'>
                        Chỉnh sửa bài viết
                    </span>
                </div>
            </Link>
            <button
                className='p-1  flex items-center gap-1  px-3 w-full hover:bg-primaryHover hover:text-primary '
                onClick={async () => {
                    const toastId = toast.loading('Loading...');

                    const result = await postApi.deletePost(idPost);
                    if (result.status === 200 || result.status === 202) {
                        toast.success('Xóa bài viết thành công', {
                            toastId: toastId,
                            autoClose: 2500,
                        });
                        navigate('/');
                    } else {
                        toast.error(`Có gì đó không đúng ${result.status}`, {
                            toastId: toastId,
                            autoClose: 5000,
                        });
                    }
                }}
            >
                <Trash className='w-4 h-4 ' />
                <span className='flex-1 text-ss text-left ml-1'>Xóa bài viết</span>
            </button>
            {/* <Link
        className="p-1  flex min-w-fit "
        to={`/edit-post/${idPost}`}
        data-tip="Chỉnh sửa bài viết"
        data-for="editPost"
      >
        <Write className="w-4 h-4  " />
        <span className="text-ss min-w-fit  ml-1 block overflow-clip">
          Chỉnh sửa bài viết
        </span>
      </Link>
      <button className="p-1  flex items-center ">
        <Trash className="w-4 h-4 " />
        <span className="flex-1 text-ss text-left ml-1">Xóa bài viết</span>
      </button> */}
        </div>
    );
};

export default ActionModal;

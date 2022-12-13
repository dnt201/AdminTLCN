import React, { HTMLProps, useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import defaultPost from '@images/default-placeholder.png';
import toast from 'react-hot-toast';
import { Check, Trash, Write } from '@icons/index';
import postApi from '@api/postApi';
import PublishConfirm from '@components/PublishConfirm';
interface iProps extends React.HTMLProps<HTMLDivElement> {
    idPost: string;
    approve?: boolean;
    curImg?: string;
    setPage: (number: number) => void;

    lazy?: boolean;
}
const ActionModal: React.FC<iProps> = (props) => {
    const { idPost, className, approve, curImg, lazy, setPage } = props;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    //
    const [isConfirm, setIsConfirm] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    //
    const [isConfirmApprove, setIsConfirmApprove] = useState(false);
    const [isShowConfirmApprove, setIsShowConfirmApprove] = useState(false);
    const [loadingConfirmApprove, setLoadingConfirmApprove] = useState(false);
    useEffect(() => {
        if (isConfirm === true) {
            const deletePost = async () => {
                const toastId = toast.loading('Loading...');

                const result = await postApi.deletePost(idPost);

                setTimeout(() => {
                    if (result.status === 200 || result.status === 201 || result.status === 202) {
                        toast.success('Xóa bài viết thành công!', {
                            id: toastId,
                            duration: 2000,
                        });

                        setPage(-1);
                    } else {
                        toast.error(`Some thing went wrong ${result.status}`, {
                            id: toastId,
                            duration: 2000,
                        });
                    }
                }, 1000);
            };
            deletePost();
        }
    }, [isConfirm]);
    useEffect(() => {
        if (isConfirmApprove === true) {
            const approvePost = async () => {
                const toastId = toast.loading('Loading...');

                const result = await postApi.approvePost(idPost);
                setTimeout(() => {
                    if (result.status === 200 || result.status === 201 || result.status === 202) {
                        toast.success('Duyệt bài viết thành công', {
                            id: toastId,
                            duration: 2000,
                        });

                        // if (redirect) navigate(`${redirect}`);
                        // else navigate('/');
                    } else {
                        toast.error(`Some thing went wrong ${result.status}`, {
                            id: toastId,
                            duration: 2000,
                        });
                    }
                }, 1000);

                setPage(-1);
            };

            approvePost();
        }
    }, [isConfirmApprove]);

    return (
        <>
            {isShowConfirm ? (
                <PublishConfirm
                    isConfirm={isConfirm}
                    isShow={isShowConfirm}
                    loading={loadingConfirm}
                    setConfirmed={setIsConfirm}
                    setShow={setIsShowConfirm}
                    header='Xóa bài viết?'
                    message='Bạn thực sự muốn xóa bài viết này?'
                    img={curImg ? curImg : defaultPost}
                />
            ) : null}
            {isShowConfirmApprove ? (
                <PublishConfirm
                    isConfirm={isConfirmApprove}
                    isShow={isShowConfirmApprove}
                    loading={loadingConfirmApprove}
                    setConfirmed={setIsConfirmApprove}
                    setShow={setIsShowConfirmApprove}
                    header='Duyệt bài viết?'
                    message='Bạn thực sự muốn duyệt bài viết này?'
                    img={curImg ? curImg : defaultPost}
                />
            ) : null}
            <div
                className={
                    '  rounded-md py-2 w-fit flex flex-col gap-2  bg-[#f1f1f1] absolute top-0  z-[10100] text-bg' +
                    className +
                    '  ' +
                    (lazy ? ' -translate-x-8 ' : ' -right-4 translate-x-full  ')
                }
                onClick={(e) => e.stopPropagation()}
            >
                {approve ? (
                    <button
                        className='p-1  flex items-center gap-1  px-3 w-full hover:bg-primaryHover hover:text-primary '
                        onClick={(e) => {
                            setIsShowConfirmApprove(true);
                            e.stopPropagation();
                        }}
                    >
                        <Check className='w-4 h-4 ' />
                        <span className='flex-1 text-ss text-left ml-1 whitespace-nowrap'>
                            Duyệt bài viết
                        </span>
                    </button>
                ) : null}
                <button
                    className='p-1  flex items-center gap-1  px-3 w-full hover:bg-primaryHover hover:text-primary '
                    onClick={async () => {
                        setIsShowConfirm(true);
                    }}
                >
                    <Trash className='w-4 h-4 ' />
                    <span className='flex-1 text-ss text-left ml-1  whitespace-nowrap'>
                        Xóa bài viết
                    </span>
                </button>
            </div>
        </>
    );
};

export default ActionModal;

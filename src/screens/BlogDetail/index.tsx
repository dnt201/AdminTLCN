import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import defaultPost from '@images/default-placeholder.png';

import MenuRight from './MenuRight';
import MidContent from './MidContent';
import postApi from '@api/postApi';
import { iPostDetail } from '@DTO/Blog';
import SkeletonBlogDetail from './SkeletonBlogDetail';
import BlogNotFound from './NotFound';
// import { getPostDetailById } from "@redux/blogSlice";
import ReactTooltip from 'react-tooltip';
import More from '@icons/More';
import ActionModal from '@components/postTag/ActionModal';
import { Check, Trash } from '@icons/index';
import PublishConfirm from '@components/PublishConfirm';
import { toast } from 'react-hot-toast';

const BlogDetail = () => {
    let params = useParams();
    const [stick, setStick] = useState(false);
    const { postId } = params;
    const divRef = useRef<HTMLDivElement>(null);
    const [idCurActive, setIdCurActive] = useState('');
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    const [post, setPost] = useState<iPostDetail | null>(null);
    const [loading, setLoading] = useState(false);
    // console.log("Blog detail rerender");
    // console.log(idCurActive);
    // const { post, error, loading } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        // checkOwner();
    }, [accessToken, postId]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        const vH = (window.innerHeight * 25) / 100 - 8;
        const currentYOffset = window.pageYOffset;
        if (currentYOffset >= vH) setStick(true);
        else setStick(false);
    }
    const [page, setPage] = useState(1);
    const getPostDetailById = async (pId: string) => {
        const rs = await postApi.getPostDetailByIdAdmin(pId);
        if (rs.status === 200) {
            setPost(rs.data);
        }
        setLoading(false);
        console.log(rs);
    };

    useEffect(() => {
        if (page === -1) setPage(1);
        else if (page === -2) navigate('/posts');
        else if (postId) {
            setLoading(true);
            // dispatch(getPostDetailById(blogId));
            getPostDetailById(postId);
        }
    }, [params, page]);

    const [showActionModal, setShowActionModal] = useState(false);
    const refDivActionModal = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutActionModal = (event: any) => {
            // const buttonShowUser = document.getElementById("showUser");
            // console.log(buttonShowUser);

            if (refDivActionModal.current && !refDivActionModal.current.contains(event.target)) {
                setShowActionModal(false);
            } else {
            }
        };
        document.addEventListener('click', handleClickOutActionModal, true);
        return () => {
            document.removeEventListener('click', handleClickOutActionModal, true);
        };
    }, [refDivActionModal]);
    //
    const [isConfirm, setIsConfirm] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    //
    const [isConfirmApprove, setIsConfirmApprove] = useState(false);
    const [isShowConfirmApprove, setIsShowConfirmApprove] = useState(false);
    const [loadingConfirmApprove, setLoadingConfirmApprove] = useState(false);

    useEffect(() => {
        if (isConfirm === true && post) {
            const deletePost = async () => {
                const toastId = toast.loading('Loading...');

                const result = await postApi.deletePost(post.id);

                setTimeout(() => {
                    if (result.status === 200 || result.status === 201 || result.status === 202) {
                        toast.success('Xóa bài viết thành công!', {
                            id: toastId,
                            duration: 2000,
                        });

                        setPage(-2);
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
        if (isConfirmApprove === true && post) {
            const approvePost = async () => {
                const toastId = toast.loading('Loading...');

                const result = await postApi.approvePost(post.id);
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
    if (loading) return <SkeletonBlogDetail />;
    else if (!post?.id) return <BlogNotFound />;
    return (
        <div
            ref={divRef}
            className='bg-white min-h-[calc[100vh-52px]] flex-1 flex flex-col text-bg'
        >
            {post ? (
                <>
                    <div className='h-[52px] fixed bg-[#f1f1f1]  w-4/5 justify-end flex '>
                        <div
                            className={
                                '  rounded-md  w-fit flex gap-2  h-full bg-[#f1f1f1]  top-0  z-[10100] text-bg'
                            }
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className='   flex items-center gap-1  px-3 h-full hover:bg-primaryHover hover:text-warning hover:bg-[#fb63401a]'
                                onClick={async () => {
                                    setIsShowConfirm(true);
                                }}
                            >
                                <Trash className='w-5 h-5 ' />
                                <span className='flex-1 text-ss text-left ml-1  whitespace-nowrap'>
                                    Xóa bài viết
                                </span>
                            </button>
                            {!post.isPublic ? (
                                <button
                                    className='  flex items-center gap-1  h-full px-3 w-full hover:text-primary hover:bg-[#5e72e41a] '
                                    onClick={(e) => {
                                        setIsShowConfirmApprove(true);

                                        e.stopPropagation();
                                    }}
                                >
                                    <Check className='w-5 h-5 ' />
                                    <span className='flex-1 text-ss text-left ml-1 whitespace-nowrap  '>
                                        Duyệt bài viết
                                    </span>
                                </button>
                            ) : null}
                        </div>
                        {isShowConfirm ? (
                            <PublishConfirm
                                isConfirm={isConfirm}
                                isShow={isShowConfirm}
                                loading={loadingConfirm}
                                setConfirmed={setIsConfirm}
                                setShow={setIsShowConfirm}
                                header='Xóa bài viết?'
                                message='Bạn thực sự muốn xóa bài viết này?'
                                img={post.thumbnailLink ? post.thumbnailLink : defaultPost}
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
                                img={post.thumbnailLink ? post.thumbnailLink : defaultPost}
                            />
                        ) : null}
                    </div>
                    <div className='flex flex-col mt-[52px]'>
                        <div className='flex pt-4 bg-white  mb-4  min-h-full'>
                            <MidContent
                                {...post}
                                setIdCurActive={setIdCurActive}
                                className='min-h-[calc(75vh-52px)]  flex-[3] max-w-[1016px]  mx-2  rounded-lg overflow-y-hidden overflow-hidden   '
                            />
                            <MenuRight
                                idCurActive={idCurActive}
                                content={post.content}
                                className={
                                    ' h-[calc(70vh -52px)] flex-1 overflow-auto invisible hover:visible ' +
                                    (stick && ' sticky w-1/5 h-[calc(100vh-52px)] top-[52px] pb-4')
                                }
                            />
                        </div>
                    </div>
                </>
            ) : (
                <BlogNotFound />
            )}
        </div>
    );
};

export default React.memo(BlogDetail);

import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import MenuRight from './MenuRight';
import MidContent from './MidContent';
import NavLeft from './NavLeft';
import postApi from '@api/postApi';
import { iPostDetail } from '@DTO/Blog';
import SkeletonBlogDetail from './SkeletonBlogDetail';
import BlogNotFound from './NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
// import { getPostDetailById } from "@redux/blogSlice";
import Comment from './Comment';
import userApi from '@api/userApi';
import ReactTooltip from 'react-tooltip';
import More from '@icons/More';
import ActionModal from '@components/postTag/ActionModal';

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
    if (loading) return <SkeletonBlogDetail />;
    else if (!post?.id) return <BlogNotFound />;
    return (
        <div
            ref={divRef}
            className='bg-white min-h-[calc[100vh-52px]] flex-1 flex flex-col text-bg'
        >
            {post ? (
                <>
                    {showActionModal ? (
                        <ActionModal
                            setShowActionModal={setShowActionModal}
                            approve={!post.isPublic}
                            setPage={setPage}
                            lazy={true}
                            idPost={post.id}
                            className=' -translate-x-1/2 mr-2  bg-white right-0 '
                        />
                    ) : null}
                    <div className='flex flex-col'>
                        <div className=' w-full flex-row-reverse flex gap-4 items-center '>
                            <button
                                className='bg-gray-c3 p-2 m-[1px] mr-2 rounded-md'
                                data-tip='Hiển thị các actions với bài viết'
                                data-for='action'
                                onClick={() => setShowActionModal(!showActionModal)}
                            >
                                <More className='w-7 h-7' />
                                <ReactTooltip
                                    textColor='#FF4401'
                                    id='action'
                                    place='bottom'
                                    effect='solid'
                                />
                            </button>
                        </div>
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

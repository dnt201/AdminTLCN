import React, { useRef, useState, useEffect } from 'react';
import { Book, BookFill, Heart, ListFill, More } from '@icons/index';
import { Link, useNavigate } from 'react-router-dom';
import defaultPost from '@images/default-placeholder.png';

import avatarDefault from '@images/userDefault.png';
import { iPostDetail } from '@DTO/Blog';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';

import userApi from '@api/userApi';
import { toast } from 'react-toastify';
import ActionModal from './ActionModal';

interface iLazy extends iPostDetail {
    myPost?: boolean;
    approve?: boolean;
    curImg?: string;
    listFromFollowing?: iPostDetail[];
    setListFromFollowing?: (posts: iPostDetail[]) => void;
    setPage: (number: number) => void;
    setPageForce?: (number: number) => void;
}

const PostTag: React.FC<iLazy> = (props) => {
    const {
        myPost,
        approve,
        id,
        title,
        curImg,
        tags,
        dateModified,
        owner,
        view,
        like,
        isFollow,
        comment,
        thumbnailLink,
        listFromFollowing,
        setListFromFollowing,
        setPage,
        setPageForce,
    } = props;
    const navigate = useNavigate();
    const [isFollowState, setIsFollowState] = useState(isFollow);
    const divBLogTagRef = useRef<HTMLDivElement>(null);
    const [loadingPrevent, setLoadingPrevent] = useState(false);
    const { userInfo, accessToken } = useSelector((state: RootState) => state.users);

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
    return (
        <div
            ref={divBLogTagRef}
            key={id}
            className={
                (listFromFollowing && isFollowState === false ? ' hidden ' : ' ') +
                'flex  w-full bg-gray-c3 p-2 mb-4  shadow-md rounded-2xl items-center hover:cursor-pointer '
            }
            onClick={() => navigate(`${id}`)}
        >
            {/* left */}
            <div className=' h-[110px] md:h-[120px] lg:h-[140px] flex'>
                <img
                    className=' w-[110px] md:w-[120px] lg:w-[140px] h-auto rounded-2xl '
                    // src={image || ""}
                    src={thumbnailLink || defaultPost}
                    alt='backdrop image'
                />
            </div>

            {/* right */}
            <div className='flex flex-col justify-between flex-1  h-[110px] md:h-[120px] lg:h-[140px] ml-2'>
                {/* first row */}
                <div>
                    <div className='flex flex-1  items-start'>
                        <h2 className='flex-1 font-semibold text-[16px]  line-clamp-3'>{title}</h2>
                        {myPost ? (
                            <div className='p-1 mb-4 relative z-[10100] ' ref={refDivActionModal}>
                                <button
                                    onClick={(e) => {
                                        setShowActionModal(!showActionModal);
                                        e.stopPropagation();
                                    }}
                                >
                                    <More
                                        className='w-6 h-6 '
                                        data-tip='Chỉnh sửa bài viết'
                                        data-for='acctionOfPostNavLeft'
                                    />
                                </button>
                                {showActionModal ? (
                                    <ActionModal
                                        setShowActionModal={setShowActionModal}
                                        setPage={setPage}
                                        lazy={true}
                                        approve={approve}
                                        className=' -translate-x-1/4  bg-white right-0 '
                                        idPost={id}
                                        curImg={curImg}
                                    />
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                    <div className='  mt-1'>
                        {tags &&
                            tags.map((item, index) => (
                                <span
                                    key={item.id}
                                    className={
                                        'py-1 px-2 mx-1 bg-gray-600  rounded-[20px] text-ss  text-white ' +
                                        (index == 0 && 'ml-0')
                                    }
                                >
                                    {item.displayName}
                                </span>
                            ))}
                    </div>
                </div>

                {/* sec row */}

                {/* third row */}
                <div className='flex items-center'>
                    {/* ava */}
                    <Link
                        to={`/user-detail/${owner.id}`}
                        className=' flex items-center duration-1000 p-1 rounded-lg hover:bg-hover'
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <img
                            className='w-8 h-8 mr-1 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full'
                            src={
                                owner.avatarLink !== null && owner.avatarLink.length > 0
                                    ? owner.avatarLink
                                    : avatarDefault
                            }
                        />

                        {/* Name + time */}
                        <div className='flex flex-col'>
                            <span className='font-semibold text-sm'>{owner.username}</span>
                            <span className='font-semibold text-ss'>
                                {dateModified && dateModified.getNumberOfDayFromNow()}
                            </span>
                        </div>
                    </Link>
                    {/* another */}
                    <div className='flex-1 text-right'>
                        <span className='font-normal text-ss px-1'>{view} Views</span>
                        <span className='font-normal text-ss px-1'>{like} Likes</span>
                        <span className='font-normal text-ss px-1'>{comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostTag;

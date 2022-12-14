import { iTag } from '@DTO/Tag';
import { Trash, Write } from '@icons/index';
import defaultIMG from '@images/default.jpg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import postTagApi from '@api/postTagApi';
import PublishConfirm from '@components/PublishConfirm';
interface iProps extends iTag {
    setCurPage: (n: number) => void;
}
const TagItem: React.FC<iProps> = (props) => {
    const { thumbnailLink, postTagName, id, setCurPage, colorCode } = props;
    const [curTag, setCurTag] = useState<iTag>();

    const [onHoverDiv, setOnHoverDiv] = useState(false);
    const navigate = useNavigate();

    const [isConfirm, setIsConfirm] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);

    useEffect(() => {
        if (isConfirm === true) {
            if (id) {
                const addPost = async () => {
                    const toastId = toast.loading('Loading...');

                    const result = await postTagApi.deleteTag(id);

                    setTimeout(() => {
                        if (
                            result.status === 200 ||
                            result.status === 201 ||
                            result.status === 202
                        ) {
                            toast.success('Xóa post tag thành công!', {
                                id: toastId,
                                duration: 2000,
                            });
                            setCurPage(-1);
                        } else {
                            toast.error(`${result.data.message}`, {
                                id: toastId,
                                duration: 2000,
                            });
                        }
                    }, 1000);
                };
                addPost();
            } else toast.error(`Lỗi rồi, làm ơn thử lại!`);
        }
        setIsConfirm(false);
    }, [isConfirm]);
    return (
        <div
            style={{ border: ` 1px solid ${colorCode} ` }}
            className={
                `  w-[calc(33.333%-40px)] mb-4 rounded-l-md mx-4   relative min-w-[200px] h-fit flex items-center   ` +
                (onHoverDiv ? ' text-white' : ' ')
            }
            onMouseOver={() => {
                setOnHoverDiv(true);
            }}
            onMouseOut={() => {
                setOnHoverDiv(false);
            }}
        >
            {isShowConfirm ? (
                <PublishConfirm
                    isConfirm={isConfirm}
                    isShow={isShowConfirm}
                    loading={loadingConfirm}
                    setConfirmed={setIsConfirm}
                    setShow={setIsShowConfirm}
                    header='Xóa post tag?'
                    message='Bạn có thực sự muốn xóa post tag này?'
                    // img={selectedImage ? selectedImage : defaultPost}
                />
            ) : null}
            {onHoverDiv ? (
                <div className='absolute flex gap-2 justify-center items-center w-full h-full top-0 left-0 bg-white  opacity-90 '>
                    <button
                        className='bg-black opacity-100 text-white p-1 rounded-md'
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`editTag/${id}`);
                        }}
                    >
                        <Write className='w-4 h-4' />
                    </button>
                    <button
                        className='bg-black opacity-100 text-white p-1 rounded-md'
                        onClick={(e) => {
                            e.stopPropagation();
                            // navigate(`editTag/${id}`);
                            setIsShowConfirm(true);
                        }}
                    >
                        <Trash className='w-4 h-4' />
                    </button>
                </div>
            ) : null}
            <img
                className=' rounded-md w-20 h-20 mr-2'
                src={thumbnailLink === null ? defaultIMG : thumbnailLink}
                // effect="blur"
            />
            <h3 className='text-base'>{postTagName}</h3>
        </div>
    );
};

export default TagItem;

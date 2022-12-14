import React from 'react';
import { Flag, Trash, Write } from '@icons/index';
import { useNavigate } from 'react-router-dom';
import commentApi from '@api/commentApi';
import { toast } from 'react-toastify';

interface iProps extends React.HTMLProps<HTMLDivElement> {
    idReply: string;
    idComment: string;
    isOwner: boolean;
    idPost: string;
    setCountReplyState: () => void;
    setIsEditReplyComment: (b: boolean) => void;
    setShowModal: (b: boolean) => void;
}
const ModalActionReplyComment: React.FC<iProps> = (props) => {
    const {
        idReply,
        idComment,
        idPost,
        isOwner,
        setIsEditReplyComment,
        setShowModal,
        setCountReplyState,
    } = props;
    const navigate = useNavigate();

    return (
        <div
            className={
                '  rounded-md py-2 w-fit flex flex-col gap-2  bg-white absolute top-0 right-0 translate-x-full  z-1000000 text-bg'
            }
        >
            <button
                className='p-1  flex items-center gap-1  px-3 w-full hover:bg-primaryHover hover:text-primary '
                onClick={async () => {
                    const toastId = toast.loading('Loading...');

                    const result = await commentApi.deleteReply(idReply);
                    console.log(result);
                    if (result.status === 200 || result.status === 202) {
                        toast.success('Xóa bình luận thành công', {
                            toastId: toastId,
                            autoClose: 2500,
                        });
                        setCountReplyState();
                        navigate(`/blog/${idPost}?ref=postComment&idComment=${idComment}`);
                    } else {
                        toast.error(`Có gì đó không đúng ${result.status}`, {
                            toastId: toastId,
                            autoClose: 2500,
                        });
                    }
                }}
            >
                <Trash className='w-4 h-4 ' />
                <span className='flex-1 text-ss text-left ml-1'>Xóa bình luận</span>
            </button>
        </div>
    );
};

export default ModalActionReplyComment;

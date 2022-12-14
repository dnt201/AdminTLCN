import React from 'react';
import { XMark } from '@icons/index';

import SureImage from '@images/q.png';
import { ClipLoader } from 'react-spinners';
interface iProps {
    isShow: boolean;
    setShow: (b: boolean) => void;
    isConfirm: boolean;
    setConfirmed: (b: boolean) => void;
    header?: string;
    message?: string;
    loading: boolean;
    img?: string;
}

const PublishConfirm: React.FC<iProps> = (props) => {
    const { setShow, setConfirmed, header, message, loading, img } = props;
    return (
        <div
            className=' fixed  hover:cursor-default left-0 top-0  flex justify-center items-center  z-[10101] min-w-screen w-screen h-screen'
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <div
                className=' fixed   left-0 top-0 w-screen h-screen bg-[#000] opacity-50'
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShow(false);
                }}
            ></div>
            <div className='w-full max-h-[240px] z-[10102] bg-gray-c3 max-w-[520px] bg-bg  flex flex-col  mb-[5%] border-[1px] border-smokeDark  rounded-md text-[#000]'>
                {/* Start Header */}
                <div className='flex items-center bg-smoke px-4 py-2 border-b-[1px] border-smokeDark rounded-t-md'>
                    <h3 className='text-left  flex-1 '>
                        {header && header.length > 0 ? header : ' Xuất bản bài viết!'}
                    </h3>
                    <span
                        className='hover:text-primary duration-300 hover:cursor-pointer p-1'
                        onClick={() => setShow(false)}
                    >
                        <XMark className='w-5 h-5' />
                    </span>
                </div>
                {/* End Header */}

                {/* Start Body */}
                <span className=' bg-white flex items-center justify-center '>
                    <img
                        src={img ? img : SureImage}
                        className={
                            'w-[120px] h-[120px] ' + (img ? '  rounded-full mx-2 my-4' : null)
                        }
                    />
                    <span className=' p-2 '>
                        {message && message.length > 0
                            ? message
                            : ' Nếu không còn chỉnh sửa, bạn muốn xuất bản bài viết?'}
                    </span>
                </span>
                {/* End Body */}
                {/* Start Bot Button */}
                <div className='px-4 py-2 border-t-[1px] rounded-b-md flex-row-reverse flex '>
                    <button
                        className='flex items-center bg-primary border-[1px] border-primary text-white px-2 py-1 text-sm rounded-sm'
                        onClick={() => {
                            setConfirmed(true);
                            setShow(false);
                            console.log('change conffirm');
                        }}
                    >
                        <span>Yes</span>
                        {loading && <ClipLoader size={16} color={'#fff'} />}
                    </button>
                    <button
                        className='  mr-1 border-smokeDark  border-[1px]  bg-smokeHover  px-2 py-1 text-sm rounded-sm'
                        onClick={() => {
                            setConfirmed(false);
                            setShow(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
                {/* End Bot Button */}
            </div>
        </div>
    );
};

export default PublishConfirm;

import { iCategory } from '@DTO/Category';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeSlash, Seen, Trash, Write } from '@icons/index';
import ReactTooltip from 'react-tooltip';
import PublishConfirm from '@components/PublishConfirm';
import { toast } from 'react-hot-toast';
import categoryApi from '@api/categoryApi';

interface iProps extends iCategory {
    setCurPage?: (n: number) => void;
    mb?: number;
    hidden?: string;
}
const CategoryItem: React.FC<iProps> = (props) => {
    const { id, categoryName, PostCount, setCurPage, mb, hidden } = props;
    const [onHoverDiv, setOnHoverDiv] = useState(false);
    const navigate = useNavigate();

    const [isConfirm, setIsConfirm] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    useEffect(() => {
        if (isConfirm === true) {
            if (id !== undefined && setCurPage && hidden === 'show') {
                const editCategory = async () => {
                    const toastId = toast.loading('Loading...');
                    const result = await categoryApi.hiddenCategory(id);
                    setTimeout(() => {
                        if (
                            result.status === 200 ||
                            result.status === 201 ||
                            result.status === 202
                        ) {
                            toast.success('Ẩn danh mục thành công!', {
                                id: toastId,
                                duration: 2000,
                            });
                            // navigate(0);
                            setCurPage(-1);
                        } else {
                            toast.error(`${result.data.message}`, {
                                id: toastId,
                                duration: 2000,
                            });
                        }
                    }, 1000);
                };
                editCategory();
            } else if (id !== undefined && setCurPage && hidden === 'hidden') {
                const editCategory = async () => {
                    const toastId = toast.loading('Loading...');
                    const result = await categoryApi.showCategory(id);
                    setTimeout(() => {
                        if (
                            result.status === 200 ||
                            result.status === 201 ||
                            result.status === 202
                        ) {
                            toast.success('Bỏ ẩn danh mục thành công!', {
                                id: toastId,
                                duration: 2000,
                            });
                            // navigate(0);
                            setCurPage(-1);
                        } else {
                            toast.error(`${result.data.message}`, {
                                id: toastId,
                                duration: 2000,
                            });
                        }
                    }, 1000);
                };
                editCategory();
            } else toast.error(`Reload, try again!`);
        }
        setIsConfirm(false);
    }, [isConfirm]);
    return (
        <div
            className={
                `w-[calc(33.3333333%-16px)] py-4 rounded-md mx-2 min-w-[200px] h-fit  +
         flex items-center px-4 mb-8    border-[1px] border-primary hover:bg-primary   group transition-colors  relative ` +
                (onHoverDiv ? ' text-white   border-white  ' : '   ') +
                (mb !== undefined ? ` mb-${mb} ` : null)
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
                    header='Ẩn category'
                    message='Bạn có thực sự muốn ẩn danh mục này?'
                    // img={selectedImage ? selectedImage : defaultPost}
                />
            ) : null}
            {onHoverDiv && setCurPage !== undefined ? (
                <div className='absolute flex gap-2 justify-center items-center w-full h-full top-0 left-0 bg-white  p-[2px]  opacity-90  '>
                    <button
                        className='bg-black opacity-100 text-white p-1 rounded-md'
                        data-tip='Chỉnh sửa'
                        data-for='btnChinhSua'
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`editCategory/${id}`);
                        }}
                    >
                        <Write className='w-4 h-4' />

                        <ReactTooltip
                            textColor='#FF4401'
                            id='btnChinhSua'
                            place='bottom'
                            effect='solid'
                            className='text-center '
                        />
                    </button>
                    <button
                        className='bg-black opacity-100 text-white p-1 rounded-md'
                        data-tip={hidden === 'show' ? 'Ẩn' : 'Bỏ ẩn'}
                        data-for='btnXoa'
                        onClick={(e) => {
                            e.stopPropagation();
                            // navigate(`editTag/${id}`);
                            setIsShowConfirm(true);
                        }}
                    >
                        {hidden === 'show' ? (
                            <Seen className='w-4 h-4' />
                        ) : (
                            <EyeSlash className='w-4 h-4' />
                        )}
                        <ReactTooltip
                            textColor='#FF4401'
                            id='btnXoa'
                            place='bottom'
                            effect='solid'
                            className='text-center '
                        />
                    </button>
                </div>
            ) : null}
            <div className=' bg-primary rounded-md p-2 mr-2 group-hover:bg-primary  transition-colors duration-300'></div>
            <div className=' overflow-y-hidden line-clamp-3  flex flex-col '>
                <b style={{ lineHeight: 1.3 }} className='text-base  line-clamp-2 font-semibold   '>
                    {categoryName}
                </b>
                <h6 className='text-xs mt-2 font-thin  '>{PostCount} posted</h6>
            </div>
        </div>
    );
};

export default CategoryItem;

import { iPage } from '@DTO/Pagination';
import { iTag } from '@DTO/Tag';
import { MagnifyingGlass, Tag, UpImage, Write, XMark } from '@icons/index';
import Pagination from '@components/pagination';
import toast from 'react-hot-toast';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BeatLoader, ClipLoader } from 'react-spinners';
import postTagApi, { postTagCreate } from '@api/postTagApi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@app/store';
import PublishConfirm from '@components/PublishConfirm';
import CategoryItem from '../CategoryItem';
import categoryApi from '@api/categoryApi';
const AddCategory = () => {
    const [nameSearch, setNameSearch] = useState('');
    const navigate = useNavigate();
    // const { show, setShow } = props;
    const divPopUpRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const [isDropOn, setDropOn] = useState(false);
    const [loading, setLoading] = useState(false);

    //form
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [color, setColor] = useState('#' + Math.ceil(Math.random() * 16777215).toString(16));

    //
    const [isConfirm, setIsConfirm] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);

    console.log(color, '-------------');
    useEffect(() => {
        if (isConfirm === true) {
            if (name.length <= 0) {
                toast.error('Tên phải ít nhất có 1 ký tự!');
            } else {
                const createCategory = async () => {
                    const toastId = toast.loading('Loading...');

                    const result = await categoryApi.createCategory(name);

                    setTimeout(() => {
                        if (
                            result.status === 200 ||
                            result.status === 201 ||
                            result.status === 202
                        ) {
                            toast.success('Thêm category thành công!', {
                                id: toastId,
                                duration: 2000,
                            });
                            navigate('/categories');
                        } else {
                            toast.error(`${result.data.message}`, {
                                id: toastId,
                                duration: 2000,
                            });
                        }
                    }, 1000);
                };
                createCategory();
            }
        }

        setIsConfirm(false);
    }, [isConfirm]);

    return (
        <div className={'flex-1 pl-2 flex flex-col'}>
            {isShowConfirm ? (
                <PublishConfirm
                    isConfirm={isConfirm}
                    isShow={isShowConfirm}
                    loading={loadingConfirm}
                    setConfirmed={setIsConfirm}
                    setShow={setIsShowConfirm}
                    header='Create category?'
                    message='Nothing has changed, do you really want to create the category?'
                    // img={curImg ? curImg : defaultPost}
                />
            ) : null}

            <div className='flex  items-center border-gray-c3 border-b-[1px] focus-within:border-gray-400 '>
                <div className='flex flex-1 items-center mr-2 '>
                    <button
                        className='py-2 px-4 rounded-md bg-gray-c3 flex justify-center '
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                    <h4 className='flex-1 text-center '> Add new Category</h4>
                </div>
            </div>
            <div className='flex items-center  justify-center  mt-8   gap-2'>
                {name.length > 0 ? (
                    <CategoryItem PostCount={9} categoryName={name} id='example' mb={0} />
                ) : null}
                <div className='flex flex-col flex-1 mr-4 '>
                    <input
                        className='focus:outline-none flex-1 text-black mt-2 p-2 border-gray-c3 border-[1px] rounded-md '
                        placeholder='Enter category...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className='bg-primary p-2 mt-1 rounded-md text-white disabled:bg-secondary disabled:cursor-not-allowed '
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsShowConfirm(true);
                        }}
                        disabled={color.length <= 0 || name.length <= 0}
                    >
                        Create
                    </button>
                </div>
            </div>
            {/* <div className='flex-1 flex  justify-center mt-[10vh]  gap-1'>
                <span className='mt-[4px]'>
                    <ClipLoader size={20} />
                </span>
                Đang tìm kiếm
            </div> */}
        </div>
    );
};

export default AddCategory;

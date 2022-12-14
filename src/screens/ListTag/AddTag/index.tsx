import { iPage } from '@DTO/Pagination';
import { iTag } from '@DTO/Tag';
import { MagnifyingGlass, Tag, UpImage, XMark } from '@icons/index';
import Pagination from '@components/pagination';
import toast from 'react-hot-toast';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BeatLoader, ClipLoader } from 'react-spinners';
import userApi from '@api/userApi';
import postTagApi, { postTagCreate } from '@api/postTagApi';
import PostTag from '@components/postTag';
import { IconAdd } from '@components/icon/Icon';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@app/store';
import Dropzone from 'react-dropzone';
import { SketchPicker } from 'react-color';
import PublishConfirm from '@components/PublishConfirm';
import { postCreate } from '@api/postApi';
const AddTag = () => {
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
            const addPost = async () => {
                const toastId = toast.loading('Loading...');
                let tPostTag: postTagCreate = {
                    colorCode: color,
                    displayName: name,
                    postTagName: name,
                    file: selectedImage ? selectedImage : undefined,
                };
                console.log(color);
                const result = await postTagApi.createPostTag(tPostTag);

                setTimeout(() => {
                    if (result.status === 200 || result.status === 201 || result.status === 202) {
                        toast.success('Thêm post tag thành công!', {
                            id: toastId,
                            duration: 2000,
                        });
                        navigate('/tags');
                    } else {
                        toast.error(`${result.data.message}`, {
                            id: toastId,
                            duration: 2000,
                        });
                    }
                }, 1000);
            };
            addPost();
            setIsConfirm(false);
        }
    }, [isConfirm]);
    return (
        <div className='flex-1 pl-2 flex flex-col'>
            {isShowConfirm ? (
                <PublishConfirm
                    isConfirm={isConfirm}
                    isShow={isShowConfirm}
                    loading={loadingConfirm}
                    setConfirmed={setIsConfirm}
                    setShow={setIsShowConfirm}
                    header='Tạo post tag?'
                    message='Không còn gì thay đổi, bạn có thực sự muốn tạo post tag nay?'
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
                    <h4 className='flex-1 text-center '> Add new post's tag</h4>
                </div>
            </div>
            <div className='flex  justify-center  mt-8  flex-1  gap-2'>
                <SketchPicker
                    color={color}
                    className={'h-fit'}
                    onChangeComplete={(color) => setColor(color.hex)}
                />

                <div className='flex flex-col '>
                    {selectedImage ? (
                        <div className={'flex  items-center  justify-center pt-4'}>
                            <div className='w-fit relative'>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    className='max-w-[240px] p-4 max-h-[240px]'
                                    alt='Pumb'
                                />
                                <button
                                    className='absolute top-0 right-0 translate-y-1/3 p-[2px] -translate-x-1/3 hover:bg-smoke bg-white text-bg rounded-full'
                                    onClick={() => setSelectedImage(null)}
                                >
                                    <XMark className='w-5 h-5' />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Dropzone
                            // maxFiles={1}
                            accept={{ 'image/jpeg': ['.jpeg', '.png'] }}
                            onDragEnter={() => {
                                setDropOn(true);
                                console.log('onDragEnter');
                            }}
                            onDragLeave={() => {
                                setDropOn(false);
                                console.log('onDragLeave');
                            }}
                            // onDropRejected={(files) => {
                            //   console.log("onDropRejected", files);
                            //   if (files.length > 1)
                            //     toast.error('Vui lòng chọn duy nhất "1" ảnh!');
                            // }}
                            onDrop={(files) => {
                                console.log(files);
                                if (files.length > 1)
                                    toast.error('Vui lòng chọn duy nhất "1" ảnh!');
                                else if (files[0]) setSelectedImage(files[0]);
                            }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div
                                    className={
                                        'flex items-center  justify-center ' +
                                        (isDropOn ? '  opacity-70 ' : null)
                                    }
                                    {...getRootProps()}
                                >
                                    <label
                                        htmlFor='dropzone-file'
                                        className='flex flex-col items-center justify-center max-w-[240px] p-4 max-h-[240px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer '
                                    >
                                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                            <UpImage />
                                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400 text-center'>
                                                <span className='font-semibold'>
                                                    Click to upload
                                                </span>{' '}
                                                or drag and drop
                                            </p>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                                Only PNG or JPG
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </Dropzone>
                    )}
                    <input
                        className='focus:outline-none text-black mt-2 p-2 border-gray-c3 border-[1px] rounded-md '
                        placeholder='Enter post tag!'
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

export default AddTag;

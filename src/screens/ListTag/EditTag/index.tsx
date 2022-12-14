import postTagApi, { postTagCreate } from '@api/postTagApi';
import PublishConfirm from '@components/PublishConfirm';
import { iTag } from '@DTO/Tag';
import { UpImage, XMark } from '@icons/index';
import BlogNotFound from '@screens/BlogDetail/NotFound';
import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Dropzone from 'react-dropzone';
import { BarLoader } from 'react-spinners';
import defaultPost from '@images/default.jpg';

const EditTag = () => {
    const param = useParams();
    const navigate = useNavigate();
    const { tagId } = param;
    const [isDropOn, setDropOn] = useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>();

    const [curLinkThumnail, setCurLinkThumnail] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [color, setColor] = useState('#' + Math.ceil(Math.random() * 16777215).toString(16));

    const [lazyFalse, setLazyFalse] = useState(false);
    const [curTag, setCurTag] = useState<iTag>();
    const [loading, setLoading] = useState(true);

    const [isConfirm, setIsConfirm] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);

    const getTagAndMap = async () => {
        const result = await postTagApi.getAllPostTag10000();

        if (result.status === 200 || result.status === 201) {
            let listTag: iTag[] = result.data.result.data;
            var tempTag: iTag | undefined;
            console.log(result);
            listTag.forEach((element) => {
                if (element.id === tagId) {
                    tempTag = element;
                    return;
                }
            });
            if (tempTag !== undefined) {
                console.log(tempTag);
                setCurTag(tempTag);
                setColor(tempTag.colorCode);
                setName(tempTag.postTagName);
                console.log('cccc', tempTag.thumbnailLink);
                console.log(tempTag.thumbnailLink !== null);
                if (tempTag.thumbnailLink !== null) {
                    console.log(tempTag, ',-----');
                    const tempBlob = await fetch(tempTag.thumbnailLink);
                    // console.log( ătempBlob.blob());
                    if (tempBlob) {
                        let blob = await tempBlob.blob();
                        const file = new File([blob], 'image.jpg', { type: blob.type });
                        setSelectedImage(file);
                        // console.log(tempBlob, '-----');
                    } else setSelectedImage(null);
                }
            }
        } else {
            setLazyFalse(true);
            toast.error(result.data.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        //Check param, thực ra là không bao giờ vào đây :))
        if (tagId === undefined) {
            setLazyFalse(true);
        } else {
            //Get infor curCate + list post
            setLoading(true);
            getTagAndMap();
        }
    }, []);

    useEffect(() => {
        if (isConfirm === true) {
            if (curTag?.id) {
                const addPost = async () => {
                    const toastId = toast.loading('Loading...');
                    let tPostTag: postTagCreate = {
                        colorCode: color,
                        displayName: name,
                        postTagName: name,
                        file: selectedImage ? selectedImage : undefined,
                    };
                    console.log(color);
                    const result = await postTagApi.editPostTag(curTag.id, tPostTag);

                    setTimeout(() => {
                        if (
                            result.status === 200 ||
                            result.status === 201 ||
                            result.status === 202
                        ) {
                            toast.success('Chỉnh sửa post tag thành công!', {
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
            } else toast.error(`Lỗi rồi, làm ơn thử lại!`);
        }
        setIsConfirm(false);
    }, [isConfirm]);
    if (loading)
        return (
            <div className='flex-1 pl-2 flex flex-col'>
                <div className='flex  items-center border-gray-c3 border-b-[1px] focus-within:border-gray-400 '>
                    <div className='flex flex-1 items-center mr-2 '>
                        <button
                            className='py-2 px-4 rounded-md bg-gray-c3 flex justify-center '
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                        <h4 className='flex-1 text-center '> Edit post's tag</h4>
                    </div>
                </div>
                <div className='flex justify-center flex-1 items-center mb-8'>
                    <BarLoader />
                </div>
            </div>
        );

    if (lazyFalse || curTag === undefined) return <BlogNotFound />;
    return (
        <div className='flex-1 pl-2 flex flex-col'>
            {isShowConfirm ? (
                <PublishConfirm
                    isConfirm={isConfirm}
                    isShow={isShowConfirm}
                    loading={loadingConfirm}
                    setConfirmed={setIsConfirm}
                    setShow={setIsShowConfirm}
                    header='Chỉnh sửa post tag?'
                    message='Không còn gì thay đổi, bạn có thực sự muốn tạo post tag nay?'
                    // img={selectedImage ? selectedImage : defaultPost}
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
                    <h4 className='flex-1 text-center '> Edit post's tag</h4>
                </div>
            </div>
            <div className='flex  justify-center  mt-8  flex-1  gap-2'>
                <SketchPicker
                    color={color}
                    className={'h-fit'}
                    onChangeComplete={(color) => setColor(color.hex)}
                />

                <div className='flex flex-col '>
                    {selectedImage !== null && selectedImage !== undefined ? (
                        <div className={'flex  items-center  justify-center pt-4'}>
                            <div className='w-fit relative'>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    className='max-w-[240px] p-4 max-h-[240px]'
                                    alt='Pumb'
                                />
                                <button
                                    className='absolute top-0 right-0 translate-y-1/3 p-[2px] -translate-x-1/3 hover:bg-smoke bg-white text-bg rounded-full'
                                    onClick={() => {
                                        setSelectedImage(null);
                                    }}
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
                                else if (files[0]) {
                                    setSelectedImage(files[0]);
                                    setCurLinkThumnail(true);
                                }
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
                        disabled={
                            name.length <= 0 ||
                            (curTag?.postTagName === name &&
                                curTag.colorCode === color &&
                                curLinkThumnail === false)
                        }
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTag;

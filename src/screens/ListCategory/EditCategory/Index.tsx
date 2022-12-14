import postTagApi, { postTagCreate } from '@api/postTagApi';
import PublishConfirm from '@components/PublishConfirm';
import { iTag } from '@DTO/Tag';
import { Category, UpImage, XMark } from '@icons/index';
import BlogNotFound from '@screens/BlogDetail/NotFound';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Dropzone from 'react-dropzone';
import { BarLoader } from 'react-spinners';
import defaultPost from '@images/default.jpg';
import categoryApi from '@api/categoryApi';
import { iCategory } from '@DTO/Category';
import CategoryItem from '../CategoryItem';

const EditCategory = () => {
    const param = useParams();
    const navigate = useNavigate();
    const { categoryId } = param;

    const [name, setName] = useState<string>();
    const [categoryCur, setCategoryCur] = useState<iCategory>();
    const [nameFromDB, setNameFromDB] = useState('');

    const [lazyFalse, setLazyFalse] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isConfirm, setIsConfirm] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);

    const getCategoryAndMap = async () => {
        const result = await categoryApi.getAllCategory10000();
        console.log(result);

        if (result.status === 200 || result.status === 201) {
            let listCategory: iCategory[] = result.data.result.data;
            var tempTag: iCategory | undefined;
            console.log(result);
            console.log('1-22222222222');

            listCategory.forEach((e) => {
                if (e.id === categoryId) {
                    tempTag = e;
                    return;
                }
            });
            if (tempTag !== undefined) {
                console.log('1-11111111111111');

                setCategoryCur(tempTag);
                setName(tempTag.categoryName);
                setNameFromDB(tempTag.categoryName);
                setLoading(false);
            }
        } else {
            setLazyFalse(true);
            toast.error(result.data.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        //Check param, thực ra là không bao giờ vào đây :))
        if (categoryId === undefined) {
            setLazyFalse(true);
        } else {
            //Get infor curCate + list post
            setLoading(true);
            getCategoryAndMap();
        }
    }, []);

    useEffect(() => {
        if (isConfirm === true) {
            if (categoryCur !== undefined && name) {
                const editCategory = async () => {
                    const toastId = toast.loading('Loading...');
                    const result = await categoryApi.editCategory(categoryCur.id, name);
                    setTimeout(() => {
                        if (
                            result.status === 200 ||
                            result.status === 201 ||
                            result.status === 202
                        ) {
                            toast.success('Chỉnh sửa category  thành công!', {
                                id: toastId,
                                duration: 2000,
                            });
                            // navigate(0);
                            setCategoryCur({ ...categoryCur, categoryName: name });
                            setNameFromDB(name);
                            console.log(result);
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
    if (loading)
        return (
            <div className='flex-1 pl-2 flex flex-col'>
                <div className='flex justify-center flex-1 items-center mb-8'>
                    <BarLoader />
                </div>
            </div>
        );

    if (lazyFalse || categoryCur === undefined) return <BlogNotFound />;
    return (
        <div className='flex-1 pl-2 flex flex-col'>
            {isShowConfirm ? (
                <PublishConfirm
                    isConfirm={isConfirm}
                    isShow={isShowConfirm}
                    loading={loadingConfirm}
                    setConfirmed={setIsConfirm}
                    setShow={setIsShowConfirm}
                    header='Chỉnh sửa danh mục?'
                    message='Không còn gì thay đổi, bạn có thực sự muốn chỉnh sửa danh mục?'
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
                    <h4 className='flex-1 text-center '> Edit Category tag</h4>
                </div>
            </div>
            <div className='flex  justify-center flex-col  mt-[15vh]  '>
                <div className='flex  gap-2'>
                    <CategoryItem {...categoryCur} mb={0} />
                    <div className='flex flex-col flex-1 mr-4 '>
                        <input
                            className='focus:outline-none  px-2 text-sm flex-1 mb-1  text-black   border-gray-c3 border-[1px] rounded-md '
                            placeholder='Enter post tag!'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            className='bg-primary px-4  text-sm p-2   rounded-md text-white disabled:bg-secondary disabled:cursor-not-allowed '
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsShowConfirm(true);
                            }}
                            disabled={name === undefined || name.length <= 0 || name === nameFromDB}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;

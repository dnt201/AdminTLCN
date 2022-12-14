import { iPage } from '@DTO/Pagination';
import { iTag } from '@DTO/Tag';
import { MagnifyingGlass, Tag } from '@icons/index';
import Pagination from '@components/pagination';

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BeatLoader, ClipLoader } from 'react-spinners';
import userApi from '@api/userApi';
import postTagApi from '@api/postTagApi';
import PostTag from '@components/postTag';
import TagItem from './Tag';
import { IconAdd } from '@components/icon/Icon';

const ListTag = () => {
    const [nameSearchFake, setNameSearchFake] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [onChangeInput, setOnChangeInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listTag, setListTag] = useState<iTag[] | null>(null);
    const [paging, setPaging] = useState<iPage | null>(null);
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        console.log('-----------', curPage, nameSearch);
        setLoading(true);
        if (curPage < 0) setCurPage(1);
        else {
            const getListTag = async () => {
                const rs = await postTagApi.getAllPostTag(curPage, nameSearch);
                if (rs.status === 201) {
                    setListTag(rs.data.result.data);
                    setPaging(rs.data.result.page);
                    console.log(rs);
                }
            };
            getListTag();
            setLoading(false);
        }
    }, [curPage, nameSearch]);

    return (
        <div className='flex-1 pl-2 flex flex-col'>
            <div className='flex  items-center border-gray-c3 border-b-[1px] focus-within:border-gray-400 '>
                <div className='flex flex-1 items-center mr-2 '>
                    <button className='w-14 flex justify-center g' disabled={onChangeInput}>
                        {onChangeInput ? <BeatLoader size={8} /> : <MagnifyingGlass />}
                    </button>
                    <input
                        value={nameSearchFake}
                        onChange={(e) => {
                            let i: NodeJS.Timeout;
                            setOnChangeInput(true);
                            setNameSearchFake(e.target.value);
                            i = setTimeout(() => {
                                setOnChangeInput(false);
                                setNameSearch(e.target.value);
                            }, 2000);
                            return () => {
                                clearTimeout(i);
                            };
                        }}
                        onKeyDown={(key) => {
                            if (key.key === 'Enter') {
                                setNameSearchFake(key.currentTarget.value);
                                setNameSearch(key.currentTarget.value);
                                setOnChangeInput(false);
                            }
                        }}
                        placeholder='Nhập tên post tag'
                        className='  flex-1   outline-none text-base px-4 pl-1 py-2  '
                    />
                </div>
                <button
                    className='flex items-center gap-2 my-[2px]  bg-gray-c3 px-2 py-2 rounded-md'
                    onClick={() => navigate('addTag')}
                >
                    Add <IconAdd />
                </button>
            </div>
            {loading ? (
                <div className='flex-1 flex  justify-center mt-[10vh]  gap-1'>
                    <span className='mt-[4px]'>
                        <ClipLoader size={20} />
                    </span>
                    Đang tìm kiếm
                </div>
            ) : listTag && paging && listTag.length > 0 ? (
                <div className='flex flex-1 flex-col  mx-2 '>
                    <span className=' mb-2 text-right my-4 '>
                        <span className='p-2 rounded-md  bg-fuchsia-200'>
                            <b>{paging?.totalElement || 0} </b>post tag
                        </span>
                    </span>
                    <div className='flex-1 flex flex-wrap'>
                        {listTag.map((tag) => (
                            <TagItem key={tag.id} {...tag} setCurPage={setCurPage} />
                        ))}
                    </div>

                    <>
                        <Pagination {...paging} changePageNumber={setCurPage} />
                    </>
                </div>
            ) : listTag && listTag.length <= 0 ? (
                <h6 className='text-black flex items-center justify-center mt-10 font-medium'>
                    Chưa có post tag
                </h6>
            ) : null}
        </div>
    );
};

export default ListTag;

import React, { useState, useEffect } from 'react';
import { iPage } from '@DTO/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BarLoader, BeatLoader, ClipLoader } from 'react-spinners';
import postTagApi from '@api/postTagApi';
import { iCategory } from '@DTO/Category';
import CategoryItem from './CategoryItem';
import { IconAdd } from '@components/icon/Icon';
import { MagnifyingGlass } from '@icons/index';
import categoryApi from '@api/categoryApi';
import Pagination from '@components/pagination';
import Select from 'react-select';
export interface iOption {
    value: string;
    label: string;
}
const ListCategory = () => {
    const [nameSearchFake, setNameSearchFake] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [onChangeInput, setOnChangeInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listTag, setListTag] = useState<iCategory[] | null>(null);
    const [paging, setPaging] = useState<iPage | null>(null);
    const [curPage, setCurPage] = useState(1);

    const [category, setCategory] = useState<string | null>('show');
    const [saveCate, setSaveCate] = useState<iOption[] | null>([{ value: 'show', label: 'Show' }]);
    const [categoriesOption, setCategoriesOption] = useState<iOption[] | null>([
        { value: 'show', label: 'Show' },
        { value: 'hidden', label: 'Hidden' },
    ]);

    useEffect(() => {
        console.log('-----------', curPage, nameSearch);
        setLoading(true);
        if (curPage < 0) setCurPage(1);
        else {
            if (category === 'show') {
                const getListCategory = async () => {
                    const rs = await categoryApi.getAllCategory(curPage, nameSearch);
                    if (rs.status === 201) {
                        setListTag(rs.data.result.data);
                        setPaging(rs.data.result.page);
                        console.log(rs);
                    }
                };
                getListCategory();
            } else if (category === 'hidden') {
                const getListCategoryHidden = async () => {
                    const rs = await categoryApi.getAllCategoryHidden(curPage, nameSearch);
                    if (rs.status === 201) {
                        setListTag(rs.data.result.data);
                        setPaging(rs.data.result.page);
                        console.log(rs);
                    }
                };
                getListCategoryHidden();
            }
            setLoading(false);
        }
    }, [curPage, nameSearch, category]);

    return (
        <div className='flex-1 pl-2 flex flex-col'>
            <div className='flex  items-center border-gray-c3  gap-2 border-b-[1px] focus-within:border-gray-400 '>
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

                <Select
                    value={saveCate}
                    placeholder="Select post's category..."
                    className='text-primary w-fit '
                    isClearable={false}
                    options={categoriesOption ? categoriesOption : []}
                    onChange={(e) => {
                        console.log(e);
                        if (e) {
                            setCategory(e.value);
                            let z: iOption[] = [];
                            z.push(e);
                            setSaveCate(z);
                        } else {
                            setCategory(null);
                            setSaveCate(null);
                        }
                    }}
                />
                <button
                    className='flex items-center my-[2px]  bg-gray-c3 px-2 py-2 rounded-md'
                    onClick={() => navigate('addCategory')}
                >
                    Thêm <IconAdd />
                </button>
            </div>
            {loading || onChangeInput ? (
                <div className='flex-1 flex  justify-center mt-[10vh]  gap-1'>
                    <span className='mt-[4px]'>
                        <BarLoader />
                    </span>
                </div>
            ) : listTag && category && paging && listTag.length > 0 ? (
                <div className='flex flex-1 flex-col   mx-2 '>
                    <span className=' mb-2 text-right my-4 '>
                        <span className='p-2 rounded-md  bg-fuchsia-200'>
                            <b>{paging?.totalElement || 0} </b>post tag
                        </span>
                    </span>
                    <div className='flex-1 flex flex-wrap mt-2 justify-evenly items-center'>
                        {listTag.map((tag) => (
                            <CategoryItem
                                key={tag.id}
                                {...tag}
                                setCurPage={setCurPage}
                                hidden={category}
                            />
                        ))}
                    </div>

                    <>
                        <Pagination {...paging} changePageNumber={setCurPage} />
                    </>
                </div>
            ) : listTag && listTag.length <= 0 ? (
                <h6 className='text-black flex items-center justify-center mt-10 font-medium'>
                    Chưa có category
                </h6>
            ) : null}
        </div>
    );
};

export default ListCategory;

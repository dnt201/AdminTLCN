import { IconAdd } from '@components/icon/Icon';
import Pagination from '@components/pagination';
import { useEffect, useState } from 'react';
import { MagnifyingGlass } from '@icons/index';
import Select from 'react-select';
import { BeatLoader, ClipLoader } from 'react-spinners';
import { iPostDetail } from '@DTO/Blog';
import { iPage } from '@DTO/Pagination';
import postApi from '@api/postApi';
import { toast } from 'react-toastify';
import PostTag from '@components/postTag';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
const options = [
    { value: 'approve', label: 'Đã duyệt' },
    { value: 'not-approve', label: 'Đang đợi phê duyệt' },
    { value: 'not-approve1', label: 'Đang đợi phê duyệ1t' },
    { value: 'not-approve2', label: 'Đang đợi phê duyệt1' },
];
const ListPost = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    const [nameSearchFake, setNameSearchFake] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [searchParams] = useSearchParams();

    const [onChangeInput, setOnChangeInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listPost, setListPost] = useState<iPostDetail[] | null>(null);
    const [paging, setPaging] = useState<iPage | null>(null);
    const [curPage, setCurPage] = useState(1);
    const [filter, setFilter] = useState('approve');
    const navigate = useNavigate();
    useEffect(() => {}, [searchParams]);

    const getAllPosted = async () => {
        const rs = await postApi.getAllPost(nameSearch, curPage, 10);
        if (rs.status === 200 || rs.status === 201) {
            console.log(rs);
            setPaging(rs.data.result.page);
            setListPost(rs.data.result.data);
        } else toast.error('Fetch list post error');
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };
    const getAllNeed = async () => {
        const rs = await postApi.getPostNeedApprove(curPage, nameSearch, 10);
        if (rs.status === 200 || rs.status === 201) {
            console.log(rs);
            setPaging(rs.data.result.page);
            setListPost(rs.data.result.data);
        } else toast.error('Fetch list post error');
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };
    useEffect(() => {
        console.log('-----------', curPage, nameSearch, filter);
        setLoading(true);
        if (curPage === -1) setCurPage(1);
        else {
            if (filter === 'approve') {
                getAllPosted();
            } else {
                getAllNeed();
            }
        }
    }, [curPage, nameSearch, filter]);

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
                        placeholder='Nhập tên bài viết'
                        className='  flex-1   outline-none text-base px-4 pl-1 py-2  '
                    />
                </div>
                <select
                    className='focus:outline-none p-2 bg-slate-300'
                    onChange={(e) => {
                        {
                            console.log(e.target.value);
                            if (e) {
                                setFilter(e.target.value);
                                setCurPage(1);
                            }
                        }
                    }}
                >
                    <option value='approve' selected={filter === 'approve'} className='p-5'>
                        Đã duyệt
                    </option>
                    <option value='not-approve' selected={filter === 'not-approve'} className='p-1'>
                        Đang đợi
                    </option>
                </select>
            </div>
            {loading ? (
                <div className='flex-1 flex  justify-center mt-[10vh] gap-1'>
                    <span className='mt-[4px]'>
                        <ClipLoader size={20} />
                    </span>
                    Đang tìm kiếm
                </div>
            ) : listPost && paging && listPost.length > 0 ? (
                <div className='flex flex-1 flex-col mt-2 mx-2 '>
                    <span className=' mb-2 text-right '>
                        <span className='p-2 rounded-md bg-fuchsia-200'>
                            <b>{paging?.totalElement || 0} </b>bài viết
                        </span>
                    </span>
                    <div className='flex-1'>
                        {listPost.map((post) => (
                            <PostTag
                                setPage={setCurPage}
                                curImg={post.thumbnailLink}
                                key={post.id}
                                {...post}
                                myPost={true}
                                approve={filter === 'not-approve' ? true : false}
                            />
                        ))}
                    </div>

                    <Pagination {...paging} changePageNumber={setCurPage} />
                </div>
            ) : listPost && listPost.length <= 0 ? (
                <h6 className='text-black flex items-center justify-center mt-10 font-medium'>
                    {' '}
                    Không có bài viết!
                </h6>
            ) : null}
        </div>
    );
};

export default ListPost;

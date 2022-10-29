import ContentCard from '~/components/contentCard/ContentCard';

const ListCatgory = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex m-3 p-3'>
                <ContentCard />
                <ContentCard />
                <ContentCard />
                <ContentCard />
            </div>
            <div className='overflow-x-auto rounded-2xl mx-8 border boder-gray-c4'>
                <table className='bg-white w-[100%] text-sm text-left text-gray-c4'>
                    <thead className='text-xs uppercase bg-white text-gray-c6  border-b border-secondary'>
                        <tr>
                            <th scope='col' className='py-3 px-6'>
                                Name
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Type
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Description
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                More
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-white border-b border-gray-c4 hover:bg-gray-c2 cursor-pointer'>
                            <th
                                scope='row'
                                className='py-4 px-6 font-medium text-black whitespace-nowrap'
                            >
                                Trong
                            </th>
                            <th
                                scope='row'
                                className='py-4 px-6 font-medium text-black whitespace-nowrap'
                            >
                                Trong
                            </th>
                            <th
                                scope='row'
                                className='py-4 px-6 font-medium text-black whitespace-nowrap'
                            >
                                Trong
                            </th>
                            <th
                                scope='row'
                                className='py-4 px-6 font-medium text-black whitespace-nowrap'
                            >
                                Trong
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListCatgory;

import { useState } from 'react';
import ContentCard from '~/components/contentCard/ContentCard';
import { Pagination } from 'flowbite-react';
const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className='m-5 p-5 flex'>
        <div className='flex w-[50%] flex-wrap'>
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
        </div>
        <div className='w-[50%]'>
          <span>troi oiw la troi</span>
        </div>
      </div>
      <div className='overflow-x-auto relative p-5 mx-4'>
        <table className='bg-white w-full text-sm text-left  text-gray-400 '>
          <thead className='text-xs uppercase bg-white text-gray-c6  border-b border-black'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                Product name
              </th>
              <th scope='col' className='py-3 px-6'>
                Color
              </th>
              <th scope='col' className='py-3 px-6'>
                Category
              </th>
              <th scope='col' className='py-3 px-6'>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b border-gray-c4'>
              <th scope='row' className='py-4 px-6 font-medium text-black whitespace-nowrap'>
                Apple MacBook Pro 17"
              </th>
              <td className='py-4 px-6 text-gray-c8'>Sliver</td>
              <td className='py-4 px-6 text-gray-c8'>Laptop</td>
              <td className='py-4 px-6 text-gray-c8'>$2999</td>
            </tr>
            <tr className='bg-white border-b border-gray-c4'>
              <th scope='row' className='py-4 px-6 font-medium text-black whitespace-nowrap '>
                Microsoft Surface Pro
              </th>
              <td className='py-4 px-6 text-gray-c8'>White</td>
              <td className='py-4 px-6 text-gray-c8'>Laptop PC</td>
              <td className='py-4 px-6 text-gray-c8'>$1999</td>
            </tr>
            <tr className='bg-white border-b border-gray-c4'>
              <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-black'>
                Microsoft Surface Pro
              </th>
              <td className='py-4 px-6 text-gray-c8'>White</td>
              <td className='py-4 px-6 text-gray-c8'>Laptop PC</td>
              <td className='py-4 px-6 text-gray-c8'>$1999</td>
            </tr>
            <tr className='bg-white border-b border-gray-c4'>
              <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-black'>
                Microsoft Surface Pro
              </th>
              <td className='py-4 px-6 text-gray-c8'>White</td>
              <td className='py-4 px-6 text-gray-c8'>Laptop PC</td>
              <td className='py-4 px-6 text-gray-c8'>$1999</td>
            </tr>
            <tr className='bg-white'>
              <th scope='row' className='py-4 px-6 font-medium  whitespace-nowrap text-black'>
                Magic Mouse 2
              </th>
              <td className='py-4 px-6 text-gray-c8'>Black</td>
              <td className='py-4 px-6 text-gray-c8'>Accessories</td>
              <td className='py-4 px-6 text-gray-c8'>$99</td>
            </tr>
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
      </div>
    </>
  );
};

export default List;

import { IconUserBorder } from '../icon/Icon';

const ContentCard = () => {
  return (
    <div className='flex flex-col bg-gray-c4 p-5 m-2 rounded-2xl w-[45%]'>
      <div className='flex justify-between mb-3'>
        <IconUserBorder />
        <span>anh yeu em</span>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col item'>
          <span>1600</span>
          <span>Users Active</span>
        </div>
        <span className='flex items-center'>+55%</span>
      </div>
    </div>
  );
};

export default ContentCard;

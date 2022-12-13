import { IconMoney } from '../icon/Icon';

type WidgetProps = {
    title: string;
    content: string;
    percent: number;
    icon: React.ReactNode;
};

const Widget = (props: WidgetProps) => {
    return (
        <div className='flex  flex-col w-1/4  bg-white rounded-2xl p-2 mb-4'>
            <div className='flex gap-2'>
                <div className='flex flex-col'>
                    <span className='text-secondary text-sm font-bold'>{props.title}</span>
                    <span className='font-bold text-lg'>{props.content}</span>
                </div>
                <div>{props.icon}</div>
            </div>
            <div className='flex gap-x-4 pt-2'>
                <span className='text-success text-sm font-bold'>+{props.percent}%</span>
                <span className='text-secondary text-sm font-normal'>since yesterday</span>
            </div>
        </div>
    );
};

export default Widget;

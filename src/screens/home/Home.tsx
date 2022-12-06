import Widget from '~/components/widget/Widget';
import { IconClient, IconGlobalUser, IconMoney, IconSale } from '~/components/icon/Icon';
import Chart from 'react-apexcharts';

const widgets = [
    { title: `TODAY'S MONEY`, content: '$53,00', percent: 55, icon: <IconMoney /> },
    { title: `TODAY'S USERS`, content: '2,300', percent: 3, icon: <IconGlobalUser /> },
    { title: `NEW CLIENTS`, content: '+3,462', percent: 2, icon: <IconClient /> },
    { title: `SALE`, content: '$103,430', percent: 5, icon: <IconSale /> },
];

const Home = () => {
    const series = [
        {
            name: 'Temperature in Fahrenheit', //will be displayed on the y-axis
            data: [43, 53, 50, 57],
        },
    ];
    const options = {
        chart: {
            id: 'simple-bar',
        },
        xaxis: {
            categories: [1, 2, 3, 4], //will be displayed on the x-asis
        },
    };
    return (
        <>
            <div>
                <div className='flex p-4 bg-transparent m-2 rounded-lg'>
                    <div className='flex'>
                        {widgets.map((widget) => (
                            <>
                                <Widget
                                    title={widget.title}
                                    content={widget.content}
                                    percent={widget.percent}
                                    icon={widget.icon}
                                />
                            </>
                        ))}
                    </div>
                </div>
                <div className='flex my-10'>
                    <div className='bg-white w-[50%] p-5 rounded-2xl ml-8'>
                        <span className='text-base font-semibold p-3'>Sales overview</span>
                        <Chart options={options} type='bar' series={series} width='80%' />
                    </div>
                    <div className='mx-8 w-[50%] px-3'>
                        <img
                            src={require('../../layouts/testImg.png')}
                            alt='test'
                            className='rounded-2xl h-full'
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

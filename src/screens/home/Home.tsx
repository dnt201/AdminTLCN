import { IconClient, IconGlobalUser, IconMoney, IconSale } from '@components/icon/Icon';
import Widget from '@components/widget/Widget';
import Chart from 'react-apexcharts';
import React from 'react';
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
        <div className='flex flex-col justify-center items-center mb-10 flex-1 '>
            <h1>Admin teachingMe</h1>
            {/* <div className='flex justify-between '>
                {widgets.map((widget) => (
                    <React.Fragment key={widget.title}>
                        <Widget
                            title={widget.title}
                            content={widget.content}
                            percent={widget.percent}
                            icon={widget.icon}
                        />
                    </React.Fragment>
                ))}
            </div>
            <div className='flex  items-center justify-center my-auto pb-20'>
                <div className='bg-white flex-1 rounded-2xl '>
                    <span className='text-base font-semibold p-3'>Sales overview</span>
                    <div className='w-[90%] mx-auto'>
                        <Chart options={options} type='bar' series={series} width='100%' />
                    </div>
                </div>
                <div className=' flex-1 px-3'>
                    <img src={require('@images/testImg.png')} alt='test' className='rounded-2xl' />
                </div>
            </div> */}
        </div>
    );
};

export default Home;

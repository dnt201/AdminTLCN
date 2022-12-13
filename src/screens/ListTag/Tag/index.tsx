import { iTag } from '@DTO/Tag';
import { Trash, Write } from '@icons/index';
import defaultIMG from '@images/default.jpg';
import React, { useState } from 'react';
interface iProps extends iTag {}
const TagItem: React.FC<iProps> = (props) => {
    const { thumbnailLink, postTagName } = props;
    const [onHoverDiv, setOnHoverDiv] = useState(false);
    console.log(props);
    return (
        <div
            className={
                'w-1/3  relative min-w-[200px] h-fit flex items-center  mb-4  ' +
                (onHoverDiv ? ' text-white' : ' ')
            }
            onMouseOver={() => {
                setOnHoverDiv(true);
            }}
            onMouseOut={() => {
                setOnHoverDiv(false);
            }}
        >
            {onHoverDiv ? (
                <div className='absolute flex gap-2 justify-center items-center w-full h-full top-0 left-0 bg-white  opacity-90 '>
                    <button className='bg-black opacity-100 text-white p-1 rounded-md'>
                        <Write className='w-4 h-4' />
                    </button>
                    <button className='bg-black opacity-100 text-white p-1 rounded-md'>
                        <Trash className='w-4 h-4' />
                    </button>
                </div>
            ) : null}

            <img
                className=' rounded-md w-20 h-20 mr-2'
                src={thumbnailLink === null ? defaultIMG : thumbnailLink}
                // effect="blur"
            />

            <h3 className='text-base'>{postTagName}</h3>
        </div>
    );
};

export default TagItem;

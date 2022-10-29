import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
interface ModalProps {
    onBackdropClick: () => void;
    children: React.ReactNode;
}

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 90;
`;
const ModalPopup: React.FC<ModalProps> = ({ onBackdropClick, children }) => {
    return ReactDOM.createPortal(
        <Overlay onClick={onBackdropClick}>
            <div className='m-auto w-[630px]' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </Overlay>,
        document.getElementById('modal-root')!,
    );
};

export default ModalPopup;

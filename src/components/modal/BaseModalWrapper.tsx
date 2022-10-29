import React from 'react';
import { New } from '~/screens';
import ModalPopup from './ModalPopup';

interface BaseModalWrapperProps {
    isModalVisible: boolean;
    onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({ onBackdropClick, isModalVisible }) => {
    if (!isModalVisible) {
        return null;
    }
    return (
        <ModalPopup onBackdropClick={onBackdropClick}>
            <New />
        </ModalPopup>
    );
};

export default BaseModalWrapper;

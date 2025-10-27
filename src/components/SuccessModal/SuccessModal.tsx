"use client"
import { Modal } from 'antd';
import styles from './SuccessModal.module.scss';
import {getModalContent} from "@/components/SuccessModal/model/helpers";

interface SuccessModalProps {
    isVisible: boolean;
    onClose: () => void;
    lang: 'ru' | 'he' | 'en';
    type?: 'form' | 'phone';
}

export const SuccessModal = ({ isVisible, onClose, lang, type = 'form' }: SuccessModalProps) => {
    const modalContent = getModalContent(lang, type);

    return (
        <Modal
            title={modalContent.title}
            open={isVisible}
            onOk={onClose}
            onCancel={onClose}
            okText={modalContent.okText}
            cancelButtonProps={{ style: { display: 'none' } }}
            centered
            className={styles.successModal}
        >
            <div className={styles.successContent}>
                <p>{modalContent.content}</p>
            </div>
        </Modal>
    );
};
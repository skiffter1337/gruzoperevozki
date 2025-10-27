"use client"
import { useState } from 'react';
import { Button, Input, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { SuccessModal } from '@/components/SuccessModal/SuccessModal';
import styles from './CTAForm.module.scss';

interface CTAFormProps {
    lang: 'ru' | 'he' | 'en';
    translations: {
        title: string;
        description: string;
        phonePlaceholder: string;
        buttonText: string;
        successMessage: string;
        errorMessage: string;
        networkErrorMessage: string;
        validationMessage: string;
    };
    source: string;
    className?: string;
}

export const CTAForm = ({ lang, translations, source, className = '' }: CTAFormProps) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const handlePhoneSubmit = async () => {
        if (!phoneNumber.trim()) {
            message.error(translations.validationMessage);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/send-phone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phoneNumber,
                    source: source,
                    lang: lang,
                    timestamp: new Date().toISOString()
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccessModalVisible(true);
                setPhoneNumber('');
            } else {
                message.error(translations.errorMessage);
            }
        } catch (error) {
            console.error('Error sending phone:', error);
            message.error(translations.networkErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlePhoneSubmit();
        }
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    return (
        <>
            <div className={`${styles.ctaBlock} ${className}`}>
                <h4>{translations.title}</h4>
                <p>{translations.description}</p>

                <div className={styles.phoneInputContainer}>
                    <Input
                        placeholder={translations.phonePlaceholder}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onKeyPress={handleKeyPress}
                        size="large"
                        className={styles.phoneInput}
                        type="tel"
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        loading={isLoading}
                        onClick={handlePhoneSubmit}
                        className={styles.sendButton}
                        size="large"
                    >
                        {translations.buttonText}
                    </Button>
                </div>
            </div>

            {/* Модальное окно успешной отправки */}
            <SuccessModal
                isVisible={isSuccessModalVisible}
                onClose={handleSuccessModalClose}
                lang={lang}
                type="phone"
            />
        </>
    );
};
'use client';

import {FC} from 'react';
import {Col, Flex, Row} from 'antd';
import {EnvironmentOutlined, MailOutlined, PhoneOutlined, SafetyCertificateOutlined} from '@ant-design/icons';
import styles from './Footer.module.scss';
import Image from 'next/image';
import {FooterTranslations} from "@/components/Footer/model/type";
import {getFooterData} from "@/components/Footer/model/helpers";
import {getWhatsAppPhone} from "@/lib/getWhatsAppPhone";

interface FooterProps {
    lang: 'ru' | 'he' | 'en';
    translations: {
        header: {
            companyName: string;
        };
        footer: FooterTranslations;
    };
}

function FooterStructuredData({companyName, contactInfo}: {
    companyName: string;
    contactInfo: {
        phone: string;
        email: string;
    };
}) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": companyName,
        "url": "https://urbanmoving.net",
        "telephone": contactInfo.phone,
        "email": contactInfo.email,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IL",
        },
        "openingHours": "Mo-Su 08:00-22:00",
        "foundingDate": "2025",
        "priceRange": "₪",
        "paymentAccepted": "Visa, Mastercard, Google Pay, Apple Pay",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
    );
}

export const Footer: FC<FooterProps> = ({lang, translations}) => {
    const footerData = getFooterData(lang);
    const currentYear = new Date().getFullYear();

    const startWhatsAppChat = () => {
        const phone = getWhatsAppPhone();
        const message = encodeURIComponent(translations.footer.quickContact.whatsappMessage);
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    const startPhoneCall = () => {
        const phoneNumber = footerData.phone;
        window.location.href = `tel:${phoneNumber}`;
    };

    const formatCopyright = () => {
        return translations.footer.copyright.replace('{year}', currentYear.toString());
    };

    const getAltText = (paymentMethod: string) => {
        const methods = translations.footer.paymentSection.methods;
        switch (paymentMethod) {
            case 'visa':
                return methods.visa;
            case 'mastercard':
                return methods.mastercard;
            case 'google-pay':
                return methods.googlePay;
            case 'apple-pay':
                return methods.applePay;
            case 'bit':
                return methods.bit;
            default:
                return paymentMethod;
        }
    };

    return (
        <footer className={styles.footer} itemScope itemType="https://schema.org/LocalBusiness">
            <FooterStructuredData
                companyName={translations.header.companyName}
                contactInfo={footerData}
            />

            <div className={styles.container}>
                <Row gutter={[40, 30]} className={styles.mainContent}>
                    <Col xs={24} md={8}>
                        <div className={styles.companyInfo}>
                            <h3 className={styles.companyName} itemProp="name">
                                {translations.header.companyName}
                            </h3>
                            <div className={styles.contacts}>
                                <div className={styles.contactItem}>
                                    <PhoneOutlined/>
                                    <span itemProp="telephone" dir="ltr">{footerData.phone}</span>
                                </div>
                                <div className={styles.contactItem}>
                                    <MailOutlined/>
                                    <span itemProp="email">{footerData.email}</span>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} md={8}>
                        <div className={styles.paymentSection}>
                            <h4 className={styles.sectionTitle}>
                                <SafetyCertificateOutlined/> {translations.footer.paymentSection.title}
                            </h4>
                            <div className={styles.paymentMethods}>
                                <Image
                                    src="/visa.svg"
                                    width={60}
                                    height={40}
                                    alt={getAltText('visa')}
                                />
                                <Image
                                    src="/mastercard.svg"
                                    width={40}
                                    height={40}
                                    alt={getAltText('mastercard')}
                                />
                                <Image
                                    src="/google-pay.svg"
                                    width={60}
                                    height={40}
                                    alt={getAltText('google-pay')}
                                />
                                <Image
                                    src="/apple-pay.svg"
                                    width={60}
                                    height={40}
                                    alt={getAltText('apple-pay')}
                                />
                                <Image
                                    src="/bit.svg"
                                    width={60}
                                    height={40}
                                    alt={getAltText('bit')}
                                />
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} md={8}>
                        <div className={styles.contactsSection}>
                            <h4 className={styles.sectionTitle}>{translations.footer.quickContact.title}</h4>
                            <Flex gap={8}>
                                <button onClick={startWhatsAppChat} className={styles.whatsappButton}>
                                    <Image
                                        src="/whatsapp.svg"
                                        width={48}
                                        height={48}
                                        alt="WhatsApp"
                                        priority={true}
                                    />
                                </button>
                                <button onClick={startPhoneCall} className={styles.phoneButton}>
                                    <Image
                                        src="/phone.svg"
                                        width={26}
                                        height={26}
                                        alt="Позвонить"
                                        priority={true}
                                    />
                                </button>
                            </Flex>
                        </div>
                    </Col>
                </Row>

                <div className={styles.bottomFooter}>
                    <Row align="bottom" justify="space-between">
                        <Col>
                            <div className={styles.copyright}>
                                {formatCopyright()}
                            </div>
                        </Col>
                        {/*<Col>*/}
                        {/*    <div className={styles.legalLinks}>*/}
                        {/*        <Link*/}
                        {/*            href="/privacy-policy"*/}
                        {/*            className={styles.legalLink}*/}
                        {/*            itemProp="hasPolicy"*/}
                        {/*            aria-label={translations.footer.legalLinks.privacyPolicy}*/}
                        {/*        >*/}
                        {/*            <FileTextOutlined/> {translations.footer.legalLinks.privacyPolicy}*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</Col>*/}
                    </Row>
                </div>
            </div>

            {/* Скрытый SEO контент */}
            <div className={styles.seoContent} aria-hidden="true">
                <p dangerouslySetInnerHTML={{__html: translations.footer.seoContent}}/>
            </div>
        </footer>
    );
};
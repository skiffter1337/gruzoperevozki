"use client"
import {FC, useState} from 'react';
import {Card, Checkbox, Col, DatePicker, Flex, Form, Input, message, Row} from 'antd';
import {CalendarOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined} from '@ant-design/icons';
import styles from './HeroSection.module.scss';
import {HeroTranslations, IForm} from "@/components/HeroSection/model/types";
import {CTAForm} from "@/components/CTAForm/CTAForm";
import {getAddressLocality, getAltText, getAreaServed, getMoversService, getPackingService} from './model/helpers';
import {getDescription} from "@/components/HeroSection/model/helpers";
import {SuccessModal} from "@/components/SuccessModal";

interface HeroSectionProps {
    lang: 'ru' | 'he' | 'en';
    translations: {
        hero: HeroTranslations;
        header: {
            companyName: string;
        };
    };
}

function HeroStructuredData({
                                lang,
                                companyName
                            }: {
    lang: 'ru' | 'he' | 'en';
    companyName: string;
}) {

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const moversService = getMoversService(lang);
    const packingService = getPackingService(lang);

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": companyName,
        "description": getDescription(lang),
        "url": typeof window !== 'undefined' ? window.location.href : "",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IL",
            "addressLocality": getAddressLocality(lang)
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "32.0853",
            "longitude": "34.7818"
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "serviceType": "MovingService",
        "areaServed": getAreaServed(lang),
        "makesOffer": [
            {
                "@type": "Offer",
                "name": moversService.name,
                "description": moversService.description
            },
            {
                "@type": "Offer",
                "name": packingService.name,
                "description": packingService.description
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "500",
            "bestRating": "5"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
    );
}

export const HeroSection: FC<HeroSectionProps> = ({lang, translations}) => {
    const [form] = Form.useForm();
    const [hasLiftFrom, setHasLiftFrom] = useState(false);
    const [hasLiftTo, setHasLiftTo] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const t = translations.hero;
    const companyName = translations.header.companyName;

    const ctaTranslations = {
        title: t.cta.title,
        description: t.cta.description,
        phonePlaceholder: lang === 'he'
            ? 'הזן מספר טלפון'
            : lang === 'en'
                ? 'Enter phone number'
                : 'Введите номер телефона',
        buttonText: lang === 'he'
            ? 'שלח'
            : lang === 'en'
                ? 'Send'
                : 'Отправить',
        successMessage: lang === 'he'
            ? 'הטלפון נשלח בהצלחה! נחזור אליך בהקדם'
            : lang === 'en'
                ? 'Phone number sent successfully! We will contact you shortly'
                : 'Номер отправлен! Мы свяжемся с вами в ближайшее время',
        errorMessage: lang === 'he'
            ? 'שגיאה בשליחת הטלפון'
            : lang === 'en'
                ? 'Error sending phone number'
                : 'Ошибка при отправке номера',
        networkErrorMessage: lang === 'he'
            ? 'שגיאת רשת'
            : lang === 'en'
                ? 'Network error'
                : 'Ошибка сети',
        validationMessage: lang === 'he'
            ? 'נא להזין מספר טלפון'
            : lang === 'en'
                ? 'Please enter a phone number'
                : 'Пожалуйста, введите номер телефона'
    };


    const onFinish = async (values: IForm) => {
        try {
            console.log('Sending form data:', values);

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccessModalVisible(true);
                form.resetFields();
            } else {
                console.error('API error:', result.error);
                const errorMessage = lang === 'he'
                    ? 'שגיאה בשליחת הבקשה'
                    : lang === 'en'
                        ? 'Error sending request'
                        : 'Ошибка при отправке заявки';
                message.error(errorMessage);
            }
        } catch (error) {
            console.error('Network error:', error);
            const networkErrorMessage = lang === 'he'
                ? 'שגיאת רשת'
                : lang === 'en'
                    ? 'Network error'
                    : 'Ошибка сети';
            message.error(networkErrorMessage);
        }
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };



    return (
        <section className={styles.hero} id="hero" itemScope itemType="https://schema.org/LocalBusiness">
            <HeroStructuredData lang={lang} companyName={companyName}/>
            <div className={styles.container}>
                <Row gutter={[60, 40]}>
                    <Col xs={24} lg={14}>
                        <Flex vertical gap={80}>
                            <div className={styles.imageContainer}>
                                <div className={styles.imageWrapper}>
                                    <img
                                        src="/hero.jpg"
                                        alt={getAltText(lang)}
                                        className={styles.image}
                                        loading="eager"
                                    />
                                </div>
                            </div>
                            <CTAForm
                                lang={lang}
                                translations={ctaTranslations}
                                source="reviews_section"
                                className={styles.ctaForm}
                            />
                        </Flex>
                    </Col>

                    <Col xs={24} lg={10}>
                        <Card className={styles.formCard}>
                            <h1 className={styles.formTitle} itemProp="name">
                                {t.title}
                            </h1>

                            <p className={styles.formSubtitle}>
                                {t.subtitle}
                            </p>

                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                className={styles.form}
                                itemScope
                                itemType="https://schema.org/Service"
                            >
                                <meta itemProp="serviceType" content="MovingService"/>

                                <Flex gap={8} wrap="wrap" className={styles.namePhoneRow}>
                                    <div style={{flex: 1}}>
                                        <Form.Item
                                            name="name"
                                            label={t.form.name.label}
                                            rules={[{required: true, message: t.form.validation.nameRequired}]}
                                        >
                                            <Input
                                                prefix={<UserOutlined/>}
                                                placeholder={t.form.name.placeholder}
                                                size="large"
                                                aria-label={t.form.name.label}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div style={{flex: 1}}>
                                        <Form.Item
                                            name="phone"
                                            label={t.form.phone.label}
                                            rules={[{required: true, message: t.form.validation.phoneRequired}]}
                                        >
                                            <Input
                                                prefix={<PhoneOutlined/>}
                                                placeholder={t.form.phone.placeholder}
                                                size="large"
                                                type="tel"
                                                aria-label={t.form.phone.label}
                                            />
                                        </Form.Item>
                                    </div>
                                </Flex>

                                <div className={styles.addressBlock}>
                                    <h4 className={styles.blockTitle}>
                                        <EnvironmentOutlined/>
                                        {t.form.address.from.title}
                                    </h4>
                                    <Flex vertical gap={16}>
                                        <div className={styles.addressField}>
                                            <Form.Item
                                                name="fromAddress"
                                                label={t.form.address.from.label}
                                                rules={[{required: true, message: t.form.validation.addressRequired}]}
                                            >
                                                <Input
                                                    placeholder={t.form.address.from.placeholder}
                                                    size="large"
                                                />
                                            </Form.Item>
                                        </div>
                                        <Flex gap={16} wrap="wrap">
                                            <Form.Item
                                                name="fromFloor"
                                                label={t.form.address.floor}
                                                className={styles.floorInput}
                                            >
                                                <Input
                                                    type="number"
                                                    placeholder={t.form.address.floorPlaceholder}
                                                    size="large"
                                                />
                                            </Form.Item>
                                            <Flex gap={8} vertical>
                                                <div>
                                                    <Form.Item name="fromHasLift" valuePropName="checked">
                                                        <Checkbox onChange={(e) => setHasLiftFrom(e.target.checked)}>
                                                            {t.form.address.hasLift}
                                                        </Checkbox>
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <Form.Item name="fromNeedCrane" valuePropName="checked">
                                                        <Checkbox>
                                                            {t.form.address.needCrane}
                                                        </Checkbox>
                                                    </Form.Item>
                                                </div>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </div>

                                <div className={styles.addressBlock}>
                                    <h4 className={styles.blockTitle}>
                                        <EnvironmentOutlined/>
                                        {t.form.address.to.title}
                                    </h4>
                                    <Flex vertical gap={16}>
                                        <div className={styles.addressField}>
                                            <Form.Item
                                                name="toAddress"
                                                label={t.form.address.to.label}
                                                rules={[{required: true, message: t.form.validation.addressRequired}]}
                                            >
                                                <Input
                                                    placeholder={t.form.address.to.placeholder}
                                                    size="large"
                                                />
                                            </Form.Item>
                                        </div>

                                        <Flex gap={16} wrap="wrap">
                                            <Form.Item
                                                name="toFloor"
                                                label={t.form.address.floor}
                                                className={styles.floorInput}
                                            >
                                                <Input
                                                    type="number"
                                                    placeholder={t.form.address.floorPlaceholder}
                                                    size="large"
                                                />
                                            </Form.Item>
                                            <Flex gap={8} vertical>
                                                <div>
                                                    <Form.Item name="toHasLift" valuePropName="checked">
                                                        <Checkbox onChange={(e) => setHasLiftTo(e.target.checked)}>
                                                            {t.form.address.hasLift}
                                                        </Checkbox>
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <Form.Item name="toNeedCrane" valuePropName="checked">
                                                        <Checkbox>
                                                            {t.form.address.needCrane}
                                                        </Checkbox>
                                                    </Form.Item>
                                                </div>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </div>

                                <Flex vertical>
                                    <Form.Item
                                        name="date"
                                        label={<span><CalendarOutlined/> {t.form.date.label}</span>}
                                    >
                                        <DatePicker
                                            style={{width: '100%'}}
                                            size="large"
                                            placeholder={t.form.date.placeholder}
                                        />
                                    </Form.Item>

                                    <div className={styles.checkboxGroup}>
                                        <Form.Item name="needPacking" valuePropName="checked">
                                            <Checkbox>
                                                {t.form.services.packing}
                                            </Checkbox>
                                        </Form.Item>
                                        <Form.Item name="needAssembly" valuePropName="checked">
                                            <Checkbox>
                                                {t.form.services.assembly}
                                            </Checkbox>
                                        </Form.Item>
                                    </div>
                                </Flex>

                                <Form.Item name="comment" label={t.form.comment.label}>
                                    <Input.TextArea
                                        rows={4}
                                        placeholder={t.form.comment.placeholder}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <button
                                        className={styles.ctaButton}
                                        type="submit"
                                        aria-label={t.form.submit}
                                    >
                                        {t.form.submit}
                                    </button>
                                </Form.Item>

                                <div className={styles.seoText} aria-hidden="true">
                                    <p>{t.seoText}</p>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>

            <SuccessModal
                isVisible={isSuccessModalVisible}
                onClose={handleSuccessModalClose}
                lang={lang}
                type="form"
            />
        </section>
    );
};
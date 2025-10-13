"use client"
import {useEffect, useState} from 'react';
import {Col, Rate, Row} from 'antd';
import {CalendarOutlined, EnvironmentOutlined, StarFilled,} from '@ant-design/icons';
import styles from './Reviews.module.scss';
import {getCompanyStats, getReviewsData} from "@/components/Reviews/model/helpers";
import {Review, ReviewsTranslations} from "@/components/Reviews/model/types";
import {CTAForm} from "@/components/CTAForm/CTAForm";
import Image from "next/image";

interface ReviewsProps {
    lang: 'ru' | 'he' | 'en';
    translations: {
        reviews: ReviewsTranslations;
        header: {
            companyName: string;
        };
    };
}

function ReviewsStructuredData({lang, reviewsData, companyName}: {
    lang: string;
    reviewsData: Review[];
    companyName: string;
}) {

    const getDescription = () => {
        switch (lang) {
            case 'he':
                return "שירותים מקצועיים למעבר דירה והובלות בישראל";
            case 'en':
                return "Professional apartment relocation and transportation services in Israel";
            case 'ru':
            default:
                return "Профессиональные услуги по переездам и грузоперевозкам в Израиле";
        }
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": companyName,
        "description": getDescription(),
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": reviewsData.length.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": reviewsData.map(review => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": review.name
            },
            "datePublished": review.date,
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating.toString(),
                "bestRating": "5",
                "worstRating": "1"
            },
            "reviewBody": review.text,
            "itemReviewed": {
                "@type": "Service",
                "name": review.service
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
    );
}

export const Reviews = ({lang, translations}: ReviewsProps) => {
    const [currentReview, setCurrentReview] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const reviewsData = getReviewsData(lang);
    const companyStats = getCompanyStats(lang);
    const t = translations.reviews;

    const minSwipeDistance = 50;

    const nextReview = () => {
        setCurrentReview((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextReview();
        } else if (isRightSwipe) {
            prevReview();
        }
    };

    const formatDisplayDate = (dateString: string) => {
        const locale = lang === 'he' ? 'he-IL' : lang === 'en' ? 'en-US' : 'en-RU';
        return new Date(dateString).toLocaleDateString(locale);
    };

    const getAltText = (name: string) => {
        switch (lang) {
            case 'he':
                return `אווטר ${name}`;
            case 'en':
                return `${name}'s avatar`;
            case 'ru':
            default:
                return `Аватар ${name}`;
        }
    };

    const getArrowDirection = (direction: 'prev' | 'next') => {
        if (lang === 'he') {
            return direction === 'prev' ? '→' : '←';
        } else {
            return direction === 'prev' ? '←' : '→';
        }
    };

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

    useEffect(() => {
        reviewsData.forEach(review => {
            const img = new window.Image();
            img.src = review.avatar;
        });
    }, [reviewsData]);

    return (
        <section className={styles.section} id="reviews" itemScope itemType="https://schema.org/Product">
            <ReviewsStructuredData
                lang={lang}
                reviewsData={reviewsData}
                companyName={translations.header.companyName}
            />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title} itemProp="name">{t.title}</h2>
                    <p className={styles.subtitle}>{t.subtitle}</p>
                </div>
                <Row gutter={[60, 40]}>
                    <Col xs={24} lg={10}>
                        <div className={styles.phoneContainer}>
                            <div className={styles.phone}>
                                <div
                                    className={styles.phoneScreen}
                                    onTouchStart={onTouchStart}
                                    onTouchMove={onTouchMove}
                                    onTouchEnd={onTouchEnd}
                                >
                                    <article className={styles.reviewContent} itemScope
                                             itemType="https://schema.org/Review">
                                        <div className={styles.reviewHeader}>
                                            <Image
                                                width={60}
                                                height={60}
                                                src={reviewsData[currentReview].avatar}
                                                className={styles.avatar}
                                                alt={getAltText(reviewsData[currentReview].name)}
                                                unoptimized
                                                priority={currentReview === 0}
                                            />
                                            <div className={styles.userInfo}>
                                                <h3 className={styles.userName}
                                                    itemProp="author">{reviewsData[currentReview].name}</h3>
                                                <div className={styles.userDetails}>
                                                    <span className={styles.location}>
                                                        <EnvironmentOutlined/>
                                                        {reviewsData[currentReview].location}
                                                    </span>
                                                    <time className={styles.date}
                                                          dateTime={reviewsData[currentReview].date}>
                                                        <CalendarOutlined/>
                                                        {formatDisplayDate(reviewsData[currentReview].date)}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.rating} itemProp="reviewRating" itemScope
                                             itemType="https://schema.org/Rating">
                                            <meta itemProp="ratingValue"
                                                  content={reviewsData[currentReview].rating.toString()}/>
                                            <meta itemProp="bestRating" content="5"/>
                                            <Rate
                                                disabled
                                                value={reviewsData[currentReview].rating}
                                                character={<StarFilled/>}
                                                className={styles.stars}
                                            />
                                            <span className={styles.ratingText}>
                                                {reviewsData[currentReview].rating}.0 {t.labels.rating}
                                            </span>
                                        </div>

                                        <p className={styles.reviewText} itemProp="reviewBody">
                                            {`"${reviewsData[currentReview].text}"`}
                                        </p>

                                        <div className={styles.serviceBadge}>
                                            {t.labels.service} <span>{reviewsData[currentReview].service}</span>
                                        </div>

                                        <div className={styles.navigation}>
                                            <button
                                                className={styles.navButton}
                                                onClick={prevReview}
                                                aria-label={t.navigation.prev}
                                            >
                                                {getArrowDirection('prev')}
                                            </button>
                                            <div className={styles.dots}>
                                                {reviewsData.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`${styles.dot} ${index === currentReview ? styles.activeDot : ''}`}
                                                        onClick={() => setCurrentReview(index)}
                                                        aria-label={`${t.navigation.goToReview} ${index + 1}`}
                                                    />
                                                ))}
                                            </div>
                                            <button
                                                className={styles.navButton}
                                                onClick={nextReview}
                                                aria-label={t.navigation.next}
                                            >
                                                {getArrowDirection('next')}
                                            </button>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} lg={14}>
                        <div className={styles.companyInfo}>
                            <h3 className={styles.companyTitle}>{t.companyTitle}</h3>

                            <div className={styles.companyDescription}>
                                <p dangerouslySetInnerHTML={{__html: t.companyDescription.part1}}/>
                                <p>{t.companyDescription.part2}</p>
                            </div>

                            <div className={styles.statsGrid}>
                                {companyStats.map((stat, index) => (
                                    <div key={index} className={styles.statItem}>
                                        <div className={styles.statIcon}>{stat.icon}</div>
                                        <div className={styles.statContent}>
                                            <div className={styles.statNumber}>{stat.number}</div>
                                            <div className={styles.statText}>{stat.text}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.seoReviews} aria-hidden="true">
                                {reviewsData.map((review, index) => (
                                    <div key={review.id} itemScope itemType="https://schema.org/Review">
                                        <meta itemProp="author" content={review.name}/>
                                        <meta itemProp="datePublished" content={review.date}/>
                                        <meta itemProp="reviewRating" content={review.rating.toString()}/>
                                        <meta itemProp="reviewBody" content={review.text}/>
                                    </div>
                                ))}
                            </div>

                            {/* Используем новый CTA компонент */}
                            <CTAForm
                                lang={lang}
                                translations={ctaTranslations}
                                source="reviews_section"
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};
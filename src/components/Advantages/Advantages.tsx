import {Card, Col, Row} from 'antd';
import styles from './Advantages.module.scss';
import {getAdvantagesData} from "@/components/Advantages/model/helpers";
import {AdvantagesTranslations} from "@/components/Advantages/model/types";

interface AdvantagesProps {
    lang: 'ru' | 'he' | 'en';
    translations: {
        advantages: AdvantagesTranslations;
        header: {
            companyName: string;
        };
    };
}

function AdvantagesStructuredData({lang, companyName}: { lang: string; companyName: string }) {
    const advantagesData = getAdvantagesData(lang as 'ru' | 'he' | 'en');

    // Функции для получения текста в зависимости от языка
    const getServiceName = () => {
        switch (lang) {
            case 'he':
                return "שירותי הובלות גרוזוביצ'וק";
            case 'en':
                return "UrbanMoving Transportation Services";
            case 'ru':
            default:
                return "Услуги грузоперевозок UrbanMoving";
        }
    };

    const getServiceDescription = () => {
        switch (lang) {
            case 'he':
                return "שירותים מקצועיים למעבר עם יתרונות: תמיכה 24/7, איכות השירות, תשלום גמיש";
            case 'en':
                return "Professional relocation services with advantages: 24/7 support, cargo insurance, flexible payment";
            case 'ru':
            default:
                return "Профессиональные услуги по переездам с преимуществами: круглосуточная поддержка, страхование груза, гибкая оплата";
        }
    };

    const getProviderDescription = () => {
        switch (lang) {
            case 'he':
                return "הובלות מקצועיות בישראל";
            case 'en':
                return "Professional transportation services in Israel";
            case 'ru':
            default:
                return "Профессиональные грузоперевозки в Израиле";
        }
    };

    const getServiceType = () => {
        switch (lang) {
            case 'he':
                return "הובלות ומעבר דירה";
            case 'en':
                return "Transportation and relocation services";
            case 'ru':
            default:
                return "Грузоперевозки и переезды";
        }
    };

    const getCatalogName = () => {
        switch (lang) {
            case 'he':
                return "יתרונות השירותים שלנו";
            case 'en':
                return "Our Service Advantages";
            case 'ru':
            default:
                return "Преимущества наших услуг";
        }
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": getServiceName(),
        "description": getServiceDescription(),
        "provider": {
            "@type": "LocalBusiness",
            "name": companyName,
            "description": getProviderDescription(),
            "areaServed": "IL",
            "serviceType": getServiceType()
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": getCatalogName(),
            "itemListElement": advantagesData.map((advantage, index) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": advantage.schemaType,
                    "name": advantage.title,
                    "description": advantage.description
                }
            }))
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
    );
}

const Advantages = ({lang, translations}: AdvantagesProps) => {
    const advantagesData = getAdvantagesData(lang);
    const t = translations.advantages;

    return (
        <section className={styles.advantages} id="advantages" itemScope itemType="https://schema.org/Service">
            <AdvantagesStructuredData lang={lang} companyName={translations.header.companyName}/>

            <div className={styles.container}>
                <h2 className={styles.title} itemProp="name">
                    {t.title}
                </h2>
                <p className={styles.subtitle}>
                    {t.subtitle}
                </p>

                <Row gutter={[30, 30]}>
                    {advantagesData.map((advantage, index) => (
                        <Col xs={24} md={8} key={index}>
                            <article className={styles.cardWrapper} itemScope
                                     itemType={`https://schema.org/${advantage.schemaType}`}>
                                <Card className={styles.card}>
                                    <div className={styles.icon} itemProp="image">
                                        {advantage.icon}
                                    </div>
                                    <h3 className={styles.cardTitle} itemProp="name">
                                        {advantage.title}
                                    </h3>
                                    <p className={styles.description} itemProp="description">
                                        {advantage.description}
                                    </p>

                                    {/* Скрытые микроразметки для SEO */}
                                    <meta itemProp="provider" content={translations.header.companyName}/>
                                    <meta itemProp="areaServed" content="IL"/>
                                </Card>
                            </article>
                        </Col>
                    ))}
                </Row>

                <div className={styles.seoContent} aria-hidden="true">
                    <p dangerouslySetInnerHTML={{__html: t.seoContent.paragraph}}/>
                    <ul>
                        {t.seoContent.listItems.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Advantages;
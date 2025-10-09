"use client"
import {useRouter} from 'next/navigation'
import {useEffect, useState, useRef} from 'react'
import {Button, Col, Row, Select, Space, Switch} from 'antd'
import {EyeOutlined, UndoOutlined} from '@ant-design/icons'
import styles from './Header.module.scss'
import {useTranslation} from '@/hooks/use-translation'
import {applyAccessibilitySettings} from "@/components/Header/model/helpers";
import {AccessibilitySettings} from "@/components/Header/model/types";

interface HeaderProps {
    lang: string
}

const Header = ({lang}: HeaderProps) => {
    const [language, setLanguage] = useState(lang)
    const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
        highContrast: false,
        grayscale: false
    })
    const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false)
    const router = useRouter()
    const translations = useTranslation(lang as 'ru' | 'he' | 'en')

    const panelRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        setLanguage(lang)
        const savedSettings = localStorage.getItem('accessibilitySettings')
        if (savedSettings) {
            setAccessibilitySettings(JSON.parse(savedSettings))
            applyAccessibilitySettings(JSON.parse(savedSettings))
        }
    }, [lang])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showAccessibilityPanel &&
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)) {
                setShowAccessibilityPanel(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showAccessibilityPanel])

    const handleLanguageChange = (value: string) => {
        setLanguage(value)
        router.push(`/${value}`)
    }

    const handleAccessibilitySettingChange = (setting: keyof AccessibilitySettings, value: boolean) => {
        const newSettings = {
            ...accessibilitySettings,
            [setting]: value
        }

        setAccessibilitySettings(newSettings)
        applyAccessibilitySettings(newSettings)

        localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings))
    }

    const resetAccessibilitySettings = () => {
        const defaultSettings = {
            highContrast: false,
            largeText: false,
            grayscale: false
        }

        setAccessibilitySettings(defaultSettings)
        applyAccessibilitySettings(defaultSettings)

        localStorage.removeItem('accessibilitySettings')

        document.documentElement.style.cssText = ''
        document.body.style.cssText = ''
    }

    const toggleAccessibilityPanel = () => {
        setShowAccessibilityPanel(!showAccessibilityPanel)
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Row align="middle" justify="space-between">
                        <Col>
                            <div className={styles.logo}>
                                <img
                                    src="/logo.png"
                                    alt={translations.header?.companyName}
                                />
                                <span>{translations.header?.companyName}</span>
                            </div>
                        </Col>
                        <Col>
                            <Space size="middle">
                                <Button
                                    ref={buttonRef}
                                    type="text"
                                    icon={<EyeOutlined/>}
                                    onClick={toggleAccessibilityPanel}
                                    className={styles.accessibilityButton}
                                    aria-label={translations.header?.accessibilitySettings}
                                    aria-expanded={showAccessibilityPanel}
                                />

                                <div className={styles.contacts}>
                                    <Select
                                        value={language}
                                        onChange={handleLanguageChange}
                                        className={styles.languageSelect}
                                        options={[
                                            {value: 'ru', label: 'RU'},
                                            {value: 'he', label: 'HE'},
                                            {value: 'en', label: 'EN'},
                                        ]}
                                    />
                                </div>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </header>

            {showAccessibilityPanel && (
                <div
                    ref={panelRef}
                    className={styles.accessibilityPanel}
                    role="dialog"
                    aria-label={translations.header?.accessibilitySettings}
                >
                    <div className={styles.panelContent}>
                        <h3>{translations.header?.accessibilitySettings}</h3>

                        <Space direction="vertical" size="middle">
                            <div className={styles.settingItem}>
                                <span>{translations.header?.highContrast}</span>
                                <Switch
                                    checked={accessibilitySettings.highContrast}
                                    onChange={(checked) => handleAccessibilitySettingChange('highContrast', checked)}
                                    aria-label={translations.header?.highContrast}
                                />
                            </div>

                            <div className={styles.settingItem}>
                                <span>{translations.header?.grayscaleMode}</span>
                                <Switch
                                    checked={accessibilitySettings.grayscale}
                                    onChange={(checked) => handleAccessibilitySettingChange('grayscale', checked)}
                                    aria-label={translations.header?.grayscaleMode}
                                />
                            </div>

                            <Button
                                type="default"
                                icon={<UndoOutlined/>}
                                onClick={resetAccessibilitySettings}
                                className={styles.resetButton}
                            >
                                {translations.header?.resetSettings}
                            </Button>
                        </Space>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
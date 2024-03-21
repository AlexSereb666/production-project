import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/index';
import { LangSwitcher } from 'widgets/LangSwitcher/index';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const { t } = useTranslation('main');

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            data-testId="sidebar"
            className={
                classNames(
                    cls.Sidebar,
                    { [cls.collapsed]: collapsed },
                    [className],
                )
            }
        >
            <Button
                data-testId="sidebar-toggle"
                onClick={onToggle}
            >
                {t('Скрыть')}
            </Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};

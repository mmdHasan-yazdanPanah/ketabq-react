import React from 'react';
import DelayedLink from '../components/delayedLink';

import useGlobalState from '../globalStates/globalStates';

import { ReactComponent as IconNext } from '../images/icons/next.svg';
import { ReactComponent as IconFire } from '../images/icons/fire.svg';
import CountDown from './countdown';

const SectionHeader = ({
    children,
    className,
    type,
    countDown,
    fontsizeClass,
    link,
}) => {
    const [theme] = useGlobalState('theme');

    return (
        <DelayedLink
            to={link ? link : '#'}
            className={`section-header ${
                theme === 'dark' ? 'section-header--dark' : ''
            } my-0 is-mobile ${className ? className : ''}`}
            style={{ direction: 'rtl', display: 'block' }}
            delay={19}>
            <div className="level is-mobile">
                <div className="level-right">
                    <div className="level-item">
                        <h6
                            className={`${
                                fontsizeClass ? fontsizeClass : 'is-size-6'
                            }`}>
                            {children}
                        </h6>
                        {type === 'hot' ? (
                            <IconFire
                                className="mr-2"
                                style={{ transform: 'translateY(-2px)' }}
                            />
                        ) : null}
                    </div>
                </div>
                <div className="level-left">
                    {type === 'hot' && countDown ? (
                        <CountDown countDown={countDown} />
                    ) : (
                        <div
                            role="button"
                            className="level-item level nav-item">
                            <span className="level-item is-size-7--responsive is-size-7--responsive-desktop-up ml-1 has-text-weight-light ">
                                بیشتر
                            </span>
                            <span className="level-item section-header_icon">
                                <IconNext className="iconNext--primary" />
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </DelayedLink>
    );
};

export default SectionHeader;

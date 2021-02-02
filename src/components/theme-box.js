/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import useGlobalState from '../globalStates/globalStates';

import { ReactComponent as SunIcon } from '../images/icons/theme/sun.svg';
import { ReactComponent as MonnIcon } from '../images/icons/theme/moon.svg';

const ThemeBox = ({ className }) => {
    const [theme, setTheme] = useGlobalState('theme');
    const [props, set] = useSpring(() => ({
        config: { tension: 300, friction: 13 },
    }));

    const moonRef = useRef();
    const sunRef = useRef();

    const changeActivatorPlace = (name) => {
        setTheme(name);
        localStorage.setItem('theme', name);

        switch (name) {
            case 'dark':
                document.querySelector('meta[name=theme-color]').content =
                    '#212121';
                break;

            case 'light':
                document.querySelector('meta[name=theme-color]').content =
                    '#F1F3F4';
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        if (theme === 'light') {
            const left = sunRef.current.offsetLeft;
            const top = sunRef.current.offsetTop;
            const width = sunRef.current.offsetWidth;
            const height = sunRef.current.offsetHeight;

            set({
                to: {
                    left: `${left + width / 2}px`,
                    top: `${top + height / 2}px`,
                },
            });
        }
        if (theme === 'dark') {
            const left = moonRef.current.offsetLeft;
            const top = moonRef.current.offsetTop;
            const width = moonRef.current.offsetWidth;
            const height = moonRef.current.offsetHeight;

            set({
                to: {
                    left: `${left + width / 2}px`,
                    top: `${top + height / 2}px`,
                },
            });
        }
    }, [theme]);

    return (
        <div className={`theme-box ${className ? className : ''}`}>
            <div className="theme-box_wrapper">
                <animated.span
                    style={props}
                    className="theme-box_activator"></animated.span>
                <span
                    className={`theme-box_sun ${
                        theme !== 'light' ? 'theme-box_sun--inactive' : ''
                    }`}
                    ref={sunRef}>
                    <SunIcon onClick={() => changeActivatorPlace('light')} />
                </span>
                <span
                    className={`theme-box_moon ${
                        theme === 'dark' ? 'theme-box_moon--active' : ''
                    }`}
                    ref={moonRef}>
                    <MonnIcon onClick={() => changeActivatorPlace('dark')} />
                </span>
            </div>
        </div>
    );
};

export default ThemeBox;

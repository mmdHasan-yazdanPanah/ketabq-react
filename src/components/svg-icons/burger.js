import React from 'react';
import * as styles from './burger.module.scss';
import useGlobalState from '../../globalStates/globalStates';
import { colors } from '../../globalStates/statics.js';

const Burger = ({ width, height, strokeWidth, clickCallBack, closed }) => {
    const [theme] = useGlobalState('theme');

    const clickBurgerHandler = (callback) => {
        if (callback) {
            callback();
        }
    };

    return (
        <span
            onClick={() => clickBurgerHandler(clickCallBack)}
            className={`${styles['hamburglar']} ${
                closed ? styles['is-closed'] : ''
            }`}>
            <div
                id={styles['top']}
                style={{
                    width: parseInt(width) / 1.9 + 'px',
                    height: strokeWidth + 'px',
                }}
                className={`transition-common ${
                    theme === 'dark' ? 'has-background-white' : ''
                }`}></div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                x="0px"
                y="0px"
                enableBackground="new 0 0 64 64"
                version="1.1"
                viewBox="0 0 64 64"
                xmlSpace="preserve"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <path
                    style={{ stroke: colors['primary'] }}
                    id={styles['circle']}
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth={strokeWidth}
                    d="M16 32h32s11.723-.306 10.75-11c-.25-2.75-1.644-4.971-2.869-7.151C50.728 7.08 42.767 2.569 33.733 2.054 33.159 2.033 32.599 2 32 2 15.432 2 2 15.432 2 32c0 16.566 13.432 30 30 30 16.566 0 30-13.434 30-30C62 15.5 48.5 2 32 2S1.875 15.5 1.875 32"
                />
            </svg>
            <div
                id={styles['bottom']}
                className={`transition-common ${
                    theme === 'dark' ? 'has-background-white' : ''
                }`}></div>
        </span>
    );
};

export default Burger;

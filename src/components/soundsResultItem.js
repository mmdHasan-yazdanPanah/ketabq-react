import React from 'react';

import useGlobalState from '../globalStates/globalStates';

import { ReactComponent as IconHeadphone } from '../images/icons/headphones.svg';

const SoundSResultItem = ({
    className,
    name,
    author,
    narrator,
    type,
    playing,
    duration,
    ...rest
}) => {
    const [theme] = useGlobalState('theme');

    return (
        <div
            {...rest}
            href="#"
            className={`is-clickable ${
                type === 'audio' ? 'soundResult-item--audio' : ''
            } soundResult-item ${
                theme === 'light'
                    ? 'soundResult-item--light'
                    : 'soundResult-item--dark'
            }  ${className ? className : ''}`}
        >
            <div className="soundResult-item_icon-wrapper">
                {type === 'audio' ? (
                    <svg
                        className={`soundResult-item_icon-play ${
                            playing ? 'soundResult-item_icon-play--active' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                    >
                        <g>
                            <circle
                                style={{ transformOrigin: 'center' }}
                                cx="15"
                                cy="15"
                                r="15"
                                transform={`${
                                    playing ? 'scale(1)' : 'scale(0)'
                                }`}
                                fill="#ffc107"
                            />
                            {playing ? (
                                <g
                                    transform="translate(2.521 2.298)"
                                    className={`soundResult-item_icon-pause ${
                                        playing
                                            ? 'soundResult-item_icon-pause--active'
                                            : ''
                                    }`}
                                >
                                    <path
                                        d="M12.972,10.5A1.472,1.472,0,0,0,11.5,11.972v7.851a1.472,1.472,0,0,0,2.944,0V11.972A1.472,1.472,0,0,0,12.972,10.5Zm.491,9.323a.491.491,0,1,1-.981,0V11.972a.491.491,0,1,1,.981,0Z"
                                        transform="translate(-3.112 -2.798)"
                                        fill="#fff"
                                    />
                                    <path
                                        d="M18.972,10.5A1.472,1.472,0,0,0,17.5,11.972v7.851a1.472,1.472,0,0,0,2.944,0V11.972A1.472,1.472,0,0,0,18.972,10.5Zm.491,9.323a.491.491,0,0,1-.981,0V11.972a.491.491,0,0,1,.981,0Z"
                                        transform="translate(-3.224 -2.798)"
                                        fill="#fff"
                                    />
                                </g>
                            ) : (
                                <g
                                    transform="translate(-1.496 -1.506)"
                                    className={`soundResult-item_icon-playIcon ${
                                        !playing
                                            ? 'soundResult-item_icon-playIcon--active'
                                            : ''
                                    }`}
                                >
                                    <path
                                        d="M31.142,13.28A15,15,0,1,0,19.765,31.142,15,15,0,0,0,31.142,13.28ZM19.5,30.138a13.963,13.963,0,1,1-6-27.273,13.663,13.663,0,0,1,3-.331,13.963,13.963,0,0,1,3,27.6Z"
                                        transform="translate(0)"
                                        fill="#ffc107"
                                    />
                                    <path
                                        d="M22.055,14.755l-7.829-4.747a1.655,1.655,0,0,0-1.717,0A1.676,1.676,0,0,0,11.63,11.5v9.567a1.707,1.707,0,0,0,2.6,1.355l7.829-4.789a1.707,1.707,0,0,0,0-2.917Zm-.538,2.069L13.688,21.6a.652.652,0,0,1-.672,0,.672.672,0,0,1-.352-.59V11.435a.672.672,0,0,1,.352-.59.621.621,0,0,1,.321-.083.693.693,0,0,1,.352.093l7.829,4.789a.641.641,0,0,1,.321.569.662.662,0,0,1-.321.579Z"
                                        transform="translate(0.347 0.283)"
                                        fill="#ffc107"
                                    />
                                </g>
                            )}
                        </g>
                    </svg>
                ) : (
                    <IconHeadphone className="soundResult-item_icon" />
                )}
            </div>
            <cite className="soundResult-item_name has-text-weight-semibold">
                {name}
            </cite>
            {type !== 'audio' ? (
                <span className="soundResult-item_author has-text-weight-semibold">
                    {author}
                </span>
            ) : null}
            <span className="soundResult-item_narrator has-text-weight-semibold">
                {type === 'audio' ? (duration ? duration : '') : narrator}
            </span>
            <span className="soundResult-item_line"></span>
        </div>
    );
};

export default SoundSResultItem;

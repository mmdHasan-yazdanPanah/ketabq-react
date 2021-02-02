import React, { useRef, useEffect, useState } from 'react';
import useGlobalState from '../globalStates/globalStates';
import { ClapSpinner } from 'react-spinners-kit';
import DelayedLink from '../components/delayedLink';

import { colors } from '../globalStates/statics.js';

const CatagoryItem = ({
    children,
    IconSvgReactComponent,
    className,
    href,
    type,
    svgFromPublic,
    objectFallBack,
    loading,
}) => {
    const [theme] = useGlobalState('theme');
    const [exist, setExist] = useState(true);
    const [ready, setReady] = useState(false);

    const docRef = useRef();

    const makeStyles = () => {
        try {
            const doc = docRef.current.getSVGDocument();
            const svg = doc.documentElement;
            svg.style =
                style['cat-item_icon'] +
                (theme === 'dark' ? style['icon-1--light'] : '');
        } catch {
            return;
        }
    };

    useEffect(makeStyles, [theme]);

    let catClass = 'cat-item--small';
    let fontsize = 'is-size-8 is-size-8--responsive-tablet-up';

    if (type === 'large') {
        catClass = 'cat-item--large';
        fontsize = 'is-size-7';
    }

    const style = {
        'cat-item_icon': `width: 100%;height: 100%;`,
        'icon-1--light': `fill: ${colors['white']};`,
    };

    return (
        <div className={`${className ? className : ''}`}>
            <DelayedLink
                delay={190}
                style={loading ? { pointerEvents: 'none' } : {}}
                to={href}
                className={`${theme === 'dark' ? 'link--dark' : ''}`}>
                <figure className={`cat-item ${catClass}`}>
                    <div
                        style={!exist ? { padding: 0, overflow: 'hidden' } : {}}
                        className={`cat-item_box has-background-white transition-common ${
                            theme === 'dark'
                                ? 'has-background-black-ter cat-item_box--dark'
                                : 'cat-item_box--light'
                        }`}>
                        {' '}
                        {loading ? (
                            <ClapSpinner size={20} />
                        ) : IconSvgReactComponent ? (
                            <IconSvgReactComponent
                                className={`cat-item_icon ${
                                    theme === 'dark' ? 'icon-1--light' : ''
                                }`}
                            />
                        ) : svgFromPublic && exist ? (
                            <object
                                style={
                                    !ready
                                        ? {
                                              visibility: 'hidden',
                                              width: '100%',
                                              height: '100%',
                                          }
                                        : {
                                              pointerEvents: 'none',
                                              width: '100%',
                                              height: '100%',
                                          }
                                }
                                ref={docRef}
                                data={svgFromPublic}
                                type="image/svg+xml"
                                onLoad={(e) => {
                                    console.log(e.target);
                                    try {
                                        if (
                                            e.target.getSVGDocument()
                                                .documentElement.nodeName ===
                                            'svg'
                                        ) {
                                            console.log(
                                                e.target.getSVGDocument()
                                            );
                                            setExist(true);
                                            setReady(true);
                                        } else {
                                            setExist(false);
                                            setReady(true);
                                        }
                                    } catch {
                                        setExist(false);
                                        setReady(true);
                                    }
                                    makeStyles();
                                }}>
                                درحال بارگیری ...
                            </object>
                        ) : (
                            objectFallBack
                        )}
                    </div>
                    <figcaption className={`cat-item_caption ${fontsize} mt-1`}>
                        {children}
                    </figcaption>
                </figure>
            </DelayedLink>
        </div>
    );
};

export default CatagoryItem;

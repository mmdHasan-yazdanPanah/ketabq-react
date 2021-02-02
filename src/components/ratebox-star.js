import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// import { ReactComponent as StarOutline } from '../images/icons/star-outline.svg';
// import { ReactComponent as StarFull } from '../images/icons/star-full.svg';

const StarFull = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="10.787"
        height="10.787"
        viewBox="0 0 10.787 10.787">
        <path
            d="M10.5,3.874,7.185,3.367,5.7.2a.351.351,0,0,0-.61,0L3.6,3.367.286,3.874a.338.338,0,0,0-.19.569L2.505,6.917l-.569,3.5a.337.337,0,0,0,.5.35L5.394,9.123l2.962,1.64a.337.337,0,0,0,.5-.35l-.569-3.5,2.409-2.473a.338.338,0,0,0-.19-.57Z"
            transform="translate(0 -0.018)"
            fill="#ffc107"
        />
    </svg>
);

const StarOutline = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="10.79"
        height="10.79"
        viewBox="0 0 10.79 10.79">
        <path
            d="M2.416,11.282a.556.556,0,0,1-.336-.114.612.612,0,0,1-.223-.618L2.551,7.36.2,5.205A.615.615,0,0,1,.029,4.57a.579.579,0,0,1,.493-.411l3.115-.3L4.868.856a.564.564,0,0,1,1.055,0L7.154,3.863l3.114.3a.578.578,0,0,1,.494.411.615.615,0,0,1-.168.636L8.241,7.359l.694,3.191a.611.611,0,0,1-.223.618.553.553,0,0,1-.63.029L5.4,9.522,2.71,11.2a.557.557,0,0,1-.294.085ZM5.4,8.8a.557.557,0,0,1,.294.085l2.535,1.582L7.569,7.455a.614.614,0,0,1,.182-.583L9.974,4.838,7.033,4.559A.576.576,0,0,1,6.556,4.2L5.4,1.359,4.233,4.2a.574.574,0,0,1-.475.361L.817,4.837,3.04,6.871a.613.613,0,0,1,.182.584l-.655,3.011L5.1,8.885A.557.557,0,0,1,5.4,8.8ZM3.613,3.921h0Zm3.564,0h0Zm0,0"
            transform="translate(-0.001 -0.492)"
            fill="#ffc107"
        />
    </svg>
);

const RateboxStar = ({
    className,
    rate,
    sizeClass,
    clickable,
    onChangeRateHandler,
    style,
    ...props
}) => {
    const [isClicked, setClicked] = useState(false);

    const [rateState, setRateState] = useState(rate);
    useEffect(() => {
        setRateState(rate);
    }, [rate]);
    useEffect(() => {
        if (onChangeRateHandler) {
            console.log(rate);
            onChangeRateHandler(rateState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rateState]);

    const allStarsRef = useRef();

    // THE SIZE OF SVGs MUST SET WITH className Prop.

    const hoverHandler = (e) => {
        let allStarSvg = allStarsRef.current.querySelectorAll('.ratebox-star');
        allStarSvg.forEach((star, index) => {
            if (star === e.currentTarget) {
                setRateState(index + 1);
            }
        });
    };

    const clickHandler = (e) => {
        if (!isClicked) {
            setClicked(true);
        } else {
            let allStarSvg = allStarsRef.current.querySelectorAll(
                '.ratebox-star'
            );
            allStarSvg.forEach((star, index) => {
                if (star === e.currentTarget) {
                    if (index + 1 === rateState) {
                        setClicked(false);
                        setRateState(0);
                    } else {
                        setRateState(index + 1);
                    }
                }
            });
        }
    };

    if (rateState > 5) {
        setRateState(5);
    }

    const maxRate = 5;
    let full = Math.floor(rateState);
    let empty = Math.floor(maxRate - rateState);
    let half = 0;
    if (full + empty !== maxRate) {
        half = rateState - full;
    }

    let fullItems = [];
    for (let i = 0; i < full; i++) {
        fullItems.push(
            <span
                key={i}
                className={`ratebox-star ${clickable ? 'is-clickable' : ''}`}
                onMouseEnter={
                    clickable && !isClicked ? (e) => hoverHandler(e) : null
                }
                onClick={clickable ? (e) => clickHandler(e) : null}>
                <StarFull className={sizeClass ? sizeClass : ''} />
            </span>
        );
    }

    let outlineItems = [];
    for (let i = 0; i < empty; i++) {
        outlineItems.push(
            <span
                key={i}
                className={`ratebox-star ${clickable ? 'is-clickable' : ''}`}
                onMouseEnter={
                    clickable && !isClicked ? (e) => hoverHandler(e) : null
                }
                onClick={clickable ? (e) => clickHandler(e) : null}>
                <StarOutline className={sizeClass ? sizeClass : ''} />
            </span>
        );
    }

    let halfItem;
    if (half > 0) {
        halfItem = (
            <div
                className={`ratebox-star is-relative ${
                    clickable ? 'is-clickable' : ''
                }`}>
                <StarOutline
                    onMouseEnter={
                        clickable && !isClicked ? (e) => hoverHandler(e) : null
                    }
                    onClick={clickable ? (e) => clickHandler(e) : null}
                    className={`ratebox-star_outline ${
                        sizeClass ? sizeClass : ''
                    }`}
                />
                <StarFull
                    onMouseEnter={
                        clickable && !isClicked ? (e) => hoverHandler(e) : null
                    }
                    onClick={clickable ? (e) => clickHandler(e) : null}
                    className={`ratebox-star_full ${
                        sizeClass ? sizeClass : ''
                    }`}
                    style={{
                        clipPath: `polygon(0 0, ${half * 100}% 0, ${
                            half * 100
                        }% 100%, 0 100%)`,
                    }}
                />
            </div>
        );
    }

    return (
        <section
            {...props}
            onMouseLeave={
                clickable && !isClicked ? () => setRateState(0) : null
            }
            ref={allStarsRef}
            className={`is-inline-flex ${className}`}
            style={
                !style ? { direction: 'ltr' } : { ...style, direction: 'ltr' }
            }>
            {fullItems}
            {halfItem ? halfItem : null}
            {outlineItems}
        </section>
    );
};

export default RateboxStar;

RateboxStar.propTypes = {
    className: PropTypes.string,
    rate: PropTypes.number.isRequired,
};

import React, { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';



import { ReactComponent as StarOutline } from '../images/icons/star-outline.svg';

import { ReactComponent as StarFull } from '../images/icons/star-full.svg';



const RateboxStar = ({

    className,

    rate,

    sizeClass,

    clickable,

    onChangeRateHandler,

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

                onClick={clickable ? (e) => clickHandler(e) : null}

            >

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

                onClick={clickable ? (e) => clickHandler(e) : null}

            >

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

                }`}

            >

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

            onMouseLeave={

                clickable && !isClicked ? () => setRateState(0) : null

            }

            ref={allStarsRef}

            className={`is-inline-flex ${className}`}

            style={{ direction: 'ltr' }}

        >

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


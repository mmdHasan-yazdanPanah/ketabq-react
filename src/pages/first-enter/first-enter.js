import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Transition, Spring } from 'react-spring/renderprops';
import { Link } from 'react-router-dom';

import useGlobalState from '../../globalStates/globalStates';
import { pageTitles } from '../../globalStates/statics';

// import chnageVhFun from '../../components/changevh';
import FirstEnterPageCom from '../../components/first-enter-main-part';
import logo from '../../images/icons/logo.svg';
import Next from '../../components/next';
import Button from '../../components/buttons/button';

import { ReactComponent as SvgImageAnimation } from '../../images/result2.svg';
import { ReactComponent as SvgImageAnimation2 } from '../../images/first-enter--2.svg';
import { ReactComponent as SvgImageAnimation3 } from '../../images/first-enter--3.svg';
import { ReactComponent as SvgImageAnimation4 } from '../../images/first-enter--4.svg';

const items = [
    {
        id: 0,
        mainSvg: SvgImageAnimation,
        underSvgTextLevel1: 'دنیایی از هزاران کتاب صوتی',
        underSvgTextLevel2: 'با صدای بهترین گویندگان ایران',
    },
    {
        id: 1,
        mainSvg: SvgImageAnimation2,
        underSvgTextLevel1: 'دسته بندی متنوع و جذاب',
        underSvgTextLevel2: 'از معروف ترین کتاب های ایران و جهان',
    },
    {
        id: 2,
        mainSvg: SvgImageAnimation3,
        underSvgTextLevel1: 'جستجوی هوشمند',
        underSvgTextLevel2: 'هر کتابی که می خواهید در سه سوت پیدا کنید',
    },
    {
        id: 3,
        mainSvg: SvgImageAnimation4,
        underSvgTextLevel1: 'به دنیای جذاب کتاب کیو وارد شوید',
        underSvgTextLevel2: 'و از شنیدن کتاب ها لذت ببرید',
    },
];

const FirstEnter = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [beforePageIndex, setBeforePageIndex] = useState(-1);
    const [, setStarted] = useGlobalState('started');

    // useEffect(() => {
    //     chnageVhFun(containerRef.current, 'minHeight', 100);
    // }, []);

    useEffect(() => {
        document.title = pageTitles.start;
    });

    let containerRef = useRef();

    useEffect(() => {
        if (pageIndex === items.length - 1) {
            setStarted(true);
            localStorage.setItem('started', true);
        }
    }, [pageIndex, setStarted]);

    useEffect(() => {
        let startMouseX = null;
        let moveNeeded = 60;
        let mousedownWorked = false;
        let mouseupWorked = false;

        containerRef.current.onmousedown = (event) => {
            console.log('mouse down');
            mousedownWorked = true;
            startMouseX = event.clientX;
            event.currentTarget.onmousemove = (event) => {
                console.log('mouse move');
                const x = event.clientX;
                if (x - startMouseX >= moveNeeded) {
                    event.currentTarget.onmousemove = null;
                    if (pageIndex !== 0) {
                        setPageIndex((prevState) => prevState - 1);
                        setBeforePageIndex((prevState) => prevState - 1);
                    }
                }
                if (x - startMouseX <= moveNeeded * -1) {
                    event.currentTarget.onmousemove = null;
                    if (pageIndex !== items.length - 1) {
                        setPageIndex((prevState) => prevState + 1);
                        setBeforePageIndex((prevState) => prevState + 1);
                    }
                }
            };
        };

        if (!mousedownWorked) {
            containerRef.current.ontouchstart = (event) => {
                console.log(event, 'start');
                startMouseX = event.touches[0].clientX;
                event.currentTarget.ontouchmove = (event) => {
                    console.log(event, 'move');
                    const x = event.touches[0].clientX;
                    if (x - startMouseX >= moveNeeded) {
                        event.currentTarget.ontouchmove = null;
                        if (pageIndex !== 0) {
                            setPageIndex((prevState) => prevState - 1);
                            setBeforePageIndex((prevState) => prevState - 1);
                        }
                    }
                    if (x - startMouseX <= moveNeeded * -1) {
                        event.currentTarget.ontouchmove = null;
                        if (pageIndex !== items.length - 1) {
                            setPageIndex((prevState) => prevState + 1);
                            setBeforePageIndex((prevState) => prevState + 1);
                        }
                    }
                };
            };
        }

        containerRef.current.onmouseup = (event) => {
            console.log('mouse Up');
            mouseupWorked = true;
            event.currentTarget.onmousemove = null;
        };

        if (!mouseupWorked) {
            containerRef.current.ontouchend = (event) => {
                event.currentTarget.ontouchend = null;
            };
        }

        return () => {
            containerRef.current.onmousemove = null;
            containerRef.current.ontouchmove = null;
            containerRef.current.onmousedown = null;
            containerRef.current.ontouchstart = null;
            containerRef.current.onmouseup = null;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            containerRef.current.ontouchend = null;
        };
    }, [pageIndex]);

    const props = useSpring({
        transform: 'translateY(0%)',
        number: 1.5,
        from: { transform: 'translateY(-100%)', number: 0 },
    });

    const nextHandler = () => {
        setPageIndex((prevState) => prevState + 1);
        setBeforePageIndex((prevState) => prevState + 1);
        console.log('clicked');
    };

    return (
        <animated.div
            ref={containerRef}
            style={{ ...props, height: '100%' }}
            className="is-clipped hero container px-4 pt-4 pb-5 is-family-primary">
            <header className="level is-mobile z-index--10">
                <div className="level-left">
                    <div className="level-item">
                        {
                            <Spring
                                to={
                                    pageIndex + 1 < items.length
                                        ? {
                                              opacity: 1,
                                          }
                                        : {
                                              opacity: 1,
                                          }
                                }>
                                {(props) => (
                                    // eslint-disable-next-line
                                    <Link
                                        to={
                                            pageIndex + 1 < items.length
                                                ? '/start'
                                                : '/'
                                        }
                                        onClick={() => {
                                            setPageIndex(items.length - 1);
                                            setBeforePageIndex(
                                                items.length - 2
                                            );
                                        }}
                                        style={props}
                                        className={`level-item is-size-6 has-text-weight-light ${
                                            pageIndex + 1 >= items.length
                                                ? 'has-text-primary'
                                                : ''
                                        }`}>
                                        {pageIndex + 1 < items.length
                                            ? 'رد کردن'
                                            : 'صفحه اصلی'}
                                    </Link>
                                )}
                            </Spring>
                        }
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <Link to="/">
                            <figure className="image mr-0 logo logo--responsive">
                                <img src={logo} alt="لوگو کتاب کیو" />
                            </figure>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="hero-body hero">
                <div
                    className="is-relative is-clipped"
                    style={{ height: '100%', width: '100%' }}>
                    <Transition
                        items={items[pageIndex]}
                        keys={(item) => item.id}
                        from={
                            beforePageIndex < pageIndex
                                ? {
                                      transform: 'translate(50%, -50%)',
                                      number: 0,
                                  }
                                : {
                                      transform: 'translate(-150%, -50%)',
                                      number: 0,
                                  }
                        }
                        enter={{
                            transform: 'translate(-50%, -50%)',
                            number: 1.5,
                        }}
                        leave={
                            beforePageIndex < pageIndex
                                ? { transform: 'translate(-150%, -50%)' }
                                : { transform: 'translate(50%, -50%)' }
                        }>
                        {(item) => (props) => {
                            return (
                                <FirstEnterPageCom
                                    style={props}
                                    {...item}
                                    started={props.number > 1}>
                                    {item.id + 1 === items.length ? (
                                        <Link to="/login_signup">
                                            <Button className="mt-5">
                                                ورود یا ثبت نام
                                            </Button>
                                        </Link>
                                    ) : null}
                                </FirstEnterPageCom>
                            );
                        }}
                    </Transition>
                </div>
            </main>

            <Spring
                to={
                    pageIndex + 1 < items.length
                        ? { transform: 'translateY(0%)', opacity: 1 }
                        : { transform: 'translateY(100%)', opacity: 0 }
                }>
                {(props) => (
                    <footer className="is-relative">
                        <Next onClickHandler={nextHandler} style={props} />
                    </footer>
                )}
            </Spring>
            <Transition
                items={pageIndex + 1 === items.length}
                from={{ transform: 'scale(30%)', opacity: 0 }}
                leave={{ transform: 'scale(30%)', opacity: 0 }}
                enter={{ transform: 'scale(100%)', opacity: 1 }}
                config={{ mass: 3, tension: 180, friction: 40, delay: 300 }}>
                {(item) => (props) =>
                    item ? (
                        <footer className="is-relative">
                            <div
                                style={props}
                                className="content bottomAbsolute">
                                <p className="has-text-centered firstenter_version-text--responsive">
                                    ورژن 1.0
                                </p>
                            </div>
                        </footer>
                    ) : null}
            </Transition>
        </animated.div>
    );
};

export default FirstEnter;

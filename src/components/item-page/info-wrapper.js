import React, { useState, useEffect, useRef } from 'react';
import { animated, Transition } from 'react-spring/renderprops';

import useGlobalState from '../../globalStates/globalStates';

import Specifications from './specifications';
import Details from './details';
import Comments from './comments';

const ItemPageInfoWrapper = ({
    specificationItems,
    description,
    commentItems,
    loading,
    commentSubmitHandler,
    hasBook,
    allCommentsLink,
}) => {
    const [current, setCurrest] = useState(0);
    const [theme] = useGlobalState('theme');

    const mainRef = useRef();
    const headerRef = useRef();

    useEffect(() => {
        mainRef.current.scrollTo(0, 0);
    }, [current]);

    const items = [
        <div className="mt-3 pr-3">
            <Specifications items={specificationItems} />
        </div>,
        <Details className="mr-3" value={description} />,
        <Comments
            hasBook={hasBook}
            items={commentItems}
            commentSubmitHandler={commentSubmitHandler}
            allCommentsLink={allCommentsLink}
        />,
    ];

    const handleClick = (index) => {
        setCurrest(index);
    };

    const goToHeader = () => {
        setTimeout(() => {
            headerRef.current.scrollIntoView();
        }, 10);
    };

    return (
        <React.Fragment>
            <header
                ref={headerRef}
                className="columns mx-0 is-mobile has-text-weight-semibold has-text-centered px-4 mt-3 mb-5">
                <div
                    onClick={() => {
                        handleClick(0);
                        goToHeader();
                    }}
                    className={`column item-page_info-headerItem ${
                        theme === 'light'
                            ? 'item-page_info-headerItem--light'
                            : 'item-page_info-headerItem--dark'
                    } ${
                        current === 0 ? 'item-page_info-headerItem--active' : ''
                    }`}>
                    <span>مشخصات</span>
                </div>
                <div
                    onClick={() => {
                        handleClick(1);
                        goToHeader();
                    }}
                    className={`column item-page_info-headerItem ${
                        theme === 'light'
                            ? 'item-page_info-headerItem--light'
                            : 'item-page_info-headerItem--dark'
                    } ${
                        current === 1 ? 'item-page_info-headerItem--active' : ''
                    }`}>
                    <span>توضیحات</span>
                </div>
                <div
                    id="item-comments"
                    onClick={() => {
                        handleClick(2);
                        goToHeader();
                    }}
                    className={`column item-page_info-headerItem ${
                        theme === 'light'
                            ? 'item-page_info-headerItem--light'
                            : 'item-page_info-headerItem--dark'
                    } ${
                        current === 2 ? 'item-page_info-headerItem--active' : ''
                    }`}>
                    <span>نظرات</span>
                </div>
            </header>

            <main
                style={{ scrollBehavior: 'smooth' }}
                className="item-page_info-itemsWrapper mr-4 pl-5 ml-2 pb-3"
                ref={mainRef}>
                <Transition
                    native
                    items={current}
                    from={{ transform: 'scale(0)', display: 'none' }}
                    enter={{ transform: 'scale(1)', display: 'block' }}
                    leave={{ transform: 'scale(0)', display: 'none' }}>
                    {(Currentindex) => (props) => (
                        <animated.div style={props}>
                            {items[Currentindex]}
                        </animated.div>
                    )}
                </Transition>
            </main>
        </React.Fragment>
    );
};

export default ItemPageInfoWrapper;

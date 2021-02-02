import React from 'react';
import { Link } from 'react-router-dom';

import useGlobalState from '../../globalStates/globalStates';

import Buttton from '../../components/buttons/button';
import RateboxStart from '../ratebox-star';

import { ReactComponent as ArrowRightIcon } from '../../images/icons/arrow-right.svg';
import { ReactComponent as BookmarkIcon } from '../../images/icons/bookmark2.svg';
import { ReactComponent as ShareIcon } from '../../images/icons/share.svg';

import { ReactComponent as NextIcon } from '../../images/icons/next-single.svg';
import { ReactComponent as HeadphoneIcon } from '../../images/icons/headphones.svg';
// import { ReactComponent as GiftIcon } from '../../images/icons/gift.svg';

import preImg from '../../images/white-image.png';

const ItemPageItem = ({
    backlinkHandler,
    bookmarkClickHandler,
    shareClickHandler,
    bookmarkActive,
    imageSrc,
    name,
    author,
    authorLink,
    catagoryLink,
    catagoryTitle,
    hearLink,
    rate,
    rateCount,
    noContent,
}) => {
    const [theme] = useGlobalState('theme');

    return (
        <section
            className={`has-text-weight-semibold item-page_item columns is-mobile is-multiline mx-0 my-0 pt-2 px-3 pb-4 is-gapless ${
                theme === 'light'
                    ? 'has-background-white shadow--2'
                    : 'has-background-black-bis shadow-dark--1'
            }`}
            style={{ direction: 'rtl', textAlign: 'center' }}>
            <header className="column is-full level is-mobile">
                <div className="level-right">
                    <div
                        title="برگشت"
                        onClick={backlinkHandler}
                        className="level-item is-clickable px-1 py-1">
                        <ArrowRightIcon
                            className="fill--primary"
                            style={{ width: '23px', height: 'auto' }}
                        />
                    </div>
                </div>
                <div
                    className="level-left"
                    style={noContent ? { visibility: 'hidden' } : {}}>
                    <React.Fragment>
                        <div className="level-item is-clickable px-1 py-1">
                            <BookmarkIcon
                                className={`icon-bookmark fill--primary ${
                                    bookmarkActive
                                        ? 'icon-bookmark--active'
                                        : 'icon-bookmark--inactive'
                                }`}
                                onClick={bookmarkClickHandler}
                            />
                        </div>
                        <div className="level-item is-clickable px-1 py-1">
                            <ShareIcon
                                title="اشتراک گذاری"
                                style={{ width: '18px', height: '' }}
                                onClick={shareClickHandler}
                            />
                        </div>
                    </React.Fragment>
                </div>
            </header>

            <div className="column is-full item-page_item-main">
                <div className="columns is-gapless is-mobile is-multiline">
                    <div
                        className="column is-full my-3"
                        style={{ lineHeight: 0 }}>
                        <img
                            src={imageSrc ? imageSrc : preImg}
                            alt={name}
                            className="item-page_item-image radius--1"
                        />
                    </div>

                    <div
                        className="column is-full"
                        style={noContent ? { visibility: 'hidden' } : {}}>
                        <span className="is-size-6">{name}</span>
                    </div>

                    <div
                        className="column is-full level is-mobile mx-auto mt-1"
                        style={noContent ? { visibility: 'hidden' } : {}}>
                        <div className="level is-mobile mx-auto">
                            <Link
                                title={author}
                                to={authorLink ? authorLink : '/'}
                                className={`level-item clickable-info--svg-left ${
                                    theme === 'light'
                                        ? 'has-text-grey'
                                        : 'has-text-grey-light'
                                }`}>
                                <span className="is-size-8 is-size-8--responsive-tablet-up">
                                    {author}
                                </span>
                                <NextIcon className="icon-size--1" />
                            </Link>
                        </div>
                    </div>

                    <div
                        className="column is-full level is-mobile mx-auto"
                        style={
                            noContent
                                ? { visibility: 'hidden', marginTop: '2px' }
                                : { marginTop: '2px' }
                        }>
                        <div className="level is-mobile mx-auto">
                            <Link
                                to={catagoryLink ? catagoryLink : '/'}
                                title={catagoryTitle}
                                className={`level-item clickable-info--svg-left ${
                                    theme === 'light'
                                        ? 'has-text-grey'
                                        : 'has-text-grey-light'
                                } ml-1`}>
                                <span className="is-size-8 is-size-8--responsive-tablet-up">
                                    {catagoryTitle}
                                </span>
                                <NextIcon className="icon-size--1" />
                            </Link>
                            {/* <a
                                href="#"
                                className={`level-item clickable-info--svg-left ${
                                    theme === 'light'
                                        ? 'has-text-grey'
                                        : 'has-text-grey-light'
                                }`}
                            >
                                <span className="is-size-8 is-size-8--responsive-tablet-up">
                                    موفقیت
                                </span>
                                <NextIcon className="icon-size--1" />
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>

            <footer
                className="column is-full mt-4 item-page_item-footer"
                style={noContent ? { visibility: 'hidden' } : {}}>
                <div className="level is-mobile px-1">
                    <div className="level-right">
                        <Link
                            to={hearLink ? hearLink : '/'}
                            className="level-item"
                            style={{ marginLeft: '6px' }}>
                            <Buttton
                                size="md"
                                weight="has-text-weight-semibold">
                                شنیدن
                                <HeadphoneIcon className="size-by-w--1 fill--white mr-1" />
                            </Buttton>
                        </Link>
                        {/* <div className="level-item">
                            <GiftIcon className="size-by-w--2" />
                        </div> */}
                    </div>
                    <div className="level-left">
                        <div
                            className="level-item"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                            <RateboxStart
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    console.log('clicked');
                                    document
                                        .querySelector('#item-comments')
                                        .click();
                                    setTimeout(() => {
                                        try {
                                            document
                                                .querySelector(
                                                    '#item-comments-leave'
                                                )
                                                .click();
                                            document
                                                .querySelector(
                                                    '#item-comments-ratebox'
                                                )
                                                .scrollIntoView();
                                        } catch (err) {
                                            console.log(new Error(err));
                                        }
                                    }, 10);
                                }}
                                rate={rate ? rate : 0}
                                sizeClass="size-by-w--3"
                            />
                            <span
                                className="is-size-8 is-size-8--responsive-tablet-up mt-1"
                                style={
                                    theme === 'light'
                                        ? { opacity: '.64' }
                                        : null
                                }>
                                <span>{rateCount}</span>
                                <span>{' رای'}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default ItemPageItem;

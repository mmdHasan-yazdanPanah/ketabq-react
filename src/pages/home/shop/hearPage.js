import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useHistory, useParams, Link, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { store } from 'react-notifications-component';
import { CircleSpinner, ImpulseSpinner } from 'react-spinners-kit';
import useSWR from 'swr';

import useGlobalState from '../../../globalStates/globalStates';
import { colors, pageTitles } from '../../../globalStates/statics.js';

import SoundSResultItem from '../../../components/soundsResultItem';
import Button from '../../../components/buttons/button';

import { ReactComponent as ArrowRightIcon } from '../../../images/icons/arrow-right.svg';
import { ReactComponent as BookmarkIcon } from '../../../images/icons/bookmark2.svg';
import { ReactComponent as ShareIcon } from '../../../images/icons/share.svg';

import { ReactComponent as BackIcon } from '../../../images/icons/back.svg';
import { ReactComponent as ForwardIcon } from '../../../images/icons/forward.svg';

import preImg from '../../../images/white-image.png';
import { deferredPromptFunc } from '../../..';

const Hearpage = () => {
    const [playedTime, setPlayedTime] = useState('00:00');
    const [durationTime, setDurationTime] = useState('00:00');
    const [playedFraction, setPlayedFraction] = useState(0);
    const [loadedFraction, setLoadedFraction] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [isCircleSelected, setCircleSelected] = useState(false);
    const [theme] = useGlobalState('theme');

    const [url, setUrl] = useState('');
    const history = useHistory();
    const location = useLocation();
    const [token, setToken] = useGlobalState('token');
    const [hash, setHash] = useGlobalState('hash');
    const { bookId } = useParams();
    const [pageProps, setPageProps] = useState({ items: [] });
    const [currentTitle, setCurrentTitle] = useState('');
    const [playerLoading, setPlayerLoading] = useState(false);
    const [bookmarkActive, setbookmarkActive] = useState(null);
    const [buyCreditLoading, setBuyCreditLoading] = useState(false);

    const playerRef = useRef();
    const lineBarRef = useRef();
    const circleRef = useRef();

    const onProgressHandler = ({
        playedSeconds,
        played,
        loadedSeconds,
        loaded,
    }) => {
        setPlayedFraction(played);

        let min = Math.floor(playedSeconds / 60).toString();
        let sec = Math.floor(playedSeconds % 60).toString();
        if (sec.length < 2) sec = '0' + sec;
        if (min.length < 2) min = '0' + min;
        const res = `${min}:${sec}`;
        setPlayedTime(res);

        setLoadedFraction(loaded);
    };

    const onDurationHandler = (duration) => {
        let min = Math.floor(duration / 60).toString();
        let sec = Math.floor(duration % 60).toString();
        if (sec.length < 2) sec = '0' + sec;
        if (min.length < 2) min = '0' + min;

        const res = `${min}:${sec}`;
        setDurationTime(res);
    };

    const changePlayerPosition = (changeSeconds) => {
        const currentTime = playerRef.current.getCurrentTime();
        const durration = playerRef.current.getDuration();

        let seekTo = currentTime + changeSeconds;
        if (seekTo < 0) seekTo = 0;
        if (seekTo > durration) seekTo = durration;

        playerRef.current.seekTo(seekTo, 'seconds');

        let min = Math.floor(seekTo / 60).toString();
        let sec = Math.floor(seekTo % 60).toString();
        if (sec.length < 2) sec = '0' + sec;
        if (min.length < 2) min = '0' + min;

        const res = `${min}:${sec}`;
        setPlayedFraction(seekTo / durration);
        setPlayedTime(res);
    };

    const onLineClickHandler = (event) => {
        if (event.target !== circleRef.current && !isCircleSelected) {
            const durration = playerRef.current.getDuration();
            const lineRect = lineBarRef.current.getBoundingClientRect();
            const amount = (event.clientX - lineRect.left) / lineRect.width;

            playerRef.current.seekTo(amount, 'fraction');

            let min = Math.floor((durration * amount) / 60).toString();
            let sec = Math.floor((durration * amount) % 60).toString();
            if (sec.length < 2) sec = '0' + sec;
            if (min.length < 2) min = '0' + min;

            const res = `${min}:${sec}`;
            setPlayedFraction(amount);
            setPlayedTime(res);
        }
    };

    const circleMouseDownHandler = (event) => {
        setCircleSelected(true);
        document.onmouseup = () => {
            setCircleSelected(false);
            document.onmouseup = null;
            document.ontouchend = null;
            document.onmousemove = null;
            document.ontouchmove = null;
        };
        document.ontouchend = () => {
            setCircleSelected(false);
            setCircleSelected(false);
            document.onmouseup = null;
            document.ontouchend = null;
            document.onmousemove = null;
            document.ontouchmove = null;
        };

        document.onmousemove = (event) => {
            const durration = playerRef.current.getDuration();
            const lineRect = lineBarRef.current.getBoundingClientRect();
            let amount = (event.clientX - lineRect.left) / lineRect.width;
            if (amount > 1) amount = 1;
            if (amount < 0) amount = 0;

            playerRef.current.seekTo(amount, 'fraction');

            let min = Math.floor((durration * amount) / 60).toString();
            let sec = Math.floor((durration * amount) % 60).toString();
            if (sec.length < 2) sec = '0' + sec;
            if (min.length < 2) min = '0' + min;

            const res = `${min}:${sec}`;
            setPlayedFraction(amount);
            setPlayedTime(res);
        };
        document.ontouchmove = (event) => {
            console.log('move');
            const durration = playerRef.current.getDuration();
            const lineRect = lineBarRef.current.getBoundingClientRect();
            let amount =
                (event.touches[0].clientX - lineRect.left) / lineRect.width;
            if (amount > 1) amount = 1;
            if (amount < 0) amount = 0;

            playerRef.current.seekTo(amount, 'fraction');

            let min = Math.floor((durration * amount) / 60).toString();
            let sec = Math.floor((durration * amount) % 60).toString();
            if (sec.length < 2) sec = '0' + sec;
            if (min.length < 2) min = '0' + min;

            const res = `${min}:${sec}`;
            setPlayedFraction(amount);
            setPlayedTime(res);
        };
    };

    const { data: dataSWR, mutate } = useSWR(
        [
            token ? `/book/${bookId}/tracks` : `/book/${bookId}/tracks/demo`,
            token,
        ],
        (url, my_token) => {
            if (my_token) {
                return Axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${my_token}`,
                    },
                })
                    .then(async (resTrack) => {
                        let newHash;
                        if (!hash) {
                            const resMe = await Axios.get('/auth/me', {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            newHash = resMe.data.hash;
                            localStorage.setItem('my-hash', newHash);
                            setHash(newHash);
                        } else {
                            newHash = hash;
                        }
                        const dataTrack = resTrack.data;
                        const resBook = await Axios.get(`/book/${bookId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        const dataBook = resBook.data.book;
                        const propsObj = {
                            imageSrc: dataBook.thumbnail,
                            name: dataBook.title,
                            shareClickHandler: () => {
                                if (navigator.share) {
                                    navigator
                                        .share({
                                            title: dataBook.title,
                                            text: `${dataBook.title} | کتاب کیو`,
                                            url: `${window.location.origin}/product/book/${bookId}/${newHash}`,
                                        })
                                        .then(() => {
                                            console.log(
                                                'Share accepted succesfully'
                                            );
                                        })
                                        .catch((err) => {
                                            throw err;
                                        });
                                } else if (navigator.clipboard) {
                                    navigator.clipboard
                                        .writeText(
                                            `${window.location.origin}/product/book/${bookId}/${newHash}`
                                        )
                                        .then(() => {
                                            store.addNotification({
                                                container: 'bottom-right',
                                                animationIn: [
                                                    'animate__animated',
                                                    'animate__flipInX',
                                                ],
                                                animationOut: [
                                                    'animate__animated',
                                                    'animate__fadeOut',
                                                ],
                                                type: 'success',
                                                dismiss: {
                                                    duration: 4000,
                                                    pauseOnHover: true,
                                                },
                                                title: 'کپی شد',
                                                message:
                                                    'آدرس موردنظر با موفقیت در بریده دان کپی شد',
                                            });
                                        })
                                        .catch((err) => {
                                            store.addNotification({
                                                container: 'bottom-right',
                                                animationIn: [
                                                    'animate__animated',
                                                    'animate__flipInX',
                                                ],
                                                animationOut: [
                                                    'animate__animated',
                                                    'animate__fadeOut',
                                                ],
                                                type: 'danger',
                                                dismiss: {
                                                    duration: 4000,
                                                    pauseOnHover: true,
                                                },
                                                title: 'ارور',
                                                message: (
                                                    <React.Fragment>
                                                        مشکلی پیش آمده
                                                        <br />
                                                        {err}
                                                    </React.Fragment>
                                                ),
                                            });
                                        });
                                } else {
                                    store.addNotification({
                                        container: 'bottom-right',
                                        animationIn: [
                                            'animate__animated',
                                            'animate__flipInX',
                                        ],
                                        animationOut: [
                                            'animate__animated',
                                            'animate__fadeOut',
                                        ],
                                        type: 'danger',
                                        dismiss: {
                                            duration: 4000,
                                            pauseOnHover: true,
                                        },
                                        title: 'عدم پشتیبانی',
                                        message:
                                            'مرورگر شما، ویژگی مورد نظر را پشتیبانی نمیکند',
                                    });
                                }
                            },
                            items: !dataBook.user_has_book
                                ? dataTrack.demo
                                : dataTrack.tracks,
                            buyLink: `/product/buy/${bookId}`,
                            addToLibrary: async () => {
                                setBuyCreditLoading(true);
                                let buyPrams = {
                                    Purchased_type: 'book',
                                    Purchased_id: dataBook.id,
                                    Purchase_method: 'wallet',
                                };
                                try {
                                    const res = await Axios.get(
                                        '/payment/buy',
                                        {
                                            params: buyPrams,
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    );
                                    const data = res.data;

                                    if (data.success) {
                                        store.addNotification({
                                            container: 'bottom-right',
                                            animationIn: [
                                                'animate__animated',
                                                'animate__flipInX',
                                            ],
                                            animationOut: [
                                                'animate__animated',
                                                'animate__fadeOut',
                                            ],
                                            type: 'success',
                                            dismiss: {
                                                duration: 5000,
                                                pauseOnHover: true,
                                            },
                                            title: 'افزوده شد',
                                            message:
                                                'کتاب مورد نظر به کتابخانه افزوده شد ',
                                        });
                                        await mutate();
                                    } else {
                                        store.addNotification({
                                            container: 'bottom-right',
                                            animationIn: [
                                                'animate__animated',
                                                'animate__flipInX',
                                            ],
                                            animationOut: [
                                                'animate__animated',
                                                'animate__fadeOut',
                                            ],
                                            type: 'danger',
                                            dismiss: {
                                                duration: 5000,
                                                pauseOnHover: true,
                                            },
                                            title: 'ناموفق',
                                            message: `${data.message}`,
                                        });
                                    }
                                    setBuyCreditLoading(false);
                                } catch (err) {
                                    setBuyCreditLoading(false);
                                    throw err;
                                }
                            },
                            price: dataBook.price_toman,
                            hasBook: dataBook.user_has_book,
                        };
                        return {
                            propsObj: propsObj,
                            bookmarkActive: dataBook.isBookmark,
                        };
                    })
                    .catch((err) => {
                        if (err?.request?.status === 404) {
                            history.push('/404');
                        } else if (err?.request?.status === 403) {
                            localStorage.removeItem('token');
                            localStorage.removeItem('my-hash');
                            setToken(null);
                            store.addNotification({
                                container: 'bottom-right',
                                animationIn: [
                                    'animate__animated',
                                    'animate__flipInX',
                                ],
                                animationOut: [
                                    'animate__animated',
                                    'animate__fadeOut',
                                ],
                                type: 'warning',
                                dismiss: {
                                    duration: 5000,
                                    pauseOnHover: true,
                                },
                                title: 'توکن نامعتبر',
                                message: (
                                    <React.Fragment>
                                        توکن وارد شده نا معتبر است
                                        <br />
                                        تنظیمات اپ به وضعیت کاربر میهمان تغییر
                                        یافت
                                    </React.Fragment>
                                ),
                            });
                        } else {
                            localStorage.removeItem('token');
                            localStorage.removeItem('my-hash');
                            setToken(null);
                            store.addNotification({
                                container: 'bottom-right',
                                animationIn: [
                                    'animate__animated',
                                    'animate__flipInX',
                                ],
                                animationOut: [
                                    'animate__animated',
                                    'animate__fadeOut',
                                ],
                                type: 'warning',
                                dismiss: {
                                    duration: 5000,
                                    pauseOnHover: true,
                                },
                                title: 'ورود ناموفق',
                                message: 'مشکلی پیش آمده',
                            });
                        }

                        throw err;
                    });
            } else {
                return Axios.get(url)
                    .then(async (resTrack) => {
                        const dataTrack = resTrack.data;
                        const resBook = await Axios.get(
                            `/book/${bookId}/guest`
                        );
                        const dataBook = resBook.data.book;
                        const propsObj = {
                            imageSrc: dataBook.thumbnail,
                            name: dataBook.title,
                            shareClickHandler: () => {
                                store.addNotification({
                                    container: 'bottom-right',
                                    animationIn: [
                                        'animate__animated',
                                        'animate__flipInX',
                                    ],
                                    animationOut: [
                                        'animate__animated',
                                        'animate__fadeOut',
                                    ],
                                    type: 'warning',
                                    dismiss: {
                                        duration: 4000,
                                        pauseOnHover: true,
                                    },
                                    title: 'مخصوص اعضا',
                                    message:
                                        'استفاده از این ویژگی، نیازمند ثبت نام است',
                                });
                                history.push('/login_signup', {
                                    toLocation: location.pathname,
                                });
                            },
                            items: dataTrack.demo,
                            buyLink: `/product/buy/${bookId}`,
                            addToLibrary: () => {
                                store.addNotification({
                                    container: 'bottom-right',
                                    animationIn: [
                                        'animate__animated',
                                        'animate__flipInX',
                                    ],
                                    animationOut: [
                                        'animate__animated',
                                        'animate__fadeOut',
                                    ],
                                    type: 'warning',
                                    dismiss: {
                                        duration: 4000,
                                        pauseOnHover: true,
                                    },
                                    title: 'نیازمند ثبت نام',
                                    message:
                                        'برای خرید کتاب ابتدا باید ثبت نام کنید',
                                });
                                history.push('/login_signup', {
                                    toLocation: location.pathname,
                                });
                            },
                            price: dataBook.price_toman,
                            hasBook: false,
                        };
                        return { propsObj: propsObj, bookmarkActive: false };
                    })
                    .catch((err) => {
                        if (err?.request?.status === 404) {
                            history.push('/404');
                        } else if (err?.request?.status === 403) {
                            localStorage.removeItem('token');
                            localStorage.removeItem('my-hash');
                            setToken(null);
                            store.addNotification({
                                container: 'bottom-right',
                                animationIn: [
                                    'animate__animated',
                                    'animate__flipInX',
                                ],
                                animationOut: [
                                    'animate__animated',
                                    'animate__fadeOut',
                                ],
                                type: 'warning',
                                dismiss: {
                                    duration: 5000,
                                    pauseOnHover: true,
                                },
                                title: 'توکن نامعتبر',
                                message: (
                                    <React.Fragment>
                                        توکن وارد شده نا معتبر است
                                        <br />
                                        تنظیمات اپ به وضعیت کاربر میهمان تغییر
                                        یافت
                                    </React.Fragment>
                                ),
                            });
                        } else {
                            localStorage.removeItem('token');
                            localStorage.removeItem('my-hash');
                            setToken(null);
                            store.addNotification({
                                container: 'bottom-right',
                                animationIn: [
                                    'animate__animated',
                                    'animate__flipInX',
                                ],
                                animationOut: [
                                    'animate__animated',
                                    'animate__fadeOut',
                                ],
                                type: 'warning',
                                dismiss: {
                                    duration: 5000,
                                    pauseOnHover: true,
                                },
                                title: 'ورود ناموفق',
                                message: 'مشکلی پیش آمده',
                            });
                        }

                        throw err;
                    });
            }
        }
    );

    useEffect(() => {
        if (dataSWR) {
            setPageProps(dataSWR.propsObj);
            setbookmarkActive(dataSWR.bookmarkActive);
        }
    }, [dataSWR]);

    const bookmarkClickHandler = () => {
        if (!token) {
            store.addNotification({
                container: 'bottom-right',
                animationIn: ['animate__animated', 'animate__flipInX'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                type: 'warning',
                dismiss: {
                    duration: 4000,
                    pauseOnHover: true,
                },
                title: 'مخصوص اعضا',
                message: 'استفاده از این ویژگی، نیازمند ثبت نام است',
            });
            history.push('/login_signup', {
                toLocation: location.pathname,
            });
        } else {
            // mutate(
            //     {
            //         ...pageData,
            //         bookmarkActive: !pageData.bookmarkActive,
            //     },
            //     false
            // );
            mutate((data) => {
                return {
                    ...data,
                    bookmarkActive: !data.bookmarkActive,
                };
            }, false);
            Axios.get(`/bookmark/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    console.log('bookmark Done');
                })
                .catch((err) => {
                    console.log('mutate from error');
                    // mutate(
                    //     {
                    //         ...pageData,
                    //         bookmarkActive: !pageData.bookmarkActive,
                    //     },
                    //     false
                    // );
                    mutate((data) => {
                        return {
                            ...data,
                            bookmarkActive: !data.bookmarkActive,
                        };
                    }, false);
                    store.addNotification({
                        container: 'bottom-right',
                        animationIn: ['animate__animated', 'animate__flipInX'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        type: 'danger',
                        dismiss: {
                            duration: 4000,
                            pauseOnHover: true,
                        },
                        title: 'ناموفق',
                        message: err?.request?.statusText
                            ? err?.request?.statusText
                            : 'مشکلی پیش آمده',
                    });
                });
        }
    };

    useEffect(() => {
        if (pageProps.items.length) {
            if (!url) {
                setUrl(pageProps.items[0].file);
            }
            // setPlayerLoading(true);
            if (!currentTitle) {
                setCurrentTitle(pageProps.items[0].title);
            }
            console.log('url changed');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageProps.items]);

    useEffect(() => {
        if (pageProps.name) {
            document.title = pageTitles.hear(pageProps.name);
        }
    }, [pageProps.name]);

    return (
        <div className="main main--down">
            <section
                className={`has-text-weight-semibold hear-page_item columns is-mobile is-multiline mx-0 my-0 pt-2 px-3 pb-1 is-gapless ${
                    theme === 'light'
                        ? 'has-background-white shadow--2'
                        : 'has-background-black-bis shadow-dark--1'
                } `}
                style={{ direction: 'rtl', textAlign: 'center' }}>
                <header className="column is-full level is-mobile">
                    <div className="level-right">
                        <div
                            title="برگشت"
                            onClick={() => history.goBack()}
                            className="level-item is-clickable px-1 py-1">
                            <ArrowRightIcon
                                className="fill--primary"
                                style={{ width: '23px', height: 'auto' }}
                            />
                        </div>
                    </div>
                    <div
                        className="level-left"
                        style={!pageProps.name ? { visibility: 'hidden' } : {}}>
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
                                onClick={pageProps.shareClickHandler}
                            />
                        </div>
                    </div>
                </header>

                <div className="column is-full">
                    <div className="columns is-gapless is-mobile is-multiline">
                        <div
                            className="column is-full my-3"
                            style={{ lineHeight: 0 }}>
                            <img
                                src={
                                    pageProps.imageSrc
                                        ? pageProps.imageSrc
                                        : preImg
                                }
                                alt=""
                                className="item-page_item-image radius--1"
                            />
                        </div>

                        <div className="column is-full">
                            <span className="is-size-6">{currentTitle}</span>
                        </div>
                    </div>
                </div>

                <footer
                    className="column is-full"
                    style={!url ? { visibility: 'hidden' } : {}}>
                    {pageProps.items.map(({ file, title }, index, arr) =>
                        url === file ? (
                            <ReactPlayer
                                key={file}
                                volume={1}
                                ref={playerRef}
                                onProgress={(props) => onProgressHandler(props)}
                                onDuration={(duration) =>
                                    onDurationHandler(duration)
                                }
                                width="0"
                                height="0"
                                url={file}
                                playing={isPlaying}
                                onReady={() => {
                                    setPlayerLoading(false);
                                    console.log('ready to play');
                                }}
                                onBuffer={() => {
                                    console.log('onBufferLoading');
                                    setPlayerLoading(true);
                                }}
                                onEnded={() => {
                                    if (index + 1 < arr.length) {
                                        setUrl(arr[index + 1].file);
                                        setCurrentTitle(arr[index + 1].title);
                                        setPlayerLoading(true);
                                        console.log('url changed');
                                    }
                                }}
                            />
                        ) : null
                    )}
                    <div className="player px-5 py-4">
                        <div
                            className="player_line"
                            ref={lineBarRef}
                            onClick={(e) => onLineClickHandler(e)}>
                            <div className="player_line-bar">
                                <div
                                    className="player_line-bar-loaded"
                                    style={{
                                        width: `${loadedFraction * 100}%`,
                                    }}></div>
                                <div
                                    className="player_line-bar-played"
                                    style={{
                                        width: `${playedFraction * 100}%`,
                                    }}></div>
                            </div>
                            <div
                                ref={circleRef}
                                onMouseDown={(e) => circleMouseDownHandler(e)}
                                onTouchStart={(e) => circleMouseDownHandler(e)}
                                className={`px-2 py-2 player_line-circle ${
                                    isCircleSelected
                                        ? 'player_line-circle--active'
                                        : ''
                                }`}
                                style={{ left: `${playedFraction * 100}%` }}>
                                <div></div>
                            </div>
                        </div>
                        <div className="player_time is-size-7 is-size-7--responsive-tablet-up">
                            <span>{playedTime}</span>
                            <span>{durationTime}</span>
                        </div>
                        <div
                            className="player_buttons"
                            style={{ position: 'relative' }}>
                            <BackIcon
                                className={`player_button size-by-w--2 ${
                                    theme === 'dark' ? 'icon-1--light' : ''
                                }`}
                                onClick={() => changePlayerPosition(-10)}
                            />
                            {/* <PlayIcon className="player_button mx-5" /> */}

                            <svg
                                onClick={() => {
                                    setPlaying((prevState) => !prevState);
                                    if (deferredPromptFunc) {
                                        deferredPromptFunc();
                                    }
                                }}
                                className="player_button mx-5 size-by-w--5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 43.665 43.665">
                                <g transform="translate(-1.496 -1.506)">
                                    <path
                                        d="M44.646,18.644a21.828,21.828,0,1,0-16.559,26,21.828,21.828,0,0,0,16.559-26ZM27.7,43.181a20.323,20.323,0,1,1-8.731-39.7A19.886,19.886,0,0,1,23.33,3,20.323,20.323,0,0,1,27.7,43.181Z"
                                        transform="translate(0 0)"
                                        fill="#ffc107"
                                    />
                                    {!isPlaying ? (
                                        <g>
                                            <path
                                                d="M26.8,17.027l-11.4-6.91a2.409,2.409,0,0,0-2.5,0,2.439,2.439,0,0,0-1.28,2.168V26.21a2.484,2.484,0,0,0,3.779,1.972l11.4-6.97a2.484,2.484,0,0,0,0-4.245Zm-.783,3.011-11.4,6.955a.948.948,0,0,1-.978,0,.979.979,0,0,1-.512-.858V12.195a.978.978,0,0,1,.512-.858.9.9,0,0,1,.467-.12,1.009,1.009,0,0,1,.512.135l11.4,6.97a.933.933,0,0,1,.467.828.963.963,0,0,1-.467.843Z"
                                                transform="translate(5.121 4.176)"
                                                fill="#ffc107"
                                            />
                                        </g>
                                    ) : (
                                        <g>
                                            <path
                                                d="M13.757,10.5A2.257,2.257,0,0,0,11.5,12.757V24.794a2.257,2.257,0,0,0,4.514,0V12.757A2.257,2.257,0,0,0,13.757,10.5Zm.752,14.294a.752.752,0,0,1-1.5,0V12.757a.752.752,0,0,1,1.5,0Z"
                                                transform="translate(5.057 4.547)"
                                                fill="#ffc107"
                                            />
                                            <path
                                                d="M19.757,10.5A2.257,2.257,0,0,0,17.5,12.757V24.794a2.257,2.257,0,0,0,4.514,0V12.757A2.257,2.257,0,0,0,19.757,10.5Zm.752,14.294a.752.752,0,0,1-1.5,0V12.757a.752.752,0,1,1,1.5,0Z"
                                                transform="translate(8.085 4.547)"
                                                fill="#ffc107"
                                            />
                                        </g>
                                    )}
                                </g>
                            </svg>

                            <ForwardIcon
                                className={`player_button size-by-w--2 ${
                                    theme === 'dark' ? 'icon-1--light' : ''
                                }`}
                                onClick={() => changePlayerPosition(10)}
                            />
                            {playerLoading && isPlaying ? (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        marginTop: '6px',
                                    }}>
                                    <ImpulseSpinner
                                        color={colors['primary']}
                                        size={20}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </footer>
            </section>
            <header className="columns is-gapless mx-0 is-mobile has-text-weight-semibold has-text-centered px-4 mt-4 pt-1 mb-2">
                <div className={`column`}>
                    <span>نمونه ها</span>
                </div>
            </header>
            <main
                style={{ scrollBehavior: 'smooth' }}
                className="item-page_info-itemsWrapper pr-4 pl-5 ml-2 pb-3">
                <div className="pr-1 ml-3 mb-1">
                    {pageProps.items.map(({ title, file }, index) => (
                        <SoundSResultItem
                            key={file}
                            onClick={() => {
                                if (url === file) {
                                    setPlaying((prevState) => !prevState);
                                } else {
                                    setUrl(file);
                                    setCurrentTitle(title);
                                    setPlaying(true);
                                    setPlayerLoading(true);
                                }
                            }}
                            playing={url === file ? isPlaying : false}
                            type="audio"
                            className={`pt-1 ${index !== 0 ? 'mt-3' : ''}`}
                            name={title}
                        />
                    ))}
                </div>

                {pageProps.buyLink && !pageProps.hasBook ? (
                    <div className="level mt-4">
                        <div className="level-item">
                            {pageProps.price > 0 ? (
                                <Link to={pageProps.buyLink}>
                                    <Button
                                        className="my-5"
                                        weight="has-text-weight-bold">
                                        <span className="is-size-7 is-size-7--responsive-tablet-up">
                                            دریافت نسخه کامل
                                        </span>
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    className="my-5"
                                    weight="has-text-weight-bold"
                                    onClick={pageProps.addToLibrary}>
                                    <span className="is-size-7 is-size-7--responsive-tablet-up">
                                        افزودن به کتابخانه
                                    </span>
                                    {buyCreditLoading ? (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                left: 'calc(100% + 6px)',
                                            }}>
                                            <CircleSpinner
                                                size={18}
                                                color={colors['primary']}
                                            />
                                        </div>
                                    ) : null}
                                </Button>
                            )}
                        </div>
                    </div>
                ) : null}
            </main>
        </div>
    );
};

export default Hearpage;

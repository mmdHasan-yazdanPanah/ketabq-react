import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import useGlobalState from '../../../globalStates/globalStates';
import { store } from 'react-notifications-component';
import useSWR from 'swr';

import { makeRateAvg } from '../../../utils/utils';

import ItemPageItem from '../../../components/item-page/item';
import ItemPageInfoWrapper from '../../../components/item-page/info-wrapper';

import Axios from 'axios';
import { pageTitles } from '../../../globalStates/statics';

const ItemPage = () => {
    const history = useHistory();
    const location = useLocation();
    const [token, setToken] = useGlobalState('token');
    const [hash, setHash] = useGlobalState('hash');
    const { bookId, ref } = useParams();
    const [, setCommentSending] = useGlobalState('commentSending');
    const [bookmarkActive, setbookmarkActive] = useState(null);
    const [itemPageProps, setItemPageProps] = useState({});
    const [infoPageProps, setInfoPageProps] = useState(false);
    const getBookProps = (url, my_token) => {
        if (my_token) {
            return Axios.get(url, {
                headers: {
                    Authorization: `Bearer ${my_token}`,
                },
            })
                .then(async (res) => {
                    let newHash;
                    if (!hash) {
                        const resMe = await Axios.get('/auth/me', {
                            headers: {
                                Authorization: `Bearer ${my_token}`,
                            },
                        });
                        newHash = resMe.data.hash;
                        localStorage.setItem('my-hash', newHash);
                        setHash(newHash);
                    } else {
                        newHash = hash;
                    }

                    let oldRef = localStorage.getItem(`book-${bookId}-ref`);
                    if (oldRef === newHash) {
                        localStorage.removeItem(`book-${bookId}-ref`);
                    }
                    if (ref && ref !== newHash) {
                        if (!oldRef) {
                            localStorage.setItem(`book-${bookId}-ref`, ref);
                        }
                    }
                    const data = res.data.book;
                    console.log(data);
                    const { rateAvg, allRatePaople } = makeRateAvg(data.score);

                    const propsObj = {
                        author: data.author_name,
                        authorLink: {
                            pathname: `/search/${data.author_name}`,
                            search: `?author=${data.author_id}`,
                        },
                        catagoryLink: {
                            pathname: `/search/${data.category_name}`,
                            search: `?category=${data.category_id}`,
                        },
                        catagoryTitle: data.category_name,
                        hearLink: `/product/listen/${bookId}`,
                        imageSrc: data.thumbnail,
                        name: data.title,
                        rate: rateAvg,
                        rateCount: allRatePaople,
                        shareClickHandler: () => {
                            if (navigator.share) {
                                navigator
                                    .share({
                                        title: data.title,
                                        text: `${data.title} | کتاب کیو`,
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
                    };

                    const specificationItems = [];
                    if (data.narrator_id)
                        specificationItems.push({
                            property: 'گوینده',
                            value: data.narrator_name,
                            link: {
                                pathname: `/search/${data.narrator_name}`,
                                search: `?narrator=${data.narrator_id}`,
                            },
                        });
                    if (data.author_id)
                        specificationItems.push({
                            property: 'نویسنده',
                            value: data.author_name,
                            link: {
                                pathname: `/search/${data.author_name}`,
                                search: `?author=${data.author_id}`,
                            },
                        });
                    if (data.translator_id)
                        specificationItems.push({
                            property: 'مترجم',
                            value: data.translator_name,
                            link: {
                                pathname: `/search/${data.translator_name}`,
                                search: `?translator=${data.translator_id}`,
                            },
                        });
                    if (data.publisher_id)
                        specificationItems.push({
                            property: 'انتشارات',
                            value: data.publisher_name,
                            link: {
                                pathname: `/search/${data.publisher_name}`,
                                search: `?publisher=${data.publisher_id}`,
                            },
                        });

                    specificationItems.push({
                        property: 'زمان کل کتاب',
                        value: `${data.time} دقیقه`,
                    });

                    if (data.price_toman !== 0) {
                        if (data.discount) {
                            specificationItems.push({
                                property: 'قیمت قبل از تخفیف',
                                value: `${data.price_toman.toLocaleString()} تومان`,
                            });
                            specificationItems.push({
                                property: 'تخفیف',
                                value: `${data.price_toman_discount.toLocaleString()} تومان`,
                            });
                            specificationItems.push({
                                property: 'قیمت نهایی',
                                value: `${(
                                    data.price_toman - data.price_toman_discount
                                ).toLocaleString()} تومان`,
                            });
                        } else {
                            specificationItems.push({
                                property: 'قیمت',
                                value: `${data.price_toman.toLocaleString()} تومان`,
                            });
                        }
                    } else {
                        specificationItems.push({
                            property: 'قیمت',
                            value: 'رایگان',
                            highlight: true,
                        });
                    }

                    const commentItems = [];
                    const resComment = await Axios.get(
                        `/book/${bookId}/get-comments`
                    );
                    const dataComment = resComment.data.comments;
                    dataComment.forEach((item) => {
                        commentItems.push({
                            name: item.user_name,
                            comment: item.comment,
                            spoiler: item.is_hide,
                            likeCount: item.like,
                            dislikeCount: item.dislike,
                            id: item.id,
                            avatar: item.user_avatar,
                        });
                    });
                    const infoObj = {
                        specificationItems: specificationItems,
                        description: data.description,
                        commentItems: commentItems,
                        hasBook: data.user_has_book,
                        commentSubmitHandler: async ({ rate, comment }) => {
                            setCommentSending(true);
                            console.log(rate);
                            const promises = [];
                            let rateState = localStorage.getItem(
                                `book-rate-${bookId}`
                            );
                            if (rate && !rateState) {
                                promises.push(
                                    Axios.get(`/book/${bookId}/set-score`, {
                                        headers: {
                                            Authorization: `Bearer ${my_token}`,
                                        },
                                        params: {
                                            score: rate,
                                        },
                                    })
                                        .then((res) => {
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
                                                    duration: 3000,
                                                    pauseOnHover: true,
                                                },
                                                title: 'ثبت رای',
                                                message: 'رای با موفقیت ثبت شد',
                                            });
                                            localStorage.setItem(
                                                `book-rate-${bookId}`,
                                                rate
                                            );
                                        })
                                        .catch((err) => {
                                            if (err?.request?.status === 404) {
                                                history.push('/404');
                                            } else if (
                                                err?.request?.status === 403
                                            ) {
                                                localStorage.removeItem(
                                                    'token'
                                                );
                                                localStorage.removeItem(
                                                    'my-hash'
                                                );
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
                                                            توکن وارد شده نا
                                                            معتبر است
                                                            <br />
                                                            تنظیمات اپ به وضعیت
                                                            کاربر میهمان تغییر
                                                            یافت
                                                        </React.Fragment>
                                                    ),
                                                });
                                            } else {
                                                localStorage.removeItem(
                                                    'token'
                                                );
                                                localStorage.removeItem(
                                                    'my-hash'
                                                );
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
                                        })
                                );
                            } else if (rate && rateState) {
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
                                        duration: 3000,
                                        pauseOnHover: true,
                                    },
                                    title: 'ناموفق',
                                    message: `شما قبلا به این کتاب ${rateState} ستاره داده اید`,
                                });
                            }
                            if (comment.trim().length !== 0) {
                                const formData = new FormData();
                                formData.append('comment', comment);
                                promises.push(
                                    Axios.post(
                                        `/book/${bookId}/init-comment`,
                                        formData,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${my_token}`,
                                            },
                                        }
                                    )
                                        .then((res) => {
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
                                                    duration: 3000,
                                                    pauseOnHover: true,
                                                },
                                                title: 'ثبت نظر',
                                                message: 'نظر با موفقیت ثبت شد',
                                            });
                                        })
                                        .catch((err) => {
                                            if (err?.request?.status === 404) {
                                                history.push('/404');
                                            } else if (
                                                err?.request?.status === 403
                                            ) {
                                                localStorage.removeItem(
                                                    'token'
                                                );
                                                localStorage.removeItem(
                                                    'my-hash'
                                                );
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
                                                            توکن وارد شده نا
                                                            معتبر است
                                                            <br />
                                                            تنظیمات اپ به وضعیت
                                                            کاربر میهمان تغییر
                                                            یافت
                                                        </React.Fragment>
                                                    ),
                                                });
                                            } else {
                                                localStorage.removeItem(
                                                    'token'
                                                );
                                                localStorage.removeItem(
                                                    'my-hash'
                                                );
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
                                        })
                                );
                            }
                            if (promises.length > 0) {
                                await Promise.all(promises);
                                return mutate()
                                    .then(() => setCommentSending(false))
                                    .catch(() => setCommentSending(false));
                            } else {
                                setCommentSending(false);
                            }
                        },
                        allCommentsLink: `/product/comments/${bookId}`,
                    };

                    return {
                        propsObj: propsObj,
                        infoObj: infoObj,
                        bookmarkActive: data.isBookmark,
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
                                    تنظیمات اپ به وضعیت کاربر میهمان تغییر یافت
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
                });
        } else {
            if (ref) {
                if (!localStorage.getItem(`book-${bookId}-ref`)) {
                    localStorage.setItem(`book-${bookId}-ref`, ref);
                }
            }
            return Axios.get(url)
                .then(async (res) => {
                    console.log(res);
                    console.log('guest');
                    const data = res.data.book;
                    console.log(data);
                    let allRateCount = 0;
                    let allRatePaople = 0;
                    let rateAvg = 0;
                    for (let scoreState in data.score) {
                        allRatePaople += data.score[scoreState];
                    }
                    allRateCount += data.score.s1 * 1;
                    allRateCount += data.score.s2 * 2;
                    allRateCount += data.score.s3 * 3;
                    allRateCount += data.score.s4 * 4;
                    allRateCount += data.score.s5 * 5;
                    rateAvg = allRateCount / allRatePaople;
                    const propsObj = {
                        author: data.author_name,
                        authorLink: {
                            pathname: `/search/${data.author_name}`,
                            search: `?author=${data.author_id}`,
                        },
                        catagoryLink: {
                            pathname: `/search/${data.category_name}`,
                            search: `?category=${data.category_id}`,
                        },
                        catagoryTitle: data.category_name,
                        hearLink: `/product/listen/${bookId}`,
                        imageSrc: data.thumbnail,
                        name: data.title,
                        rate: rateAvg,
                        rateCount: allRateCount,
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
                    };

                    const specificationItems = [];
                    if (data.narrator_id)
                        specificationItems.push({
                            property: 'گوینده',
                            value: data.narrator_name,
                            link: {
                                pathname: `/search/${data.narrator_name}`,
                                search: `?narrator=${data.narrator_id}`,
                            },
                        });
                    if (data.author_id)
                        specificationItems.push({
                            property: 'نویسنده',
                            value: data.author_name,
                            link: {
                                pathname: `/search/${data.author_name}`,
                                search: `?author=${data.author_id}`,
                            },
                        });
                    if (data.translator_id)
                        specificationItems.push({
                            property: 'مترجم',
                            value: data.translator_name,
                            link: {
                                pathname: `/search/${data.translator_name}`,
                                search: `?translator=${data.translator_id}`,
                            },
                        });
                    if (data.publisher_id)
                        specificationItems.push({
                            property: 'انتشارات',
                            value: data.publisher_name,
                            link: {
                                pathname: `/search/${data.publisher_name}`,
                                search: `?publisher=${data.publisher_id}`,
                            },
                        });

                    specificationItems.push({
                        property: 'زمان کل کتاب',
                        value: `${data.time} دقیقه`,
                    });

                    if (data.price_toman !== 0) {
                        if (data.discount) {
                            specificationItems.push({
                                property: 'قیمت قبل از تخفیف',
                                value: `${data.price_toman.toLocaleString()} تومان`,
                            });
                            specificationItems.push({
                                property: 'تخفیف',
                                value: `${data.price_toman_discount.toLocaleString()} تومان`,
                            });
                            specificationItems.push({
                                property: 'قیمت نهایی',
                                value: `${(
                                    data.price_toman - data.price_toman_discount
                                ).toLocaleString()} تومان`,
                            });
                        } else {
                            specificationItems.push({
                                property: 'قیمت',
                                value: `${data.price_toman.toLocaleString()} تومان`,
                            });
                        }
                    } else {
                        specificationItems.push({
                            property: 'قیمت',
                            value: 'رایگان',
                            highlight: true,
                        });
                    }

                    const commentItems = [];
                    const resComment = await Axios.get(
                        `/book/${bookId}/get-comments`
                    );
                    const dataComment = resComment.data.comments;
                    dataComment.forEach((item) => {
                        commentItems.push({
                            name: item.user_name,
                            comment: item.comment,
                            spoiler: item.is_hide,
                            likeCount: item.like,
                            dislikeCount: item.dislike,
                            id: item.id,
                            avatar: item.user_avatar,
                        });
                    });
                    const infoObj = {
                        specificationItems: specificationItems,
                        description: data.description,
                        commentItems: commentItems,
                        allCommentsLink: `/product/comments/${bookId}`,
                    };

                    return {
                        propsObj: propsObj,
                        infoObj: infoObj,
                        bookmarkActive: false,
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
                                    تنظیمات اپ به وضعیت کاربر میهمان تغییر یافت
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
                });
        }
    };

    useEffect(() => {
        if (itemPageProps.name) {
            document.title = pageTitles.bookPage(itemPageProps.name);
        }
    }, [itemPageProps.name]);

    const { data: pageData, mutate } = useSWR(
        [token ? `/book/${bookId}` : `/book/${bookId}/guest`, token],
        getBookProps
    );

    useEffect(() => {
        if (pageData) {
            setItemPageProps(pageData.propsObj);
            setInfoPageProps(pageData.infoObj);
            setbookmarkActive(pageData.bookmarkActive);
        }
    }, [pageData]);

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
            mutate(
                {
                    ...pageData,
                    bookmarkActive: !pageData.bookmarkActive,
                },
                false
            );
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
                    mutate(
                        {
                            ...pageData,
                            bookmarkActive: !pageData.bookmarkActive,
                        },
                        false
                    );
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

    return (
        <div className="main main--down">
            <ItemPageItem
                backlinkHandler={() => history.goBack()}
                noContent={itemPageProps.name ? false : true}
                {...itemPageProps}
                bookmarkActive={bookmarkActive}
                bookmarkClickHandler={bookmarkClickHandler}
            />
            {infoPageProps ? <ItemPageInfoWrapper {...infoPageProps} /> : null}
        </div>
    );
};

export default ItemPage;

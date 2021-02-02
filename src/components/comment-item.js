import React, { useState } from 'react';
import { store } from 'react-notifications-component';

import useGlobalState from '../globalStates/globalStates';

import { ReactComponent as UserIcon } from '../images/icons/user.svg';

import Button from './buttons/button';

import { ReactComponent as LikeIcon } from '../images/icons/like.svg';
import { ReactComponent as DislikeIcon } from '../images/icons/dislike.svg';
import { ReactComponent as EyeIcon } from '../images/icons/eye2.svg';
import Axios from 'axios';

const CommentItem = ({
    noline,
    className,
    spoiler,
    name,
    comment,
    likeCount,
    dislikeCount,
    id,
    avatar,
}) => {
    const [isHide, setHide] = useState(spoiler);
    const [like, setLike] = useState(likeCount);
    const [dislike, setDislike] = useState(dislikeCount);
    const [token, setToken] = useGlobalState('token');

    const likeOrDislikeClickHandler = async (behavior) => {
        const oldLike = localStorage.getItem(`comment-${id}`);

        if (oldLike) {
            store.addNotification({
                container: 'bottom-right',
                animationIn: ['animate__animated', 'animate__flipInX'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                type: 'danger',
                dismiss: {
                    duration: 3000,
                    pauseOnHover: true,
                },
                title: 'ناموفق',
                message: `شما قبلا به این نظر رای ${
                    oldLike === 'like' ? 'مثبت' : 'منفی'
                } داده اید`,
            });
        } else {
            if (behavior === 'like') {
                setLike((prevState) => prevState + 1);
                localStorage.setItem(`comment-${id}`, 'like');

                try {
                    await Axios.post(`/book/${id}/comment/like`, '', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } catch (err) {
                    // eslint-disable-next-line eqeqeq
                    setLike((prevState) => prevState - 1);
                    localStorage.removeItem(`comment-${id}`);
                    // eslint-disable-next-line eqeqeq
                    if (err?.request?.status == 403) {
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
                            type: 'danger',
                            dismiss: {
                                duration: 10000,
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
                                duration: 10000,
                                pauseOnHover: true,
                            },
                            title: 'ناموفق',
                            message: (
                                <React.Fragment>
                                    مشکلی پیش آمده
                                    <br />
                                    رای با موفقیت ثبت نشد
                                </React.Fragment>
                            ),
                        });
                    }

                    throw err;
                }
            } else if (behavior === 'dislike') {
                setDislike((prevState) => prevState + 1);
                localStorage.setItem(`comment-${id}`, 'dislike');

                try {
                    await Axios.post(`/book/${id}/comment/dislike`, '', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } catch (err) {
                    setDislike((prevState) => prevState - 1);
                    localStorage.removeItem(`comment-${id}`);
                    // eslint-disable-next-line eqeqeq
                    if (err?.request?.status == 403) {
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
                            type: 'danger',
                            dismiss: {
                                duration: 10000,
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
                                duration: 10000,
                                pauseOnHover: true,
                            },
                            title: 'ناموفق',
                            message: (
                                <React.Fragment>
                                    مشکلی پیش آمده
                                    <br />
                                    رای با موفقیت ثبت نشد
                                </React.Fragment>
                            ),
                        });
                    }

                    throw err;
                }
            }
        }
    };

    return (
        <div className={className ? className : ''}>
            {!isHide ? (
                <React.Fragment>
                    <div
                        id={`comment-${id}`}
                        className="level is-mobile mb-2"
                        style={{ direction: 'rtl' }}>
                        <div className="level-right">
                            <div className="level-item ml-2">
                                <div className="image is-40x40">
                                    {avatar ? (
                                        <img
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            className="is-fit-cover is-rounded"
                                            src={avatar}
                                            alt=""
                                        />
                                    ) : (
                                        <UserIcon className="comment-image-fallback" />
                                    )}
                                </div>
                            </div>
                            <div className="level-item has-text-weight-light has-text-weight-light--desktop-down">
                                <div>{name ? name : 'کاربر مهمان'}</div>
                            </div>
                        </div>
                    </div>

                    <p className="mr-3 paragraph--wide is-size-7 is-size-7--responsive-desktop-up has-text-weight-light">
                        {comment}
                    </p>

                    <div className="level is-mobile mt-2 mb-0 ml-2">
                        <div className="level-right"></div>
                        <div className="level-left">
                            <div
                                className="level-item"
                                style={{ flexDirection: 'column' }}>
                                <span
                                    onClick={() =>
                                        likeOrDislikeClickHandler('dislike')
                                    }
                                    className="is-clickable px-2 py-2"
                                    style={{ lineHeight: 0 }}>
                                    <DislikeIcon className="fill--danger size-by-w--4" />
                                </span>
                                <span className="comment-like-counter has-text-weight-light">
                                    {dislike}
                                </span>
                            </div>
                            <div
                                className="level-item"
                                style={{ flexDirection: 'column' }}>
                                <span
                                    onClick={() =>
                                        likeOrDislikeClickHandler('like')
                                    }
                                    className="is-clickable px-2 py-2"
                                    style={{ lineHeight: 0 }}>
                                    <LikeIcon className="fill--success size-by-w--4" />
                                </span>
                                <span className="comment-like-counter has-text-weight-light">
                                    {like}
                                </span>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="level mb-3">
                        <div className="level-item">
                            <p className="paragraph--wide is-size-7 is-size-7--responsive-desktop-up has-text-weight-light">
                                این نظر داستان کتاب را لو می دهد
                            </p>
                        </div>
                    </div>

                    <div className="level">
                        <div className="level-item">
                            <Button
                                size="md"
                                weight="has-text-weight-semibold"
                                onClick={() => setHide(false)}>
                                <span className="is-size-7">مشاهده</span>
                                <EyeIcon className="fill--white mr-1" />
                            </Button>
                        </div>
                    </div>
                </React.Fragment>
            )}

            {!noline ? (
                <div className="seperate-line has-background-primary mt-2" />
            ) : null}
        </div>
    );
};

export default CommentItem;

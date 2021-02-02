import React, { useEffect, useState } from 'react';

import TextWithBackIcon from '../../components/text-with-back-icon';
import CommentEditable from '../../components/comment-editable';

import { Link, useHistory } from 'react-router-dom';
import { colors, pageTitles } from '../../globalStates/statics';
import useSWR from 'swr';
import useGlobalState from '../../globalStates/globalStates';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { MetroSpinner } from 'react-spinners-kit';

const MyComments = () => {
    const history = useHistory();
    const [token, setToken] = useGlobalState('token');
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const { data: me } = useSWR(
        token ? ['/auth/me', token] : null,
        (url, my_token) => {
            return axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${my_token}`,
                    },
                })
                .then((res) => {
                    console.log('getting me');
                    setLoading(false);
                    return res.data;
                })
                .catch((err) => {
                    setLoading(false);
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

                    throw err;
                });
        }
    );

    useEffect(() => {
        if (me) {
            if (me.comments.length > 0) {
                setLoading(false);
            }
            setItems(me.comments.reverse());
        }
    }, [me]);

    useEffect(() => {
        document.title = pageTitles.myComments;
    }, []);

    return (
        <div className="main main--down pt-4">
            <TextWithBackIcon backClickHandler={() => history.goBack()}>
                نظرات من
            </TextWithBackIcon>

            <div className="mx-4 mt-5 myComments_wrapper">
                {loading ? (
                    <div className="level is-mobile">
                        <div className="level-item">
                            <MetroSpinner color={colors['primary']} size={42} />
                        </div>
                    </div>
                ) : items.length > 0 ? (
                    items.map((comment) => (
                        <Link
                            to={
                                !comment.is_accepted
                                    ? `/product/book/${comment.book_id}`
                                    : {
                                          pathname: `/product/comments/${comment.book_id}`,
                                          hash: `#comment-${comment.id}`,
                                      }
                            }
                            className="py-4 my-1"
                            key={comment.id}>
                            <CommentEditable
                                imageSrc={comment.book_thumbnail}
                                text={comment.body}
                                accepeted={comment.is_accepted}
                            />
                        </Link>
                    ))
                ) : (
                    <h3 className="mt-6 has-text-centered">
                        هیچ نظری یافت نشد
                    </h3>
                )}
            </div>
        </div>
    );
};

export default MyComments;

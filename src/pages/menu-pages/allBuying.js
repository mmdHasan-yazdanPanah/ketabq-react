import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { ImpulseSpinner } from 'react-spinners-kit';
import Axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import useGlobalState from '../../globalStates/globalStates';

import TextWithBackIcon from '../../components/text-with-back-icon';
import Buttton from '../../components/buttons/button';
import BuyedItem from '../../components/buyed-item';
import FadePageHoc from '../../components/hoc/fadePage';

import { pageTitles } from '../../globalStates/statics';
import useSWR from 'swr';

const AllBuying = () => {
    const [credit, setCredit] = useState('0');
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useGlobalState('token');
    const [buyItems, setBuyItems] = useState([]);
    const history = useHistory();

    const { data: me } = useSWR(
        token ? ['/auth/me', token] : null,
        (url, my_token) => {
            return Axios.get(url, {
                headers: {
                    Authorization: `Bearer ${my_token}`,
                },
            })
                .then((res) => {
                    console.log('getting me');
                    return res.data;
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

                    throw err;
                });
        }
    );

    useEffect(() => {
        if (me) {
            setCredit(me.balance);
            setBuyItems(me.payments.reverse());
            setLoading(false);
        }
    }, [me]);

    useEffect(() => {
        document.title = pageTitles.creditPage;
    }, []);

    return (
        <div
            className="full-page"
            style={{ minHeight: '100%', direction: 'rtl' }}>
            <div className="main main--down pt-4">
                <FadePageHoc status={loading}>
                    <ImpulseSpinner loading={loading} size={80} />
                </FadePageHoc>

                <TextWithBackIcon backClickHandler={() => history.goBack()}>
                    کیف پول
                </TextWithBackIcon>

                <div className="mr-5 ml-5 pl-2 mt-5 pt-4">
                    <div className="level allBuying_credit is-mobile">
                        <div className="level-right">
                            <div className="level-item">اعتبار شما</div>
                        </div>
                        <div className="level-left">
                            <div className="level-item">
                                <span className="has-text-weight-semibold">
                                    {credit.toLocaleString()}
                                </span>
                                <span className="mr-1">تومان</span>
                            </div>
                        </div>
                    </div>
                    <div className="level pt-2 pb-1">
                        <div className="level-item">
                            <Link to="/add-credit">
                                <Buttton size="md">
                                    <span className="px-4">افزایش اعتبار</span>
                                </Buttton>
                            </Link>
                        </div>
                    </div>

                    {!loading ? (
                        <React.Fragment>
                            <div className="level pt-5 mb-4">
                                <div className="level-item">خرید های شما</div>
                            </div>
                            {buyItems.length > 0 ? (
                                <div className="allBuying_items mb-6 pb-6">
                                    {buyItems.map((itemPay, indexPay, arrPay) =>
                                        itemPay.book.map(
                                            (book, indexBook, arrBook) => (
                                                <Link
                                                    key={book.id}
                                                    to={`/product/book/${book.id}`}
                                                    className="allBuying_item">
                                                    <BuyedItem
                                                        key={book.id}
                                                        price={
                                                            indexBook === 0
                                                                ? itemPay.amount.toLocaleString()
                                                                : false
                                                        }
                                                        imageSrc={
                                                            book.thumbnail
                                                        }
                                                        name={book.title}
                                                        author={
                                                            book.author
                                                                ? book.author
                                                                : ''
                                                        }
                                                    />
                                                    {indexBook ===
                                                        arrBook.length - 1 &&
                                                    indexPay !==
                                                        arrPay.length - 1 ? (
                                                        <div className="seperate-line has-background-primary mt-2" />
                                                    ) : null}
                                                </Link>
                                            )
                                        )
                                    )}
                                </div>
                            ) : (
                                <h3 className="mt-6 has-text-centered">
                                    .تا کنون هیچ کتابی خریداری نشده است
                                </h3>
                            )}
                        </React.Fragment>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default AllBuying;

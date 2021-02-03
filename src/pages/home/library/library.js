import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import Ripples from 'react-ripples';
import {
    Link,
    NavLink,
    Route,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';
import { MetroSpinner } from 'react-spinners-kit';
import useSWR from 'swr';
import { Trail, animated } from 'react-spring/renderprops';

import useGlobalState from '../../../globalStates/globalStates';
import { colors, pageTitles } from '../../../globalStates/statics';

import { ReactComponent as SettingIcon } from '../../../images/icons/settings.svg';

const LibraryPage = () => {
    const [current, setCurrent] = useState(0);
    const [theme] = useGlobalState('theme');
    const { path, url } = useRouteMatch();
    const [token, setToken] = useGlobalState('token');
    const history = useHistory();
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const { data } = useSWR(
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
        if (!data) {
            setLoading(true);
        } else {
            setLoading(false);
            setBooks(data.books.reverse());
            setFavorites(data.bookmarks.reverse());
        }
    }, [data]);

    useEffect(() => {
        if (current === 0) {
            document.title = pageTitles.myBooks;
        }
        if (current === 1) {
            document.title = pageTitles.bookmark;
        }
    }, [current]);

    // function setPage(index) {
    //     setCurrent(index);
    // }

    // useEffect(() => {
    //     console.log(location);
    // }, [])

    return (
        <div className="main main--down px-0">
            <header className="columns is-vcentered mx-0 is-mobile has-text-centered pr-4 pl-5 pt-5 pb-0 is-relative">
                <div className={`column  py-0 px-0 level`}>
                    <div className="level-item">
                        <NavLink
                            activeClassName={`library_header-item--active`}
                            isActive={(match, location) => {
                                if (match) {
                                    return true;
                                }
                                if (location.pathname === url) {
                                    return true;
                                }
                            }}
                            to={`${url}/books`}
                            className={`px-2 py-2 ml-4 library_header-item ${
                                theme === 'dark'
                                    ? 'library_header-item--dark'
                                    : ''
                            }`}
                            onClick={() => setCurrent(0)}>
                            {' '}
                            کتاب های من
                        </NavLink>

                        <NavLink
                            activeClassName={`library_header-item--active`}
                            exact
                            isActive={(match, location) => {
                                if (match) {
                                    return true;
                                }
                            }}
                            to={`${url}/bookmarks`}
                            className={`px-2 py-2 ml-4 library_header-item ${
                                theme === 'dark'
                                    ? 'library_header-item--dark'
                                    : ''
                            }`}>
                            نشان شده ها
                        </NavLink>
                    </div>
                </div>
            </header>

            <main className="library_main mt-5 pt-2">
                <div className="columns is-mobile is-multiline is-centered is-gapless">
                    {loading ? (
                        <div className="level is-mobile">
                            <div className="level-item">
                                <MetroSpinner
                                    color={colors['primary']}
                                    size={42}
                                />
                            </div>
                        </div>
                    ) : (
                        <Switch>
                            <React.Fragment>
                                <Route
                                    path={[`${path}/books`, `${path}`]}
                                    exact>
                                    {books.length === 0 ? (
                                        <h3 className="mt-4">
                                            هیچ کتابی یافت نشد
                                        </h3>
                                    ) : (
                                        <Trail
                                            native={true}
                                            items={books}
                                            keys={(item) =>
                                                item.id || item.title
                                            }
                                            from={{
                                                transform: 'translateY(-10px)',
                                            }}
                                            to={{
                                                transform: 'translateY(0px)',
                                            }}>
                                            {(item) => (props) => (
                                                <animated.div
                                                    style={props}
                                                    className="column is-narrow">
                                                    <Link
                                                        title={item.title}
                                                        to={`/product/book/${item.id}`}
                                                        className="library_image">
                                                        <img
                                                            loading="lazy"
                                                            className="radius--1 is-fit-cover"
                                                            src={item.avatar}
                                                            alt={item.title}
                                                        />
                                                    </Link>
                                                </animated.div>
                                            )}
                                        </Trail>
                                    )}
                                </Route>
                                <Route path={`${path}/bookmarks`} exact>
                                    {favorites.length === 0 ? (
                                        <h3 className="mt-4">
                                            هیچ کتابی یافت نشد
                                        </h3>
                                    ) : (
                                        <Trail
                                            native={true}
                                            items={favorites}
                                            keys={(item) =>
                                                item.id || item.title
                                            }
                                            from={{
                                                transform: 'translateY(-10px)',
                                            }}
                                            to={{
                                                transform: 'translateY(0px)',
                                            }}>
                                            {(item) => (props) => (
                                                <animated.div
                                                    style={props}
                                                    className="column is-narrow">
                                                    <Link
                                                        title={item.title}
                                                        to={`/product/book/${item.id}`}
                                                        className="library_image">
                                                        <img
                                                            loading="lazy"
                                                            className="radius--1 is-fit-cover"
                                                            src={item.avatar}
                                                            alt={item.title}
                                                        />
                                                    </Link>
                                                </animated.div>
                                            )}
                                        </Trail>
                                    )}
                                </Route>
                            </React.Fragment>
                        </Switch>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LibraryPage;

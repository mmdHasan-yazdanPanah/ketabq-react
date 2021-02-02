import React, { useEffect, useState } from 'react';

import MyInputText from '../../../components/form/my-input-text';
import Button from '../../../components/buttons/button';

import Axios from 'axios';
import ShowcaseItem from '../../../components/showcase-item';
import { CircleSpinner } from 'react-spinners-kit';
import { colors, pageTitles, rotesPath } from '../../../globalStates/statics';
import { useHistory } from 'react-router-dom';

// import { ReactComponent as FilterIcon } from '../../../images/icons/filter.svg';
// import ThemeBox from '../../../components/theme-box';

const count = 20;

const SearchWithFilter = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [ready, setReady] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const history = useHistory();

    const continueClickHandler = async () => {
        if (!pageLoading) {
            setPageLoading(true);
            setCurrentPage((prevState) => prevState + 1);
        }
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (value.trim().length > 0) {
            history.push({
                pathname: rotesPath.search(`${value}`),
                search: `?title=${value}`,
            });
        }
    };

    useEffect(() => {
        document.title = pageTitles.search(value);
    }, [value]);

    let source = Axios.CancelToken.source();

    useEffect(() => {
        if (value.trim().length > 0) {
            setReady(true);
            setLoading(true);

            let time = setTimeout(
                () =>
                    Axios.get(
                        `/search?count=${count}&title=${value}&page=${currentPage}`,
                        { cancelToken: source.token }
                    )
                        .then((res) => {
                            const data = res.data;
                            if (currentPage === 1) {
                                setItems(data.data);
                            } else {
                                setItems((prevState) =>
                                    prevState.concat(data.data)
                                );
                            }
                            setLoading(false);
                            setPageLoading(false);
                            setTotalPage(data.meta.last_page);
                        })
                        .catch((err) => {
                            if (Axios.isCancel(err)) {
                            } else {
                                throw err;
                            }
                        }),
                300
            );

            return () => {
                clearTimeout(time);
                source.cancel();
            };
        } else {
            setReady(false);
            setItems([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, currentPage]);

    return (
        <main className="main main--down  pt-5">
            <div className="columns is-mobile is-multiline mx-0 my-0 px-4">
                <div className="column px-0 pt-0">
                    <form onSubmit={formSubmitHandler}>
                        <MyInputText
                            onChange={(text) => {
                                setValue(text);
                                setCurrentPage(1);
                                setTotalPage(1);
                            }}
                            value={value}
                            search={true}
                            placeholder="کتاب مورد نظر خود را جستجو نمایید"
                        />
                    </form>
                </div>
            </div>

            {ready ? (
                loading || items.length > 0 ? (
                    <React.Fragment>
                        <div className="columns mx-0 my-0 pt-5 pb-3 is-mobile is-multiline is-centered">
                            <div className="column is-narrow px-2 py-3 my-2">
                                <ShowcaseItem
                                    loading={
                                        !items[0] || loading ? true : false
                                    }
                                    noContent={!items[0] ? true : false}
                                    discount={
                                        items[0]
                                            ? items[0]['discount_percent']
                                            : null
                                    }
                                    price={
                                        items[0]
                                            ? items[0]['price_toman']
                                            : null
                                    }
                                    name={items[0] ? items[0].title : null}
                                    author={items[0] ? items[0].author : null}
                                    rate={items[0] ? items[0].star : null}
                                    img={items[0] ? items[0].thumbnail : null}
                                    link={
                                        items[0]
                                            ? `/product/book/${items[0].id}`
                                            : null
                                    }
                                />
                            </div>
                            {items
                                .filter((value, index) => index > 0)
                                .map((item, index) => (
                                    <div
                                        className="column is-narrow px-2 py-3 my-2"
                                        key={item.id}>
                                        <ShowcaseItem
                                            discount={item['discount_percent']}
                                            price={item['price_toman']}
                                            name={item.title}
                                            author={item.author}
                                            rate={item.star}
                                            img={item.thumbnail}
                                            link={`/product/book/${item.id}`}
                                        />
                                    </div>
                                ))}
                        </div>
                        {totalPage > currentPage || pageLoading ? (
                            <div className="level is-mobile mt-3 mb-6">
                                <div className="level-item">
                                    <div style={{ position: 'relative' }}>
                                        {pageLoading ? (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    transform:
                                                        'translateY(-50%)',
                                                    left: 'calc(100% + 7px)',
                                                }}>
                                                <CircleSpinner
                                                    size={21}
                                                    color={colors['primary']}
                                                />
                                            </div>
                                        ) : null}
                                        <Button
                                            onClick={continueClickHandler}
                                            size="md"
                                            weight="has-text-weight-semibold">
                                            ادامه کتاب ها
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </React.Fragment>
                ) : (
                    <div className="columns mx-0 my-0 pt-5 pb-3 is-mobile is-multiline pr-3 pl-4 is-centered">
                        <h3>هیچ کتابی یافت نشد</h3>
                    </div>
                )
            ) : null}

            {/* <div className="columns is-centered is-mobile is-multiline mt-4 mx-0 px-4">
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        موفقیت
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        کسب و کار
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        رمان و داستان{' '}
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        عادل فردوسی پور
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        اثر مرکب
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        هری پاتر
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        میکروبوک
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        نشر ققنوس
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        دارن هاردی
                    </Button>
                </div>
                <div className="column is-narrow py-2 px-1">
                    <Button
                        style={{ minWidth: '6.25rem' }}
                        size="small"
                        backgroudClass={`${
                            theme === 'light' ? 'is-white' : 'is-dark'
                        }`}
                        textColorClass={`${
                            theme === 'light' ? 'has-text-black' : ''
                        }`}
                        className={'shadow--1'}
                    >
                        ملت عشق
                    </Button>
                </div>
            </div> */}

            {/* <section className="mt-4 pt-1" style={{ direction: 'rtl' }}>
                <SectionHeader fontsizeClass="is-size-7--responsive is-size-7--responsive-desktop-up">
                    جستجوهای پیشین شما
                </SectionHeader>
                <div className="columns is-mobile mx-0 px-4 my-0 pt-2 is-centered">
                    <a
                        href="#"
                        className="column px-2"
                        style={{ maxWidth: '200px' }}
                    >
                        <div className="image is-square">
                            <img
                                className="radius--1 is-fit-cover"
                                src={image1}
                                alt=""
                            />
                        </div>
                    </a>
                    <a
                        href="#"
                        className="column px-2"
                        style={{ maxWidth: '200px' }}
                    >
                        <div className="image is-square">
                            <img
                                className="radius--1 is-fit-cover"
                                src={image1}
                                alt=""
                            />
                        </div>
                    </a>
                    <a
                        href="#"
                        className="column px-2"
                        style={{ maxWidth: '200px' }}
                    >
                        <div className="image is-square">
                            <img
                                className="radius--1 is-fit-cover"
                                src={image1}
                                alt=""
                            />
                        </div>
                    </a>
                </div>
            </section> */}

            {/* <section className="mt-4 pt-1" style={{ direction: 'rtl' }}>
                <SectionHeader fontsizeClass="is-size-7--responsive is-size-7--responsive-desktop-up">
                    بیشترین جستجوی کاربران
                </SectionHeader>
                <div className="columns is-mobile mx-0 px-4 my-0 pt-2 is-centered">
                    <a
                        href="#"
                        className="column px-2"
                        style={{ maxWidth: '200px' }}
                    >
                        <div className="image is-square">
                            <img
                                className="radius--1 is-fit-cover"
                                src={image1}
                                alt=""
                            />
                        </div>
                    </a>
                    <a
                        href="#"
                        className="column px-2"
                        style={{ maxWidth: '200px' }}
                    >
                        <div className="image is-square">
                            <img
                                className="radius--1 is-fit-cover"
                                src={image1}
                                alt=""
                            />
                        </div>
                    </a>
                    <a
                        href="#"
                        className="column px-2"
                        style={{ maxWidth: '200px' }}
                    >
                        <div className="image is-square">
                            <img
                                className="radius--1 is-fit-cover"
                                src={image1}
                                alt=""
                            />
                        </div>
                    </a>
                </div>
            </section> */}
        </main>
    );
};

export default SearchWithFilter;

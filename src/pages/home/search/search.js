import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Axios from 'axios';

import useGlobalState from '../../../globalStates/globalStates';
import { colors } from '../../../globalStates/statics';

import ShowcaseItem from '../../../components/showcase-item';
import Button from '../../../components/buttons/button';
import TextWithBackIcon from '../../../components/text-with-back-icon';
import { pageTitles } from '../../../globalStates/statics';
import { CircleSpinner } from 'react-spinners-kit';
import useSWR from 'swr';

const SearchPage = () => {
    const count = 20;
    const [buttonsState, setButtonsState] = useState([false, false, false]);
    const location = useLocation();
    const prams = useParams();
    const [currentButton, setCurrentButon] = useState(false);
    const [ready, setReady] = useState(false);
    const [theme] = useGlobalState('theme');
    const history = useHistory();
    const [items, setItems] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);

    const generalApiUrl = '/general';
    const { data: generalData, mutate: mutateGeneral } = useSWR(
        generalApiUrl,
        async (url) => {
            try {
                const res = await Axios.get(url);
                const data = res.data;
                data['bookDiscounted'].sort(
                    (a, b) => b.discount_percent - a.discount_percent
                );
                console.log('DATA:', data);
                return data;
            } catch (err) {
                throw err;
            }
        },
        {
            initialData: {
                bookDiscounted: [],
                mostSales: [],
                narrators: [],
                authors: [],
                translators: [],
                publishers: [],
            },
            revalidateOnMount: false,
        }
    );

    const buttonsSearchPram = ['sort=3', 'sort=11', 'sort=8'];

    const buttonClickHandler = (index) => {
        setButtonsState((prevState) => {
            let res = [...prevState];

            if (res[index] !== true) {
                res = res.map(() => false);
                res[index] = true;
            }

            return res;
        });
        setCurrentButon(index);
    };

    const continueClickHandler = async () => {
        if (!pageLoading) {
            setPageLoading(true);
            setCurrentPage((prevState) => prevState + 1);
        }
    };

    useEffect(() => {
        if (currentPage !== 1 && prams.fromGeneral !== 'true') {
            Axios.get(
                `/search${location.search}&count=${count}${
                    buttonsSearchPram[currentButton]
                        ? '&' + buttonsSearchPram[currentButton]
                        : ''
                }&page=${currentPage}`
            ).then((res) => {
                const data = res.data;
                if (data.data.length === 0) setNotFound(true);
                setItems((prevState) => prevState.concat(data.data));
                setPageLoading(false);
                setTotalPage(data.meta.last_page);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        console.log('state:', prams.disableSort);
        if (prams.disableSort !== 'true') {
            console.log('state:', prams.disableSort);
            setCurrentButon(0);
            buttonClickHandler(0);
        }
        setReady(true);
    }, [prams.disableSort]);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        if (prams.fromGeneral !== 'true') {
            if (ready) {
                Axios.get(
                    `/search${location.search}&count=${count}${
                        buttonsSearchPram[currentButton]
                            ? '&' + buttonsSearchPram[currentButton]
                            : ''
                    }`
                ).then((res) => {
                    const data = res.data;
                    if (data.data.length === 0) setNotFound(true);
                    setItems(data.data);
                    setCurrentPage(1);
                    setTotalPage(data.meta.last_page);
                    console.log(data.data);
                    setLoading(false);
                });
            }
        } else {
            if (ready) {
                setCurrentPage(1);
                mutateGeneral().then((res) => {
                    let allItems = res[location.search.replace('?', '')];
                    if (allItems.length === 0) {
                        setNotFound(true);
                    }
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentButton, ready]);

    useEffect(() => {
        console.log('generalData:', generalData);
        if (prams.fromGeneral === 'true') {
            // setAllData(generalData[location.search.replace('?', '')]);
            let allItems = generalData[location.search.replace('?', '')];
            if (ready) {
                if (allItems.length > 0) {
                    setItems(allItems.slice(0, count * currentPage));
                    setTotalPage(Math.ceil(allItems.length / count));
                } else {
                    console.log('from here');
                }
                setLoading(false);
                setPageLoading(false);

                Axios.get(
                    `/search${location.search}&count=${count}${
                        buttonsSearchPram[currentButton]
                            ? '&' + buttonsSearchPram[currentButton]
                            : ''
                    }`
                ).then((res) => {
                    const data = res.data;
                    if (data.data.length === 0)
                        setTotalPage(data.meta.last_page);
                    console.log(data.data);
                    setLoading(false);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generalData[location.search.replace('?', '')], currentPage, ready]);

    useEffect(() => {
        document.title = pageTitles.search(prams.title);
    }, [prams]);

    return (
        <main className="pt-4 main main--down">
            <TextWithBackIcon
                className="mb-5"
                backClickHandler={() => history.goBack()}>
                {prams.title}
            </TextWithBackIcon>

            {prams.disableSort !== 'true' && prams.fromGeneral !== 'true' ? (
                <div className="columns mx-0 mb-0 mt-4 is-mobile is-multiline px-3">
                    <div className="column is-narrow pr-0 pl-2 py-1">
                        <span className="is-size-8 is-size-8--responsive-tablet-up">
                            مرتب سازی براساس
                        </span>
                    </div>
                    <div className="column px-0 py-0">
                        <div className="columns mx-0 my-0 is-mobile is-multiline">
                            <div className="column is-narrow pr-0 pl-1 py-1">
                                <Button
                                    disabled={
                                        loading && currentButton !== 0
                                            ? true
                                            : false
                                    }
                                    size="small"
                                    backgroudClass={
                                        !buttonsState[0]
                                            ? theme === 'light'
                                                ? 'is-white'
                                                : 'is-dark'
                                            : false
                                    }
                                    textColorClass={
                                        !buttonsState[0]
                                            ? theme === 'light'
                                                ? 'has-text-black'
                                                : ''
                                            : false
                                    }
                                    onClick={() => buttonClickHandler(0)}
                                    className={'shadow--1 btn-sm--responsive'}>
                                    محبوب ترین
                                </Button>
                            </div>
                            <div className="column is-narrow pr-0 pl-1 py-1">
                                <Button
                                    disabled={
                                        loading && currentButton !== 1
                                            ? true
                                            : false
                                    }
                                    size="small"
                                    backgroudClass={
                                        !buttonsState[1]
                                            ? theme === 'light'
                                                ? 'is-white'
                                                : 'is-dark'
                                            : false
                                    }
                                    textColorClass={
                                        !buttonsState[1]
                                            ? theme === 'light'
                                                ? 'has-text-black'
                                                : ''
                                            : false
                                    }
                                    onClick={() => buttonClickHandler(1)}
                                    className={'shadow--1 btn-sm--responsive'}>
                                    پرفروش ترین
                                </Button>
                            </div>
                            <div className="column is-narrow pr-0 pl-0 py-1">
                                <Button
                                    disabled={
                                        loading && currentButton !== 2
                                            ? true
                                            : false
                                    }
                                    size="small"
                                    backgroudClass={
                                        !buttonsState[2]
                                            ? theme === 'light'
                                                ? 'is-white'
                                                : 'is-dark'
                                            : false
                                    }
                                    textColorClass={
                                        !buttonsState[2]
                                            ? theme === 'light'
                                                ? 'has-text-black'
                                                : ''
                                            : false
                                    }
                                    onClick={() => buttonClickHandler(2)}
                                    className={'shadow--1 btn-sm--responsive'}>
                                    ارزان ترین
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {!notFound ? (
                <React.Fragment>
                    <div className="columns mx-0 my-0 pt-5 pb-3 is-mobile is-multiline is-centered">
                        <div className="column is-narrow px-2 py-3 my-2">
                            <ShowcaseItem
                                loading={!items[0] || loading ? true : false}
                                noContent={!items[0] ? true : false}
                                discount={
                                    items[0]
                                        ? items[0]['discount_percent']
                                        : null
                                }
                                price={
                                    items[0] ? items[0]['price_toman'] : null
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
                                                transform: 'translateY(-50%)',
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
            )}
        </main>
    );
};

export default SearchPage;

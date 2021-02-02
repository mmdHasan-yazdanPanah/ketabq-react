import React, { useEffect, useState } from 'react';

import Axios from 'axios';
import ShowcaseItem from '../../components/showcase-item';
import useSWR from 'swr';
import { Link, useHistory, useParams } from 'react-router-dom';
import TextWithBackIcon from '../../components/text-with-back-icon';
import { pageTitles } from '../../globalStates/statics';
import Button from '../../components/buttons/button';

// import { ReactComponent as FilterIcon } from '../../images/icons/filter.svg';
// import ThemeBox from '../../components/theme-box';

const PackageItem = () => {
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [ready, setReady] = useState(true);
    const [items, setItems] = useState([]);
    const [pack, setPack] = useState(false);
    const history = useHistory();
    const { id } = useParams();

    const packagesUrl = '/packages';
    const { data: packages } = useSWR(
        packagesUrl,
        async (url) => {
            try {
                const res = await Axios.get(url);
                const data = res.data.packages;
                setLoading(false);
                return data;
            } catch (err) {
                throw err;
            }
        },
        { initialData: [], revalidateOnMount: true }
    );

    useEffect(() => {
        let match = packages.filter((pack) => {
            // eslint-disable-next-line eqeqeq
            return pack.id == id;
        });
        console.log(match);
        if (match.length > 0) {
            setItems(match[0].books);
            setPack(match[0]);
        }
        if (packages.length > 0) {
            setLoading(false);
        }
    }, [id, packages]);

    useEffect(() => {
        if (pack) {
            document.title = pageTitles.packageItem(pack.title);
        }
    }, [pack]);

    return (
        <main className="main main--down pt-5">
            <TextWithBackIcon
                className="mb-5"
                backClickHandler={() => history.goBack()}>
                {`${items.length ? pack.title : ''}`}
            </TextWithBackIcon>
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
                        {items.length > 0 ? (
                            <div
                                className="mb-5"
                                style={{
                                    position: 'sticky',
                                    bottom: '100px',
                                }}>
                                <div className="level is-mobile mb-2">
                                    <div className="level-item">
                                        <Link
                                            to={`/product/buy-package/${pack.id}`}>
                                            <Button
                                                style={{
                                                    display: 'inline-block',
                                                }}
                                                size="md"
                                                weight="has-text-weight-semibold">
                                                {'خرید تمامی کتاب ها'}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="level is-mobile">
                                    <div className="level-item">
                                        <Link
                                            to={`/product/buy-package/${pack.id}`}>
                                            <Button
                                                style={{
                                                    display: 'inline-block',
                                                }}
                                                size="md"
                                                weight="has-text-weight-semibold">
                                                <span>
                                                    {'به مبلغ '}
                                                    <ins>
                                                        {pack.price_toman.toLocaleString()}
                                                    </ins>
                                                    {' تومان'}
                                                </span>
                                            </Button>
                                        </Link>
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
        </main>
    );
};

export default PackageItem;

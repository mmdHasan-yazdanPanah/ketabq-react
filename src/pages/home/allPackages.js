import React, { useEffect, useState } from 'react';

import Axios from 'axios';
import ShowcaseItem from '../../components/showcase-item';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';
import TextWithBackIcon from '../../components/text-with-back-icon';
import { pageTitles } from '../../globalStates/statics';

// import { ReactComponent as FilterIcon } from '../../images/icons/filter.svg';
// import ThemeBox from '../../components/theme-box';

const AllPackages = () => {
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [ready, setReady] = useState(true);
    const history = useHistory();

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
        if (packages.length > 0) {
            setLoading(false);
        }
    }, [packages]);

    useEffect(() => {
        document.title = pageTitles.allPackages;
    }, []);

    return (
        <main className="main main--down pt-5">
            <TextWithBackIcon
                className="mb-5"
                backClickHandler={() => history.goBack()}>
                تمامی گنجینه ها
            </TextWithBackIcon>
            {ready ? (
                loading || packages.length > 0 ? (
                    <React.Fragment>
                        <div className="columns mx-0 my-0 pt-5 pb-3 is-mobile is-multiline is-centered">
                            <div className="column is-narrow px-2 py-3 my-2">
                                <ShowcaseItem
                                    loading={
                                        !packages[0] || loading ? true : false
                                    }
                                    noContent={!packages[0] ? true : false}
                                    discount={
                                        packages[0]
                                            ? packages[0]['discount_percent']
                                            : null
                                    }
                                    price={
                                        packages[0]
                                            ? packages[0]['price_toman']
                                            : null
                                    }
                                    name={
                                        packages[0] ? packages[0].title : null
                                    }
                                    author={
                                        packages[0] ? packages[0].author : null
                                    }
                                    rate={packages[0] ? packages[0].star : null}
                                    img={
                                        packages[0]
                                            ? packages[0].thumbnail
                                            : null
                                    }
                                    link={
                                        packages[0]
                                            ? `/packages/${packages[0].id}`
                                            : null
                                    }
                                />
                            </div>
                            {packages
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
                                            link={`/packages/${item.id}`}
                                        />
                                    </div>
                                ))}
                        </div>
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

export default AllPackages;

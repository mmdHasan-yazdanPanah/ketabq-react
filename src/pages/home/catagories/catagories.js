import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import CatItem from '../../../components/catagory-item';

import { pageTitles } from '../../../globalStates/statics';

const CatagoiesPage = ({ animationRest }) => {
    const [readyToSet, setReadyToSet] = useState(false);
    useEffect(() => {
        if (readyToSet === false && animationRest) {
            setReadyToSet(true);
            console.log('now happend');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationRest]);

    const { data: items } = useSWR(
        '/categories',
        (url) =>
            axios
                .get(url)
                .then((res) => {
                    const data = res.data;
                    if (data.success) {
                        return data.items;
                    }
                })
                .catch((err) => {
                    console.log(err);
                }),
        { initialData: [], revalidateOnMount: true }
    );

    useEffect(() => {
        document.title = pageTitles.catagory;
    }, []);

    return (
        <main className="main main--down">
            <div
                className="columns mx-0 my-0 is-mobile is-multiline pt-4"
                style={{ direction: 'rtl', justifyContent: 'space-around' }}>
                {readyToSet && items.length > 0 ? (
                    items.map((catItem) =>
                        [catItem, ...catItem.chileds].map((cat) => (
                            <div className="column is-narrow px-5" key={cat.id}>
                                <CatItem
                                    type="large"
                                    href={{
                                        pathname: `/search/${cat.name}`,
                                        search: `?category=${cat.id}`,
                                    }}
                                    svgFromPublic={`/cat-svgs/${cat.name}.svg`}
                                    objectFallBack={
                                        <img
                                            loading="lazy"
                                            src={cat.image}
                                            alt={cat.name}
                                            className="cat-item_icon"
                                        />
                                    }>
                                    {cat.name}
                                </CatItem>
                            </div>
                        ))
                    )
                ) : (
                    <div className="column is-narrow px-5">
                        <CatItem type="large" href="#" loading={true}>
                            {' '}
                        </CatItem>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CatagoiesPage;

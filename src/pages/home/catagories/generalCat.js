import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';

import CatItem from '../../../components/catagory-item';

import NarratorItem from '../../../components/narrator-item';
import { pageTitles, rotesPath } from '../../../globalStates/statics';

const CatagoiesPage = ({ animationRest }) => {
    const [readyToSet, setReadyToSet] = useState(false);
    useEffect(() => {
        if (readyToSet === false && animationRest) {
            setReadyToSet(true);
            console.log('now happend');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationRest]);

    const { propery } = useParams();

    const generalApiUrl = '/general';
    const { data: generalData } = useSWR(
        generalApiUrl,
        async (url) => {
            try {
                const res = await axios.get(url);
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
            revalidateOnMount: true,
        }
    );

    const [search, setSearch] = useState('#');

    useEffect(() => {
        switch (propery) {
            case 'narrators':
                setSearch('narrator');
                document.title = pageTitles.narratorsPage;
                break;
            case 'authors':
                setSearch('author');
                document.title = pageTitles.authorsPage;
                break;
            case 'translators':
                setSearch('translator');
                document.title = pageTitles.translatorsPage;
                break;
            case 'publishers':
                setSearch('publisher');
                document.title = pageTitles.publishersPage;
                break;
            default:
                setSearch('#');
        }
    }, [generalData, propery]);

    return (
        <main className="main main--down">
            <div
                className="columns mx-0 my-0 is-mobile is-multiline pt-4"
                style={{ direction: 'rtl', justifyContent: 'space-around' }}>
                {readyToSet && generalData[propery]?.length > 0 ? (
                    generalData[propery].map((item) => (
                        <div className="column is-narrow px-5" key={item.name}>
                            <NarratorItem
                                key={item.id}
                                imgSrc={item.avatar}
                                name={item.name}
                                link={{
                                    pathname: rotesPath.search(`${item.name}`),
                                    search: `?${search}=${item.id}`,
                                }}
                            />
                        </div>
                    ))
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

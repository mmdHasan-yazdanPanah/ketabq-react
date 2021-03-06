import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useHistory, useParams } from 'react-router-dom';

import CatItem from '../../../components/catagory-item';

import NarratorItem from '../../../components/narrator-item';
import { pageTitles, rotesPath } from '../../../globalStates/statics';
import TextWithBackIcon from '../../../components/text-with-back-icon';

const CatagoiesPage = ({ animationRest }) => {
    const [readyToSet, setReadyToSet] = useState(false);
    useEffect(() => {
        if (readyToSet === false && animationRest) {
            setReadyToSet(true);
            console.log('now happend');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationRest]);

    const history = useHistory();

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
                data['narrators'].reverse();
                data['narrators'] = data['narrators'].filter(
                    (item) => item.avatar
                );
                data['authors'].reverse();
                data['authors'] = data['authors'].filter((item) => item.avatar);
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
    const [title, setTitle] = useState();
    useEffect(() => {
        switch (propery) {
            case 'narrators':
                setSearch('narrator');
                document.title = pageTitles.narratorsPage;
                setTitle('گویندگان');
                break;
            case 'authors':
                setSearch('author');
                document.title = pageTitles.authorsPage;
                setTitle('نویسندگان');
                break;
            case 'translators':
                setSearch('translator');
                document.title = pageTitles.translatorsPage;
                setTitle('مترجمان');
                break;
            case 'publishers':
                setSearch('publisher');
                document.title = pageTitles.publishersPage;
                setTitle('انشارات');
                break;
            default:
                history.push('/404');
        }
    }, [generalData, propery]);

    return (
        <main className="pt-4 main main--down">
            <TextWithBackIcon
                className="mb-5"
                backClickHandler={() => history.goBack()}>
                {title ? (
                    title
                ) : (
                    <span style={{ visibility: 'hidden' }}>نامشخص</span>
                )}
            </TextWithBackIcon>
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

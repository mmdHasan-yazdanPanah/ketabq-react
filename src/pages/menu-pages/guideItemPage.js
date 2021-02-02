import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MetroSpinner } from 'react-spinners-kit';
import useSWR from 'swr';

import TextWithBackIcon from '../../components/text-with-back-icon';
import { colors, pageTitles } from '../../globalStates/statics';

const GuideItemPage = () => {
    const { title } = useParams();
    const [pageData, setPageData] = useState(false);
    const history = useHistory();

    const menusUrl = '/menus';
    const { data: pages, mutate } = useSWR(menusUrl, async (url) => {
        try {
            const res = await Axios.get(url);
            const data = res.data;
            return data;
        } catch (err) {
            throw err;
        }
    });

    useEffect(() => {
        let has = false;
        if (pages?.length) {
            pages.forEach((page) => {
                if (page.menu_title === title && !has) {
                    has = true;
                    setPageData(page.page);
                }
            });
        }
    }, [pages, title]);

    useEffect(() => {
        mutate().then((data) => {
            let has = false;
            data.forEach((page) => {
                if (page.menu_title === title) {
                    has = true;
                }
            });
            if (!has) {
                history.push('/404');
            }
        });
    }, [history, mutate, title]);

    useEffect(() => {
        document.title = pageTitles.guideItem(title);
    }, [title]);

    return (
        <section className="main main--down pt-4">
            <TextWithBackIcon backClickHandler={() => history.goBack()}>
                راهنما
            </TextWithBackIcon>
            <main className="mt-5 pt-1 mx-5">
                {!pageData ? (
                    <div className="level is-mobile">
                        <div className="level-item mt-3">
                            <MetroSpinner color={colors['primary']} size={42} />
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <article className="py-2 has-text-weight-semibold has-text-centered px-2 mb-1">
                            <div
                                style={{ display: 'block' }}
                                className="pt-2 px-2">
                                <div>{pageData.page_name}</div>
                                <div className="mt-4 seperate-line has-background-primary"></div>
                            </div>
                        </article>

                        <p className="has-text-weight-light mt-5 has-text-centered px-1 mb-4">
                            {pageData.body}
                        </p>
                    </React.Fragment>
                )}
            </main>
        </section>
    );
};

export default GuideItemPage;

import Axios from 'axios';
import React, { useEffect } from 'react';
import { createRipples } from 'react-ripples';
import { useHistory } from 'react-router-dom';
import { MetroSpinner } from 'react-spinners-kit';
import useSWR from 'swr';
import DelayedLink from '../../components/delayedLink';

import TextWithBackIcon from '../../components/text-with-back-icon';
import { colors, pageTitles } from '../../globalStates/statics';

const duration = 900;
const delay = 300;
const MyRipple = createRipples({
    during: duration,
});

const GuidePage = () => {
    const history = useHistory();

    const menusUrl = '/menus';
    const { data: pages } = useSWR(menusUrl, async (url) => {
        try {
            const res = await Axios.get(url);
            const data = res.data;
            return data;
        } catch (err) {
            throw err;
        }
    });

    useEffect(() => {
        document.title = pageTitles.guidePage;
    }, []);

    return (
        <section className="main main--down pt-4">
            <TextWithBackIcon backClickHandler={() => history.goBack()}>
                راهنما
            </TextWithBackIcon>
            <main className="mt-4 is-size-7 is-size-7--responsive-tablet-up has-text-weight-semibold mx-5 px-2">
                {!pages ? (
                    <div className="level is-mobile">
                        <div className="level-item mt-3">
                            <MetroSpinner color={colors['primary']} size={42} />
                        </div>
                    </div>
                ) : (
                    pages.map((page) => (
                        <article className="py-2">
                            <MyRipple dura className="is-block">
                                <DelayedLink
                                    delay={delay}
                                    to={`/guide/item/${page.menu_title}`}
                                    style={{ display: 'block' }}
                                    className="pt-2 px-2">
                                    <div>{page.menu_title}</div>
                                    <div className="mt-4 seperate-line has-background-primary"></div>
                                </DelayedLink>
                            </MyRipple>
                        </article>
                    ))
                )}
            </main>
        </section>
    );
};

export default GuidePage;

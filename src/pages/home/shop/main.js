import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import axios from 'axios';
import useSWR from 'swr';

import HeroArea from './heroArea';
import CatItem from '../../../components/catagory-item';
import CatSlider from './catagories-slider';
import SectionHeader from '../../../components/section-header';
import ShowcaseItem from '../../../components/showcase-item';
import NarratorItem from '../../../components/narrator-item';
import { pageTitles, rotesPath } from '../../../globalStates/statics';
import { store } from 'react-notifications-component';
import useGlobalState from '../../../globalStates/globalStates';

const showcaseCount = 12;
const narrator_other_count = 20;
export const smallIconsCount = 25;

const Main = ({ style, animationRest }) => {
    const [readyToSet, setReadyToSet] = useState(false);
    useEffect(() => {
        if (readyToSet === false && animationRest) {
            setReadyToSet(true);
            console.log('now happend');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationRest]);

    const [newsItems, setNewsItems] = useState([]);
    const newsItemsUrl = `/search?sort=5&count=${showcaseCount}`;
    const { data: newsItemsData } = useSWR(newsItemsUrl, () => {
        return axios
            .get(newsItemsUrl)
            .then((res) => {
                const data = res.data;
                return data.data;
            })
            .catch((err) => {
                throw err;
            });
    });
    useEffect(() => {
        if (newsItemsData) {
            setNewsItems(newsItemsData);
        }
    }, [newsItemsData]);

    const [generalApiLoading, setGeneralApiLoading] = useState(true);
    const generalApiUrl = '/general';
    const {
        data: {
            bookDiscounted,
            mostSales,
            narrators,
            authors,
            translators,
            publishers,
            ...general
        },
    } = useSWR(
        generalApiUrl,
        async (url) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                data['bookDiscounted'].sort(
                    (a, b) => b.discount_percent - a.discount_percent
                );
                data['narrators'].reverse();
                data['authors'].reverse();
                console.log('DATA:', data);
                setGeneralApiLoading(false);
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
                loading: true,
            },
            revalidateOnMount: true,
        }
    );
    useEffect(() => {
        if (!general.loading) {
            setGeneralApiLoading(false);
        }
    }, [general.loading]);

    const packagesUrl = '/packages';
    const { data: packages } = useSWR(
        packagesUrl,
        async (url) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                return data.packages;
            } catch (err) {
                throw err;
            }
        },
        { initialData: [], revalidateOnMount: true }
    );

    useEffect(() => {
        document.title = pageTitles.main;
    }, []);

    const [firstLoad, setFirstLoad] = useGlobalState('firstLoad');
    useEffect(() => {
        const time = 1000 * 12;
        const title = 'ما رو با گوشی دنبال کنید';
        const message = 'برای یه تجربه بهتر، یه سر با گوشی به سایت ما بزن!';
        const showTimes = 4;

        if (firstLoad && !window.mobileCheck()) {
            setTimeout(() => {
                const checkTimes = +localStorage.getItem('check-times');
                if (checkTimes < showTimes) {
                    store.addNotification({
                        container: 'bottom-right',
                        animationIn: ['animate__animated', 'animate__flipInX'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        type: 'info',
                        dismiss: {
                            duration: 10000,
                            pauseOnHover: true,
                        },
                        title: title,
                        message: message,
                    });

                    localStorage.setItem('check-times', checkTimes + 1);
                }
            }, time);
        }

        setFirstLoad(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <main
                className="main main--down landscape"
                style={{ direction: 'rtl', ...style }}>
                <HeroArea
                    readyToSet={readyToSet}
                    className="mt-3 hero-slider"
                />

                <CatSlider
                    readyToSet={readyToSet}
                    className="section mt-4 pt-3"
                />

                <section
                    className="section-margin"
                    style={{ direction: 'rtl' }}>
                    <SectionHeader
                        link={{
                            pathname: rotesPath.search('تازه ها', 'true'),
                            search: `?sort=5`,
                        }}>
                        تازه ها
                    </SectionHeader>
                    <article className="showcase-slider">
                        <Swiper
                            freeMode={true}
                            slidesPerView={'auto'}
                            centeredSlides={false}
                            spaceBetween={19}
                            grabCursor={false}
                            rtl={true}
                            observer={true}
                            freeModeMomentumRatio={0.5}
                            slidesOffsetAfter={80}>
                            <ShowcaseItem
                                loading={
                                    !newsItems[0] || !readyToSet ? true : false
                                }
                                noContent={
                                    !newsItems[0] || !readyToSet ? true : false
                                }
                                discount={
                                    newsItems[0] && readyToSet
                                        ? newsItems[0]['discount_percent']
                                        : null
                                }
                                price={
                                    newsItems[0] && readyToSet
                                        ? newsItems[0]['price_toman']
                                        : null
                                }
                                name={
                                    newsItems[0] && readyToSet
                                        ? newsItems[0].title
                                        : null
                                }
                                author={
                                    newsItems[0] && readyToSet
                                        ? newsItems[0].author
                                        : null
                                }
                                rate={
                                    newsItems[0] && readyToSet
                                        ? newsItems[0].star
                                        : null
                                }
                                img={
                                    newsItems[0] && readyToSet
                                        ? newsItems[0].thumbnail
                                        : null
                                }
                                link={
                                    newsItems[0] && readyToSet
                                        ? `/product/book/${newsItems[0].id}`
                                        : null
                                }
                            />
                            {readyToSet
                                ? newsItems
                                      .filter((value, index) => index > 0)
                                      .map((item, index) => (
                                          <ShowcaseItem
                                              key={item.id}
                                              discount={
                                                  item['discount_percent']
                                              }
                                              price={item['price_toman']}
                                              name={item.title}
                                              author={item.author}
                                              rate={item.star}
                                              img={item.thumbnail}
                                              link={`/product/book/${item.id}`}
                                          />
                                      ))
                                : []}
                        </Swiper>
                    </article>
                </section>

                {generalApiLoading || bookDiscounted.length > 0 ? (
                    <section
                        className="section-margin"
                        style={{ direction: 'rtl' }}>
                        <SectionHeader
                            type="hot"
                            link={{
                                pathname: rotesPath.search(
                                    'نخفیف های داغ',
                                    'true',
                                    'true'
                                ),
                                search: `bookDiscounted`,
                            }}>
                            تخفیف های داغ
                        </SectionHeader>
                        <article className="showcase-slider">
                            <Swiper
                                freeMode={true}
                                slidesPerView={'auto'}
                                centeredSlides={false}
                                spaceBetween={19}
                                grabCursor={false}
                                rtl={true}
                                observer={true}
                                slidesOffsetAfter={80}
                                freeModeMomentumRatio={0.5}>
                                <ShowcaseItem
                                    loading={
                                        !bookDiscounted[0] || !readyToSet
                                            ? true
                                            : false
                                    }
                                    noContent={
                                        !bookDiscounted[0] || !readyToSet
                                            ? true
                                            : false
                                    }
                                    discount={
                                        bookDiscounted[0] && readyToSet
                                            ? bookDiscounted[0][
                                                  'discount_percent'
                                              ]
                                            : null
                                    }
                                    price={
                                        bookDiscounted[0] && readyToSet
                                            ? bookDiscounted[0]['price_toman']
                                            : null
                                    }
                                    name={
                                        bookDiscounted[0] && readyToSet
                                            ? bookDiscounted[0].title
                                            : null
                                    }
                                    author={
                                        bookDiscounted[0] && readyToSet
                                            ? bookDiscounted[0].author
                                            : null
                                    }
                                    rate={
                                        bookDiscounted[0] && readyToSet
                                            ? bookDiscounted[0].star
                                            : null
                                    }
                                    img={
                                        bookDiscounted[0] && readyToSet
                                            ? bookDiscounted[0].thumbnail
                                            : null
                                    }
                                    link={
                                        bookDiscounted[0] && readyToSet
                                            ? `/product/book/${bookDiscounted[0].id}`
                                            : null
                                    }
                                />
                                {readyToSet
                                    ? bookDiscounted
                                          .filter(
                                              (value, index) =>
                                                  index > 0 &&
                                                  index < showcaseCount
                                          )
                                          .map((item, index) => (
                                              <ShowcaseItem
                                                  key={item.id}
                                                  discount={
                                                      item['discount_percent']
                                                  }
                                                  price={item['price_toman']}
                                                  name={item.title}
                                                  author={item.author}
                                                  rate={item.star}
                                                  img={item.thumbnail}
                                                  link={`/product/book/${item.id}`}
                                              />
                                          ))
                                    : []}
                            </Swiper>
                        </article>
                    </section>
                ) : null}

                {generalApiLoading || mostSales.length > 0 ? (
                    <section
                        className="section-margin"
                        style={{ direction: 'rtl' }}>
                        <SectionHeader
                            link={{
                                pathname: rotesPath.search(
                                    'پر فروش ترین های هفته',
                                    'true',
                                    'true'
                                ),
                                search: `mostSales`,
                            }}>
                            پر فروش ترین های هفته
                        </SectionHeader>
                        <article className="showcase-slider">
                            <Swiper
                                freeMode={true}
                                slidesPerView={'auto'}
                                centeredSlides={false}
                                spaceBetween={19}
                                grabCursor={false}
                                rtl={true}
                                observer={true}
                                slidesOffsetAfter={80}
                                freeModeMomentumRatio={0.5}>
                                <ShowcaseItem
                                    loading={
                                        !mostSales[0] || !readyToSet
                                            ? true
                                            : false
                                    }
                                    noContent={
                                        !mostSales[0] || !readyToSet
                                            ? true
                                            : false
                                    }
                                    discount={
                                        mostSales[0] && readyToSet
                                            ? mostSales[0]['discount_percent']
                                            : null
                                    }
                                    price={
                                        mostSales[0] && readyToSet
                                            ? mostSales[0]['price_toman']
                                            : null
                                    }
                                    name={
                                        mostSales[0] && readyToSet
                                            ? mostSales[0].title
                                            : null
                                    }
                                    author={
                                        mostSales[0] && readyToSet
                                            ? mostSales[0].author
                                            : null
                                    }
                                    rate={
                                        mostSales[0] && readyToSet
                                            ? mostSales[0].star
                                            : null
                                    }
                                    img={
                                        mostSales[0] && readyToSet
                                            ? mostSales[0].thumbnail
                                            : null
                                    }
                                    link={
                                        mostSales[0] && readyToSet
                                            ? `/product/book/${mostSales[0].id}`
                                            : null
                                    }
                                />
                                {readyToSet
                                    ? mostSales
                                          .filter(
                                              (value, index) =>
                                                  index > 0 &&
                                                  index < showcaseCount
                                          )
                                          .map((item, index) => (
                                              <ShowcaseItem
                                                  key={item.id}
                                                  discount={
                                                      item['discount_percent']
                                                  }
                                                  price={item['price_toman']}
                                                  name={item.title}
                                                  author={item.author}
                                                  rate={item.star}
                                                  img={item.thumbnail}
                                                  link={`/product/book/${item.id}`}
                                              />
                                          ))
                                    : []}
                            </Swiper>
                        </article>
                    </section>
                ) : null}

                <section className="section-margin">
                    <SectionHeader link="/search/general/narrators">
                        گوینده ها
                    </SectionHeader>
                    <article className="narrator-slider mt-5">
                        <Swiper
                            freeMode={true}
                            slidesPerView={'auto'}
                            centeredSlides={false}
                            spaceBetween={13}
                            grabCursor={false}
                            rtl={true}
                            observer={true}
                            slidesOffsetAfter={40}
                            freeModeMomentumRatio={0.5}>
                            {narrators.length && readyToSet > 0 ? (
                                narrators
                                    .filter(
                                        (value, index) =>
                                            index < narrator_other_count
                                    )
                                    .map((narrator) => (
                                        <NarratorItem
                                            key={narrator.id}
                                            imgSrc={narrator.avatar}
                                            name={narrator.name}
                                            link={{
                                                pathname: rotesPath.search(
                                                    `${narrator.name}`
                                                ),
                                                search: `?narrator=${narrator.id}`,
                                            }}></NarratorItem>
                                    ))
                            ) : (
                                <CatItem href="#" loading={true}>
                                    {' '}
                                </CatItem>
                            )}
                        </Swiper>
                    </article>
                </section>

                {packages || bookDiscounted.length > 0 ? (
                    <section
                        className="section-margin"
                        style={{ direction: 'rtl' }}>
                        <SectionHeader link="/packages">گنجینه</SectionHeader>
                        <article className="showcase-slider">
                            <Swiper
                                freeMode={true}
                                slidesPerView={'auto'}
                                centeredSlides={false}
                                spaceBetween={19}
                                grabCursor={false}
                                rtl={true}
                                observer={true}
                                slidesOffsetAfter={80}
                                freeModeMomentumRatio={0.5}>
                                <ShowcaseItem
                                    loading={
                                        !packages[0] || !readyToSet
                                            ? true
                                            : false
                                    }
                                    noContent={
                                        !packages[0] || !readyToSet
                                            ? true
                                            : false
                                    }
                                    discount={
                                        packages[0] && readyToSet
                                            ? packages[0]['discount_percent']
                                            : null
                                    }
                                    price={
                                        packages[0] && readyToSet
                                            ? packages[0]['price_toman']
                                            : null
                                    }
                                    name={
                                        packages[0] && readyToSet
                                            ? packages[0].title
                                            : null
                                    }
                                    author={
                                        packages[0] && readyToSet
                                            ? packages[0].author
                                            : null
                                    }
                                    rate={
                                        packages[0] && readyToSet
                                            ? packages[0].star
                                            : null
                                    }
                                    img={
                                        packages[0] && readyToSet
                                            ? packages[0].thumbnail
                                            : null
                                    }
                                    link={
                                        packages[0] && readyToSet
                                            ? `/packages/${packages[0].id}`
                                            : null
                                    }
                                />
                                {readyToSet
                                    ? packages
                                          .filter(
                                              (value, index) =>
                                                  index > 0 &&
                                                  index < showcaseCount
                                          )
                                          .map((item, index) => (
                                              <ShowcaseItem
                                                  key={item.id}
                                                  discount={
                                                      item['discount_percent']
                                                  }
                                                  price={item['price_toman']}
                                                  name={item.title}
                                                  author={item.author}
                                                  rate={item.star}
                                                  img={item.thumbnail}
                                                  link={`/packages/${item.id}`}
                                              />
                                          ))
                                    : []}
                            </Swiper>
                        </article>
                    </section>
                ) : null}

                <section className="section-margin">
                    <SectionHeader link="/search/general/authors">
                        نویسنده ها
                    </SectionHeader>
                    <article className="narrator-slider mt-5">
                        <Swiper
                            freeMode={true}
                            slidesPerView={'auto'}
                            centeredSlides={false}
                            spaceBetween={13}
                            grabCursor={false}
                            rtl={true}
                            observer={true}
                            slidesOffsetAfter={40}
                            freeModeMomentumRatio={0.5}>
                            {authors.length && readyToSet > 0 ? (
                                authors
                                    .filter(
                                        (value, index) =>
                                            index < narrator_other_count
                                    )
                                    .map((author) => (
                                        <NarratorItem
                                            key={author.id}
                                            imgSrc={author.avatar}
                                            name={author.name}
                                            link={{
                                                pathname: rotesPath.search(
                                                    `${author.name}`
                                                ),
                                                search: `?author=${author.id}`,
                                            }}></NarratorItem>
                                    ))
                            ) : (
                                <CatItem href="#" loading={true}>
                                    {' '}
                                </CatItem>
                            )}
                        </Swiper>
                    </article>
                </section>

                {/* <section className="section-margin">
                    <SectionHeader link="/search/general/translators">
                        مترجم ها
                    </SectionHeader>
                    <article className="narrator-slider mt-5">
                        <Swiper
                            freeMode={true}
                            slidesPerView={'auto'}
                            centeredSlides={false}
                            spaceBetween={13}
                            grabCursor={false}
                            rtl={true}
                            observer={true}
                            slidesOffsetAfter={40}
                            freeModeMomentumRatio={0.5}>
                            {translators.length && readyToSet > 0 ? (
                                translators
                                    .filter(
                                        (value, index) =>
                                            index < narrator_other_count
                                    )
                                    .map((translator) => (
                                        <NarratorItem
                                            key={translator.id}
                                            imgSrc={translator.avatar}
                                            name={translator.name}
                                            link={{
                                                pathname: rotesPath.search(
                                                    `${translator.name}`
                                                ),
                                                search: `?translator=${translator.id}`,
                                            }}></NarratorItem>
                                    ))
                            ) : (
                                <CatItem href="#" loading={true}>
                                    {' '}
                                </CatItem>
                            )}
                        </Swiper>
                    </article>
                </section>

                <section className="section-margin">
                    <SectionHeader link="/search/general/publishers">
                        انتشارات
                    </SectionHeader>
                    <article className="narrator-slider mt-5">
                        <Swiper
                            freeMode={true}
                            slidesPerView={'auto'}
                            centeredSlides={false}
                            spaceBetween={13}
                            grabCursor={false}
                            rtl={true}
                            observer={true}
                            slidesOffsetAfter={40}
                            freeModeMomentumRatio={0.5}>
                            {publishers.length && readyToSet > 0 ? (
                                publishers
                                    .filter(
                                        (value, index) =>
                                            index < narrator_other_count
                                    )
                                    .map((publisher) => (
                                        <NarratorItem
                                            key={publisher.id}
                                            imgSrc={publisher.avatar}
                                            name={publisher.name}
                                            link={{
                                                pathname: rotesPath.search(
                                                    `${publisher.name}`
                                                ),
                                                search: `?publisher=${publisher.id}`,
                                            }}></NarratorItem>
                                    ))
                            ) : (
                                <CatItem href="#" loading={true}>
                                    {' '}
                                </CatItem>
                            )}
                        </Swiper>
                    </article>
                </section> */}
            </main>
        </React.Fragment>
    );
};

export default Main;

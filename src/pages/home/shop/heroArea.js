import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'react-id-swiper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

import useGlobalState from '../../../globalStates/globalStates';
import { rotesPath } from '../../../globalStates/statics';

import imageFallBack from '../../../images/slider-loading-wide.gif';
import imageFallBackDark from '../../../images/slider-loading-dark-wide.gif';

const HeroArea = ({ className, readyToSet }) => {
    const [items, setItems] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(0);
    const [theme] = useGlobalState('theme');
    const url = '/slides';
    const { data } = useSWR(url, async () => {
        const res = await axios.get(url);
        console.log(res.data);
        if (res.data.success) {
            return res.data['items']['slider-home'];
        }
    });

    useEffect(() => {
        console.log('data:', data);
        if (data) {
            setItems(data);
        }
    }, [data]);

    const loadingSlides = [
        <div key={0}>
            <img
                src={theme === 'light' ? imageFallBack : imageFallBackDark}
                className="main_hero-slider-img"
                alt="loading"
            />
        </div>,
        <div key={1}>
            <img
                src={theme === 'light' ? imageFallBack : imageFallBackDark}
                className="main_hero-slider-img"
                alt="loading"
            />
        </div>,
        <div key={2}>
            <img
                src={theme === 'light' ? imageFallBack : imageFallBackDark}
                className="main_hero-slider-img"
                alt="loading"
            />
        </div>,
    ];

    const swiperRef = useRef();

    return (
        <div className={className ? className : ''}>
            <div style={{ display: 'none' }}>
                {items.map((item) => (
                    <Link
                        to={rotesPath.book(item.book_id)}
                        title={item.title}
                        key={item.title}>
                        <img
                            onLoad={() =>
                                setImageLoaded((prevState) => prevState + 1)
                            }
                            src={item.image}
                            className="main_hero-slider-img"
                            alt={item.title}
                        />
                    </Link>
                ))}
            </div>
            <Swiper
                ref={swiperRef}
                slidesPerView={1.3}
                centeredSlides={true}
                initialSlide={1}
                spaceBetween={15}
                grabCursor={false}
                loop={false}
                rtl={true}
                autoHeight={true}
                shouldSwiperUpdate={true}
                breakpoints={{
                    672: {
                        // Actually 840
                        slidesPerView: 2.5,
                    },
                    448: {
                        // (Actually 560 => 560 / 1.25 = 448)
                        slidesPerView: 2.1,
                    },
                }}>
                {items.length === 0 || imageLoaded < items.length || !readyToSet
                    ? loadingSlides
                    : items.map((item) => (
                          <a
                              href={item.link}
                              title={item.title}
                              key={item.title}>
                              <img
                                  onLoad={() =>
                                      setImageLoaded(
                                          (prevState) => prevState + 1
                                      )
                                  }
                                  src={item.image}
                                  className="main_hero-slider-img"
                                  alt={item.title}
                              />
                          </a>
                      ))}
            </Swiper>
        </div>
        /* {items.length === 0 || imageLoaded !== items.length ? (
                <div className={className ? className : ''}>
                    <Swiper
                        slidesPerView={1.3}
                        centeredSlides={true}
                        spaceBetween={15}
                        grabCursor={false}
                        loop={false}
                        initialSlide={1}
                        rtl={true}
                        breakpoints={{
                            672: {
                                // Actually 840
                                slidesPerView: 3,
                            },
                            448: {
                                // (Actually 560 => 560 / 1.25 = 448)
                                slidesPerView: 2.1,
                            },
                        }}
                    >

                    </Swiper>
                </div>
            ) : null} */
    );
};

export default HeroArea;

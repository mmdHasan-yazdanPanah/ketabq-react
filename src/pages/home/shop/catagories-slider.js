import React from 'react';
import Swiper from 'react-id-swiper';
import axios from 'axios';
import useSWR from 'swr';

import CatItem from '../../../components/catagory-item';

import { rotesPath } from '../../../globalStates/statics';
import { smallIconsCount } from './main';

const CatSlider = ({ className, readyToSet }) => {
    const { data: items } = useSWR(
        '/categories',
        async (url) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                if (data.success) {
                    console.log('cat slide', data);
                    return data.items;
                }
            } catch (err) {
                console.log(err);
            }
        },
        { initialData: [], revalidateOnMount: true }
    );

    return (
        <div className={`${className ? className : ''}`} id={'cat-slider'}>
            <Swiper
                slidesPerView={'auto'}
                centeredSlides={false}
                spaceBetween={12}
                grabCursor={false}
                rtl={true}
                freeMode={true}
                observer={true}>
                {items.length && readyToSet > 0 ? (
                    items
                        .filter((value, index) => index < smallIconsCount)
                        .map((cat) => (
                            <CatItem
                                key={cat.name}
                                href={{
                                    pathname: rotesPath.search(cat.name),
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
                        ))
                ) : (
                    <CatItem href="#" loading={true}>
                        {' '}
                    </CatItem>
                )}
            </Swiper>
        </div>
    );
};

export default CatSlider;

import React from 'react';
import { Link } from 'react-router-dom';

const NarratorItem = ({ className, imgSrc, name, link }) => {
    return imgSrc ? (
        <Link to={link} className={className}>
            <figure className="narrator-item">
                <img
                    loading="lazy"
                    className="narrator-item_img"
                    src={imgSrc}
                    alt={name}
                />

                <figcaption className="narrator-item_caption has-text-weight-semibold has-text-centered">
                    {name}
                </figcaption>
            </figure>
        </Link>
    ) : null;
};

NarratorItem.defaultProps = {
    link: '#',
};

export default NarratorItem;

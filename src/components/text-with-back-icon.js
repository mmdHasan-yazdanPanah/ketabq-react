import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowRight } from '../images/icons/arrow-right.svg';

const textWithBackIcon = ({ children, className, link, backClickHandler }) => {
    return (
        <section className={`is-relative ${className ? className : ''}`}>
            {backClickHandler ? (
                <div
                    onClick={backClickHandler}
                    className="is-absolute-verticly-centered is-flex is-clickable px-2 py-2"
                    style={{ right: 0 }}
                >
                    <ArrowRight className="iconBack iconBack--primary" />
                </div>
            ) : (
                <Link
                    title="برگشت"
                    to={link ? link : '/'}
                    role="button"
                    className="is-absolute-verticly-centered is-flex is-clickable px-2 py-2"
                    style={{ right: 0 }}
                >
                    <ArrowRight className="iconBack iconBack--primary" />
                </Link>
            )}

            <p className="is-size-5 has-text-centered is-family-primary has-text-weight-light">
                {children}
            </p>
        </section>
    );
};

export default textWithBackIcon;

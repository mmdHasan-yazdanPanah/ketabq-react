import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CreditIcon } from '../images/icons/aside-nav/credit-card.svg';

const AsideNavItem = () => {
    return (
        <Link to="#" className="column is-full aside-nav_item">
            <div className="py-3 pr-3 columns is-vcentered is-mobile is-gapless">
                <CreditIcon className="column is-narrow" />
                <span className="is-size-7 has-text-weight-semibold column is-narrow mr-4">
                    کیف پول
                </span>
            </div>
        </Link>
    );
};

export default AsideNavItem;

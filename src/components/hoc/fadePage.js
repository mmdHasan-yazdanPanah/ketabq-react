import React from 'react';

const FadePage = ({ status, children }) => {
    if (status) {
        return <div className="fade-page">{children}</div>;
    } else {
        return null;
    }
};

export default FadePage;

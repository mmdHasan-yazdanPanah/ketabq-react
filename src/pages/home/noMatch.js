import React, { useEffect } from 'react';
import { pageTitles } from '../../globalStates/statics';

const NoMatch = () => {
    useEffect(() => {
        document.title = pageTitles.noMatch;
    }, []);

    return (
        <div
            className="main main--down pt-4 has-text-primary hero has-text-centered"
            style={{ justifyContent: 'center', height: '100%' }}>
            <div>
                <h1 style={{ fontSize: '100px' }}>404</h1>
                <h2 style={{ fontSize: '20px' }}>صفحه ی مورد نظر یافت نشد</h2>
            </div>
        </div>
    );
};

export default NoMatch;

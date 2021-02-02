import React, { useEffect, useRef } from 'react';
import SvgPrecentHeight from './svg-precent-for-height';

const FirstEnterWithNextPage = ({
    mainSvg: MainSvg,
    underSvgTextLevel1,
    underSvgTextLevel2,
    started,
    style,
    children,
}) => {
    return (
        <div
            style={{ ...style, height: '100%' }}
            className="is-absolute-center firstenter--responsive">
            {/* <div
                className="firstenter_image--responsive"
                style={
                    started
                        ? { visibility: 'visible' }
                        : { visibility: 'hidden' }
                }>
                <MainSvg ref={svgRef} />
            </div> */}

            <SvgPrecentHeight
                svgStyle={started ? { display: 'block' } : { display: 'none' }}
                svgClassName=""
                svgHeightPrecentage="100"
                SvgComponent={MainSvg}
                wrapperClassName={'firstenter_image--responsive'}
            />
            <div className="firstenter_context--responsive">
                <p className="has-text-centered is-size-5 mb-2">
                    {underSvgTextLevel1}
                </p>
                <p className="has-text-centered has-text-weight-light is-size-6 mt-0">
                    {underSvgTextLevel2}
                </p>
                {children}
            </div>
        </div>
    );
};

export default FirstEnterWithNextPage;

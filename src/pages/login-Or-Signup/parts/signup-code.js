import React from 'react';
import Button from '../../../components/buttons/button';
import InputSeperatedPass from '../../../components/form/input-num-pass';
import SvgPrecentHeight from '../../../components/svg-precent-for-height';

import { ReactComponent as SvgImage } from '../../../images/account-animate.svg';

const SignupCode = () => {
    return (
        <div className="login-signup_context-wrapper--responsive py-4">
            <div className="hero-head has-text-centered login-signup_info-wrapper--responsive">
                <div className="px-6 mt-1">
                    <InputSeperatedPass
                        info="کد 4 رقمی پیامک شده را وارد نمایید"
                        className="mb-1"
                        itemsNumber={4}
                        time={120}
                    />
                </div>
                <div className="mt-3">
                    <Button className="container">مرحله بعد</Button>
                </div>
            </div>
            <SvgPrecentHeight
                svgClassName="login-signup_img--responsive"
                svgHeightPrecentage="100"
                SvgComponent={SvgImage}
                wrapperClassName={
                    'hero-body login-signup_img-wrapper--responsive'
                }
            />
        </div>
    );
};

export default SignupCode;

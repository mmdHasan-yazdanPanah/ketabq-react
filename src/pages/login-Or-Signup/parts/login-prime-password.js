import React from 'react';
import Button from '../../../components/buttons/button';
import InputText from '../../../components/form/input-text';
import SvgPrecentHeight from '../../../components/svg-precent-for-height';

import { ReactComponent as SvgImage } from '../../../images/Account-amico.svg';

const LoginPrimePass = () => {
    return (
        <div className="login-signup_context-wrapper--responsive py-4">
            <div className="hero-head has-text-centered login-signup_info-wrapper--responsive">
                <div className="px-6 mt-5">
                    <InputText type="password" placeholder="رمز عبور خود را وارد نمایید" className="mb-1" direction="rtl" />
                    <div className="has-text-right mr-5">
                        <a href="#" className="is-size-7 has-text-weight-light">
                            ورود با کد یکبار مصرف
                        </a>
                    </div>
                </div>
                <div className="mt-3">
                    <Button className="container">ورود</Button>
                </div>
            </div>
            {/* <div className="hero-body login-signup_img-wrapper--responsive">
                <SvgImage className="login-signup_img--responsive" />
            </div> */}
            <SvgPrecentHeight svgClassName="login-signup_img--responsive" svgHeightPrecentage="100" SvgComponent={SvgImage} wrapperClassName={'hero-body login-signup_img-wrapper--responsive'} />
        </div>
    );
};

export default LoginPrimePass;

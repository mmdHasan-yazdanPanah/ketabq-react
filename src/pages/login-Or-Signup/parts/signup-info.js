import React from 'react';

import Button from '../../../components/buttons/button';
import InputText from '../../../components/form/input-text';
import InputFilePhoto from '../../../components/form/input-file-photo';
import SvgPrecentHeight from '../../../components/svg-precent-for-height';

import { ReactComponent as SvgImage } from '../../../images/Mobile login-pana.svg';

const SignupInfo = () => {
    return (
        <div className="login-signup_context-wrapper--responsive py-4">
            <div className="hero-head has-text-centered login-signup_info-wrapper--responsive">
                <div className="px-6 mb-2">
                    <InputFilePhoto info="انتخاب تصویر (اختیاری)" />
                    <InputText className="mt-4" type="text" placeholder="نام خود را وارد نمایید" />
                    <InputText className="mt-4" type="password" placeholder="رمز عبور خود را انتخاب نمایید" direction="rtl" />
                    <InputText className="mt-4" type="password" placeholder="رمز عبور خود را تکرار نمایید" direction="rtl" />
                </div>
                <div>
                    <Button className="mt-5 container">مرحله بعد</Button>
                </div>
            </div>
            <SvgPrecentHeight svgClassName="login-signup_img--responsive" svgHeightPrecentage="100" SvgComponent={SvgImage} wrapperClassName={'hero-body py-5 login-signup_img-wrapper--responsive'} />
        </div>
    );
};

export default SignupInfo;

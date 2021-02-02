import React, { useState } from 'react';

import useGlobalState from '../../globalStates/globalStates';

import TextWithBackIcon from '../../components/text-with-back-icon';
import InputText from '../../components/form/input-text';
import Button from '../../components/buttons/button';

import { ReactComponent as Telephone } from '../../images/icons/aside-nav/telephone.svg';

const Support = () => {
    const [value, setValue] = useState('');
    const [theme] = useGlobalState('theme');

    return (
        <div className="main main--down pt-4">
            <TextWithBackIcon>پشتیبانی</TextWithBackIcon>
            <div className="level">
                <div className="level-item">
                    <div
                        className="mx-5 px-4 mt-6"
                        style={{ width: '100%', maxWidth: '630px' }}>
                        <div className="columns is-mobile is-gapless is-vcentered is-size-7 is-size-7--responsive-desktop-up has-text-weight-light">
                            <div className="column is-narrow ml-2">
                                <Telephone
                                    className={`size-by-w--6 ${
                                        theme === 'dark' ? 'icon-1--light' : ''
                                    }`}
                                />
                            </div>
                            <div className="column is-narrow">
                                تلفن پشتیبانی کتاب کیو
                            </div>
                            <div className="column has-text-left">
                                021-5555555
                            </div>
                        </div>

                        <div className="mt-6 pt-1 is-size-7 is-size-7--responsive-desktop-up has-text-centered">
                            ارسال پیام مستقیم
                        </div>

                        <div className="field mt-5 pt-2">
                            <div className="control">
                                <textarea
                                    style={{ textAlign: 'right' }}
                                    dir="auto"
                                    rows="7"
                                    className="is-size-7 is-size-7--responsive-desktop-up textarea is-primary px-4"
                                    placeholder="مشکل خود را شرح دهید"
                                    value={value}
                                    onChange={(e) =>
                                        setValue(e.target.value)
                                    }></textarea>
                            </div>
                        </div>

                        <InputText
                            className="mt-4 is-size-7 is-size-7--responsive-desktop-up"
                            type="number"
                            placeholder="شماره تلفن همراه خود را وارد نمایید"
                            direction="rtl"
                        />

                        <div className="level mt-5">
                            <div className="level-item">
                                <Button size="md" type="submit">
                                    <span className="px-6">ثبت</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;

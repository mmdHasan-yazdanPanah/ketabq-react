import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import useGlobalState from '../../globalStates/globalStates';

import TextWithBackIcon from '../../components/text-with-back-icon';
import Button from '../../components/buttons/button';
import SvgPrecentHeight from '../../components/svg-precent-for-height';

import { ReactComponent as BuyImage } from '../../images/plain-credit-card-animate.svg';
import { colors, pageTitles } from '../../globalStates/statics';
import { CircleSpinner } from 'react-spinners-kit';

const AddCredit = () => {
    const [inputText, setInputText] = useState('');
    const [theme] = useGlobalState('theme');
    const [token] = useGlobalState('token');
    const history = useHistory();
    const [buyLoading, setBuyLoading] = useState(false);

    const buttonClickHandler = () => {
        setBuyLoading(true);

        Axios.get('/payment/recharge', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                amount: inputText,
            },
        })
            .then((res) => {
                setBuyLoading(false);
                console.log(res);
                const data = res.data;
                window.location.href = data.link;
            })
            .catch((err) => {
                setBuyLoading(false);
                throw err;
            });
    };

    useEffect(() => {
        document.title = pageTitles.addCreditPage;
    }, []);

    return (
        <React.Fragment>
            <div className="main pt-4">
                <TextWithBackIcon backClickHandler={() => history.goBack()}>
                    افزایش اعتبار
                </TextWithBackIcon>
            </div>
            <div className="login-signup_context-wrapper--responsive main">
                <div className="hero-head has-text-centered login-signup_info-wrapper--responsive buypage_main mx-5">
                    <div className="field px-4 mt-5 pt-4">
                        <div className="control has-icons-left">
                            <input
                                type="number"
                                onChange={(e) => setInputText(e.target.value)}
                                value={inputText}
                                style={{
                                    paddingLeft: '47px',
                                    width: '100%',
                                }}
                                className={`input is-primary is-family-primary is-size-7 is-size-7--responsive-desktop-up pr-4  py-2 input-right-to-left--english`}
                                placeholder="مبلغ مورد نظر خود را وارد نمایید"
                            />
                            <span
                                className="z-index--10 icon is-left has-text-weight-light is-size-7 has-text-primary"
                                style={{
                                    height: '100%',
                                    pointerEvents: 'none',
                                    width: 'auto',
                                    left: '13px',
                                }}>
                                تومان
                            </span>
                        </div>
                    </div>

                    <div className="level pt-4">
                        <div className="level-item">
                            <Button size="md" onClick={buttonClickHandler}>
                                <span className="px-5">پرداخت</span>
                                {buyLoading ? (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            left: 'calc(100% + 6px)',
                                        }}>
                                        <CircleSpinner
                                            size={18}
                                            color={colors['primary']}
                                        />
                                    </div>
                                ) : null}
                            </Button>
                        </div>
                    </div>
                </div>
                <SvgPrecentHeight
                    svgClassName={`login-signup_img--responsive ${
                        theme === 'dark' ? 'icon-2--dark' : ''
                    }`}
                    svgHeightPrecentage="100"
                    SvgComponent={BuyImage}
                    wrapperClassName={
                        'hero-body mx-5 buypage_big-svg py-0 px-2 login-signup_img-wrapper--responsive'
                    }
                />
            </div>
        </React.Fragment>
    );
};

export default AddCredit;

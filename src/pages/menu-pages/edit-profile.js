import React, { useEffect, useState } from 'react';
import { ImpulseSpinner } from 'react-spinners-kit';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';

import useGlobalState from '../../globalStates/globalStates';

import FadePageHoc from '../../components/hoc/fadePage';
import TextWithBackIcon from '../../components/text-with-back-icon';
import Button from '../../components/buttons/button';
import InputText from '../../components/form/input-text';
import InputFilePhoto from '../../components/form/input-file-photo';
import { pageTitles } from '../../globalStates/statics.js';

const EditProfile = () => {
    const [inputFileText, setInputFileText] = useState('انتخاب تصویر');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatarSrc, setAvatarSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useGlobalState('token');
    const history = useHistory();

    useEffect(() => {
        setLoading(true);

        Axios.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                const data = res.data;
                if (data.avatar) setAvatarSrc(data.avatar);
                if (data.name) setName(data.name);
                if (data.email) setEmail(data.email);
                setLoading(false);
            })
            .catch((err) => {
                if (err?.request?.status === 404) {
                    history.push('/404');
                } else if (err?.request?.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('my-hash');
                    setToken(null);
                    store.addNotification({
                        container: 'bottom-right',
                        animationIn: ['animate__animated', 'animate__flipInX'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        type: 'warning',
                        dismiss: {
                            duration: 5000,
                            pauseOnHover: true,
                        },
                        title: 'توکن نامعتبر',
                        message: (
                            <React.Fragment>
                                توکن وارد شده نا معتبر است
                                <br />
                                تنظیمات اپ به وضعیت کاربر میهمان تغییر یافت
                            </React.Fragment>
                        ),
                    });
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('my-hash');
                    setToken(null);
                    store.addNotification({
                        container: 'bottom-right',
                        animationIn: ['animate__animated', 'animate__flipInX'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        type: 'warning',
                        dismiss: {
                            duration: 5000,
                            pauseOnHover: true,
                        },
                        title: 'ورود ناموفق',
                        message: 'مشکلی پیش آمده',
                    });
                }

                throw err;
            });
    }, [history, setToken, token]);

    useEffect(() => {
        document.title = pageTitles.profilePage;
    }, []);

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await Axios.post('/auth/me', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = res.data;
            if (data.success) {
                store.addNotification({
                    container: 'bottom-right',
                    animationIn: ['animate__animated', 'animate__flipInX'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    type: 'success',
                    dismiss: {
                        duration: 5000,
                        pauseOnHover: true,
                    },
                    message: 'با موفقیت تغییر یافت',
                });
                history.push('/');
            } else {
                if (data.errors.avatar) {
                    data.errors.avatar.forEach((err) => {
                        store.addNotification({
                            container: 'bottom-right',
                            animationIn: [
                                'animate__animated',
                                'animate__flipInX',
                            ],
                            animationOut: [
                                'animate__animated',
                                'animate__fadeOut',
                            ],
                            type: 'danger',
                            dismiss: {
                                duration: 5000,
                                pauseOnHover: true,
                            },
                            title: 'تصویر',
                            message: err,
                        });
                    });
                }
                if (data.errors.name) {
                    data.errors.name.forEach((err) => {
                        store.addNotification({
                            container: 'bottom-right',
                            animationIn: [
                                'animate__animated',
                                'animate__flipInX',
                            ],
                            animationOut: [
                                'animate__animated',
                                'animate__fadeOut',
                            ],
                            type: 'danger',
                            dismiss: {
                                duration: 5000,
                                pauseOnHover: true,
                            },
                            title: 'نام کاربری',
                            message: err,
                        });
                    });
                }
                if (data.errors.email) {
                    data.errors.email.forEach((err) => {
                        store.addNotification({
                            container: 'bottom-right',
                            animationIn: [
                                'animate__animated',
                                'animate__flipInX',
                            ],
                            animationOut: [
                                'animate__animated',
                                'animate__fadeOut',
                            ],
                            type: 'danger',
                            dismiss: {
                                duration: 5000,
                                pauseOnHover: true,
                            },
                            title: 'ایمیل',
                            message: err,
                        });
                    });
                }
                setLoading(false);
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="main main--down pt-4">
            <FadePageHoc status={loading}>
                <ImpulseSpinner loading={loading} size={80} />
            </FadePageHoc>
            <TextWithBackIcon backClickHandler={() => history.goBack()}>
                ویرایش اطلاعات
            </TextWithBackIcon>
            <div className="mx-5 px-4 pt-4 mt-3 mb-2  input-max-wdith--1">
                <form onSubmit={formSubmitHandler}>
                    <InputFilePhoto
                        value={avatarSrc}
                        name="avatar"
                        className="mb-3"
                        info={inputFileText}
                        onActive={() => setInputFileText('تغییر تصویر')}
                        onPassive={() => setInputFileText('انتخاب تصویر')}
                    />
                    {/* <InputText
                    value="09059245092"
                    name="phone-number"
                    label="شماره همراه"
                    className="pt-2"
                    inputClassName="is-size-7 is-size-7--responsive-desktop-up"
                    type="number"
                    direction={'rtl'}
                    placeholder="تلفن همراه خود را وارد نمایید"
                /> */}
                    <InputText
                        value={name}
                        className="pt-2"
                        inputClassName="is-size-7 is-size-7--responsive-tablet-up"
                        type="text"
                        name="name"
                        label="نام کاربر"
                        placeholder="نام خود را انتخاب نمایید"
                    />
                    <InputText
                        value={email}
                        className="pt-2"
                        inputClassName="is-size-7 is-size-7--responsive-tablet-up"
                        type="email"
                        name="email"
                        label="ایمیل"
                        placeholder="ایمیل خود را وارد نمایید"
                        direction="rtl"
                    />
                    <div className="level pt-5">
                        <div className="level-item">
                            <Button size="md" type="submit">
                                <span className="px-6">ثبت</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;

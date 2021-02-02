import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { MagicSpinner } from 'react-spinners-kit';

import useGlobalState from '../../globalStates/globalStates';
import { colors } from '../../globalStates/statics.js';

import { ReactComponent as CameraIcon } from '../../images/icons/camera.svg';
import Button from '../buttons/button';

const InputFilePhoto = ({
    className,
    info,
    onActive,
    onPassive,
    value,
    ...rest
}) => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [src, setSrc] = useState(value);
    const [theme] = useGlobalState('theme');

    const showImage = (evt) => {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        const status = /^image\//.test(files[0].type);

        if (!status) {
            setLoading(false);
            store.addNotification({
                container: 'bottom-right',
                animationIn: ['animate__animated', 'animate__flipInX'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                type: 'danger',
                dismiss: {
                    duration: 3000,
                    pauseOnHover: true,
                },
                message: 'فایل انتخاب شده پشتیبانی نمیشود',
            });
        } else {
            setLoading(true);
            if (FileReader && files && files.length) {
                const fr = new FileReader();
                fr.onload = () => {
                    setLoading(false);
                    setLoaded(true);
                    setSrc(fr.result);
                };
                fr.readAsDataURL(files[0]);
            }
        }
    };

    useEffect(() => {
        if (loaded) {
            onActive();
        } else {
            onPassive();
        }
    }, [loaded, onActive, onPassive]);

    useEffect(() => {
        if (value) {
            setSrc(value);
            setLoaded(true);
        }
    }, [value]);

    return (
        <div className={`file ${className ? className : ''}`}>
            <label className="file-label">
                <input
                    {...rest}
                    className="file-input"
                    accept="image/*"
                    type="file"
                    onChange={(e) => showImage(e)}
                />
                <span className="inputPhoto_wrapper">
                    <span
                        className={`inputPhoto_icon-wrapper is-clipped ${
                            loaded && !loading ? 'shadow--3' : ''
                        }`}
                        style={loaded && !loading ? { border: 'none' } : null}>
                        {loading ? (
                            <MagicSpinner color={colors['primary']} size={40} />
                        ) : null}
                        {!loaded && !loading ? (
                            <CameraIcon
                                className={`inputPhoto_icon mx-3 my-3 ${
                                    theme === 'dark' ? 'icon-1--light' : ''
                                }`}
                            />
                        ) : null}
                        {loaded && !loading ? (
                            <img
                                src={src}
                                style={{ width: '100%', height: '100%' }}
                                className="is-fit-cover"
                                alt="عکسی که انتخاب کردید"
                            />
                        ) : null}
                    </span>
                    <Button size="md" className="mr-3" preferedElement="span">
                        {info}
                    </Button>
                </span>
            </label>
        </div>
    );
};

export default InputFilePhoto;

import React, { useState } from 'react';

import useGlobalState from '../../../globalStates/globalStates';

import MyInputText from '../../../components/form/my-input-text';
import Button from '../../../components/buttons/button';
import SectionHeader from '../../../components/section-header';
import SoundItem from '../../../components/soundsResultItem';

import image1 from '../../../images/showcase-samples/item1.png';

import { ReactComponent as FilterIcon } from '../../../images/icons/filter.svg';
import SoundSResultItem from '../../../components/soundsResultItem';

const SearchAfterType = () => {
    const [buttonsState, setButtonsState] = useState([true, false, false]);
    const [theme] = useGlobalState('theme');

    const buttonClickHandler = (index) => {
        setButtonsState((prevState) => {
            let res = [...prevState];

            if (res[index] !== true) {
                res = res.map(() => false);
                res[index] = true;
            }

            return res;
        });
    };

    return (
        <main className="main pt-5 main--down">
            <div className="columns is-mobile is-multiline mx-0 my-0 px-4">
                <div className="column px-0 pt-0">
                    <MyInputText
                        search={true}
                        placeholder="کتاب مورد نظر خود را جستجو نمایید"
                    />
                </div>
            </div>

            <div className="columns mx-0 mb-0 mt-4 is-mobile is-multiline px-3">
                <div className="column is-narrow pr-0 pl-1 py-1">
                    <span className="is-size-8 is-size-8--responsive-tablet-up">
                        مرتب سازی براساس
                    </span>
                </div>
                <div className="column px-0 py-0">
                    <div className="columns mx-0 my-0 is-mobile is-multiline">
                        <div className="column is-narrow pr-0 pl-1 py-1">
                            <Button
                                size="small"
                                backgroudClass={
                                    !buttonsState[0]
                                        ? theme === 'light'
                                            ? 'is-white'
                                            : 'is-dark'
                                        : false
                                }
                                textColorClass={
                                    !buttonsState[0]
                                        ? theme === 'light'
                                            ? 'has-text-black'
                                            : ''
                                        : false
                                }
                                onClick={() => buttonClickHandler(0)}
                                className={'shadow--1 btn-sm--responsive'}>
                                محبوب ترین
                            </Button>
                        </div>
                        <div className="column is-narrow pr-0 pl-1 py-1">
                            <Button
                                size="small"
                                backgroudClass={
                                    !buttonsState[1]
                                        ? theme === 'light'
                                            ? 'is-white'
                                            : 'is-dark'
                                        : false
                                }
                                textColorClass={
                                    !buttonsState[1]
                                        ? theme === 'light'
                                            ? 'has-text-black'
                                            : ''
                                        : false
                                }
                                onClick={() => buttonClickHandler(1)}
                                className={'shadow--1 btn-sm--responsive'}>
                                پرفروش ترین
                            </Button>
                        </div>
                        <div className="column is-narrow pr-0 pl-0 py-1">
                            <Button
                                size="small"
                                backgroudClass={
                                    !buttonsState[2]
                                        ? theme === 'light'
                                            ? 'is-white'
                                            : 'is-dark'
                                        : false
                                }
                                textColorClass={
                                    !buttonsState[2]
                                        ? theme === 'light'
                                            ? 'has-text-black'
                                            : ''
                                        : false
                                }
                                onClick={() => buttonClickHandler(2)}
                                className={'shadow--1 btn-sm--responsive'}>
                                ارزان ترین
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <SoundSResultItem
                className="pr-4 pl-5 ml-4 mt-6"
                name="اثر مرکب"
                author="دارن هاردی"
                narrator="با صدای آرمان سلطان زاده"
            />
            <SoundSResultItem
                className="pr-4 pl-5 ml-4 mt-4 pt-1"
                name="اثر مرکب"
                author="دارن هاردی"
                narrator="با صدای آرمان سلطان زاده"
            />
            <SoundSResultItem
                className="pr-4 pl-5 ml-4 mt-4 pt-1"
                name="اثر مرکب"
                author="دارن هاردی"
                narrator="با صدای آرمان سلطان زاده"
            />
            <SoundSResultItem
                className="pr-4 pl-5 ml-4 mt-4 pt-1"
                name="اثر مرکب"
                author="دارن هاردی"
                narrator="با صدای آرمان سلطان زاده"
            />
            <SoundSResultItem
                className="pr-4 pl-5 ml-4 mt-4 pt-1"
                name="اثر مرکب"
                author="دارن هاردی"
                narrator="با صدای آرمان سلطان زاده"
            />
            <SoundSResultItem
                className="pr-4 pl-5 ml-4 mt-4 pt-1"
                name="اثر مرکب"
                author="دارن هاردی"
                narrator="با صدای آرمان سلطان زاده"
            />
            <SoundSResultItem
                className="pr-4 pl-5 ml-4 mt-4 pt-1"
                name="اثر مرکب"
                author="دارن هاردی"
                narrator="با صدای آرمان سلطان زاده"
            />
        </main>
    );
};

export default SearchAfterType;

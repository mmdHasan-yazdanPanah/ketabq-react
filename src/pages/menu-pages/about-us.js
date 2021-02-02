import React from 'react';

import TextWithBackIcon from '../../components/text-with-back-icon';

import { ReactComponent as Telegram } from '../../images/icons/social/telegram.svg';
import { ReactComponent as Youtube } from '../../images/icons/social/youtube.svg';
import { ReactComponent as Twitter } from '../../images/icons/social/twitter.svg';
import { ReactComponent as Instagram } from '../../images/icons/social/instagram.svg';

const AboutUs = () => {
    return (
        <div className="main main--down pt-4">
            <TextWithBackIcon>درباره کتاب کیو</TextWithBackIcon>
            <div className="mx-5">
                <main className="mt-6 mb-1">
                    <p className="has-text-weight-light has-text-centered">
                        کتاب کیو پلتفرم هوشمندی برای لذت بردن از دنیای کتاب های
                        صوتی است. کتاب کیو شما را در دنیای واژه ها غرق می کند تا
                        به دور از دغدغه های زندگی روزمره لحظاتی سرشار از حس خوب
                        را برای شما به ارمغان آورد. کافیست چشمانتان را ببندید و
                        ساعت ها با آوای دلنشین گویندگان کتاب کیو همراه شوید. در
                        کتاب کیو نه تنها از مطالعه کتاب ها خسته نمی شوید بلکه با
                        دریافت تخفیف های ویژه اشتیاق شما برای خواندن کتاب ها
                        بیشتر از همیشه می شود. اگرچه کتاب کیو تلاش می کند تا
                        مناسب ترین قیمت ها را برای کتاب صوتی در نظر بگیرد، این
                        قابلیت را نیز فراهم کرده تا شما با درآمدزایی از طریق
                        معرفی دوستان خود بتوانید کتاب های بیشتری را با هزینه
                        کمتری خریداری کنید و از آن ها لذت ببرید
                    </p>
                </main>
                <footer className="mt-6 mb-3">
                    <div className="has-text-centered is-size-8">
                        کتاب کیو را در شبکه های اجتماعی دنبال کنید
                    </div>
                    <div
                        className="columns mt-4 is-mobile is-gapless is-vcentered is-centered"
                        style={{ lineHeight: 0 }}>
                        <div className="column is-narrow mx-1">
                            <a className="px-1 py-1">
                                <Telegram className="size-by-h--1" />
                            </a>
                        </div>
                        <div className="column is-narrow mx-2">
                            <a className="px-1 py-1">
                                <Youtube className="size-by-h--1" />
                            </a>
                        </div>
                        <div className="column is-narrow mx-2">
                            <a className="px-1 py-1">
                                <Twitter className="size-by-h--1" />
                            </a>
                        </div>
                        <div className="column is-narrow mx-2">
                            <a className="px-1 py-1">
                                <Instagram className="size-by-h--1" />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AboutUs;

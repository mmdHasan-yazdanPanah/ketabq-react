import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Axios from 'axios';
import { ClapSpinner } from 'react-spinners-kit';
import useSWR from 'swr';

import CommentItem from '../../../components/comment-item';
import TextWithBackIcon from '../../../components/text-with-back-icon';
import { pageTitles } from '../../../globalStates/statics';

const AllComments = () => {
    const history = useHistory();
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { bookId } = useParams();

    useEffect(() => {
        setLoading(true);
        Axios.get(`/book/${bookId}/get-comments`)
            .then((res) => {
                setItems(res.data.comments);
                setLoading(false);
                if (location.hash) {
                    console.log(location);
                    document.querySelector(location.hash).scrollIntoView();
                }
            })
            .catch((err) => {
                // eslint-disable-next-line eqeqeq
                if (err?.request?.status == 404) {
                    history.push('/404');
                }
            });
    }, [bookId, history, location]);

    const bookGuestUrl = `/book/${bookId}/guest`;
    const { data: book } = useSWR(bookGuestUrl, (url) =>
        Axios.get(url).then((res) => {
            return res.data.book;
        })
    );
    useEffect(() => {
        console.log(book, 'book');
        if (book) {
            document.title = pageTitles.commentPage(book.title);
        }
    }, [book]);

    return (
        <div className="main main--down pt-4">
            <TextWithBackIcon
                className="mb-5 pb-3"
                backClickHandler={() => history.goBack()}>
                نظرات کاربران
            </TextWithBackIcon>
            <div className="mr-5 ml-4 pl-1">
                {!loading ? (
                    items.length === 0 ? (
                        <h3 style={{ textAlign: 'center' }}>
                            هیچ نظری یافت نشد
                        </h3>
                    ) : (
                        items.map(
                            (
                                {
                                    comment,
                                    user_name,
                                    is_hide,
                                    like,
                                    dislike,
                                    id,
                                    user_avatar,
                                },
                                index
                            ) => (
                                <CommentItem
                                    comment={comment}
                                    name={user_name}
                                    spoiler={is_hide}
                                    dislikeCount={dislike}
                                    likeCount={like}
                                    key={comment}
                                    className={index === 0 ? '' : 'mt-4 pt-1'}
                                    noline={
                                        index === items.length - 1
                                            ? true
                                            : false
                                    }
                                    id={id}
                                    avatar={user_avatar}
                                />
                            )
                        )
                    )
                ) : (
                    <span className="level-item">
                        <ClapSpinner size={30} />
                    </span>
                )}
            </div>
        </div>
    );
};

export default AllComments;

import React, { useState } from 'react';
import { store } from 'react-notifications-component';
import useGlobalState from '../../globalStates/globalStates';
import { useHistory, useLocation, Link } from 'react-router-dom';

import CommentItem from '../comment-item';
import Button from '../buttons/button';
import LeaveComment from '../leave-a-comment';
import { ReactComponent as IconNext } from '../../images/icons/next.svg';

import { ReactComponent as EditIcon } from '../../images/icons/edit.svg';

const ItemPageComments = ({
    items,
    hasBook,
    commentSubmitHandler,
    allCommentsLink,
}) => {
    const [leaveComment, setLeaveComment] = useState(false);
    const [commentSending] = useGlobalState('commentSending');
    const [token] = useGlobalState('token');
    const history = useHistory();
    const location = useLocation();
    const count = 10;

    return !leaveComment && !commentSending ? (
        <React.Fragment>
            {items.length === 0 ? (
                <h3 style={{ textAlign: 'center' }}>هیچ نظری یافت نشد</h3>
            ) : null}
            {items[0] ? <CommentItem key={items[0].id} {...items[0]} /> : null}

            <div className="level is-mobile mt-5 pt-4 mb-4">
                <div className="level-item">
                    <Button
                        id="item-comments-leave"
                        onClick={() => {
                            if (token) {
                                setLeaveComment(true);
                            } else {
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
                                        duration: 4000,
                                        pauseOnHover: true,
                                    },
                                    title: 'نظر',
                                    message: 'برای ثبت نظر باید ثبت نام کنید',
                                });
                                history.push('/login_signup', {
                                    toLocation: location.pathname,
                                });
                            }
                        }}
                        size="small"
                        wide={true}
                        weight="has-text-weight-normal">
                        ثبت نظر
                        <EditIcon
                            className="size-by-w--4 fill--white"
                            style={{ marginRight: '6px' }}
                        />
                    </Button>
                </div>
            </div>

            {items
                .filter((_, index) => index > 0 && index < count - 1)
                .map((item, index) => (
                    <CommentItem key={item.id} {...item} />
                ))}

            {items.length !== 0 ? (
                <div className="level is-mobile mt-4">
                    <div className="level-item">
                        <Link
                            to={allCommentsLink}
                            className="level is-mobile nav-item withSvgNext">
                            <span className="level-item is-size-7--responsive is-size-7--responsive-desktop-up ml-1">
                                مشاهده همه نظرات
                            </span>
                            <span className="level-item section-header_icon">
                                <IconNext className="iconNext--primary" />
                            </span>
                        </Link>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    ) : (
        <main className="info-comment-wrapper pt-1 mt-4 pb-3">
            <LeaveComment
                hasBook={hasBook}
                placeholder="دیدگاهتان را بنویسید (اختیاری)"
                onCancelHandler={() => setLeaveComment(false)}
                onSubmitHandler={({ rate, comment }) => {
                    commentSubmitHandler({ rate, comment }).then(() => {
                        setLeaveComment(false);
                    });
                }}
            />
        </main>
    );
};

export default ItemPageComments;

import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
    const [ChildCommentnumber, setChildCommentnumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) commentNumber++;
        });
        setChildCommentnumber(commentNumber);
    }, [props.commentLists, props.parentCommentId]);

    let renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId && (
                    <div style={{ width: "80%", marginLeft: "40px" }}>
                        <SingleComment
                            key={index}
                            refreshFunction={props.refreshFunction}
                            comment={comment}
                            postId={props.postId}
                        />
                        <ReplyComment
                            parentCommentId={comment._id}
                            refreshFunction={props.refreshFunction}
                            postId={props.postId}
                            commentLists={props.commentLists}
                        />
                    </div>
                )}
            </React.Fragment>
        ));

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    };

    return (
        <div>
            {ChildCommentnumber > 0 && (
                <p
                    style={{ fontSize: "14px", margin: 0, color: "gray" }}
                    onClick={onHandleChange}
                >
                    View {ChildCommentnumber} more comment(s)
                </p>
            )}

            {OpenReplyComments && renderReplyComment(props.parentCommentId)}
        </div>
    );
}

export default ReplyComment;
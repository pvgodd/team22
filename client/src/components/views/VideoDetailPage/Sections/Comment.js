import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";


function Comment(props) {
    const videoId = props.postId;

    const user = useSelector((state) => state.user);
    const [Comment, setComment] = useState("");

    const handleClick = (e) => {
        setComment(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content: Comment,
            writer: user.userData._id,
            postId: videoId,
        };

        Axios.post("/api/comment/saveComment", variable).then((res) => {
            console.log(variable);
            if (res.data.success) {
                console.log(res.data.result);
                setComment("");

                props.refreshFunction(res.data.result);
            } else {
                alert("코맨트를 저장하지 못했습니다.");
            }
        });
    };

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {/* Comment Lists */}

            {props.commentLists &&
                props.commentLists.map(
                    (comment, index) =>
                        !comment.responseTo && (
                            <React.Fragment>
                                <SingleComment
                                    key={index}
                                    refreshFunction={props.refreshFunction}
                                    comment={comment}
                                    postId={videoId}
                                />
                                <ReplyComment
                                    postId={videoId}
                                    parentCommentId={comment._id}
                                    commentLists={props.commentLists}
                                    refreshFunction={props.refreshFunction}
                                />
                            </React.Fragment>
                        )
                )}
            {/* Root Comment Form */}

            <from style={{ display: "flex" }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: "100%", borderRadius: "5px" }}
                    onChange={handleClick}
                    value={Comment}
                    placeholder="코멘트를 작성해 주세요"
                />

                <br />
                <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
                    Submit
                </button>
            </from>
        </div>
    );
}
export default Comment;
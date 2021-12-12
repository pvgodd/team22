import React, { useState, useEffect } from "react";
import { Row, Col, Avatar, List } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislikes from "./Sections/LikeDislikes";

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId;
    //랜딩페이지에서 주소창뒤에 videoId를 보내주고있기때문에가능
    const variable = { videoId: videoId };
    const [VideoDetail, setVideoDetail] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);

    useEffect(() => {
        Axios.post("/api/video/getVideoDetail", variable).then((response) => {
            if (response.data.success) {
                console.log(response.data);
                setVideoDetail(response.data.videoDetail);
            } else {
                alert("비디오 정보를 가져오길 실패했습니다.");
            }
        });
        Axios.post("/api/comment/getComment", variable).then((res) => {
            if (res.data.success) {
                setCommentLists(res.data.comments);
                console.log(res.data.comments);
            } else {
                alert("코멘트 정보를 가져오는 것을 실패 하였습니다.");
            }
        });
    }, []);

    const refreshFunction = (newComment) => {
        setCommentLists(CommentLists.concat(newComment));
    };

    if (VideoDetail.writer) {
        const subscribeButton = VideoDetail.writer._id !==
            localStorage.getItem("userId") && (
                <Subscribe
                    userTo={VideoDetail.writer._id}
                    userFrom={localStorage.getItem("userId")}
                />
            );
        return (
            <Row gutter={(16, 16)}>
                <Col lg={18} xs={24}>
                    <div style={{ width: "100%", padding: "3rem 4rem" }}>
                        <video
                            style={{ width: "100%" }}
                            src={`http://localhost:5000/${VideoDetail.filePath}`}
                            controls
                        />
                        <List.Item
                            actions={[
                                <LikeDislikes
                                    video
                                    userId={localStorage.getItem("userId")}
                                    videoId={videoId}
                                />,
                                subscribeButton,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        {/* comment*/}
                        <Comment
                            refreshFunction={refreshFunction}
                            commentLists={CommentLists}
                            postId={videoId}
                        />
                    </div>
                </Col>

                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        );
    } else {
        return <div>...loding</div>;
    }
}

export default VideoDetailPage;
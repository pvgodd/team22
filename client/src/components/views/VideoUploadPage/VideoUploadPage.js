import React, { useState } from "react";
//ant design 사용
import { Typography, Button, Form, message, Input, Icon } from 'antd';
//dropzone 템플릿
import DropZone from 'react-dropzone';
import Axios from "axios";
import { useSelector } from "react-redux";
import { PromiseProvider } from "mongoose";
//import { response } from "express";


const { TextArea } = Input;
const { Title } = Typography;

//선택지 값 설정 map 함수 사용하기 위한 것
const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Puplic" }
]
const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Auto & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pet & Animals" }
]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);

    //state 는 value 값 저장
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    //0일 경우 첫번째 값
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")
    //e is event
    //글을 쓰거나 라벨을 선택 변경했을때 저장해줘서 값 받음?
    //Tigger 작용 값
    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //영상 올리는 부분
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {


                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)
                    //썸네일 부분
                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                console.log(response.data)
                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)


                            } else {
                                alert('썸네일 생성 실패')
                            }
                        })

                } else {
                    alert('비디오 업로드 실패')
                }
            })
    }
    const onSumit = (e) => {
        //preventDefault 이벤트 방지 쿠션
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }
        //submit
        Axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('업로드 submit 성공!')

                    setTimeout(() => {
                        props.history.push('/')
                    }, 3000);

                } else {
                    alert('비디오 submit 실패!')
                }
            })
    }



    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} Upload Video></Title>
            </div>
            <Form onSubmit={onSumit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <DropZone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={10000000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fonSize: '3rem' }} />

                            </div>
                        )}
                    </DropZone>

                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                        </div>
                    }
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>
                <br />
                <br />
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick={onSumit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}


{/*다른 곳에서도 이용가능하게 만듦*/ }
export default VideoUploadPage
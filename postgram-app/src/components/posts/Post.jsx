import { useState } from "react";
import {format} from "timeago.js";
import {
    LikeFilled,
    CommentOutlined,
    LikeOutlined,
} from "@ant-design/icons";
import {Image, Card, Dropdown} from "react-bootstrap";
import { randomAvatar } from "../../utils";
import axiosService from "../../helpers/axios";

const Post = ({post, refresh}) => {
    const handleLikeClick = (action) => {
        axiosService.post(`/post/${post.id}/${action}/`)
        .then(() => { refresh(); }).catch((e) => console.e);
    };

    return (
        <>
            <Card className="rounded-3 my-4">
                <Card.Title className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <Image 
                            src={randomAvatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="me-2 border border-primary border-2"
                        />
                        <div className="d-flex flex-column 
                        justify-content-start align-self-center mt-2">
                            <p className="fs-6 m-0">
                                {post.author}
                            </p>
                            <p className="fs-6 fw-lighter">
                                <small>{format(post.created)}</small>
                            </p>
                        </div>
                    </div>
                </Card.Title>
            </Card>
        </>
    )
}

export default Post;
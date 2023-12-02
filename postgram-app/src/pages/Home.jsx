import Layout from "../components/Layout";
import {Row, Col, Image} from "react-bootstrap";
import {randomAvatar} from "../utils";
import useSWR from "swr"
import {fetcher} from "../helpers/axios";
import { getUser } from "../hooks/user_actions";
import CreatePost from "../components/posts/CreatePost";

const Home = () => {
    const user = getUser();

    if(!user) {
        return <div>Loading!</div>
    }

    return (
        <Layout>
            <Row className="justify-content-evenly">
                <Col sm={7}>
                    <Row className="border rounded align-items-center">
                        <Col className="flex-shrink-1">
                            <Image 
                                src={randomAvatar()}
                                roundedCircle
                                width={52}
                                height={52}
                                className="my-2"
                            />
                        </Col>
                        <Col sm={10} className="flex-grow-1">
                            <CreatePost />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout>
    )
}

export default Home;
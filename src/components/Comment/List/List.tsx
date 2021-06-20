import { List, Comment as AntComment } from "antd";
import "./List.css";
import CommentModel from "../../../models/comment";
import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');
import { UserOutlined } from '@ant-design/icons';


interface Properties {
    comments: CommentModel[]
}


export const CommentList: React.FC<Properties> = ({ comments }) => {

    const renderListItem = (comment: CommentModel): JSX.Element => {
        return (
            <List.Item key={comment.id}>
                <AntComment
                    author={comment.user.username}
                    avatar={<UserOutlined />}
                    datetime={
                        <TimeAgo
                            datetime={Date.parse(comment.created)}
                            locale={navigator.language}
                        />}
                    content={<p>{comment.content}</p>} />
            </List.Item>);
    };

    return (
        <>
            <List
                className="CommentsList"
                rowKey={comment => comment.id.toString()}
                dataSource={comments}
                itemLayout="horizontal"
                renderItem={renderListItem}
            />
        </>
    );
};


export default CommentList;
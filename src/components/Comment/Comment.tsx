import { Card, Typography } from "antd";
import { useEffect } from "react";
import "./Comment.css";
import { useCallback, useState } from "react";
import comment from "../../functions/comment";
import CommentModel from "../../models/comment";
import CommentForm from "./Form/Form";
import CommentList from "./List/List";
const { Title } = Typography;

interface Properties {
  feedId: number;
}

export const Comment: React.FC<Properties> = ({ feedId }) => {

  const [comments, setComments] = useState<CommentModel[]>([]);

  const handleNewComment = (comment: CommentModel): void => {
    setComments([comment, ...comments]);
  };

  const fetchComments = useCallback(async () => {
    setComments(await comment.get_for_feed(feedId));
  }, [feedId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);


  return (
    <Card className="Comment" title={<Title level={3}>Comments</Title>}>
      <CommentForm feedId={feedId} newComment={handleNewComment} />
      <CommentList comments={comments} />
    </Card >
  );
};

export default Comment;

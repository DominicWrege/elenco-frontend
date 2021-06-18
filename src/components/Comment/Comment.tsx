import { Button, Card, Form, Input } from "antd";
import { useCallback, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import comment from "../../functions/comment";
import { NewComment } from "../../models/comment";

interface FormData {
  content: string;
}

interface Properties {
  feedId: number;
}

export const Comment: React.FC<Properties> = ({ feedId }) => {
  const userContext = useContext(UserContext);

  const handlePost = useCallback(async (form: FormData) => {
    if (userContext?.user?.id) {
      const newCommentBody: NewComment = {
        userId: userContext?.user?.id,
        feedId: feedId,
        content: form.content,
      };

      console.log(newCommentBody);
      try {
        const createdComment = await comment.post(newCommentBody);
        console.log(createdComment);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <Card title="Comments">
      <Form name="comment" onFinish={handlePost}>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "enter some text" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Comment;

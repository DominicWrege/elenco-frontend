import { Button, Form, Input, message } from "antd";
import "./Form.css";
import { useCallback, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { comment } from "../../../functions/comment";
import CommentModel, { NewComment } from "../../../models/comment";
import { useState } from "react";
import { Link } from "wouter";

interface FormData {
    message: string;
}

interface Properties {
    feedId: number;
    newComment: (comment: CommentModel) => void
}


export const CommentForm: React.FC<Properties> = ({ feedId, newComment }) => {

    const [form] = Form.useForm();
    const userContext = useContext(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePost = useCallback(async (formData: FormData) => {
        form.resetFields();
        if (userContext?.user?.id) {
            setIsLoading(true);
            const newCommentBody: NewComment = {
                userId: userContext?.user?.id,
                feedId: feedId,
                content: formData.message,
            };
            console.log(formData);

            try {
                const createdComment: CommentModel = await comment.post(newCommentBody);
                newComment(createdComment);
                message.success("Comment succefuly posted!");
            } catch (err) {
                message.error(err.json.message);
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
    }, [feedId, userContext?.user?.id, form, newComment]);


    if (userContext?.user !== null) {
        return (
            <p>
                Want to write a comment? <Link href="/login">Login in.</Link>
            </p>
        );
    }

    return (
        <Form name="comment" onFinish={handlePost} className="Comment-form" form={form}>
            <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter some text." }]}
            >
                <Input.TextArea style={{ width: "32rem" }} rows={4} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Comment
                </Button>
            </Form.Item>
        </Form >
    )
};

export default CommentForm;
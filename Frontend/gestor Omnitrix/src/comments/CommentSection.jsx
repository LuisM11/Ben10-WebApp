import { useComments } from "../contexts/CommentsContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentSection = () => {
  const { comments, addComment } = useComments();

  console.log("comments desde CommentSection:", comments);

  return (
    <div className="rounded-lg border bg-white p-4 shadow">
      <h3 className="mb-4 text-xl font-bold">Comentarios</h3>
      <CommentForm submitLabel="Escribir" handleSubmit={addComment} />
      <div className="mt-4">
        {comments
          .filter((comment) => !comment.parentId)
          .map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default CommentSection;

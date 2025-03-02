import { useComments } from "../contexts/CommentsContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentSection = () => {
  const { comments, addComment } = useComments();

  return (
    <div className="mt-4 rounded-lg border border-[#8be308] bg-gray-900 p-5 shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-[#8be308]">Comentarios</h3>
      <CommentForm
        submitLabel="Publica tu comentario"
        handleSubmit={addComment}
      />
      <div className="mt-4 space-y-4">
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

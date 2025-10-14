import { useEffect, useState } from "react";
import { USER_ID, Video } from "../../page";

interface Comment {
  id: string;
  video_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

function timeAgo(timestamp: string) {
  const now = new Date();
  const created = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  // More than a week — show formatted date
  return created.toLocaleDateString();
}

export default function VideoComments({ video }: { video: Video }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    console.log("comments updated", comments);
  }, [comments]);

  useEffect(() => {
    if (!video.id) return;

    setLoading(true);
    async function fetchComments() {
      try {
        const res = await fetch(
          `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${encodeURIComponent(
            video.id
          )}`
        );
        const data = await res.json();
        console.log(data);
        const sortedComments = (data.comments || []).sort(
          (a: Comment, b: Comment) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setComments(sortedComments);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setComments([]);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [video]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    // Optimistically add comment locally
    const tempComment: Comment = {
      id: Date.now().toString(),
      created_at: Date.now().toString(),
      video_id: video.id,
      user_id: USER_ID, // Replace with current user
      content: newComment.trim(),
    };
    setComments([tempComment, ...comments]);
    setNewComment("");

    // Send to server
    try {
      await fetch(
        `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video_id: video.id,
            content: newComment,
            user_id: USER_ID,
          }),
        }
      );
      console.log(
        "posted",
        JSON.stringify({
          video_id: video.id,
          content: newComment,
          userId: USER_ID,
        })
      );
    } catch (err) {
      console.error("Failed to save comment:", err);
      setComments((prev) => prev.filter((c) => c.id !== tempComment.id));
      alert("Failed to post comment. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col space-y-2 bg-gray-200 rounded mt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    );

  return (
    <div className="flex flex-col space-y-3 mt-2 bg-gray-200 rounded p-4">
      {/* formatted header */}
      <h2 className="text-md font-semibold">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>

      {/* Input box */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post
        </button>
      </div>

      {/* comment list */}
      <div className="flex flex-col space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-2 bg-gray-100 rounded">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{comment.user_id}</p>
                <p className="text-xs text-gray-500">
                  {timeAgo(comment.created_at)}
                </p>
              </div>

              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

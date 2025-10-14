"use client";
import { USER_ID } from "@/app/page";
import { useMemo, useState } from "react";

export default function NewVideoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            video_url: videoUrl,
            user_id: USER_ID,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to add video");

      const data = await res.json();
      console.log("Video added:", data);

      // Clear form
      setTitle("");
      setDescription("");
      setVideoUrl("");
    } catch (err) {
      console.error(err);
      alert("Failed to add video. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const incomplete = useMemo(
    () => title.length === 0 || videoUrl.length === 0,
    [title.length, videoUrl.length]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto flex flex-col space-y-4 p-4 bg-white rounded"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded"
        rows={4}
      />

      <input
        type="url"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={submitting || incomplete}
      >
        {submitting ? "Adding..." : "Add Video"}
      </button>
    </form>
  );
}

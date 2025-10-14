"use client";
import { useEffect, useState } from "react";
import VideoList from "./components/VideoList";

export interface Video {
  id: string; // user_id + title

  description: string;
  video_url: string;
  title: string;
  num_comments: number;
  user_id: string;
}

export const USER_ID = "adam_snowdon";

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(
        `https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${USER_ID}`
      );

      const data = await res.json();
      console.log("API response:", data);
      setVideos(data.videos || []);
    }

    fetchVideos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      <VideoList videos={videos} />
    </div>
  );
}

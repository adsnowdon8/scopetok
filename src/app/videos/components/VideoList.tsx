import { useState } from "react";
import { Video } from "../../page";
import ReactPlayer from "react-player";
import VideoComments from "./VideoComments";

export default function VideoList({ videos }: { videos: Video[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="flex space-x-6">
      {/* List */}
      <ul className="w-64 space-y-3">
        {videos.map((video) => (
          <li key={video.id}>
            <button
              onClick={() => setSelectedVideo(video)}
              className={`flex items-center space-x-3 p-2 w-full text-left rounded-lg transition hover:bg-gray-100 ${
                selectedVideo?.id === video.id ? "bg-blue-100" : ""
              }`}
            >
              {/* Thumbnail */}
              <div className="w-16 h-10 bg-gray-300 rounded flex items-center justify-center text-gray-500">
                🎬
              </div>

              {/* Title */}
              <span className="font-medium">{video.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Video Player */}
      <div className="flex-1">
        {selectedVideo ? (
          <div>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              {/* 56.25% = 9/16 ratio */}
              <ReactPlayer
                src={selectedVideo.video_url}
                controls
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </div>
            {/*title*/}
            <h2 className="text-xl font-bold pt-2">{selectedVideo.title}</h2>

            {/*description*/}
            <p className=" text-gray-700 font-medium pt-2">
              {selectedVideo.description}
            </p>

            {/* comments */}
            <VideoComments video={selectedVideo} />
          </div>
        ) : (
          <p className="text-gray-500">Select a video to play</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import videojs from "video.js";
import { apiClient } from "../../../lib/api-client";
import VideoComponent from "../../components/VideoComponent";
import VideoPlayer from "../../components/VideoPlayer";
import { useSession } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const playerRef = useRef(null);
 const { data: session } = useSession();
  const userId = session?.user?.id;
 const addHistory = async () => {
    if (!userId ) return;
    await apiClient.addHistory(userId, id);
  };

  useEffect(() => {
    apiClient
      .getVideos()
      .then(setVideos)
      .catch(console.error);
  }, []);


  useEffect(() => {
    if (!id) return;

    apiClient
      .getVideo(id)
      .then(setVideo)
      .catch(console.error);
  }, [id]);

  if (!video) return <p>Loading...</p>;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    width: 860,
    height: 480,
    poster: `${urlEndpoint}${video.thumbnailUrl}`,
    sources: [
      // {
      //   src: `${urlEndpoint}${video.videoUrl}/ik-video.mp4/ik-master.m3u8?tr=sr-240_360_480_720_1080`,
      //   type: "application/x-mpegURL",
      // },
       {
        src: `${urlEndpoint}${video.videoUrl}`,
        type: "video/mp4",
      },
    ],
    tracks: [
      {
        kind: "subtitles",
        src: "/subtitles/english.vtt",
        srcLang: "en",
        label: "English",
        default: true,
      },
      {
        kind: "subtitles",
        src: "/subtitles/hindi.vtt",
        srcLang: "hi",
        label: "Hindi",
      },
    ],
  };

const handlePlayerReady = (player) => {
  playerRef.current = player;

  const onPlay = () => {
    addHistory();
    player.off("play", onPlay);
  };

  player.on("play", onPlay);

  player.on("waiting", () => {
    videojs.log("player waiting");
  });

  player.on("dispose", () => {
    videojs.log("player disposed");
  });
};


  return (
    <section className="flex pt-26 px-16 justify-around items-start">
      <div className="sticky top-10 shrink-0 w-[860px]">
        <div className="bg-black rounded-xl overflow-hidden h-[480px]">
          <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
        </div>

        <h1 className="text-xl font-bold mt-3">
          {video.title}
        </h1>
      </div>


      <div className="flex-1">
        {videos.map((v) => (
          <VideoComponent key={v._id?.toString()} video={v} />
        ))}
      </div>
    </section>
  );
}

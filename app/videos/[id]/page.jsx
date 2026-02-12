"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [comment, setComment] = useState("")
  const playerRef = useRef(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

    const videoJsOptions = useMemo(() => {
    if (!video) return null;

    return {
      autoplay: true,
      controls: true,
      responsive: true,
      width: 860,
      height: 480,
      poster: `${urlEndpoint}${video.thumbnailUrl}`,
      sources: [
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
  }, [video?.videoUrl, video?.thumbnailUrl]);

  
  const addHistory = async () => {
    if (!userId) return;
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

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: true,
  //   width: 860,
  //   height: 480,
  //   poster: `${urlEndpoint}${video.thumbnailUrl}`,
  //   sources: [
  //     // {
  //     //   src: `${urlEndpoint}${video.videoUrl}/ik-video.mp4/ik-master.m3u8?tr=sr-240_360_480_720_1080`,
  //     //   type: "application/x-mpegURL",
  //     // },
  //     {
  //       src: `${urlEndpoint}${video.videoUrl}`,
  //       type: "video/mp4",
  //     },
  //   ],
  //   tracks: [
  //     {
  //       kind: "subtitles",
  //       src: "/subtitles/english.vtt",
  //       srcLang: "en",
  //       label: "English",
  //       default: true,
  //     },
  //     {
  //       kind: "subtitles",
  //       src: "/subtitles/hindi.vtt",
  //       srcLang: "hi",
  //       label: "Hindi",
  //     },
  //   ],
  // };



  // Inside your VideoPage component...


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

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !userId) return;

    try {
      const response = await apiClient.addComment(id, userId, comment);
      if (response && response.data) {
        setVideo(response.data);
      }

      setComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };
  return (
    <section className="flex pt-26 px-16 justify-around items-start">
      <div>
        <div className="shrink-0 w-[860px]">
          <div className="bg-black rounded-xl overflow-hidden max-h-[480px]">
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>

          <h1 className="text-xl font-bold mt-3 mb-16">
            {video.title}
          </h1>
        </div>
        <div className="">
          <form onSubmit={handleComment}>
            <input type="text" placeholder="Your comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
            <button>Submit</button>
          </form>
          {video.comments?.map((c, index) => (
            <div key={index} className="border-b py-2">
              <p className="text-sm font-bold text-blue-400">
                {typeof c.user === 'object' ? c.user.username : "Just now"}
              </p>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {videos.map((v) => (
          <VideoComponent key={v._id?.toString()} video={v} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import videojs from "video.js";
import { apiClient } from "../../../lib/api-client";
import VideoPlayer from "../../components/VideoPlayer";
import { useSession } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("")
  const playerRef = useRef(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isSubscribed, setIsSubscribed] = useState(false);



  const videoJsOptions = useMemo(() => {
    if (!video) return null;

    return {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
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
    if (!id) return;

    apiClient
      .getVideo(id)
      .then((data) => {
        setVideo(data.video)
        setIsSubscribed(data.isSubscribed)
      })
      .catch(console.error);
  }, [id]);

  if (!video) return <p className="pt-5 text-center flex justify-center">Loading...</p>;

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

  const handleSubscribe = async () => {
    try {
      const response = await apiClient.subscribe(video.user);
      // Toggle the state based on the backend response
      setIsSubscribed(response.subscribed);
    } catch (error) {
      console.log("error subscribing", error)
    }
  }
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
    <section className=" px-16 pt-5 mx-auto max-w-6xl">
      <div>
        <div className="">
          <div className="bg-black rounded-xl overflow-hidden h-[70vh] ">
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>

          <div className="flex justify-between mt-5">
            <h1 className="text-xl font-bold mt-3">
              {video.title}
            </h1>
            {session?.user && video.user === session.user.id && (
              <button
                onClick={handleSubscribe}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${isSubscribed
                    ? "bg-slate-200 text-slate-700"
                    : "bg-red-800 text-white hover:bg-red-700"
                  }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>
        <div className="">
          <form onSubmit={handleComment} className="relative flex items-center gap-2 w-full my-10">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0C4A6E] focus:border-transparent outline-none transition-all text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={!comment.trim()}
              className="bg-[#0C4A6E] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#073652] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Submit
            </button>
          </form>
          {video.comments?.map((c, index) => (
            <div
              key={index}
              className="group my-3 rounded-lg bg-slate-50 p-4 transition-all  border border-transparent relative"
            >

              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#0C4A6E] flex items-center justify-center text-[10px] text-white font-bold">
                  {(typeof c.user === 'object' ? c.user.username : "J").charAt(0).toUpperCase()}
                </div>

                <span className="text-[10px] absolute top-2 right-10 uppercase tracking-wider text-slate-400 font-medium">
                  {typeof c.user !== 'object' ? "Just now" : ""}
                </span>
                <p className="text-slate-700 leading-relaxed pl-8">
                  {c.text}
                </p>
              </div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

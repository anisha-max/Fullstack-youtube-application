"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "../../../lib/api-client";
import { IVideo } from "../../../models/Video";
import { IKVideo } from "imagekitio-next";
import VideoComponent from "../../components/VideoComponent";

export default function VideoPage() {
  const params = useParams();
  const id = params.id as string;
  const [video, setVideo] = useState<IVideo | null>(null);
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const data = await apiClient.getVideo(id);
        setVideo(data);
        console.log(data)
      } catch (error) {
        console.error("Video fetch failed:", error);
      }
    }
    if (id) fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
<section className="flex pt-26 px-16 justify-around items-start">
      <div className="sticky top-10 w-[860px] shrink-0">
   <IKVideo
        path={video.videoUrl}
        controls
        className=" rounded-3xl object-cover"
        // poster={video.thumbnailUrl}
      >
      </IKVideo>
        <h1 className="text-xl font-bold mb-2 text-white rounded-3xl ">{video.title}</h1>
      </div>
      <div className="flex-1">
         {videos.map((video) => (
                 <VideoComponent key={video._id?.toString()} video={video} />
               ))}
      </div>
</section>
   
  );
}

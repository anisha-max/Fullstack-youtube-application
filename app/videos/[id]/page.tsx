"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "../../../lib/api-client";
import { IVideo } from "../../../models/Video";
import { IKVideo } from "imagekitio-next";

export default function VideoPage() {
  const params = useParams();
  const id = params.id as string;
  const [video, setVideo] = useState<IVideo | null>(null);

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 rounded-3xl ">{video.title}</h1>
    
        <IKVideo
        path={video.videoUrl}
        transformation={[{ height: "460", width: "820" }]}
        controls
        className="h-[460px] w-[820px] rounded-3xl  object-cover"
      />
      </div>
   
  );
}

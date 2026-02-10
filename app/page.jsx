"use client"
import VideoFeed from "./components/VideoFeed";
import { apiClient } from "../lib/api-client"
import { useState, useEffect } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

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
  return (
    <main className="container mx-auto px-4 pt-26 pb-5">
      <VideoFeed videos={videos} />
    </main>
  );
}

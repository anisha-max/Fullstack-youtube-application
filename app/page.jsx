"use client"
import VideoFeed from "./components/VideoFeed";
import { apiClient } from "../lib/api-client"
import { useState, useEffect, useDeferredValue } from "react";
import { useSearch } from "./components/SearchContext";

export default function Home() {
  const [videos, setVideos] = useState([]);
const { query } = useSearch();
 const deferredQuery = useDeferredValue(query);
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

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(deferredQuery.toLowerCase())
  );
  return (
    <main className="container mx-auto px-4 py-5">
    <VideoFeed videos={filteredVideos} />
    </main>
  );
}

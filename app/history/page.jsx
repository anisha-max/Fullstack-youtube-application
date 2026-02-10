"use client";
import { useState, useEffect } from "react";
import { IVideo } from "../../models/Video";
import { apiClient } from "../../lib/api-client";
import VideoFeed from "../components/VideoFeed";

export default function History() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getHistory();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading history...</div>;

  return (
    <main className="container mx-auto px-4 pt-26 pb-5 text-white">
      <h1 className="text-2xl font-bold mb-4">Your History</h1>
      {videos.length > 0 ? (
        <VideoFeed videos={videos} />
      ) : (
        <p>No videos watched yet.</p>
      )}
    </main>
  );
}

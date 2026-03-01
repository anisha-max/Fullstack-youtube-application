"use client"
import VideoFeed from "./components/VideoFeed";
import { apiClient } from "../lib/api-client"
import { useState, useEffect, useDeferredValue, useRef, useCallback } from "react";
import { useSearch } from "./components/context/SearchContext";


export default function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { query } = useSearch();
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
        const data = await apiClient.getVideos(page);
        if (data.length === 0) {
          setHasMore(false)
        } else {
          setVideos((prev) => [...prev, ...data]);
        }

      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchVideos();
  }, [page]);

  const observer = useRef();
  const lastVideoElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !deferredQuery) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, deferredQuery]);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(deferredQuery.toLowerCase())
  );
  return (
    <main className="container mx-auto px-4 py-5">
      {filteredVideos.length === 0 && !loading ? (
      <p className="text-center text-slate-400 mt-10">
        No videos found
      </p>
    ) : (
 <>
      <VideoFeed
        videos={filteredVideos}
        loading={loading}
        lastVideoElementRef={lastVideoElementRef}
      />
            {!hasMore && !deferredQuery && (
        <p className="text-center text-slate-400 mt-10">You've reached the end!</p>
      )}
      </>
    )}

    </main>
  );
}

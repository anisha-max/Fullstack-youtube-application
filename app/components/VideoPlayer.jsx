"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";


export default function VideoPlayer({ options, onReady }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

      // player.ready(()=>{
      //   if(typeof player.httpSourceSelector === "function"){
      //       player.httpSourceSelector({
      //           default:"auto"
      //       })
      //   }
      //     playerRef.current = player;
      // })
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  

  return (
    <div data-vjs-player>
      <div
        ref={videoRef}
      />
    </div>
  );
}

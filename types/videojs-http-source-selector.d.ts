import type videojs from "video.js";

declare module "video.js" {
  interface Player {
    httpSourceSelector?: (options?: {
      default?: "auto" | "low" | "high";
    }) => void;
  }
}

import { IVideo } from "../models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | object | null;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const isFormData = body instanceof FormData;
    const isPlainObject =
      typeof body === "object" && body !== null && !isFormData;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: isPlainObject ? JSON.stringify(body) : (body as BodyInit | null),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getVideos() {
    return this.fetch<IVideo[]>("/videos");
  }

  async getVideo(id: string) {
    return this.fetch<IVideo>(`/videos/${id}`);
  }

  async createVideo(videoData: VideoFormData) {
    return this.fetch<IVideo>("/videos", {
      method: "POST",
      body: videoData,
    });
  }


  async addHistory( userId:string,  videoId:string){
      return this.fetch<{ message: string }>("/history/add", {
    method: "POST",
    body: {
      userId,
      videoId,
    },
  });
  }



  async getHistory(){
    return this.fetch<IVideo[]>("/history")
  }

}

export const apiClient = new ApiClient();
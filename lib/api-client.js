class ApiClient {
   async fetch(
    endpoint,
    options ={}
  ){
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
      body: isPlainObject ? JSON.stringify(body) : (body),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getVideos() {
    return this.fetch("/videos");
  }

  async getVideo(id) {
    return this.fetch(`/videos/${id}`);
  }

  async createVideo(videoData) {
    return this.fetch("/videos", {
      method: "POST",
      body: videoData,
    });
  }


  async addHistory( userId,  videoId){
      return this.fetch("/history/add", {
    method: "POST",
    body: {
      userId,
      videoId,
    },
  });
  }



  async getHistory(){
    return this.fetch("/history")
  }

  
  async addComment(videoId, userId, comment) {
    return this.fetch("/videos/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      videoId,
        userId,
        comment
      })
    })
  }

}

export const apiClient = new ApiClient();
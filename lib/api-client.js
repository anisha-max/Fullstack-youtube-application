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

  async getVideos(page = 1, limit = 12) {
    return this.fetch(`/videos?page=${page}&limit=${limit}`);
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
      body: JSON.stringify({
      videoId,
        userId,
        comment
      })
    })
  }

  async getProfile(){
    return this.fetch("/profile")
  }

  async subscribe(channelId ){
    return this.fetch("/subscribe" , {
      method:"POST" ,
body: { channelId }
    })
  }
}

export const apiClient = new ApiClient();
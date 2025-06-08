"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "../../lib/api-client";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
   const [uploadThumbnailProgress, setThumbnailUploadProgress] = useState(0);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };
  const handleThumbnailUploadSuccess = (response: IKUploadResponse) => {
    setValue("thumbnailUrl", response.filePath);
    showNotification("Thumbnail uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };
   const handleThumbnailUploadProgress = (progress: number) => {
    setThumbnailUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-6 text-black"
    >
      <h2 className="text-2xl font-semibold text-sky-900 mb-4">Upload a New Video</h2>

      <div>
        <label className="block text-sm font-medium text-sky-900 mb-1">Title</label>
        <input
          type="text"
          className={`w-full input border border-sky-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-900 text-black ${errors.title ? "border-red-500" : ""
            }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-sky-900 mb-1">Description</label>
        <textarea
          className={`w-full textarea border border-sky-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-900 text-black ${errors.description ? "border-red-500" : ""
            }`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-sky-900 mb-1">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-sky-900 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-sky-900 mb-1">Upload Thumbnail</label>
        <FileUpload
          fileType="image"
          onSuccess={handleThumbnailUploadSuccess}
            onProgress={handleThumbnailUploadProgress}
        />
        {uploadThumbnailProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-sky-900 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${uploadThumbnailProgress}%` }}
            />
          </div>
        )}
      </div>



      <button
        type="submit"
        className="bg-sky-900 text-white py-2 rounded hover:bg-sky-900 transition duration-200 px-2"
        disabled={loading || !uploadProgress || !uploadThumbnailProgress}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing Video...
          </>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
  );
}

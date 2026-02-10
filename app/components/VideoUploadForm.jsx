"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "../../lib/api-client";
import FileUpload from "./FileUpload";

export default function VideoUploadForm() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadThumbnailProgress, setThumbnailUploadProgress] = useState(0);
  const { showNotification } = useNotification();
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const videoUrl = watch("videoUrl");
  const thumbnailUrl = watch("thumbnailUrl");

  const handleUploadSuccess = (response) => {
    setValue("videoUrl", response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleThumbnailUploadSuccess = (response) => {
    setValue("thumbnailUrl", response.filePath);
    showNotification("Thumbnail uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleThumbnailUploadProgress = (progress) => {
    setThumbnailUploadProgress(progress);
  };

  const onSubmit = async (data) => {
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
      setThumbnailUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  console.log(thumbnailUrl)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6  rounded-2xl space-y-6 text-black shadow my-2"
    >
      <h2 className="text-2xl font-semibold t[#0C4A6E] mb-4">
        Upload a New Video
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-[#0C4A6E] mb-1">
          Title
        </label>
        <input
          type="text"
          className={`w-full border border-sky-200 rounded p-2 ${errors.title ? "border-red-500" : ""
            }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-[#0C4A6E] mb-1">
          Description
        </label>
        <textarea
          className={`w-full border border-sky-200 rounded p-2 ${errors.description ? "border-red-500" : ""
            }`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-20">

        {/* Video Upload */}
        <div>
          <label className="block text-sm text-[#0C4A6E] font-medium mb-1">Upload Video</label>
          <FileUpload
            fileType="video"
            onSuccess={handleUploadSuccess}
            onProgress={handleUploadProgress}
          />

          {/* {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-sky-900 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )} */}


          <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center mt-3">
            {videoUrl ? (
              <video
                src={`${urlEndpoint}${videoUrl}`}
                controls
                className="w-full mt-3 rounded-lg border"
              />
            ) : (
              <span className="text-sm text-gray-500">
                Video Preview
              </span>
            )}
          </div>
        </div>
        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-[#0C4A6E] mb-1">
            Upload Thumbnail
          </label>
          <FileUpload
            fileType="image"
            onSuccess={handleThumbnailUploadSuccess}
            onProgress={handleThumbnailUploadProgress}
          />
{/* 
          {uploadThumbnailProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-sky-900 h-2 rounded-full"
                style={{ width: `${uploadThumbnailProgress}%` }}
              />
            </div>
          )} */}

          <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center mt-3">
            {thumbnailUrl ? (
              <img
                src={`${urlEndpoint}${thumbnailUrl}`}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-500">
                Image Preview
              </span>
            )}
          </div>

        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !uploadProgress || !uploadThumbnailProgress}
        className="bg-sky-900 text-white py-2 px-4 rounded"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Publishing Video...
          </span>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
  );
}

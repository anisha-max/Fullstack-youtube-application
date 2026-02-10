"use client";
import  { useRef, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";

export default function FileUpload({ onSuccess, onProgress, fileType }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const uploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
    setError(err.message)
    setUploading(false)
  };

  const handleSuccess = (res) => {
    console.log("Success", res);
    setUploading(false)
    setError(null)
    onSuccess(res)
  };

  const handleProgress = (evt) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100
      onProgress(Math.round(percentComplete))
    }
  };

  const handleStartUpload = () => {
    setUploading(true)
    setError(null)

  };

  const validateFile = (file) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return false;
      } 
      if (file.size > 100 * 1024 * 1024) {
        setError("Video size should be less than 100 MB");
        return false;
      }
    } else {
      const validTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload either png, jpeg, or webp");
        return false;
      } 
      if (file.size > 5 * 1024 * 1024) {  
        setError("Image size should be less than 5 MB");
        return false;
      }
    }
    return true;
  };
  
  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        useUniqueFileName={true}
        responseFields={["tags"]}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder={fileType === "video" ? "/videos" : "/images"}
        className="hidden"
        ref={uploadRef} 
      />
       <button
        type="button"
        onClick={() => uploadRef.current?.click()}
        className="w-full border border-sky-200 px-3 py-2 rounded text-sm text-[#0C4A6E] bg-white hover:bg-gray-50"
      >
        {fileType === "video" ? "Choose Video" : "Choose Image"}
      </button>
      {
        uploading && (
          <div className=" flex text-blue-500 text-sm items-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            <span>Uploading...</span>
          </div>
        )
      }
      {
        error && (
          <div className=" flex text-red-500 text-sm items-center gap-2">
            {error}
          </div>
        )
      }
    </div>
  );
}
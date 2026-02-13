import VideoComponent from "./VideoComponent";

export default function VideoFeed({ videos, loading, lastVideoElementRef }) {
  return (
   <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video ,index) => {
        const isLastElement = videos.length === index + 1;
          return (
            <VideoComponent 
              ref={isLastElement ? lastVideoElementRef : null} 
              key={video._id?.toString() || index} 
              video={video} 
            />
          );
      })}
    </div>
         {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C4A6E]"></div>
        </div>
      )}
      </>
  );
}
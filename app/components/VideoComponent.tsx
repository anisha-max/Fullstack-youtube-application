import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "../../models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="w-full max-w-[360px] mx-auto">
      <Link href={`/videos/${video._id}`} className="block group">
        <div className="relative w-full rounded-xl overflow-hidden aspect-video bg-gray-100">
          <IKImage
            path={video.thumbnailUrl}
            transformation={[{ height: "720", width: "1280" }]}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex mt-3 space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" >
            {/* diffrent user images  */}
            </div>
          <div>
            <h3 className="text-md font-semibold leading-snug group-hover:text-sky-900 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "../../models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  console.log(video)
  return (
    <div className="w-full max-w-[360px] mx-auto text-white ">
      <Link href={`/videos/${video._id}`} className="block hover:scale-102  p-1 rounded-2xl transition-all duration-500 ease-out">
        <div className="relative w-full rounded-xl overflow-hidden aspect-video ">
          <IKImage
            path={video.thumbnailUrl}
            transformation={[{ height: "720", width: "1280" }]}
            alt={video.title}
            className=" transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex mt-3 space-x-3">
        <div>
            <div className="w-10 h-10 rounded-full bg-gray-300" >
 
          </div>
        </div>
          <div>
            <h3 className="text-md  font-semibold ">
              {video.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

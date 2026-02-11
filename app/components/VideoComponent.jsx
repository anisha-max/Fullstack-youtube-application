import { IKImage } from "imagekitio-next";
import Image from "next/image";
import Link from "next/link";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function VideoComponent({ video }) {
  console.log(video)
  return (
    <div className="w-full max-w-[360px] mx-auto ">
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
 <Image src={video.user?.coverImage ? `${urlEndpoint}${video.user.coverImage}` : "/thumbnail.jpeg"} width={10} height={10}  alt="user image" className="w-10 h-10 rounded-full"/>
          </div>
        </div>
          <div>
            <h3 className="text-md  font-semibold ">
              {video.title}
            </h3>
            <p className="text-sm mt-1 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

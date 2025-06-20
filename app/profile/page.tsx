"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { apiClient } from '../../lib/api-client';
// import { IVideo } from '../../models/Video';
import { useSession } from 'next-auth/react';
import { IKImage } from 'imagekitio-next';

function ProfilePage() {
   const { data: session } = useSession()
  //  const [videos, setVideos] = useState<IVideo[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();

        // setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);
  return (
    <>
      <div className="flex justify-center mt-10">
        {session ? (
          <>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm drop-shadow-[0_0_4px_rgba(9,51,60,0.5)] ">
              <div className="flex flex-col items-center pb-10">
                <IKImage src={session?.user?.image || ""}
                  transformation={[{ height: "20", width: "20" }]}
                  alt={session?.user?.name || "User Image"}
                  className="w-20 h-20 mb-3 rounded-full mt-2 shadow-lg drop-shadow-[0_0_4px_rgba(9,51,60,0.5)]" />
                {/* <img className="w-24 h-24 mb-3 rounded-full mt-2 shadow-lg drop-shadow-[0_0_4px_rgba(9,51,60,0.5)]"  src={`https://ik.imagekit.io/anisha/tr:h-40,w-40/${session.user?.image}`} alt="Profile Pic" /> */}
                <h5 className="mb-1 text-xl font-medium text-gray-900 "> {session.user?.email?.split("@")[0]}</h5>
                <span className="text-sm "> {session?.user?.name}</span>
                <div className="flex mt-4 md:mt-6">
                  <Link href="/upload" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white secondary-bg rounded-lg hover:scale-105 ">Add friend</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* <div className="col-7">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm drop-shadow-[0_0_4px_rgba(9,51,60,0.5)] ">
            <h3>
             History
            </h3>
            <VideoFeed  videos={videos}/>
          </div>
        </div> */}


    </>
  )
}

export default ProfilePage

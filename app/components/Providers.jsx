"use client"
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./Notification";
import { SearchProvider } from "./SearchContext";


const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_KEY;

export default function Providers({ children }) {
  const authenticator = async () => {
    try {
      const res = await fetch("/api/imagekit-auth");
      if (!res.ok) throw new Error("Failed to authenticate");
      return res.json();
    } catch (error) {
      console.error("ImageKit authentication error:", error);
      throw error;
    }
  };

  return (
    <SessionProvider refetchInterval={5 * 60}>
      <NotificationProvider>
        <SearchProvider>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
          >
            {children}
          </ImageKitProvider>
        </SearchProvider>
      </NotificationProvider>
    </SessionProvider>
  );
}
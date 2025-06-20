import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    },{
        callbacks:{
            authorized:({token , req})=>{
                const {pathname} = req.nextUrl
                if(pathname.startsWith("/api/auth") || pathname === "/login" || pathname ==="/register" ||  pathname === "/api/imagekit-auth" ){
                    return true
                }
                if(pathname=== "/" || pathname.startsWith("/api/videos")){
                    return true
                }
                return !!token
            }
        },pages: {
      signIn: "/login", 
    },
    }
)


export const config = {
    matcher: [
         "/upload",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.ico|.*\\.js|.*\\.css|.*\\.txt|.*\\.json).*)",
      ],
  };
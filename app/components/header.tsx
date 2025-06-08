"use-client"

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { NextResponse } from 'next/server'
import React from 'react'

function header() {
    const { data: session } = useSession()
    const handleSignOut = async () => {
        try {
            await signOut()
            NextResponse.json({
                message: "logged out successfully"
            })
        } catch (error) {
            NextResponse.json({
                message: "logged failed"
            })
        }
    }

    return (
        <div>
<button onClick={handleSignOut}> SignOut</button>
{session ? (<div>
    Welcome
</div>) : (
    <div>
        <Link href="/register"> Register</Link>
        <Link href="/login"> Login</Link>
    </div>
)}
        </div>
    )
}

export default header

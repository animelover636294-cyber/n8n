import { google } from 'googleapis'
import { clerkClient, currentUser } from '@clerk/nextjs'
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.OAUTH2_REDIRECT_URI
    )

    const user = await currentUser()
    const userId = user?.id
    if (!userId) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 })
    }

    let clerkResponse
    try {
      clerkResponse = await clerkClient.users.getUserOauthAccessToken(userId, 'oauth_google')
    } catch (error) {
      console.error('Error fetching Google OAuth token:', error)
      return NextResponse.json(
        { message: 'Google OAuth token not found. Please connect your Google account first.' },
        { status: 401 }
      )
    }

    if (!clerkResponse || clerkResponse.length === 0 || !clerkResponse[0]?.token) {
      return NextResponse.json(
        { message: 'Google OAuth token not found for user. Please connect your Google account.' },
        { status: 401 }
      )
    }

    const accessToken = clerkResponse[0].token
    oauth2Client.setCredentials({
      access_token: accessToken,
    })

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    })
    
    const response = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, mimeType, webViewLink)',
    })

    if (response && response.data) {
      return Response.json(
        {
          message: response.data,
        },
        {
          status: 200,
        }
      )
    } else {
      return Response.json(
        {
          message: { files: [] },
        },
        {
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error('Drive API error:', error)
    return Response.json(
      {
        message: 'Failed to fetch Google Drive files',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
      }
    )
  }
}

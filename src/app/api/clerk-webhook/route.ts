import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, email_addresses, first_name, image_url } = body?.data
    
    if (!id || !email_addresses?.[0]?.email_address) {
      return new NextResponse('Invalid user data', { status: 400 })
    }
    
    const email = email_addresses[0].email_address
    
    // Check if database is connected
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL not set')
      return new NextResponse('Database not configured', { status: 500 })
    }
    
    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email,
        name: first_name || '',
        profileImage: image_url || '',
      },
    })
    
    return new NextResponse('User updated successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('❌ Webhook Error:', error)
    return new NextResponse('Error processing webhook', { status: 500 })
  }
}

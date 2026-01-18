import ProfileForm from '@/components/forms/profile-form'
import React from 'react'
import ProfilePicture from './_components/profile-picture'
import { auth } from '@clerk/nextjs/server'

const Settings = async (props: Props) => {
  try {
        const { userId } = await auth()
        if (!userId) return null

    const user = {
      id: authUser.id,
      clerkId: authUser.id,
      name: authUser.firstName || authUser.username || 'User',
      email: authUser.emailAddresses[0]?.emailAddress || '',
      profileImage: authUser.imageUrl || null,
    }

    const removeProfileImage = async () => {
      'use server'
      return { success: true }
    }

    const uploadProfileImage = async (image: string) => {
      'use server'
      return { success: true }
    }

    const updateUserInfo = async (name: string) => {
      'use server'
      return { success: true }
    }

    return (
      <div className="flex flex-col w-full h-full gap-8 max-w-2xl">
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
        <ProfilePicture
          onUpload={uploadProfileImage}
          onDelete={removeProfileImage}
          userImage={user?.profileImage}
        />
        <ProfileForm
          user={user}
          onUpdate={updateUserInfo}
        />
      </div>
    )
  } catch (error) {
    console.error('Settings error:', error)
    return (
      <div className="flex flex-col w-full h-full gap-8 max-w-2xl">
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
        <div className="text-white bg-blue-600/20 p-4 rounded-lg">
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }
}

export default Settings

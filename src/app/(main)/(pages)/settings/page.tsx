import ProfileForm from '@/components/forms/profile-form'
import React from 'react'
import ProfilePicture from './_components/profile-picture'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

type Props = {}

const Settings = async (props: Props) => {
  const authUser = await currentUser()
  if (!authUser) return null

  let user = await db.user.findUnique({
    where: { clerkId: authUser.id },
  })

  // If user doesn't exist in DB yet, create them
  if (!user) {
    user = await db.user.create({
      data: {
        clerkId: authUser.id,
        email: authUser.emailAddresses[0]?.emailAddress || '',
        name: authUser.firstName || authUser.username || '',
      },
    })
  }

  const removeProfileImage = async () => {
    'use server'
    const response = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        profileImage: '',
      },
    })
    return response
  }

  const uploadProfileImage = async (image: string) => {
    'use server'
    const id = authUser.id
    const response = await db.user.update({
      where: {
        clerkId: id,
      },
      data: {
        profileImage: image,
      },
    })
    return response
  }

  const updateUserInfo = async (name: string) => {
    'use server'
    const updateUser = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        name,
      },
    })
    return updateUser
  }

  return (
    <>
      <div className="flex flex-col w-full h-full gap-8 max-w-2xl">
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
        <ProfilePicture
          onUpload={uploadProfileImage}
          onDelete={removeProfileImage}
          userProfile={{
            profileImage: user?.profileImage,
            name: user?.name,
          }}
        />
        <ProfileForm
user={user}          onUpdate={updateUserInfo}
        />
      </div>
    </>
  )
}

export default Settings

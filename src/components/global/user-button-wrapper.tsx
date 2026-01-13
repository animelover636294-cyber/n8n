'use client'

import { UserButton, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

type Props = {
  afterSignOutUrl?: string
}

export const UserButtonWrapper = ({ afterSignOutUrl }: Props) => {
  return (
    <>
      <ClerkLoading>
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl={afterSignOutUrl} />
      </ClerkLoaded>
    </>
  )
}


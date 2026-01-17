'use client'
import React from 'react'
import { useAuth } from '@clerk/nextjs'
import Sidebar from '@/components/sidebar'
import InfoBar from '@/components/infobar'
type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
    const { isLoaded } = useAuth()
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full">
            {isLoaded && <InfoBar />}
            {!isLoaded && <div className="h-16 w-full animate-pulse bg-muted" />}
        {props.children}
      </div>
    </div>
  )
}

export default Layout
